const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import User model
const User = require('./models/User');

const createSecurityManager = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if security manager already exists
    const existingSecurityManager = await User.findOne({ 
      email: 'security@lifeline.com' 
    });

    if (existingSecurityManager) {
      console.log('Security Manager account already exists!');
      console.log('Email: security@lifeline.com');
      console.log('Password: Security@2024');
      process.exit(0);
    }

    // Create security manager user (password will be hashed by User model pre-save middleware)
    const securityManager = new User({
      name: 'LifeLine Security Manager',
      email: 'security@lifeline.com',
      password: 'Security@2024',
      role: 'securitymanager',
      isActive: true,
      emailVerified: true,
      preferences: {
        notifications: {
          email: true,
          courseUpdates: true,
          newCourses: true
        },
        theme: 'light'
      }
    });

    await securityManager.save();
    
    console.log('✅ Security Manager account created successfully!');
    console.log('Email: security@lifeline.com');
    console.log('Password: Security@2024');
    console.log('Role: securitymanager');
    
  } catch (error) {
    console.error('❌ Error creating Security Manager:', error);
  } finally {
    mongoose.connection.close();
  }
};

createSecurityManager();