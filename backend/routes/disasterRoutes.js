import express from 'express';
import { getDisasters, createNewDisaster } from '../controllers/disasterController.js';
import protect from '../middleware/authmiddleware.js';

const router = express.Router();


router.post('/',  createNewDisaster);

router.get('/', getDisasters);

export default router;
