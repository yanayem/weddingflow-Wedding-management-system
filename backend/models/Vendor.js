import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessName: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Photography, Venue
  description: { type: String },
  address: { type: String },
  phone: { type: String },
  images: [{ type: String }], // URLs to images in Firebase Storage
  pricing: { type: String },
  rating: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Vendor', vendorSchema);
