const express = require('express');
const router = express.Router();
const checkRole = require('../middleware/roleAuth')
const { signUp,login,logout}= require('../controllers/auth');

router.post('/register',signUp);
router.post('/login',login);
router.post('/logout',checkRole,logout)



module.exports =router;