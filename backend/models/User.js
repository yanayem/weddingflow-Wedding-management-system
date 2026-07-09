import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
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
