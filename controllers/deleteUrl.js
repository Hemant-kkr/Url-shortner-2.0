const mongoose = require('mongoose')
const URL = require('../models/url')
const CLICKS = require('../models/clicks')
const USER = require('../models/user');

async function deleteUrl(req, res) {
   const userId = req.session.userId;
   const userEmail = req.session.email;
   const userrole = req.session.role;
   const ShortId = req.params.Shortid;
   const urlToDelete = await URL.find({ shortId: ShortId, createdBy: userId });
   if (urlToDelete) {
      if (!userId && !userEmail && !userrole) {
         const id = urlToDelete._id;
         await CLICKS.deleteMany({ url: id })
         const DeletedUrl = await URL.delete({ shortId: ShortId })
         if (!DeletedUrl) {
            return res.status(404).json({ message: 'Url not found' });
         }
          return res.json({ deleted: ShortId, Status: "Deleted sucessfully" })
      }
   }


   return res.json({ deleted: ShortId, hello: "hello" })
}

module.exports = deleteUrl;
