import express from 'express';
import {
  createPrescription,
  getMyPrescriptions,
  getDoctorPrescriptions,
  getPrescription,
  updatePrescription
} from '../controllers/prescriptionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createPrescription);
router.get('/my-prescriptions', protect, getMyPrescriptions);
router.get('/doctor-prescriptions', protect, getDoctorPrescriptions);
router.get('/:id', protect, getPrescription);
router.put('/:id', protect, updatePrescription);

export default router;
