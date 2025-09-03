const URL = require('../models/url')
const USER =require('../models/user');

async function homePage(req,res) {
    const totalUrls = await URL.countDocuments({});
    const totalUsers = await USER.countDocuments({});
    res.render("Index",{loginStatus:req.session.isLogged,totalUrls,totalUsers})     
}
async function loginPage(req,res) {
    res.render("signUpLogin.ejs",{loginStatus:req.session.isLogged})   
}
async function aboutPage(req,res) {
    res.render("about.ejs",{loginStatus:req.session.isLogged})   
}
async function analyticsPage(req,res)
{
const userId    = req.session.userId; 
const UserAllUrls = await URL.find({createdBy:userId});  
    res.render('analytics',{UserAllUrls,loginStatus:req.session.isLogged});
}
async function DashBoardPage(req,res)
{
const userId    = req.session.userId; 
const userEmail = req.session.email; 
const userrole  = req.session.role;
const UserAllUrls = await URL.find({createdBy:userId}); 
 
    res.render('dashBoard',{UserAllUrls,loginStatus:req.session.isLogged});
}
module.exports={homePage,loginPage,aboutPage,DashBoardPage,analyticsPage}