import { validationResult } from 'express-validator';
import Patient from '../models/Patient.js';
import { generateToken } from '../utils/generateToken.js';

// @desc    Register new patient
// @route   POST /api/patients/register
// @access  Public
export const registerPatient = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone, location } = req.body;

    // Check if patient already exists
    const patientExists = await Patient.findOne({ email });
    if (patientExists) {
      return res.status(400).json({ message: 'Patient already exists' });
    }

    // Create patient object
    const patientData = {
      name,
      email,
      password,
      phone,
      location,
      role: 'patient'
    };

    // Create patient
    const patient = await Patient.create(patientData);

    if (patient) {
      res.status(201).json({
        _id: patient._id,
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        location: patient.location,
        role: patient.role,
        token: generateToken(patient._id)
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Login patient
// @route   POST /api/patients/login
// @access  Public
export const loginPatient = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find patient by email
    const patient = await Patient.findOne({ email });

    if (patient && (await patient.matchPassword(password))) {
      res.json({
        _id: patient._id,
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        location: patient.location,
        role: patient.role,
        token: generateToken(patient._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get patient profile
// @route   GET /api/patients/profile
// @access  Private
export const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user._id).select('-password');
    
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update patient profile
// @route   PUT /api/patients/profile
// @access  Private
export const updatePatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user._id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const { name, phone, location } = req.body;

    if (name) patient.name = name;
    if (phone) patient.phone = phone;
    if (location) patient.location = location;

    const updatedPatient = await patient.save();
    
    res.json({
      _id: updatedPatient._id,
      name: updatedPatient.name,
      email: updatedPatient.email,
      phone: updatedPatient.phone,
      location: updatedPatient.location,
      role: updatedPatient.role
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all patients
// @route   GET /api/patients
// @access  Public
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({}).select('-password');
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Demo login credentials
// @desc    Get demo login info
// @route   GET /api/patients/demo
// @access  Public
export const getDemoLogin = async (req, res) => {
  res.json({
    message: 'Demo Patient Login Credentials',
    email: 'demo@patient.com',
    password: 'Demo@123',
    note: 'Use these credentials to test the patient login'
  });
};
