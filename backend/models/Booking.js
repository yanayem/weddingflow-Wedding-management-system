import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  eventDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  totalPrice: { type: Number },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', bookingSchema);
