var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },

    bookId : {
        type : mongoose.Types.ObjectId,
        ref : 'Book'
    }
});

var Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;