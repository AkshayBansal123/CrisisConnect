const express = require('express');
const router = express.Router();
const { createReport, getReports } = require('../controllers/reportController');
const protect = require('../authentication/middleware/authMiddleware');
router.post('/', protect,(req,res,next)=>{
    const { role } = req.user;

    if (role !== 'reporter' ) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next(); 
},createReport);
router.get('/', protect,getReports);
module.exports=router;