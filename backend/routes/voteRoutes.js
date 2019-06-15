const express = require("express");
const voteController = require('../controller/vote');
const checkAuth = require("../middleware/check-auth");
const router = express.Router();


router.post('/upvote', checkAuth, voteController.postUpvote);
router.post('/downvote', checkAuth, voteController.postDownvote);


module.exports = router;