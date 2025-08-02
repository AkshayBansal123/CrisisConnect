



import express from 'express';
import { getInventory, createNewProduct } from '../controllers/inventorycontroller.js';
import protect from '../middleware/authmiddleware.js';

const router = express.Router();


router.post('/', protect, (req, res, next) => {
  const { role } = req.user;

  if (role !== 'ngo') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
}, createNewProduct);


router.get('/', getInventory);

export default router;
