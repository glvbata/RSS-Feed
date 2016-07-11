var express = require("express");
var router = express.Router();
var feedRead = require("feed-read");
var mongoose = require("mongoose");
var User = require("../models/user.js");
var Feed = require("../models/feed.js");

// If user is logged in
router.route("/articles/:username").get(function (request, response) {
    var getDefaultFeeds = function (response) {
        var sourceFeedUrlList = new Array();

        sourceFeedUrlList.push("http://kotaku.com/vip.xml");
        sourceFeedUrlList.push("http://feeds.feedburner.com/Destructoid");

        feedRead(sourceFeedUrlList, function (err, articles) {
            response.status(200).json(articles);
        })
    }

    if (request.params.username === "guest") {
        getDefaultFeeds(response);
    } else {
        User.findOne({
            username: request.params.username
        }, function (error, user) {
            // Default feed for user who has nothing
            if (user.feeds.length > 0) {
                var sourceFeedUrlList = new Array();

                user.feeds.forEach(function (object, i, theArray) {
                    sourceFeedUrlList.push(object.sourceFeedUrl);
                    if (i === theArray.length - 1) {
                        feedRead(sourceFeedUrlList, function (err, articles) {
                            response.status(200).json(articles);
                        })
                    }
                });
            } else {
                getDefaultFeeds(response);
            }
        });
    }
});

router.route("/feeds/:username").get(function (request, response) {
    User.findOne({
        username: request.params.username
    }, function (error, user) {
        if (user) {
            if (error) {
                response.status(500).send(error);
            } else {
                if (user.feeds.length > 0) {
                    response.status(200).json(user.feeds);
                } else {
                    // No feeds found, send empty array.
                    response.status(200).json([]);
                }
            }
        } else {
            response.status(500).send("Found an error with user.");
        }
    });
});

router.route("/feeds/:username/:sourceName").get(function (request, response) {
    User.findOne({
        username: request.params.username
    }, function (error, user) {
        if (error) {
            response.status(500).send(error);
        } else {
            var feeds = user.feeds;

            if (feeds.length > 0) {
                for (var i = 0; i < feeds.length; i++) {
                    if (feeds[i].sourceName.toLowerCase() === request.params.sourceName) {
                        response.status(200).json(feeds[i]);
                        break; // Prevent duplicate sourcename in the future.
                    }
                }
            } else {
                response.status(503).json("No feeds found.");
            }
        }
    });
});

router.route("/feeds/:username").post(function (request, response) {
    User.findOne({
        username: request.params.username
    }, function (error, user) {
        if (error) {

        } else {
            var feed = new Feed();
            feed.sourceName = request.body.sourceName;
            feed.sourceFeedUrl = request.body.sourceFeedUrl;

            if (user.feeds == null) {
                user.feeds = [feed];
            }

            user.feeds.push(feed);
            user.save(function (error) {
                if (error) {
                    response.status(500).send(error);
                } else {
                    response.status(200).send("Succesfully Added a New Feed");
                }
            })
        }
    });
});

router.route("/feeds/:username/:feedId").put(function (request, response) {
    User.findOne({
        username: request.params.username
    }, function (error, user) {
        if (error) {
            response.send(error);
        } else {
            var feeds = user.feeds;
            if (feeds.length > 0) {
                for (var i = 0; i < feeds.length; i++) {
                    var currentId = mongoose.Types.ObjectId(feeds[i]._id).id;
                    var parameterId = mongoose.Types.ObjectId(request.params.feedId).id;

                    if (currentId === parameterId) {
                        user.feeds[i].sourceName = request.body.sourceName;
                        user.feeds[i].sourceFeedUrl = request.body.sourceFeedUrl;
                        break;
                    }
                }

                user.save(function (error) {
                    if (error) {
                        response.status(500).send(error);
                    } else {
                        response.status(200).json(feeds);
                    }
                });
            } else {

            }
        }
    });
});

router.route("/feeds/:username/:feedId").delete(function (request, response) {
    User.findOne({
        username: request.params.username
    }, function (error, user) {
        if (error) {
            response.send(error);
        } else {
            var feeds = user.feeds;
            if (feeds.length > 0) {
                for (var i = 0; i < feeds.length; i++) {
                    var currentId = mongoose.Types.ObjectId(feeds[i]._id).id;
                    var parameterId = mongoose.Types.ObjectId(request.params.feedId).id;

                    if (currentId === parameterId) {
                        feeds.splice(i, 1);
                        break;
                    }
                }

                user.save(function (error) {
                    if (error) {
                        response.status(500).send(error);
                    } else {
                        response.status(200).json(feeds);
                    }
                });
            } else {

            }
        }
    });
});

module.exports = router;