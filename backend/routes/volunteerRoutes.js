



import express from 'express';
import { getVolunteers } from '../controllers/volunteerController.js';
import protect from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/', protect, (req, res, next) => {
  const { role } = req.user;

  if (role !== 'ngoadmin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
}, getVolunteers);

export default router;
