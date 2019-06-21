const mongoose = require("mongoose");
const express = require("express");

const app = express();


mongoose.connect(
        "mongodb://localhost:27017/rentomojo-assignment", { useNewUrlParser: true }
        // "mongodb+srv://tiennesdm:BmKfRMa4IhjaDhRU@meanstack-aphhh.mongodb.net/rentomojo?retryWrites=true", { useNewUrlParser: true }
    )
    .then(result => {
        //  console.log(result);
        const server = app.listen(8080);
        const io = require('./socket').init(server);
        io.on('connection', socket => {
            console.log('Client connected');
        });
    })
    .catch(err => console.log(err));
module.exports = mongoose;