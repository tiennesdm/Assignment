const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//const User = require("../model/authModel");
const User = require('../model/auth');
exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            username: req.body.username,
            password: hash,
            fullName: req.body.fullName
        });
        user
            .save()
            .then(result => {
                res.status(201).json({
                    message: "User created!",
                    result: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: "Invalid authentication credentials!"
                });
            });
    });
}

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            const token = jwt.sign({ username: fetchedUser.username, userId: fetchedUser._id },
                'shubham_mehta', { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Invalid authentication credentials!"
            });
        });
}