



import express from 'express';
import { getVolunteers } from '../controllers/volunteerController.js';
import protect from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/',
  getVolunteers);

export default router;
