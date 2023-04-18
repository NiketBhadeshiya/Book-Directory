const mongoose = require('mongoose');
// const Author = require('../model/Authormodel');

var bookSchema = new mongoose.Schema({
    isbn : {
        type : Number,
        required : true
    },

    title : {
        type:String,
        required : true
    },

    author : {
        type : String,
        required : true
    },

    authorId : {
        type : mongoose.Types.ObjectId,
        ref : 'Author'
    },
    
    publisher : {
        type : String,
        required : true
    },
    
    editionNumber : {
        type : Number,
    },
    
    language : {
        type : String,
        required : true
    },
    
    image : {
        type : String,
        required : true
    },
    
    price : {
        type : Number,
        required : true
    },

    page : {
        type : Number,
        required : true
    },
    
    copyright : String
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;