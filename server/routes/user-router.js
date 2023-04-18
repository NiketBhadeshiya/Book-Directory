const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');
// const { model } = require('mongoose');


route.post('/', services.loginUser);
route.get('/', services.user_homeRoutes);
route.get("/authorView", services.authorView);
route.get('/bookView', services.bookView);
route.get('/user/myCart/:id', services.cart_list);
route.get('/user/myWishlist/:id', services.wish_list);
route.get('/editUserDetail/:id', services.edit_user_detail);
route.get('/user/verifyMail', services.verify_mail);

module.exports = route;