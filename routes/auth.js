'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, '..', 'data', 'users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'feastflow_secret_key_123';

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

// Seed admin account helper (to be called on server start)
function seedAdmin() {
  const users = readData();
  const adminExists = users.some(u => u.role === 'admin' || u.email === 'admin@feastflow.com');
  
  if (!adminExists) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync('admin123', salt);
    const newAdmin = {
      id: uuidv4(),
      name: 'Manager',
      email: 'admin@feastflow.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date().toISOString()
    };
    users.push(newAdmin);
    writeData(users);
    console.log('⭐ Admin account seeded successfully: admin@feastflow.com / admin123');
  }
}

// Authentication middleware
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
}

// Admin only middleware
function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Administrator privileges required.' });
  }
}

// POST /api/auth/register — Register new customer
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Name is required.' });
  }
  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ error: 'Email is required.' });
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const users = readData();
  const emailExists = users.some(u => u.email === normalizedEmail);

  if (emailExists) {
    return res.status(400).json({ error: 'An account with this email already exists.' });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = {
    id: uuidv4(),
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    role: 'customer',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  writeData(users);

  // Generate session token
  const token = jwt.sign(
    { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.status(201).json({
    success: true,
    message: 'User registered successfully!',
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }
  });
});

// POST /api/auth/login — Login user
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const users = readData();
  const user = users.find(u => u.email === normalizedEmail);

  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password.' });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ error: 'Invalid email or password.' });
  }

  // Generate session token
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    success: true,
    message: 'Logged in successfully!',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// GET /api/auth/me — Retrieve current profile
router.get('/me', authenticateJWT, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

module.exports = {
  router,
  authenticateJWT,
  isAdmin,
  seedAdmin
};
