import { Router } from 'express';
import { getChallenges } from '../controllers/challengesController.js';

const router = Router();

/**
 * GET /challenges
 * Returns all available challenges
 */
router.get('/', getChallenges);

export default router;
