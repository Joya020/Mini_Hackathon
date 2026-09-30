/**
 * FoodShare Node.js / Express REST API Server
 */
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const donationRoutes = require('./routes/donations');
app.use('/api/donations', donationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'FoodShare REST API Engine',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`FoodShare backend service listening on port ${PORT}`);
});
