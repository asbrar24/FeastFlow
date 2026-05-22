'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { authenticateJWT, isAdmin } = require('./auth');

const DATA_FILE = path.join(__dirname, '..', 'data', 'orders.json');

// Ensure database file exists
if (!fs.existsSync(DATA_FILE)) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// POST /api/orders — Create/place new order (requires authentication)
router.post('/', authenticateJWT, (req, res) => {
  const { phone, address, items, paymentMethod, notes } = req.body;

  if (!phone || typeof phone !== 'string' || !phone.trim()) {
    return res.status(400).json({ error: 'Phone number is required.' });
  }
  if (!address || typeof address !== 'string' || !address.trim()) {
    return res.status(400).json({ error: 'Delivery address is required.' });
  }
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty. Order must contain at least one item.' });
  }

  // Validate items structure and calculate total price
  let totalPrice = 0;
  for (const item of items) {
    if (!item.name || !item.price || !item.quantity || item.quantity <= 0) {
      return res.status(400).json({ error: 'Invalid item data in cart.' });
    }
    totalPrice += Number(item.price) * Number(item.quantity);
  }

  const orders = readData();
  const newOrder = {
    id: uuidv4(),
    userId: req.user.id,
    customerName: req.user.name,
    customerEmail: req.user.email,
    customerPhone: phone.trim(),
    deliveryAddress: address.trim(),
    items: items.map(item => ({
      productId: item.productId || uuidv4(),
      name: item.name.trim(),
      price: Number(item.price),
      quantity: Number(item.quantity)
    })),
    totalPrice: Number(totalPrice.toFixed(2)),
    paymentMethod: paymentMethod || 'Cash on Delivery',
    notes: notes ? notes.trim() : '',
    status: 'pending', // pending, preparing, out-for-delivery, completed, cancelled
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);
  writeData(orders);

  res.status(201).json({
    success: true,
    message: 'Order placed successfully!',
    order: newOrder
  });
});

// GET /api/orders — List current user's orders (requires authentication)
router.get('/', authenticateJWT, (req, res) => {
  const orders = readData();
  const userOrders = orders.filter(o => o.userId === req.user.id);
  
  // Sort by date descending
  userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  res.json({
    success: true,
    data: userOrders,
    total: userOrders.length
  });
});

// GET /api/orders/all — Admin only: List all orders
router.get('/all', authenticateJWT, isAdmin, (req, res) => {
  const orders = readData();
  
  // Sort by date descending
  orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  res.json({
    success: true,
    data: orders,
    total: orders.length
  });
});

// PATCH /api/orders/:id — Admin only: Update order status
router.patch('/:id', authenticateJWT, isAdmin, (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'preparing', 'out-for-delivery', 'completed', 'cancelled'];
  
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }

  const orders = readData();
  const order = orders.find(o => o.id === req.params.id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found.' });
  }

  order.status = status;
  writeData(orders);

  res.json({
    success: true,
    message: `Order status updated to ${status}.`,
    order
  });
});

// DELETE /api/orders/:id — Admin only: Delete/cancel order
router.delete('/:id', authenticateJWT, isAdmin, (req, res) => {
  let orders = readData();
  const index = orders.findIndex(o => o.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Order not found.' });
  }

  orders.splice(index, 1);
  writeData(orders);

  res.json({
    success: true,
    message: 'Order deleted successfully.'
  });
});

module.exports = router;
