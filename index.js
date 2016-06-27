var express = require("express");
var bodyParser = require("body-parser");
var feedRead = require("feed-read");
''
var app = express();
var port = 1337;

// bfam-main 123456
var mongoClient = require("mongodb");
var db;
const COLLECTION_FEEDS = "feeds";

app.use(express.static(__dirname + '/public'));

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
})

// Since express can't parse forms on its own, we have required this middleware(plugin) to do it.
// urlencoded method parses data from the form and sets it to a body attribute for the request.
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/public/index.html");
})

app.get("/api/test", function (request, response) {
    var feeds = [
        {
            sourceFeedUrl: "http://kotaku.com/vip.xml"
        },
        {
            sourceFeedUrl: "http://feeds.feedburner.com/Destructoid"
        }
    ];

    db.collection(COLLECTION_FEEDS).insertMany(feeds);

    response.send("test success");
})

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
app.get("/api/feedsService/getAllFeeds", function (request, response) {
    var cursor = db.collection(COLLECTION_FEEDS).find();
    var feeds = cursor.toArray(function (error, result) {
        response.send(result);
    })
});

// Get all articles
app.get("/api/feedsService/getAllArticles", function (request, response) {
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
app.put("/api/feedsService/update/:id", function (request, response) {
    var updatedFeed = request.body;
    delete updatedFeed._id;

    db.collection(COLLECTION_FEEDS).updateOne({
        _id: new ObjectID(request.params.id)
    }, updatedFeed, function (error, result) {
        if (error) {
            // error
        } else {
            response.status(200).end();
        }
    })
})

// Delete a feed by ID
app.delete("/api/feedsService/delete/:id", function (request, response) {
    db.collection(COLLECTION_FEEDS).deleteOne({
        _id: new ObjectID(request.params.id)
    }, function (error, result) {
        if (error) {
            // error    
        } else {
            response.status(200).end();
        }
    });
})

// Insert a feed
app.post("/api/feedsService/insert", function (request, response) {
    var newFeed = request.body;

    if (!(newFeed.sourceName || newFeed.sourceFeedUrl)) {
        //error
    }

    db.collection(COLLECTION_FEEDS).insertOne(newFeed, function (error, result) {
        if (error) {
            //log
        } else {
            // find out what this does.
            response.status(201).json(result.ops[0]);
        }
    });
})