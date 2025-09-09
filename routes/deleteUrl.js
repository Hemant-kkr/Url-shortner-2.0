const express = require('express');
const router = new express.Router();

const checkRole=require('../middleware/roleAuth');
const deleteUrl =require('../controllers/deleteUrl');

router.post('/:Shortid',checkRole,deleteUrl);

module.exports=router