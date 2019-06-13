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
    /*exports.getComment = (req, res, next) => {
        Vote.aggregate([
         //   { $match: { commentId: '$commentId' } },
         
            { $group: { _id: null, totalPersons: { $sum: 1 } } },
            { $sort: { totalPersons: -1 } }
        ]).then(
            (comments) => {
                if (comments) {
                    res.status(200).json(comments);
                } else {
                    res.status(404).json({ message: "Comment not found!" });
                }

            }
        ).catch(error => {
            res.status(500).json({
                message: "Fetching comment failed!"
            });

        });
        /* Comment.find({}).populate('creator', 'password -password', )
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

    }*/
exports.getComment = (req, res, next) => {
    Vote.count({
            voteType: 'upvotes'
        })
        .then(
            (comments) => {
                if (comments) {
                    res.status(200).json(comments);
                } else {
                    res.status(404).json({ message: "Comment not found!" });
                }

            }
        ).catch(error => {
            res.status(500).json({
                message: "Fetching comment failed!"
            });

        });
    /* Comment.find({}).populate('creator', 'password -password', )
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
         }); */

}