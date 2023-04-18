const mongoose = require('mongoose');

var authorSchema = new mongoose.Schema({
    author : {
        type : String,
        // required : true
    },
    description : {
        type: String
    }
})

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;