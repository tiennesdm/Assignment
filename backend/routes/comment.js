const express = require("express");
const commentController = require('../controller/comment');
const checkAuth = require("../middleware/check-auth");
const router = express.Router();


router.post("", checkAuth, commentController.postComment);
router.get('', commentController.getComment);
module.exports = router;