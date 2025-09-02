const express = require('express');
const router = express.Router();
const {generateShortURL}=require('../controllers/url');
const checkRole =require('../middleware/roleAuth')
 router.post('/',checkRole, generateShortURL)
 module.exports=router;