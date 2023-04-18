const mongoose = require('mongoose');

var publisherSchema = new mongoose.Schema({
    name : String
});

const Publisher = mongoose.model("Publisher", publisherSchema);

module.exports = Publisher;