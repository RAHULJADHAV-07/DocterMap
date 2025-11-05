import express from 'express';
import { body } from 'express-validator';
import {
  registerPatient,
  loginPatient,
  getPatientProfile,
  updatePatientProfile,
  getAllPatients,
  getDemoLogin
} from '../controllers/patientController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('location').notEmpty().withMessage('Location is required')
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

// Public routes
router.post('/register', registerValidation, registerPatient);
router.post('/login', loginValidation, loginPatient);
router.get('/demo', getDemoLogin);
router.get('/', getAllPatients);

// Protected routes
router.get('/profile', protect, getPatientProfile);
router.put('/profile', protect, updatePatientProfile);

export default router;
