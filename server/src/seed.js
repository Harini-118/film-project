// server/src/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected for seeding');

    // Check if an admin user already exists
    const adminExists = await User.findOne({ email: 'admin@example.com' });

    if (adminExists) {
      console.log('Admin user already exists. No action taken.');
    } else {
      // Create the admin user
      const adminUser = new User({
        username: 'admin',
        email: 'admin@example.com',
        password: 'password123', // The User model will hash this automatically!
        role: 'super_admin',
        isActive: true,
      });
      await adminUser.save();
      console.log('🚀 Admin user created successfully!');
    }
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};

seedAdmin();