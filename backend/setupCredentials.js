const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const setupCredentials = async () => {
  try {
    // Connect to MongoDB using environment variable
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔌 Connected to MongoDB');
    console.log('=====================================');

    // Create Admin User
    console.log('👤 Setting up Admin credentials...');
    
    const existingAdmin = await User.findOne({ email: 'admin@lifeline.com' });
    
    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists');
    } else {
      const adminUser = new User({
        name: 'LifeLine Administrator',
        email: 'admin@lifeline.com',
        password: 'Admin@2024',
        role: 'admin'
      });

      await adminUser.save();
      console.log('✅ Admin user created successfully!');
    }
    
    console.log('📧 Email: admin@lifeline.com');
    console.log('🔑 Password: Admin@2024');
    console.log('👮 Role: admin');
    console.log('=====================================');

    // Create Security Manager User
    console.log('🛡️  Setting up Security Manager credentials...');
    
    const existingSecurityManager = await User.findOne({ email: 'security@lifeline.com' });
    
    if (existingSecurityManager) {
      console.log('ℹ️  Security Manager user already exists');
    } else {
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
      console.log('✅ Security Manager user created successfully!');
    }
    
    console.log('📧 Email: security@lifeline.com');
    console.log('🔑 Password: Security@2024');
    console.log('👮 Role: securitymanager');
    console.log('=====================================');
    
    // Create Auditor User (bonus)
    console.log('🔍 Setting up Auditor credentials...');
    
    const existingAuditor = await User.findOne({ email: 'auditor@lifeline.com' });
    
    if (existingAuditor) {
      console.log('ℹ️  Auditor user already exists');
    } else {
      const auditor = new User({
        name: 'LifeLine Auditor',
        email: 'auditor@lifeline.com',
        password: 'Auditor@2024',
        role: 'auditor',
        isActive: true,
        emailVerified: true,
        preferences: {
          notifications: {
            email: true,
            courseUpdates: true,
            newCourses: false
          },
          theme: 'light'
        }
      });

      await auditor.save();
      console.log('✅ Auditor user created successfully!');
    }
    
    console.log('📧 Email: auditor@lifeline.com');
    console.log('🔑 Password: Auditor@2024');
    console.log('👮 Role: auditor');
    console.log('=====================================');
    
    console.log('🎉 All credentials setup completed!');
    console.log('\n📋 SUMMARY OF CREDENTIALS:');
    console.log('');
    console.log('🔐 ADMIN ACCOUNT:');
    console.log('   Email: admin@lifeline.com');
    console.log('   Password: Admin@2024');
    console.log('   Access: Full system administration');
    console.log('');
    console.log('🛡️  SECURITY MANAGER ACCOUNT:');
    console.log('   Email: security@lifeline.com');
    console.log('   Password: Security@2024');
    console.log('   Access: Security management and monitoring');
    console.log('');
    console.log('🔍 AUDITOR ACCOUNT:');
    console.log('   Email: auditor@lifeline.com');
    console.log('   Password: Auditor@2024');
    console.log('   Access: Audit and compliance review');
    console.log('');
    console.log('💡 You can now use these credentials to log into LifeLine!');

  } catch (error) {
    console.error('❌ Error setting up credentials:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Only run if this file is executed directly
if (require.main === module) {
  setupCredentials();
}

module.exports = setupCredentials;