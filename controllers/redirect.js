const UAParser = require('ua-parser-js');
const geoip = require('geoip-lite');
const URL = require('../models/url')
const CLICKS = require('../models/clicks')
 async function  redirectLogic(req, res) {
    let userAgent = req.headers['user-agent'];
    
    const parser = new UAParser();
    parser.setUA(userAgent);
    let result = parser.getResult();
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);
    if (!geo) {
        console.log(geo)
    }
    let shortid = req.params.Shortid;
    const url = await URL.findOne({ shortId: shortid });
    if (!url) return res.json({ error: 'not found' });
    else {
         if (req.session.userId && req.session.email)
         {
          await CLICKS.create({
            url:url._id,
            country:"India",
            Browser:"mobile"
          })
         }
        res.redirect(url.redirectURL);
    }

}

module.exports=redirectLogic;