import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Register or update user profile
router.post('/register', async (req, res) => {
  try {
    const { uid, name, email, role, businessName, serviceType, profilePic } = req.body;

    let user = await User.findOne({ uid });

    if (user) {
      return res.status(200).json(user);
    }

    user = new User({
      uid,
      name,
      email,
      role: role || 'user',
      businessName,
      serviceType,
      profilePic
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user profile
router.get('/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/:uid', async (req, res) => {
  try {
    const { name, phone, address, bio, profilePic, businessName, serviceType } = req.body;
    const user = await User.findOneAndUpdate(
      { uid: req.params.uid },
      { name, phone, address, bio, profilePic, businessName, serviceType },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user profile
router.delete('/:uid', async (req, res) => {
  try {
    // Basic security check (optional but recommended)
    const apiKey = req.headers['x-api-key'];
    if (process.env.NODE_ENV === 'production' && apiKey !== process.env.BACKEND_API_KEY) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findOneAndDelete({ uid: req.params.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully from database' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
