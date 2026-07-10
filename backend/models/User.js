import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true, index: true }, // Firebase UID
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  role: { type: String, enum: ['user', 'vendor', 'admin'], default: 'user' },
  businessName: { type: String },
  serviceType: { type: String },
  phone: { type: String },
  address: { type: String },
  bio: { type: String },
  profilePic: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
