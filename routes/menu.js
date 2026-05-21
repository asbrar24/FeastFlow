'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, '..', 'data', 'menu.json');

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

// GET /api/menu — Get all menu items (with optional category filter)
router.get('/', (req, res) => {
  let menu = readData();

  if (req.query.category) {
    menu = menu.filter(item =>
      item.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }

  res.json({ success: true, data: menu, total: menu.length });
});

// GET /api/menu/:id — Get single menu item
router.get('/:id', (req, res) => {
  const menu = readData();
  const item = menu.find(m => m.id === req.params.id);

  if (!item) {
    return res.status(404).json({ error: 'Menu item not found.' });
  }

  res.json({ success: true, data: item });
});

// POST /api/menu — Add a new menu item
router.post('/', (req, res) => {
  const { name, description, price, image, category, badge } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Menu item name is required and must be a string.' });
  }
  if (price === undefined || price === null || isNaN(Number(price))) {
    return res.status(400).json({ error: 'Valid price is required.' });
  }

  const menu = readData();
  const newItem = {
    id: uuidv4(),
    name: name.trim(),
    description: typeof description === 'string' ? description.trim() : '',
    price: Number(price),
    image: typeof image === 'string' ? image.trim() : './assets/images/menu-1.png',
    category: typeof category === 'string' ? category.trim() : 'main-course',
    badge: badge ? String(badge).trim() : null
  };

  menu.push(newItem);
  writeData(menu);

  res.status(201).json({
    success: true,
    message: 'Menu item added successfully!',
    item: newItem
  });
});

// PUT /api/menu/:id — Update menu item
router.put('/:id', (req, res) => {
  const menu = readData();
  const index = menu.findIndex(m => m.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Menu item not found.' });
  }

  const { name, description, price, image, category, badge } = req.body;
  
  if (name !== undefined) {
    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Menu item name must be a non-empty string.' });
    }
    menu[index].name = name.trim();
  }
  
  if (description !== undefined) {
    menu[index].description = description ? String(description).trim() : '';
  }
  
  if (price !== undefined) {
    if (price === null || isNaN(Number(price))) {
      return res.status(400).json({ error: 'Price must be a valid number.' });
    }
    menu[index].price = Number(price);
  }
  
  if (image !== undefined) {
    menu[index].image = image ? String(image).trim() : './assets/images/menu-1.png';
  }
  
  if (category !== undefined) {
    menu[index].category = category ? String(category).trim() : 'main-course';
  }
  
  if (badge !== undefined) {
    menu[index].badge = badge ? String(badge).trim() : null;
  }

  writeData(menu);
  res.json({ success: true, message: 'Menu item updated.', item: menu[index] });
});

// DELETE /api/menu/:id — Delete menu item
router.delete('/:id', (req, res) => {
  let menu = readData();
  const index = menu.findIndex(m => m.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Menu item not found.' });
  }

  menu.splice(index, 1);
  writeData(menu);
  res.json({ success: true, message: 'Menu item deleted.' });
});

module.exports = router;
