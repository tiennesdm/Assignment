const mongoose = require("mongoose");

const voteSchema = mongoose.Schema({
    voteType: {
        type: String,
        enum: ['upvotes', 'downvotes'],
        required: true
    },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});


module.exports = mongoose.model("Vote", voteSchema);