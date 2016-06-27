var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FeedSchema = new Schema({
    sourceFeedUrl: String
});

module.exports = mongoose.model("Feed", FeedSchema);