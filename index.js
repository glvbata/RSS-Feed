// Middlewares
var express = require("express");
var app = express();
var port = process.env.PORT || 1337;
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");

// bfam-main 123456
mongoose.connect("mongodb://bfam-main:123456@ds047602.mlab.com:47602/bfam-rss");

// include the following folders
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/controllers"));

// Handles Parsing
// Since express can't parse forms on its own, we have required this middleware(plugin) to do it.
app.use(bodyParser.urlencoded({
    extended: true
})); // Used to parse data from the form and sets it to a body attribute for the request.
app.use(bodyParser.json()); // Used to parse json objects.

// Handles the feed service
var feedService = require("./routes/feedService.js");
var userService = require("./routes/userService.js");
app.use("/api", feedService);
app.use("/api", userService);

// Run Server
var serverStatus = function () {
    var host = "localhost";
    var port = server.address().port;

    console.log("Server is running on http://%s:%s", host, port);
}

var server = app.listen(port, serverStatus);