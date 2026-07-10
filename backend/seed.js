import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Vendor from './models/Vendor.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/weddingflow';

const sampleVendors = [
  {
    name: "Alex Rivera",
    email: "alex@photography.com",
    businessName: "Eternal Moments Photography",
    category: "Photography",
    pricing: "Starts from $1,500",
    description: "Capturing your love story through authentic, timeless photography. We specialize in destination weddings and cinematic storytelling.",
    address: "Downtown, New York",
    phone: "+1 234 567 8901",
    images: [
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    name: "Sarah Chen",
    email: "sarah@caterers.com",
    businessName: "Gourmet Gala Catering",
    category: "Caterers",
    pricing: "Starts from $45/plate",
    description: "Exquisite culinary experiences tailored to your taste. From elegant plated dinners to fusion buffets, we make your wedding delicious.",
    address: "Brooklyn, NY",
    phone: "+1 234 567 8902",
    images: [
        "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    name: "Marco Rossi",
    email: "marco@venues.com",
    businessName: "The Grand Rose Ballroom",
    category: "Venues",
    pricing: "Starts from $5,000",
    description: "A breathtaking historic venue featuring crystal chandeliers and a sprawling garden terrace. Perfect for weddings up to 300 guests.",
    address: "Manhattan, NY",
    phone: "+1 234 567 8903",
    images: [
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    name: "Bella Thorne",
    email: "bella@makeup.com",
    businessName: "Radiant Glow Makeup Studio",
    category: "Makeup Artists",
    pricing: "Starts from $300",
    description: "Award-winning bridal makeup artist specializing in natural, luminous looks that last all night long.",
    address: "Queens, NY",
    phone: "+1 234 567 8904",
    images: [
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800"
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: 'weddingflow' });
    console.log("Connected to MongoDB for seeding...");

    // Clear existing
    // WARNING: Be careful with clearing in production
    // await User.deleteMany({ email: { $in: sampleVendors.map(v => v.email) } });
    // await Vendor.deleteMany({});

    for (const vData of sampleVendors) {
      // 1. Create User
      const uid = `seed-uid-${Math.random().toString(36).substr(2, 9)}`;
      const user = new User({
        uid,
        name: vData.name,
        email: vData.email,
        role: 'vendor',
        businessName: vData.businessName,
        serviceType: vData.category,
        phone: vData.phone,
        address: vData.address
      });
      await user.save();

      // 2. Create Vendor linked to User
      const vendor = new Vendor({
        owner: user._id,
        businessName: vData.businessName,
        category: vData.category,
        description: vData.description,
        address: vData.address,
        phone: vData.phone,
        pricing: vData.pricing,
        images: vData.images,
        isVerified: true,
        rating: 4.5 + Math.random() * 0.5
      });
      await vendor.save();
    }

    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
