import express from 'express';
import { getNGOs } from '../controllers/NGOContoller.js';
import protect from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/', getNGOs);

export default router;
