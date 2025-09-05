const URL = require('../models/url')
const CLICKS = require('../models/clicks')
const USER = require('../models/user');

async function homePage(req, res) {
    const totalUrls = await URL.countDocuments({});
    const totalUsers = await USER.countDocuments({});
    res.render("Index", { loginStatus: req.session.isLogged, totalUrls, totalUsers })
}
async function loginPage(req, res) {
    res.render("signUpLogin.ejs", { loginStatus: req.session.isLogged })
}
async function aboutPage(req, res) {
    res.render("about.ejs", { loginStatus: req.session.isLogged })
}


async function DashBoardPage(req, res) {
    const userId = req.session.userId;
    const UserAllUrls = await URL.find({ createdBy: userId });

    res.render('dashbord', { UserAllUrls, loginStatus: req.session.isLogged });
}


async function analyticsPage(req, res) {
    const shortid = req.params.Shortid;
    const userId = req.session.userId;
    const userEmail = req.session.email;
    const userrole = req.session.role;

    const Url = await URL.find({ shortId: shortid });
    const UserAllUrls = await URL.find({ createdBy: userId });
    const clicks = await CLICKS.find({ url: Url._id });

    const countryStats = await CLICKS.aggregate([
        { $group: { _id: "$country", count: { $sum: 1 } } },
        { $project: { _id: 0, country: "$_id", count: 1 } },
        { $sort: { count: -1 } }
    ]);

    const cityStats = await CLICKS.aggregate([
        { $group: { _id: "$city", count: { $sum: 1 } } },
        { $project: { _id: 0, city: "$_id", count: 1 } },
        { $sort: { count: -1 } }
    ]);

     const browserStats = await CLICKS.aggregate([
        { $group: { _id: "$browser", count: { $sum: 1 } } },
        { $project: { _id: 0, browser: "$_id", count: 1 } },
        { $sort: { count: -1 } }
    ]);

    const deviceStats = await CLICKS.aggregate([
        { $group: { _id: "$device", count: { $sum: 1 } } },
        { $project: { _id: 0, device: "$_id", count: 1 } },
        { $sort: { count: -1 } }
    ]);

    const urlCountryStats = await Analytics.aggregate([
        { $match: { url: mongoose.Types.ObjectId(urlId) } }, // filter by URL
        { $group: { _id: "$country", count: { $sum: 1 } } },
        { $project: { _id: 0, country: "$_id", count: 1 } },
        { $sort: { count: -1 } }
    ]);
console.log(countryStats,cityStats,browserStats,deviceStats,urlCountryStats);

    res.render('analytics', { UserAllUrls, clicks,countryStats,cityStats,browserStats,deviceStats,urlCountryStats, loginStatus: req.session.isLogged });
}
module.exports = { homePage, loginPage, aboutPage, DashBoardPage, analyticsPage }