const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();

const connectDB = require('./server/database/conn');
// const { log } = require('console');

const port = 6060;

app.use(morgan('tiny'));

connectDB();

app.use(bodyparser.urlencoded({ extended : true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use('/public', express.static(path.resolve(__dirname, "public")));

app.use('/admin', require('./server/routes/router'));
app.use('/', require('./server/routes/api-router'));
app.use('/', require('./server/routes/user-router'));


app.listen(port , () => {
    console.log(`Server is running at ${port}`);
});