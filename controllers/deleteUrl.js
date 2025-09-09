const mongoose = require('mongoose');
const URL = require('../models/url');
const CLICKS = require('../models/clicks');
const USER = require('../models/user');

async function deleteUrl(req, res) {
  try {
    const userId = req.session.userId;
    const userEmail = req.session.email;
    const userrole = req.session.role;
    const ShortId = req.params.Shortid;

    // Ensure user is logged in
    if (!userId || !userEmail || !userrole) {
      return res.status(401).json({ message: "Unauthorized: Please login first" });
    }

    // Find the URL belonging to this user
    const urlToDelete = await URL.findOne({ shortId: ShortId, createdBy: userId });

    if (!urlToDelete) {
      return res.status(404).json({ message: "URL not found or not owned by user" });
    }

    // Delete all associated clicks
    await CLICKS.deleteMany({ url: urlToDelete._id });

    // Delete the URL
    const deleted = await URL.deleteOne({ shortId: ShortId, createdBy: userId });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "Failed to delete URL" });
    }

    return res.json({ deleted: ShortId, status: "Deleted successfully" });

  } catch (error) {
    console.error("Error deleting URL:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = deleteUrl;
