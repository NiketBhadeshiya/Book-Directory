const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    contactNo : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        length : 10
    },
    isVerify : {
        type : Boolean,
        default : false
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;