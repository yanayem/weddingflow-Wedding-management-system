import express from 'express';
import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Vendor from '../models/Vendor.js';

const router = express.Router();

// Create a booking
router.post('/', async (req, res) => {
  try {
    const { uid, vendorId, eventDate, message, totalPrice } = req.body;

    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const booking = new Booking({
      user: user._id,
      vendor: vendorId,
      eventDate,
      message,
      totalPrice
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's bookings
router.get('/user/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const bookings = await Booking.find({ user: user._id }).populate('vendor');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get vendor's bookings
router.get('/vendor/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user || user.role !== 'vendor') return res.status(403).json({ message: 'Not a vendor' });

    const vendorProfile = await Vendor.findOne({ owner: user._id });
    if (!vendorProfile) return res.json([]);

    const bookings = await Booking.find({ vendor: vendorProfile._id }).populate('user', 'name email');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status (Vendor only)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
