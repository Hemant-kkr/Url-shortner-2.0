const URL = require('../models/url')


async function homePage(req,res) {
    res.redirect("/html/Index.html")   
}
async function loginPage(req,res) {
    res.redirect("/html/signUpLogin.html")   
}
async function aboutPage(req,res) {
    res.redirect("/html/Index.html")   
}
async function DashBoardPage(req,res)
{
const userId    = req.session.userId; 
const userEmail = req.session.email; 
const userrole  = req.session.role;
const UserAllUrls = await URL.find({createdBy:userId});  
    res.render('dashBoard',{UserAllUrls});
}
module.exports={homePage,loginPage,aboutPage,DashBoardPage}