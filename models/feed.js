var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var feedSchema = new Schema({
    sourceName: String,
    sourceFeedUrl: String
});

//var feedSchema = new Schema({});

module.exports = mongoose.model("feed", feedSchema);