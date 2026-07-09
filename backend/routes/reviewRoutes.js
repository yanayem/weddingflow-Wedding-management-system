import express from 'express';
import Review from '../models/Review.js';
import User from '../models/User.js';
import Vendor from '../models/Vendor.js';

const router = express.Router();

// Add a review
router.post('/', async (req, res) => {
  try {
    const { uid, vendorId, rating, comment } = req.body;

    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const review = new Review({
      user: user._id,
      vendor: vendorId,
      rating,
      comment
    });

    await review.save();

    // Update vendor's average rating
    const reviews = await Review.find({ vendor: vendorId });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await Vendor.findByIdAndUpdate(vendorId, { rating: avgRating.toFixed(1) });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get reviews for a vendor
router.get('/:vendorId', async (req, res) => {
  try {
    const reviews = await Review.find({ vendor: req.params.vendorId }).populate('user', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
