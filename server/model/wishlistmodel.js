var mongoose = require('mongoose');

var wishlistSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },

    bookId : {
        type : mongoose.Types.ObjectId,
        ref : 'Book'
    }
});

var Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;