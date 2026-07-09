import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Register or update user profile
router.post('/register', async (req, res) => {
  try {
    const { uid, name, email, role, businessName, serviceType } = req.body;

    let user = await User.findOne({ uid });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      uid,
      name,
      email,
      role,
      businessName,
      serviceType
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
    const { name, phone, address, bio, profilePic } = req.body;
    const user = await User.findOneAndUpdate(
      { uid: req.params.uid },
      { name, phone, address, bio, profilePic },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
