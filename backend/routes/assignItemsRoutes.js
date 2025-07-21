import express from 'express';
import { assignItems } from '../controllers/assignItemController.js';
import protect from '../middleware/authmiddleware.js';

const router = express.Router();

// POST: Assign items (Only NGO Admin allowed)
router.post('/', protect, (req, res, next) => {
  const { role } = req.user;

  if (role !== 'ngoadmin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  next();
}, assignItems);

export default router;
