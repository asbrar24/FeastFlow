'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, '..', 'data', 'contacts.json');

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

// POST /api/contact — Submit contact message
router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Name is required and must be a string.' });
  }
  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ error: 'Email is required and must be a string.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required and must be a string.' });
  }

  const contacts = readData();
  const newContact = {
    id: uuidv4(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: typeof subject === 'string' ? subject.trim() : 'General Inquiry',
    message: message.trim(),
    createdAt: new Date().toISOString(),
    read: false
  };

  contacts.push(newContact);
  writeData(contacts);

  res.status(201).json({
    success: true,
    message: 'Message sent successfully! We\'ll get back to you soon.',
    contact: newContact
  });
});

// GET /api/contact — List all messages
router.get('/', (req, res) => {
  const contacts = readData();
  res.json({ success: true, data: contacts, total: contacts.length });
});

// DELETE /api/contact/:id — Delete message
router.delete('/:id', (req, res) => {
  let contacts = readData();
  const index = contacts.findIndex(c => c.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Message not found.' });
  }

  contacts.splice(index, 1);
  writeData(contacts);
  res.json({ success: true, message: 'Message deleted.' });
});

module.exports = router;
