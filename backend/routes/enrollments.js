const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Enrollment = require('../models/Enrollment');

// Enroll in a simulation
router.post('/enroll', auth, async (req, res) => {
  const { simulationId } = req.body;
  if (!simulationId) return res.status(400).json({ message: 'simulationId required' });
  try {
    const exists = await Enrollment.findOne({ userId: req.user.id, simulationId });
    if (exists) return res.status(400).json({ message: 'Already enrolled' });
    const enroll = new Enrollment({ userId: req.user.id, simulationId });
    await enroll.save();
    res.json(enroll);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Fetch enrollments for a user
router.get('/my', auth, async (req, res) => {
  try {
    const enrolls = await Enrollment.find({ userId: req.user.id }).populate('simulationId');
    res.json(enrolls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
