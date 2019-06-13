const Vote = require('../model/voteModel');
exports.postVote = (req, res, next) => {
    console.log(req.body.comment);

    const post = new Vote({
        voteType: req.body.vote,
        commentId: req.body.commentId,
        creator: req.userData.userId
    });
    post
        .save()
        .then(createdPost => {
            res.status(201).json({
                message: "Vote added successfully",
                post: {
                    ...createdPost,
                    id: createdPost._id
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Creating a comment failed!"
            });
        });
    //  next()
}