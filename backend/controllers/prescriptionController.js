import Prescription from '../models/Prescription.js';
import Appointment from '../models/Appointment.js';

// @desc    Create prescription
// @route   POST /api/prescriptions
// @access  Private (Doctor only)
export const createPrescription = async (req, res) => {
  try {
    const {
      appointmentId,
      patientId,
      diagnosis,
      medications,
      tests,
      notes,
      followUpDate
    } = req.body;
    
    // Verify appointment belongs to doctor
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      doctorId: req.user._id
    });
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if prescription already exists
    const existing = await Prescription.findOne({ appointmentId });
    if (existing) {
      return res.status(400).json({ message: 'Prescription already exists for this appointment' });
    }
    
    const prescription = await Prescription.create({
      appointmentId,
      doctorId: req.user._id,
      patientId,
      doctorName: req.user.name,
      patientName: appointment.patientName,
      diagnosis,
      medications,
      tests,
      notes,
      followUpDate,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });
    
    // Update appointment status to completed
    appointment.status = 'completed';
    await appointment.save();
    
    res.status(201).json(prescription);
  } catch (error) {
    console.error('Create prescription error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get patient prescriptions
// @route   GET /api/prescriptions/my-prescriptions
// @access  Private (Patient)
export const getMyPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patientId: req.user._id })
      .populate('doctorId', 'name specialization phone')
      .sort({ createdAt: -1 });
    
    res.json(prescriptions);
  } catch (error) {
    console.error('Get my prescriptions error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get doctor prescriptions
// @route   GET /api/prescriptions/doctor-prescriptions
// @access  Private (Doctor)
export const getDoctorPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ doctorId: req.user._id })
      .populate('patientId', 'name phone email')
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json(prescriptions);
  } catch (error) {
    console.error('Get doctor prescriptions error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single prescription
// @route   GET /api/prescriptions/:id
// @access  Private
export const getPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate('doctorId', 'name specialization phone experience')
      .populate('patientId', 'name phone email');
    
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    
    // Verify user has access
    const isDoctor = prescription.doctorId._id.toString() === req.user._id.toString();
    const isPatient = prescription.patientId._id.toString() === req.user._id.toString();
    
    if (!isDoctor && !isPatient) {
      return res.status(403).json({ message: 'Not authorized to view this prescription' });
    }
    
    res.json(prescription);
  } catch (error) {
    console.error('Get prescription error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update prescription
// @route   PUT /api/prescriptions/:id
// @access  Private (Doctor only)
export const updatePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findOne({
      _id: req.params.id,
      doctorId: req.user._id
    });
    
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    
    const { diagnosis, medications, tests, notes, followUpDate } = req.body;
    
    prescription.diagnosis = diagnosis || prescription.diagnosis;
    prescription.medications = medications || prescription.medications;
    prescription.tests = tests || prescription.tests;
    prescription.notes = notes || prescription.notes;
    prescription.followUpDate = followUpDate || prescription.followUpDate;
    
    await prescription.save();
    
    res.json(prescription);
  } catch (error) {
    console.error('Update prescription error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
