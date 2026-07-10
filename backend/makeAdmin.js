import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/weddingflow';

// Replace this with the email you used to sign up
const EMAIL_TO_MAKE_ADMIN = 'arafatnayem01@gmail.com';

const makeAdmin = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, { dbName: 'weddingflow' });

    const user = await User.findOneAndUpdate(
      { email: EMAIL_TO_MAKE_ADMIN },
      { role: 'admin' },
      { new: true }
    );

    if (user) {
      console.log(`\x1b[32m%s\x1b[0m`, `Success! ${EMAIL_TO_MAKE_ADMIN} is now an Admin.`);
      console.log("User details:", { name: user.name, email: user.email, role: user.role });
    } else {
      console.log(`\x1b[31m%s\x1b[0m`, `User not found: ${EMAIL_TO_MAKE_ADMIN}`);
      console.log("Please sign up on the website first with this email, then run this script again.");

      // List existing users to help the developer
      const users = await User.find({}, 'email name role');
      if (users.length > 0) {
        console.log("\nCurrent users in database:");
        users.forEach(u => console.log(` - ${u.email} (${u.role})`));
      }
    }
    process.exit();
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

makeAdmin();
