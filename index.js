// Middlewares
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = 1337;

// bfam-main 123456
var mongoose = require("mongoose");
mongoose.connect("mongodb://bfam-main:123456@ds047602.mlab.com:47602/bfam-rss");

// include the public folder
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/controllers"));


var serverStatus = function () {
    var host = "localhost";
    var port = server.address().port;

    console.log("Server is running on http://%s:%s", host, port);
}

var server = app.listen(port, serverStatus);

// Handles Parsing
// Since express can't parse forms on its own, we have required this middleware(plugin) to do it.
// urlencoded method parses data from the form and sets it to a body attribute for the request.
app.use(bodyParser.urlencoded({
    extended: true
}));

// Used to parse json objects.
app.use(bodyParser.json());

// Handles the feed service
var feedService = require("./routes/feedService.js");
app.use("/api", feedService);