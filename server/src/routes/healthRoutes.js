const express = require('express');
const prisma = require('../config/db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: 'healthy',
      database: 'connected',
    });
  } catch (error) {
    console.error('Health check database connection failed:', error);

    res.status(503).json({
      status: 'error',
      database: 'disconnected',
    });
  }
});

module.exports = router;
