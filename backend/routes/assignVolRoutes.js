import express from 'express';
import { assignVolunteers } from '../controllers/assignVolController.js';
import protect from '../middleware/authmiddleware.js';

const router = express.Router();

// POST: Assign volunteers (Only NGO Admin allowed)
router.post('/assign' , assignVolunteers);



export default router;
