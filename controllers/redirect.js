const UAParser = require('ua-parser-js');
const URL = require('../models/url')
const CLICKS = require('../models/clicks')
const fetch = require("node-fetch");
const geoip = require("geoip-lite");
const axios = require('axios');

 async function  redirectLogic(req, res) {
    let userAgent = req.headers['user-agent'];
    const parser = new UAParser();
    parser.setUA(userAgent);
    let result = parser.getResult();
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      if (ip.includes(",")) ip = ip.split(",")[0].trim();

    const location = geoip.lookup(ip);
    let shortid = req.params.Shortid;
    const url = await URL.findOne({ shortId: shortid });
    if (!url) return res.json({ error: 'not found' });
    else {
         if (req.session.userId && req.session.email)
         {
        await CLICKS.create({
            url:url._id,
            country:location["country"]||"other",
            city:location["city"]||"other",
            Browser:result.browser['name']|| "other",
            device: result.device['type']||'other'
          })
         }
        res.redirect(url.redirectURL);
    }

}

module.exports=redirectLogic;