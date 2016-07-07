var express = require("express");
var router = express.Router();
var Feed = require("../models/feed.js");
var feedRead = require("feed-read");

router.route("/feeds").get(function (request, response) {
    Feed.find(function (error, feeds) {
        if (error) {
            response.status(500).send(error);
        } else {
            response.status(200).json(feeds);
        }
    });
});

router.route("/feeds/articles").get(function (request, response) {
    Feed.find(function (error, feeds) {
        if (error) {
            response.status(500).send(error);
        } else {
            var sourceFeedUrlList = new Array();

            feeds.forEach(function (object, i, theArray) {
                sourceFeedUrlList.push(object.sourceFeedUrl);

                if (i === theArray.length - 1) {
                    feedRead(sourceFeedUrlList, function (err, articles) {
                        articles.forEach(function (currentArticle) {
                            var re = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
                            var results = re.exec(currentArticle.content);
                            var img = "";
                            if (results) {
                                img = results[0];
                            }

                            currentArticle.testImage = img
                            currentArticle.content = truncate(currentArticle.content, 500, {
                                keepImageTag: false
                            });
                        });

                        response.status(200).json(articles);
                    })
                }
            });
        }
    });
});

router.route("/feeds/:id").get(function (request, response) {
    Feed.findById(request.params.id, function (error, feed) {
        if (error) {
            response.status(500).send(error);
        } else {
            response.status(200).json(feed);
        }
    });
});

router.route("/feeds").post(function (request, response) {
    var feed = new Feed();
    feed.sourceName = request.body.sourceName;
    feed.sourceFeedUrl = request.body.sourceFeedUrl;

    feed.save(function (error) {
        if (error) {
            response.status(500).send(error);
        } else {
            response.status(200).send("Succesfully Added a New Feed");
        }
    })

});

router.route("/feeds/:id").put(function (request, response) {
    Feed.findById(request.params.id, function (error, feed) {
        if (error) {
            response.send(error);
        } else {
            feed.sourceName = request.body.sourceName;
            feed.sourceFeedUrl = request.body.sourceFeedUrl;
            feed.save(function (error) {
                if (error) {
                    response.status(500).send(error);
                } else {
                    response.status(200).send("Successfully Updated Feed Information.");
                }
            })

        }
    });
});

router.route("/feeds/:id").delete(function (request, response) {
    Feed.remove({
        _id: request.params.id
    }, function (error, feed) {
        if (error) {
            response.status(500).send(error);
        } else {
            response.send("Succesfully deleted the feed");
        }
    });
});

module.exports = router;