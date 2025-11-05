import Review from '../models/Review.js';
import Appointment from '../models/Appointment.js';

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private (Patient only)
export const createReview = async (req, res) => {
  try {
    const { doctorId, appointmentId, rating, comment } = req.body;
    
    // Check if appointment exists and belongs to patient
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      patientId: req.user._id,
      doctorId: doctorId,
      status: 'completed'
    });
    
    if (!appointment) {
      return res.status(400).json({ 
        message: 'Can only review completed appointments' 
      });
    }
    
    // Check if review already exists
    const existingReview = await Review.findOne({ appointmentId });
    if (existingReview) {
      return res.status(400).json({ message: 'Review already exists for this appointment' });
    }
    
    const review = await Review.create({
      doctorId,
      patientId: req.user._id,
      appointmentId,
      rating,
      comment,
      patientName: req.user.name,
      verified: true
    });
    
    res.status(201).json(review);
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get doctor reviews
// @route   GET /api/reviews/doctor/:doctorId
// @access  Public
export const getDoctorReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ doctorId: req.params.doctorId })
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json(reviews);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get patient reviews
// @route   GET /api/reviews/my-reviews
// @access  Private (Patient)
export const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ patientId: req.user._id })
      .populate('doctorId', 'name specialization')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    console.error('Get my reviews error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private (Patient who created it)
export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const review = await Review.findOne({
      _id: req.params.id,
      patientId: req.user._id
    });
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    
    await review.save();
    
    res.json(review);
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private (Patient who created it)
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      patientId: req.user._id
    });
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Recalculate doctor rating
    await Review.calculateAverage(review.doctorId);
    
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
