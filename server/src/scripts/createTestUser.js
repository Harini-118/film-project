import mongoose from 'mongoose';
import User from '../models/User.js';

const createTestUser = async () => {
  try {
    // Hardcoded for testing - replace with your actual MongoDB URI
    await mongoose.connect('mongodb+srv://techvaseegrah:I6KMVhe5Ru6OsJ7N@gowhats.u2mth.mongodb.net/embedded_signup?retryWrites=true&w=majority&appName=gowhats');
    console.log('Connected to MongoDB');
    
    // Delete existing test user
    await User.deleteOne({ email: 'test@admin.com' });
    console.log('Deleted existing test user (if any)');
    
    const user = new User({
      username: 'testadmin',
      email: 'test@admin.com',
      password: 'password123',
      role: 'super_admin',
      isActive: true
    });
    
    await user.save();
    console.log('Test user created successfully:');
    console.log('Email: test@admin.com');
    console.log('Password: password123');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

createTestUser();