import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Vendor from './models/Vendor.js';
import Booking from './models/Booking.js';
import Review from './models/Review.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env file");
  process.exit(1);
}

const clearDB = async () => {
  try {
    console.log("Connecting to MongoDB for cleanup...");
    await mongoose.connect(MONGODB_URI, { dbName: 'weddingflow' });

    console.log("Clearing collections...");

    const usersDeleted = await User.deleteMany({});
    const vendorsDeleted = await Vendor.deleteMany({});
    const bookingsDeleted = await Booking.deleteMany({});
    const reviewsDeleted = await Review.deleteMany({});

    console.log(`✅ Success! Database cleared.`);
    console.log(`- Users removed: ${usersDeleted.deletedCount}`);
    console.log(`- Vendors removed: ${vendorsDeleted.deletedCount}`);
    console.log(`- Bookings removed: ${bookingsDeleted.deletedCount}`);
    console.log(`- Reviews removed: ${reviewsDeleted.deletedCount}`);

    console.log("\nDatabase is now clean and ready for real data.");
    process.exit();
  } catch (error) {
    console.error("❌ Error during cleanup:", error);
    process.exit(1);
  }
};

clearDB();
