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


route.get('/api/books',  controller.find);
route.post('/api/books', upload, controller.create_book);
route.put('/api/books/:id', controller.update_book);
route.delete('/api/books/:id', controller.delete_book);
route.get('/api/bookView/:id', controller.book_view);

route.get('/api/authors', controller.author_find);
route.post('/api/authors', controller.author_create);
route.put('/api/authors/:id', controller.author_update);
route.delete('/api/authors/:id', controller.author_delete);

route.get('/api/bookfindauthor/:id', controller.book_find_author);

route.get('/api/users', controller.find_user);
route.get('/api/users/:id', controller.find_user_by_id);
route.put('/api/users/:id', controller.update_userdata);
route.post('/api/users', controller.create_user);
route.put('/api/users/verifyMail/:id', controller.verifyMail);

route.get('/api/users/wishlist/:id', controller.wish_list);
route.post('/api/users/wishlist', controller.add_wishlist);
route.delete('/api/users/wishlist', controller.delete_wishlist);

route.post('/api/users/cart', controller.add_cart);
route.get('/api/users/cart/:id', controller.cart_list);
route.delete('/api/users/cart', controller.delete_cart);


module.exports = route;