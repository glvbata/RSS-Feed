var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var feedSchema = new Schema({
    sourceName: String,
    sourceFeedUrl: String
});

module.exports = mongoose.model("Feed", feedSchema);