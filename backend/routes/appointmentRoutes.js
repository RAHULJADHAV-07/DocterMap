import express from 'express';
import { 
  createAppointment, 
  getMyAppointments, 
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment 
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Patient routes
router.post('/', protect, createAppointment);
router.get('/my-appointments', protect, getMyAppointments);
router.delete('/:id', protect, cancelAppointment);

// Doctor routes
router.get('/doctor/:doctorId', protect, getDoctorAppointments);

// Update appointment status (both patient and doctor can update)
router.put('/:id', protect, updateAppointmentStatus);

export default router;
