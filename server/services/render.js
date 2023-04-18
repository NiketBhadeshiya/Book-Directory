const axios = require('axios');
const Book = require('../model/bookmodel');
const bcrypt = require('bcryptjs');

exports.homeRoutes = async (req, res) => {
    try {
        let response = await axios.get('http://localhost:6060/api/books');
        let author = await axios.get('http://localhost:6060/api/authors');
        res.render('index', { books: response.data, authors: author.data });
        // res.render('login');
    } catch (error) {
        res.send(error);
    }
    // res.render('addBook');
}

exports.add_book = (req, res) => {
    res.render('addBook');
}

exports.add_author = (req, res) => {
    res.render('addAuthor');
}

exports.update_book = async (req, res) => {
    // const urlData = url.parse(req.url, true)
    const id = req.query.id;
    console.log(id);
    try {
        let response = await axios.get('http://localhost:6060/api/books', { params: { id: req.query.id } });
        res.render('updateBook', { book: response.data });
        console.log(response);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.update_author = async (req, res) => {
    // const urlData = url.parse(req.url, true)
    const id = req.query.id;
    console.log(id);
    try {
        let response = await axios.get('http://localhost:6060/api/authors', { params: { id: req.query.id } });
        res.render('updateAuthor', { author: response.data });
        console.log(response);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.authorView = async (req, res) => {
    const authorid = req.query.id;
    console.log(authorid);

    try {
        let authordata = await axios.get('http://localhost:6060/api/authors', { params: { id: req.query.id } });
        // let authorname = authordata.author;
        // console.log(authordata.data._id);
        // let books = await axios.get('http://localhost:6060/api/books', { params : { authorId : authordata.data._id } });
        let books = await axios.get(`http://localhost:6060/api/bookfindauthor/${authordata.data._id}`);
        // let books = Book.find().populate();
        // console.log(books);
        res.render('authorView', { author: authordata.data, books: books.data });
    } catch (error) {
        res.status(500).send({ massage: error.message });
    }
}

exports.bookView = async (req, res) => {
    const id = req.query.id;
    const uid = req.query.userId;
    console.log(id, uid);
    try {
        let bookdata = await axios.get(`http://localhost:6060/api/bookView/${id}`);
        let userdata = await axios.get(`http://localhost:6060/api/users/${uid}`);
        let wishlistdata = await axios.get(`http://localhost:6060/api/users/wishlist/${uid}`);
        res.render('bookView', { book: bookdata.data, user: userdata.data, wishlist : wishlistdata.data });
    } catch (error) {
        res.status(500).send({ massage: error.message });
    }
}

exports.loginUser = async (req, res) => {
    const uname = req.body.userName;
    console.log(uname);
    const pass = req.body.password;

    try {
        let response = await axios.get('http://localhost:6060/api/books');
        let author = await axios.get('http://localhost:6060/api/authors');
        let userdata = await axios.get(`http://localhost:6060/api/users?userName=${uname}`);
        console.log(userdata.data);
        if (userdata.data.length > 0 && userdata.data[0].password == pass) {
            // let passmatch = await bcrypt.compare(pass, userdata.data[0].password);
            // console.log(passmatch);
            // if(passmatch){
                let wishlistdata = await axios.get(`http://localhost:6060/api/users/wishlist/${userdata.data[0]._id}`);
                res.render('index', { user: userdata.data, books: response.data, authors: author.data, wishlist: wishlistdata.data });
            // }
            // else {
                // res.render('login', {message : "Enter Valid Credential..!!"})
            // }
        } else {
            res.render('login', {message : "Enter Valid Credential..!! Or a New User ??"})
            // res.send({ message: "User does not exists first you need to register yourself OR try again.." });
        }

} catch (error) {
    res.status(500).send(error);
}
}

exports.user_homeRoutes = async (req, res) => {
    try {
        res.render('login', {message : ""});
    } catch (error) {
        res.send(error);
    }
    // res.render('addBook');
}

exports.cart_list = async (req, res) => {
    const uid = req.params.id;
    try {
        let userdata = await axios.get(`http://localhost:6060/api/users/${uid}`);
        let cartdata = await axios.get(`http://localhost:6060/api/users/cart/${uid}`);
        if(cartdata.data.length > 0){
            res.render('myCart', { cart: cartdata.data, user: userdata.data, message:"" });
        } else {
            res.render('myCart', {message : "Your Cart is Empty..!!", cart : cartdata.data, user: userdata.data});
        }
    } catch (error) {
        res.send(error);
    }
}

exports.wish_list = async (req, res) => {
    const uid = req.params.id;
    try {
        let userdata = await axios.get(`http://localhost:6060/api/users/${uid}`);
        let wishlistdata = await axios.get(`http://localhost:6060/api/users/wishlist/${uid}`);
        if(wishlistdata.data.length > 0){
            res.render('myWishlist', { wishlist: wishlistdata.data, user: userdata.data, message : "" });
        } else {
            res.render('myWishlist', { message : "Your Wishlist is Empty..!!", wishlist: wishlistdata.data, user: userdata.data });
        }
    } catch (error) {
        res.send(error);
    }
}

exports.edit_user_detail = async (req, res) => {
    const uid = req.params.id;
    try {
        let userdata = await axios.get(`http://localhost:6060/api/users/${uid}`);
        // console.log(userdata);
        res.render('editMyProfile', { user: userdata.data });
    } catch (error) {
        res.send(error);
    }
}

exports.verify_mail = async(req, res) => {
    const id = req.query.id;
    try {
        let data = await axios.put(`http://localhost:6060/api/users/verifyMail/${id}`);
        console.log(data.data);
        res.status(200).render('verifyMail', {message : data.data.verified});
    } catch (error) {
        res.status(401).render('verifyMail', {message : error.message});
    }
}