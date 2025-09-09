const express= require('express');
const router = new  express.Router();
const checkRole=require('../middleware/roleAuth')
const isLogged =require('../middleware/isLogged')
const {homePage,loginPage,aboutPage,DashBoardPage,analyticsPage}= require('../controllers/pages');
router.get('/',homePage)
router.get('/login',isLogged,loginPage);
router.get('/About',aboutPage);
router.get('/DashBoard',DashBoardPage);
router.get('/analytics/:Shortid',checkRole,analyticsPage);

 module.exports=router;