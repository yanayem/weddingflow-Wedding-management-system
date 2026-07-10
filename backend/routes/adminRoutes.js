import express from 'express';
import User from '../models/User.js';
import Vendor from '../models/Vendor.js';
import Booking from '../models/Booking.js';
import Review from '../models/Review.js';

const router = express.Router();

// Middleware to check if user is admin (simplified for now, ideally use token)
// In a real app, you'd verify the Firebase ID token and check the role in the DB
const isAdmin = async (req, res, next) => {
  const { admin_uid } = req.headers;
  if (!admin_uid) return res.status(401).json({ message: 'Unauthorized' });

  const user = await User.findOne({ uid: admin_uid });
  if (user && user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Admin access only' });
  }
};

// Get stats for dashboard
router.get('/stats', isAdmin, async (req, res) => {
  try {
    const [users, vendors, bookings, reviews] = await Promise.all([
      User.countDocuments(),
      Vendor.countDocuments(),
      Booking.countDocuments(),
      Review.countDocuments()
    ]);
    res.json({ users, vendors, bookings, reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all of a resource
router.get('/:resource', isAdmin, async (req, res) => {
  const { resource } = req.params;
  try {
    let data;
    switch (resource) {
      case 'users': data = await User.find().sort({ createdAt: -1 }); break;
      case 'vendors': data = await Vendor.find().populate('owner', 'name email').sort({ createdAt: -1 }); break;
      case 'bookings': data = await Booking.find().populate('user', 'name email').populate('vendor').sort({ createdAt: -1 }); break;
      case 'reviews': data = await Review.find().populate('user', 'name email').populate('vendor').sort({ createdAt: -1 }); break;
      default: return res.status(400).json({ message: 'Invalid resource' });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a resource item
router.delete('/:resource/:id', isAdmin, async (req, res) => {
  const { resource, id } = req.params;
  try {
    switch (resource) {
      case 'users': await User.findByIdAndDelete(id); break;
      case 'vendors': await Vendor.findByIdAndDelete(id); break;
      case 'bookings': await Booking.findByIdAndDelete(id); break;
      case 'reviews': await Review.findByIdAndDelete(id); break;
      default: return res.status(400).json({ message: 'Invalid resource' });
    }
    res.json({ message: `${resource} item deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
