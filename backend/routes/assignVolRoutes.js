import express from 'express';
import { assignVolunteers } from '../controllers/assignVolController.js';
import protect from '../middleware/authmiddleware.js';

const router = express.Router();

// POST: Assign volunteers (Only NGO Admin allowed)
router.post('/', protect, (req, res, next) => {
  const { role } = req.user;

  if (role !== 'ngoadmin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  next();
}, assignVolunteers);



export default router;
