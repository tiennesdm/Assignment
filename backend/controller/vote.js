const Comments = require("../model/comment");
exports.postUpvote = (req, res, next) => {
    let commentId = req.body.commentId;

    let votingUserId = req.userData.userId;

    postVote(commentId, votingUserId, 'UPVOTE').then(data => {
        res.status(201).json(data);
    }).catch(ex => {
        res.status(500).json({
            message: ex
        });
    })
};

exports.postDownvote = (req, res, next) => {
    let commentId = req.body.commentId;

    let votingUserId = req.userData.userId;



    postVote(commentId, votingUserId, 'DOWNVOTE').then(data => {
        res.status(201).json(data);
    }).catch(ex => {
        res.status(500).json({
            message: ex
        });
    })
};

function postVote(commentId, votingUserId, voteType) {
    return new Promise((resolve, reject) => {

        let updateQuery = {}

        if (voteType === 'UPVOTE')
            updateQuery = { $addToSet: { upvotes: votingUserId }, $pull: { downvotes: votingUserId } }
        else if (voteType === 'DOWNVOTE')
            updateQuery = { $addToSet: { downvotes: votingUserId }, $pull: { upvotes: votingUserId } }

        Comments.findByIdAndUpdate(
                commentId, updateQuery, { new: true }
            )
            .then(comment => {

                if (!comment) reject();
                resolve({
                    message: "Vote added successfully",
                    post: {
                        ...comment,
                        id: comment._id
                    }
                });
            })
            .catch(ex => {
                reject();
            });
    });
}