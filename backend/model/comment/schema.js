const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    comment: { type: String, required: true, },
    date: { type: Date, default: Date.now },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
module.exports = commentSchema;