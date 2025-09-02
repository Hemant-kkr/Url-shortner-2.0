const express= require('express');
const router = new  express.Router();
const checkRole=require('../middleware/roleAuth')
const {homePage,loginPage,aboutPage,DashBoardPage}= require('../controllers/pages');
router.get('/',homePage)
// router.get('/home',homePage);
router.get('/login',loginPage);
router.get('/About',aboutPage);
router.get('/DashBoard',checkRole,DashBoardPage)
 module.exports=router;