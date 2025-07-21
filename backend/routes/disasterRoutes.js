import express from 'express';
import { getDisasters, createNewDisaster } from '../controllers/disasterController.js';
import protect from '../middleware/authmiddleware.js';

const router = express.Router();

// POST: Create a new disaster (Only NGO Admin)
router.post('/', protect, (req, res, next) => {
  const { role } = req.user;

  if (role !== 'ngoadmin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  next();
}, createNewDisaster);

// GET: Get all disasters based on user role
router.get('/', protect, getDisasters);

export default router;
