const express = require('express');
const router = express.Router();
const { assignItems} = require('../controllers/assignItemControllers');
const protect= require('../middleware/authMiddleware');
router.post('/', protect,(req,res,next)=>{
    const { role } = req.user;    
},assignItems);
module.exports=router;