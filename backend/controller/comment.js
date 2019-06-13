const Comment = require('../model/commentModel');
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
exports.getComment = (req, res, next) => {
    Comment.find({}).populate('creator', 'fullName', )
        .then(comments => {
            if (comments) {
                res.status(200).json(comments);
            } else {
                res.status(404).json({ message: "Comment not found!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching comment failed!"
            });
        });

}