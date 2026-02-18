// routes/universityRoutes.js
import express from 'express';
import {
  submitUniversityForm,
  getAllSubmissions,
  getSubmissionById,
  updateSubmissionStatus
} from '../controllers/universityController.js';

const router = express.Router();

// Public routes
router.post('/submit', submitUniversityForm);

// Admin routes (protected - add authentication middleware as needed)
router.get('/submissions', getAllSubmissions);
router.get('/submissions/:id', getSubmissionById);
router.put('/submissions/:id/status', updateSubmissionStatus);

export default router;