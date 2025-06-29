const express = require('express');
const router = express.Router();
const { getInventory, createNewProduct } = require('../controllers/inventoryController');
const protect = require('../authentication/middleware/authMiddleware');
router.post('/', protect,(req,res,next)=>{
    const { role } = req.user;

    if (role !== 'ngoadmin' ) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next(); 
},createNewProduct);
router.get('/', protect,getInventory);
module.exports=router;