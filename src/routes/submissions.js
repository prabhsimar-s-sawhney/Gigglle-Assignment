import { Router } from 'express';
import { createSubmission, getSubmissions } from '../controllers/submissionsController.js';
import { delaySimulator } from '../middleware/delaySimulator.js';

const router = Router();

/**
 * POST /submissions
 * Create a new submission with delay simulation
 */
router.post('/', delaySimulator, createSubmission);

/**
 * GET /submissions
 * Get all submissions with randomized status
 */
router.get('/', getSubmissions);

export default router;
