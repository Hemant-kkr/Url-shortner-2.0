const express =require('express');
const redirectLogic =require('../controllers/redirect')
const router= express.Router();
router.get('/:Shortid',redirectLogic);

module.exports=router;