const express = require("express");
const voteController = require('../controller/vote');
const checkAuth = require("../middleware/check-auth");
const router = express.Router();


router.post('', checkAuth, voteController.postVote);
module.exports = router;