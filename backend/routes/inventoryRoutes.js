



import express from 'express';
import { getInventory, createNewProduct } from '../controllers/inventoryController.js';
import protect from '../middleware/authmiddleware.js';

const router = express.Router();

// POST: Add new inventory item (Only NGO Admin)
router.post('/', protect, (req, res, next) => {
  const { role } = req.user;

  if (role !== 'ngoadmin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
}, createNewProduct);

// GET: Get inventory items
router.get('/', protect, getInventory);

export default router;
