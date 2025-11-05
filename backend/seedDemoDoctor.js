import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';

dotenv.config();

const seedDemoDoctor = async () => {
  try {
    await connectDB();

    // Check if demo doctor already exists
    const existingDoctor = await User.findOne({ email: 'demo@doctor.com' });
    
    if (existingDoctor) {
      console.log('⚠️  Demo doctor already exists!');
      console.log('Email: demo@doctor.com');
      console.log('Password: Demo@123');
      process.exit(0);
    }

    // Create demo doctor
    const demoDoctor = await User.create({
      name: 'Dr. Demo Sharma',
      email: 'demo@doctor.com',
      password: 'Demo@123',
      phone: '9876543210',
      specialization: 'General Physician',
      experience: 10,
      location: {
        area: 'Bandra West',
        latitude: 19.0596,
        longitude: 72.8295
      },
      rating: 4.8,
      fee: 500,
      available: true,
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: 'doctor'
    });

    console.log('✅ Demo doctor created successfully!');
    console.log('\n📋 Demo Doctor Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email:    demo@doctor.com');
    console.log('Password: Demo@123');
    console.log('Role:     doctor');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\nDoctor ID: ${demoDoctor._id}`);
    console.log(`Name: ${demoDoctor.name}`);
    console.log(`Specialization: ${demoDoctor.specialization}`);
    console.log(`Location: ${demoDoctor.location.area}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding demo doctor:', error);
    process.exit(1);
  }
};

seedDemoDoctor();
