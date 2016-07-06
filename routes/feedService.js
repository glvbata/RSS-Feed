var express = require("express");
var router = express.Router();
var Feed = require("../models/feed.js");

router.route("/feed").get(function (request, response) {
    Feed.find(function (error, feeds) {
        response.json(feeds);
    })
});

module.exports = router;