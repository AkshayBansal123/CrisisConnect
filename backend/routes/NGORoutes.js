const express = require('express');
const router = express.Router();
const { getNGOs } = require('../controllers/NGOContoller')
const protect = require('../middleware/authMiddleware');
router.get('/', protect,getNGOs);
module.exports=router;