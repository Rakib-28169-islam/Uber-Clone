const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});
blacklistSchema.index({expiresAt:1},{expireAfterSeconds:0});
const blacklistModel = mongoose.model("blacklist", blacklistSchema);
module.exports = blacklistModel;
