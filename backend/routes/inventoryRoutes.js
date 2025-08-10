



import express from 'express';
import { getInventory, createNewProduct } from '../controllers/inventorycontroller.js';
import protect from '../middleware/authmiddleware.js';

const router = express.Router();


router.post('/',createNewProduct);


router.get('/', getInventory);

export default router;
