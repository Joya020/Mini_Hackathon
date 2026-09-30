/**
 * FoodShare Express Routes - Donations Lifecycle
 */
const express = require('express');
const router = express.Router();

// Mock in-memory DB or MySQL connection pool wrapper
let donations = [];

// GET /api/donations - List surplus food donations
router.get('/', (req, res) => {
  const { status, vegOnly } = req.query;
  let results = [...donations];

  if (status) {
    results = results.filter(d => d.status.toLowerCase() === status.toLowerCase());
  }
  if (vegOnly === 'true') {
    results = results.filter(d => d.vegNonVeg === 'veg');
  }

  res.json({ success: true, count: results.length, data: results });
});

// GET /api/donations/:id - Single donation details
router.get('/:id', (req, res) => {
  const donation = donations.find(d => d.id === req.params.id);
  if (!donation) {
    return res.status(404).json({ success: false, message: 'Donation not found' });
  }
  res.json({ success: true, data: donation });
});

// POST /api/donations - Create donation (Donor)
router.post('/', (req, res) => {
  const { foodName, category, quantity, vegNonVeg, prepTime, consumeBefore, pickupLocation, contact } = req.body;

  const newDonation = {
    id: `FS-${Math.floor(100 + Math.random() * 900)}`,
    foodName,
    category,
    quantity,
    vegNonVeg: vegNonVeg || 'veg',
    prepTime,
    consumeBefore,
    pickupLocation,
    contact,
    status: 'AVAILABLE',
    createdAt: new Date().toISOString()
  };

  donations.unshift(newDonation);
  res.status(201).json({ success: true, data: newDonation });
});

// POST /api/donations/:id/claim - Accept donation (NGO)
router.post('/:id/claim', (req, res) => {
  const donation = donations.find(d => d.id === req.params.id);
  if (!donation) {
    return res.status(404).json({ success: false, message: 'Donation not found' });
  }

  donation.status = 'ACCEPTED';
  donation.claimedBy = req.body.ngoName || 'Verified NGO Shelter';
  donation.claimedAt = new Date().toISOString();

  res.json({ success: true, message: 'Donation accepted by NGO', data: donation });
});

// POST /api/donations/:id/assign-volunteer - Accept pickup (Volunteer)
router.post('/:id/assign-volunteer', (req, res) => {
  const donation = donations.find(d => d.id === req.params.id);
  if (!donation) {
    return res.status(404).json({ success: false, message: 'Donation not found' });
  }

  donation.status = 'VOLUNTEER_ASSIGNED';
  donation.volunteer = {
    name: req.body.volunteerName || 'Community Volunteer Courier',
    assignedAt: new Date().toISOString()
  };

  res.json({ success: true, message: 'Courier assigned', data: donation });
});

// PUT /api/donations/:id/status - Update transit status (PICKED_UP / DELIVERED)
router.put('/:id/status', (req, res) => {
  const { status } = req.body;
  const donation = donations.find(d => d.id === req.params.id);
  if (!donation) {
    return res.status(404).json({ success: false, message: 'Donation not found' });
  }

  donation.status = status.toUpperCase();
  donation.updatedAt = new Date().toISOString();

  res.json({ success: true, message: `Status updated to ${status}`, data: donation });
});

module.exports = router;
