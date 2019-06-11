const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const db = require('./util/dbconnection');
const userRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/comment');



const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
app.use("/api/user", userRoutes);
app.use('/api/comment', commentRoutes);


module.exports = app;