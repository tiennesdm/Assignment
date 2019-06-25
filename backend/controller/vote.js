const Comments = require("../model/comment");
const User = require("../model/auth");
let resultlength;

exports.postUpvote = (req, res, next) => {
    let commentId = req.body.commentId;
    let resultId;
    let creatorId;


    let votingUserId = req.userData.userId;
    //   db.inventory.find( { qty: { $exists: true, $nin: [ 5, 15 ] } } )
    Comments.find({ _id: req.body.commentId, creator: req.userData.userId })
        .then((result => {
            // console.log(result.length);
            resultlength = result.length;
            //  this.resultId = result[0]._id;
            //  this.creatorId = result[0].creator;
            // res.status(201).json({ message: "We cannot process your vote " });
            //  console.log(result[0]._id);
            //  console.log(result[0].creator);
        })).catch(err => console.log(err));
    //   console.log('resultId', resultlength);
    if (resultlength == 1) {
        res.status(500).json({ message: "You are creator! We cannot process " });

    } else {
        postVote(commentId, votingUserId, 'UPVOTE').then(data => {
            res.status(201).json(data);
        }).catch(ex => {
            res.status(500).json({
                message: "Vote Creation failed"
            });
        })

    }

};

exports.postDownvote = (req, res, next) => {
    let commentId = req.body.commentId;

    let votingUserId = req.userData.userId;

    Comments.find({ _id: req.body.commentId, creator: req.userData.userId })
        .then((result => {
            resultlength = result.length;
            // res.status(201).json({ message: "We cannot process your vote " });


            //   console.log(result);
        })).catch(err => console.log(err));
    if (resultlength == 1) {
        res.status(500).json({ message: "You are creator! We cannot process " });

    } else {
        postVote(commentId, votingUserId, 'DOWNVOTE').then(data => {
            res.status(201).json(data);
        }).catch(ex => {
            res.status(500).json({
                message: "Sorry We cannot process the vote"
            });
        })

    }




};

function postVote(commentId, votingUserId, voteType) {
    return new Promise((resolve, reject) => {

        let updateQuery = {}
        let fullName;
        let updatedresult;
        User.find({ _id: votingUserId }).then((result) => {
            fullName = result[0].fullName;
        }).catch();

        if (voteType === 'UPVOTE')
            updateQuery = { $addToSet: { upvotes: votingUserId }, $pull: { downvotes: votingUserId } }
        else if (voteType === 'DOWNVOTE')
            updateQuery = { $addToSet: { downvotes: votingUserId }, $pull: { upvotes: votingUserId } }

        Comments.findByIdAndUpdate(
                commentId, updateQuery, { new: true }
            )
            .then(comment => {


                if (!comment) reject();
                let commentAll = Comments.find({}).populate("creator", "fullName").then(
                    (result) => {
                        //  console.log(result);
                        // updatedresult = result;
                        updatedresult = result.map(v => {
                            return {
                                commentId: v._id,
                                comment: v.comment,
                                creator: v.creator.fullName,
                                upvotesCount: v.upvotes.length,
                                downvotesCount: v.downvotes.length
                            }
                        });
                        resolve({
                                message: "Vote added successfully",
                                post: updatedresult
                            })
                            //            console.log('update', updatedresult);
                    }
                ).catch();
                //   console.log('updated result', updatedresult);
                /*  resolve({
                        message: "Vote added successfully",
                        post: updatedresult
                    }
                        {
                        message: "Vote added successfully",
                        post: {
                            //   ...comment,
                            //   id: comment._id
                            id: comment._id,
                            comment: comment.comment,
                            creator: fullName,
                            upvotesCount: comment.upvotes.length,
                            downvotesCount: comment.downvotes.length

                        }
                    }
                );*/
            })
            .catch(ex => {
                reject();
            });
    });
}