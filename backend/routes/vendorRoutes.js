import express from 'express';
import Vendor from '../models/Vendor.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Review from '../models/Review.js';

const router = express.Router();

// Get all vendors with filters
router.get('/', async (req, res) => {
  try {
    const { category, subcategory, location, minPrice, maxPrice, search } = req.query;

    let query = {};

    if (category) query.category = { $regex: category, $options: 'i' };
    if (subcategory) query.subcategories = { $in: [new RegExp(subcategory, 'i')] };
    if (location) query.address = { $regex: location, $options: 'i' };

    if (search) {
      query.$or = [
        { businessName: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { subcategories: { $in: [new RegExp(search, 'i')] } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const vendors = await Vendor.find(query).populate('owner', 'name email');
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single vendor by ID
router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate('owner', 'name email');
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get vendor by Owner's UID
router.get('/owner/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const vendor = await Vendor.findOne({ owner: user._id });
    if (!vendor) return res.json(null);
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Vendor Dashboard Stats
router.get('/stats/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const vendor = await Vendor.findOne({ owner: user._id });
    if (!vendor) return res.status(404).json({ message: 'Vendor profile not found' });

    const [bookings, reviews] = await Promise.all([
      Booking.find({ vendor: vendor._id }),
      Review.find({ vendor: vendor._id })
    ]);

    const stats = {
      totalBookings: bookings.length,
      pendingBookings: bookings.filter(b => b.status === 'pending').length,
      confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
      completedBookings: bookings.filter(b => b.status === 'completed').length,
      totalReviews: reviews.length,
      averageRating: vendor.rating || 0,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create/Update vendor profile (Owner only)
router.post('/', async (req, res) => {
  try {
    const { uid, businessName, category, subcategories, description, address, phone, images, pricing } = req.body;

    const user = await User.findOne({ uid });
    if (!user || user.role !== 'vendor') {
      return res.status(403).json({ message: 'Only vendors can create a profile' });
    }

    let vendor = await Vendor.findOne({ owner: user._id });

    if (vendor) {
      // Update
      vendor.businessName = businessName || vendor.businessName;
      vendor.category = category || vendor.category;
      vendor.subcategories = subcategories || vendor.subcategories;
      vendor.description = description || vendor.description;
      vendor.address = address || vendor.address;
      vendor.phone = phone || vendor.phone;
      vendor.images = images || vendor.images;
      vendor.pricing = pricing || vendor.pricing;
    } else {
      // Create
      vendor = new Vendor({
        owner: user._id,
        businessName,
        category,
        subcategories,
        description,
        address,
        phone,
        images,
        pricing
      });
    }

    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
