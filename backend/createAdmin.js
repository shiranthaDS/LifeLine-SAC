const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB using environment variable
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@lifeline.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      console.log('Email: admin@lifeline.com');
      console.log('Password: Admin@2024');
      return;
    }

    // Create admin user
    const adminUser = new User({
      name: 'LifeLine Administrator',
      email: 'admin@lifeline.com',
      password: 'Admin@2024',
      role: 'admin'
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@lifeline.com');
    console.log('Password: Admin@2024');
    console.log('Role: admin');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Only run if this file is executed directly
if (require.main === module) {
  createAdminUser();
}

module.exports = createAdminUser;