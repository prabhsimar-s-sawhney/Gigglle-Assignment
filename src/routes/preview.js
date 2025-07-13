import { Router } from 'express';
import { previewVideo } from '../controllers/submissionsController.js';

const router = Router();

/**
 * POST /preview
 * Generate mock preview for video URL
 */
router.post('/', previewVideo);

export default router;
