const Comment = require('../model/commentModel');
const Vote = require('../model/voteModel');
exports.postComment = (req, res, next) => {
    console.log(req.body.comment);
    const post = new Comment({
        comment: req.body.comment,
        creator: req.userData.userId
    });
    post
        .save()
        .then(createdPost => {
            res.status(201).json({
                message: "Comment added successfully",
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

}
exports.getComment = async(req, res, next) => {
    const comment = await Comment.find({}).populate('creator', 'fullName', );
    let commentId = [];
    let userupvote = [];
    let userdownvote = [];
    try {
        if (!comment) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }
        for (i = 0; i < comment.length; i++) {
            // console.log(comment[i]._id);
            commentId.push(comment[i]._id);
            upvote = await Vote.count({ commentId: comment[i]._id, voteType: 'upvotes' });
            downvote = await Vote.count({ commentId: comment[i]._id, voteType: 'downvotes' });
            userupvote.push(upvote);
            userdownvote.push(downvote);
        }
        console.log('commentId', commentId);
        console.log('upvote', userupvote);
        console.log('downvote', userdownvote);

        res.status(200).json({ comment: comment, upvote: userupvote, downvote: userdownvote });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}