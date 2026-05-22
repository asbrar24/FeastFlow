'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Import routes
const reservationsRouter = require('./routes/reservations');
const newsletterRouter = require('./routes/newsletter');
const contactRouter = require('./routes/contact');
const menuRouter = require('./routes/menu');
const authRouter = require('./routes/auth');
const ordersRouter = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(cors());

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api', apiLimiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// API Routes
app.use('/api/reservations', reservationsRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/contact', contactRouter);
app.use('/api/menu', menuRouter);
app.use('/api/auth', authRouter.router);
app.use('/api/orders', ordersRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Function to start server on an available port
function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`\nFeast Flow Server running at http://localhost:${port}`);
    console.log(`📡 API available at http://localhost:${port}/api`);
    console.log(`🔧 Admin panel at http://localhost:${port}/admin.html\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️  Port ${port} is already in use. Trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

// Seed default administrator account
authRouter.seedAdmin();

startServer(PORT);
