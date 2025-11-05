import User from '../models/User.js';

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
export const getAllDoctors = async (req, res) => {
  try {
    const { specialization, location, available } = req.query;
    
    // Build query
    let query = { role: 'doctor' };
    
    if (specialization) {
      query.specialization = new RegExp(specialization, 'i');
    }
    
    if (location) {
      query.location = new RegExp(location, 'i');
    }
    
    if (available !== undefined) {
      query.available = available === 'true';
    }

    const doctors = await User.find(query).select('-password');
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await User.findOne({ 
      _id: req.params.id, 
      role: 'doctor' 
    }).select('-password');

    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update doctor profile
// @route   PUT /api/doctors/:id
// @access  Private/Doctor
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await User.findOne({ 
      _id: req.params.id, 
      role: 'doctor' 
    });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if the logged-in user is the doctor
    if (doctor._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    const { specialization, experience, fee, available, location, phone } = req.body;

    if (specialization) doctor.specialization = specialization;
    if (experience) doctor.experience = experience;
    if (fee) doctor.fee = fee;
    if (available !== undefined) doctor.available = available;
    if (location) doctor.location = location;
    if (phone) doctor.phone = phone;

    const updatedDoctor = await doctor.save();
    
    res.json({
      id: updatedDoctor._id,
      name: updatedDoctor.name,
      email: updatedDoctor.email,
      specialization: updatedDoctor.specialization,
      experience: updatedDoctor.experience,
      fee: updatedDoctor.fee,
      available: updatedDoctor.available,
      location: updatedDoctor.location,
      phone: updatedDoctor.phone
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Doctor
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await User.findOne({ 
      _id: req.params.id, 
      role: 'doctor' 
    });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if the logged-in user is the doctor
    if (doctor._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this profile' });
    }

    await doctor.deleteOne();
    res.json({ message: 'Doctor profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
