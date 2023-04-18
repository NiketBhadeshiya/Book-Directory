const express = require('express');
const multer = require('multer');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');
// const { model } = require('mongoose');

const storage = multer.diskStorage({
    destination: './public/bookImages',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
}).single('bookImage');


route.get('/', services.homeRoutes);
route.get('/addbook', services.add_book);
route.get('/updatebook', services.update_book)

route.get('/addauthor', services.add_author);
route.get('/updateauthor', services.update_author);

route.get("/authorView", services.authorView);
route.get('/bookView', services.bookView);

module.exports = route;