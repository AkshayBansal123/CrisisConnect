const express = require('express');
const router = express.Router();
const { assignVolunteers } = require('../controllers/assignVolControllers');
const protect = require('../authentication/middleware/authMiddleware');
router.post('/', protect,(req,res,next)=>{
    const { role } = req.user;    
},assignVolunteers);
router.get('/', protect,getDisasters);
module.exports=router;