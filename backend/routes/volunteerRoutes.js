const express = require('express');
const router = express.Router();
const { getVolunteers } = require('../controllers/volunteerController');
const protect = require('../middleware/authMiddleware');
router.get('/', protect,(req,res,next)=>{
    const { role } = req.user;

    if (role !== 'ngoadmin' ) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next(); 
},getVolunteers);
module.exports=router;