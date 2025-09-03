const express = require('express');
const router = express.Router();
const {generateShortURL}=require('../controllers/url');
// const checkRole =require('../middleware/roleAuth')
 router.post('/', generateShortURL)
 module.exports=router;