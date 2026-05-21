'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, '..', 'data', 'newsletter.json');

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

// POST /api/newsletter — Subscribe
router.post('/', (req, res) => {
  const { email } = req.body;

  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ error: 'Email address is required and must be a string.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const subscribers = readData();
  const exists = subscribers.find(s => s.email.toLowerCase() === email.trim().toLowerCase());
  if (exists) {
    return res.status(409).json({ error: 'This email is already subscribed.' });
  }

  const newSubscriber = {
    id: uuidv4(),
    email: email.trim().toLowerCase(),
    subscribedAt: new Date().toISOString()
  };

  subscribers.push(newSubscriber);
  writeData(subscribers);

  res.status(201).json({
    success: true,
    message: 'Successfully subscribed! Enjoy your 25% discount.',
    subscriber: newSubscriber
  });
});

// GET /api/newsletter — List subscribers
router.get('/', (req, res) => {
  const subscribers = readData();
  res.json({ success: true, data: subscribers, total: subscribers.length });
});

// DELETE /api/newsletter/:id — Unsubscribe
router.delete('/:id', (req, res) => {
  let subscribers = readData();
  const index = subscribers.findIndex(s => s.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Subscriber not found.' });
  }

  subscribers.splice(index, 1);
  writeData(subscribers);
  res.json({ success: true, message: 'Unsubscribed successfully.' });
});

module.exports = router;
