'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, '..', 'data', 'reservations.json');

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

// POST /api/reservations — Create reservation
router.post('/', (req, res) => {
  const { name, phone, person, date, time, message } = req.body;

  // Validation
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Name is required and must be a string.' });
  }
  if (!phone || typeof phone !== 'string' || !phone.trim()) {
    return res.status(400).json({ error: 'Phone number is required and must be a string.' });
  }
  if (!person || typeof person !== 'string' || !person.trim()) {
    return res.status(400).json({ error: 'Number of persons is required.' });
  }
  if (!date || typeof date !== 'string' || !date.trim()) {
    return res.status(400).json({ error: 'Reservation date is required.' });
  }
  if (!time || typeof time !== 'string' || !time.trim()) {
    return res.status(400).json({ error: 'Reservation time is required.' });
  }

  const reservations = readData();
  const newReservation = {
    id: uuidv4(),
    name: name.trim(),
    phone: phone.trim(),
    person: person.trim(),
    date: date.trim(),
    time: time.trim(),
    message: typeof message === 'string' ? message.trim() : '',
    createdAt: new Date().toISOString(),
    status: 'pending'
  };

  reservations.push(newReservation);
  writeData(reservations);

  res.status(201).json({
    success: true,
    message: 'Reservation created successfully!',
    reservation: newReservation
  });
});

// GET /api/reservations — List all
router.get('/', (req, res) => {
  const reservations = readData();
  res.json({ success: true, data: reservations, total: reservations.length });
});

// DELETE /api/reservations/:id — Cancel
router.delete('/:id', (req, res) => {
  let reservations = readData();
  const index = reservations.findIndex(r => r.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Reservation not found.' });
  }

  reservations.splice(index, 1);
  writeData(reservations);
  res.json({ success: true, message: 'Reservation cancelled.' });
});

module.exports = router;
