const express = require('express');
const router = express.Router();
const { getInventory, createNewProduct } = require('../controllers/inventoryController').default;
const protect = require('../middleware/authMiddleware');
router.post('/', protect,(req,res,next)=>{
    const { role } = req.user;

    if (role !== 'ngoadmin' ) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next(); 
},createNewProduct);
router.get('/', protect,getInventory);
module.exports=router;