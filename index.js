// Middlewares
var express = require("express");
var app = express();
var port = process.env.PORT || 1337;
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var path = require("path");
var passport = require('passport');
var favicon = require('serve-favicon');
var feedService = require("./routes/feedService.js");
var userService = require("./routes/userService.js");

// bfam-main 123456
mongoose.connect("mongodb://bfam-main:123456@ds047602.mlab.com:47602/bfam-rss");

// include the following folders
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/controllers"));

// Handles Parsing
app.use(bodyParser.urlencoded({ extended: true})); 
app.use(bodyParser.json());

// Handles the api services
app.use("/api", feedService);
app.use("/api", userService);

// Handles Passport
var passportConfig = require('./config/passport.js');
app.use(passport.initialize());

// Run Server
var serverStatus = function () {
    var host = "localhost";
    var port = server.address().port;

    console.log("Server is running on http://%s:%s", host, port);
}

var server = app.listen(port, serverStatus);