import express from 'express';
import { assignItems } from '../controllers/assignItemController.js';
import protect from '../middleware/authmiddleware.js';

const router = express.Router();

// POST: Assign items (Only NGO Admin allowed)
router.post('/',assignItems);

export default router;
