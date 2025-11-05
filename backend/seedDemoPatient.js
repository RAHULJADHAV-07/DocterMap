import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Patient from './models/Patient.js';

dotenv.config();

// Demo patient data
const demoPatient = {
  name: 'Demo Patient',
  email: 'demo@patient.com',
  password: 'Demo@123',
  phone: '9876543210',
  location: {
    area: 'Andheri West',
    latitude: 19.1136,
    longitude: 72.8697
  },
  role: 'patient'
};

// Connect to MongoDB and seed demo patient
const seedDemoPatient = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    // Check if demo patient already exists
    const existingPatient = await Patient.findOne({ email: demoPatient.email });
    
    if (existingPatient) {
      console.log('Demo patient already exists!');
      console.log('Email:', demoPatient.email);
      console.log('Password:', 'Demo@123');
    } else {
      // Create demo patient
      const patient = await Patient.create(demoPatient);
      console.log('✅ Demo patient created successfully!');
      console.log('\n📧 Login Credentials:');
      console.log('Email:', demoPatient.email);
      console.log('Password:', 'Demo@123');
      console.log('\nUse these credentials to test the patient login!\n');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding demo patient:', error);
    process.exit(1);
  }
};

// Run the seeder
seedDemoPatient();
