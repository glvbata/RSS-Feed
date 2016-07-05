// Middlewares
var express = require("express");
var bodyParser = require("body-parser");
var feedRead = require("feed-read");
var app = express();
var port = 1337;

var Feed = require("./models/feed.js");

// bfam-main 123456
var mongoClient = require("mongodb");
var ObjectId = mongoClient.ObjectId;
var db;
const COLLECTION_FEEDS = "feeds";

// include the public folder
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/controllers"));

mongoClient.connect("mongodb://bfam-main:123456@ds047602.mlab.com:47602/bfam-rss", function (error, database) {
    if (error) {
        console.log(error);
    }

    db = database;

    var serverStatus = function () {
        var host = "localhost";
        var port = server.address().port;

        console.log("Server is running on http://%s:%s", host, port);
    }

    var server = app.listen(port, serverStatus);
});

// Since express can't parse forms on its own, we have required this middleware(plugin) to do it.
// urlencoded method parses data from the form and sets it to a body attribute for the request.
app.use(bodyParser.urlencoded({
    extended: true
}));

// Used to parse json objects.
app.use(bodyParser.json());



// Get a feed by ID
app.get("api/feedsService/get/:id", function (request, response) {
    db.collection(COLLECTION_FEEDS).findOne({
        _id: new ObjectID(request.params.id)
    }, function (error, result) {
        if (error) {
            // error
        } else {
            response.status(200).json(result);
        }
    });
});

// Get all feed.
app.get("/api/feedsService", function (request, response) {
    var cursor = db.collection(COLLECTION_FEEDS).find();
    var feeds = cursor.toArray(function (error, result) {
        response.send(result);
    })
});

// Get all articles
app.get("/api/articlesService", function (request, response) {
    var cursor = db.collection(COLLECTION_FEEDS).find({}, {
        sourceFeedUrl: 1
    });

    cursor.toArray(function (error, result) {
        var sourceFeedUrlList = new Array();

        result.forEach(function (object, i, theArray) {
            sourceFeedUrlList.push(object.sourceFeedUrl);

            if (i === theArray.length - 1) {
                feedRead(sourceFeedUrlList, function (err, articles) {
                    response.send(articles);
                })
            }
        });
    })
});

// Update a feed by ID
app.put("/api/feedsService", function (request, response) {
    var feed = request.body;

    db.collection(COLLECTION_FEEDS).update({
        "_id": new ObjectId(feed._id)
    }, {
        $set: {
            "sourceName": feed.sourceName,
            "sourceFeedUrl": feed.sourceFeedUrl
        }
    }, function (error, result) {
        if (error) {
            // error    
        } else {
            response.status(200).send(result);
        }
    });
})

// Delete a feed by ID
app.delete("/api/feedsService/:id", function (request, response) {
    db.collection(COLLECTION_FEEDS).deleteOne({
        _id: new ObjectId(request.params.id)
    }, function (error, result) {
        if (error) {
            // error    
        } else {
            response.status(200).end();
        }
    });
})

// Insert a feed
app.post("/api/feedsService", function (request, response) {
    var newFeed = request.body;

    if (!(newFeed.sourceName || newFeed.sourceFeedUrl)) {
        //error
    } else {
        db.collection(COLLECTION_FEEDS).insert(newFeed);
        response.status(200).end();
    }
})