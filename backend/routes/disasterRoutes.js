const express = require('express');
const router = express.Router();
const { getDisasters, createNewDisaster } = require('../controllers/disasterController');
const protect = require('../middleware/authMiddleware');
router.post('/', protect,(req,res,next)=>{
    const { role } = req.user;    
},createNewDisaster);
router.get('/', protect,getDisasters);
module.exports=router;