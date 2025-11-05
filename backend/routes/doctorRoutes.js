import express from 'express';
import {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} from '../controllers/doctorController.js';
import { protect, doctorOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);

// Protected routes (doctors only)
router.put('/:id', protect, doctorOnly, updateDoctor);
router.delete('/:id', protect, doctorOnly, deleteDoctor);

export default router;
