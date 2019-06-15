const mongoose = require("mongoose");
const commentSchema = require('./schema');



module.exports = mongoose.model("Comment", commentSchema);