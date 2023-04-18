const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const con = await mongoose.connect('mongodb://localhost/BookDirectory', { useNewUrlParser : true, useUnifiedTopology : true});
        console.log(`Mongodb Connect : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;