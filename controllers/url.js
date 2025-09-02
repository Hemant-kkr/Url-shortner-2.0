const shortid = require('shortid');
const URL = require('../models/url')

async function generateShortURL(req, res) {
    const body = req.body;
    let urlCreaterId = null;
    if (req.session.userId && req.session.email) {
        urlCreaterId = req.session.userId;
        const existedUrl = await URL.findOne({redirectURL:body.url});
        if(existedUrl){
            return res.json({id:existedUrl.shortId})
        }
    }
    if (!body) return res.status(400).json({ error: 'Url is required' })
    const shortId = shortid();
    await URL.create(
        {
            shortId: shortId,
            redirectURL: body.url,
            createdBy: urlCreaterId
        }

    );
    return res.json({ id: shortId })

}
module.exports = {
    generateShortURL
}