import express from 'express';
import { createReport, getReports } from '../controllers/reportController.js';


const router = express.Router();

// 🔐 Protect both routes using verifyToken middleware
router.post('/', createReport);
router.get('/', getReports);

export default router;
