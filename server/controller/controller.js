const Book = require('../model/bookmodel');
const Author = require('../model/Authormodel');
const User = require('../model/usermodel');
const Wishlist = require('../model/wishlistmodel');
const Cart = require('../model/cartmodel');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

async function sendMail(user){

    // let testAccount = await nodemailer.createTestAccount();
    
    let transporter = nodemailer.createTransport({
        host : "smtp.gmail.com",
        port : 587,
        secure : false,
        auth : {
            user : "bniket.7@gmail.com",
            pass : ""
        }
    });

    let info = await transporter.sendMail({
        from : "bniket.7@gmail.com",
        to : user.userName,
        subject : "BookDirectory Verification Mail..",
        text : `${user.name} warmly welcome to BookDirectory`,
        html : `${user.name} now just click here to <a href="http://localhost:6060/user/verifyMail?id=${user._id}">verify</a> your mail.`
    });

    console.log("Message sent: %s", info.messageId);
};

exports.create_book = async(req, res, err) => {
        if (!req.body) {
            res.status(400).send({ message: "content can not be empty !" });
            return;
        }


    //new user
    const authorData = await Author.find({ author : req.body.author });
    // let author = String(authorData[0]._id);
        // console.log(author);
        const book = new Book({
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            authorId: authorData[0]._id,
            publisher: req.body.publisher,
            editionNumber: req.body.editionNumber,
            language: req.body.language,
            image: req.file.filename,
            price: req.body.price,
            page: req.body.page,
            copyright: req.body.copyright
        });

        book.save().then(() => {
            // alert(`${req.body.title} Added Succcessfully`);
            res.redirect('/admin/addbook');
        }).catch(err => {
            res.send(err);
        });
}

exports.author_create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "content can not be empty..!!" });
        return;
    }

    const author = new Author(req.body);

    try {
        let authordata = await author.save();
        res.send("Data inserted successfully");
    } catch (error) {
        res.send({ massage: error.message });
    }
}

exports.create_user = async(req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "content can not be empty..!!" });
        return;
    }

    let hashedPass = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        userName : req.body.userName,
        password : hashedPass,
        name : req.body.name,
        contactNo : req.body.contactNo,
        gender : req.body.gender
    });

    try {
        let userdata = await user.save();
        // sendMail(userdata);
        // console.log(userdata);
        console.log("Data inserted successfully");
        res.send(userdata);
    } catch (error) {
        res.send({ message : error.message })
    }
}

exports.find = async (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        try {
            let bookdata = await Book.findById(id);
            res.send(bookdata);
        } catch (error) {
            res.status(500).send({ message: "Error retrieving book with id " + id })
        }
    } else if (req.params.authorId) {
        const id = mongoose.Types.ObjectId(req.params.authorId);
        try {
            let bookdata = await Book.find({ authorId: id });
            res.send(bookdata);
        } catch (error) {
            res.status(500).send({ message: "Error retrieving book with id " + id })
        }
    } else {
        try {
            let bookdata = await Book.find();
            res.send(bookdata);
            // console.log(bookdata);
        } catch (error) {
            res.status(500).send({ message: error.message || "Error occured while retrieving user information" })
        }
    }
}

exports.author_find = async (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        try {
            let authordata = await Author.findById(id);
            // console.log(authordata);
            res.send(authordata);
        } catch (error) {
            res.status(500).send({ message: `Error retrieving author with ${id}` });
        }
    } else {
        try {
            let authordata = await Author.find();
            res.send(authordata);
        } catch (error) {
            // res.status(500).send({ message : error.massage});
            res.status(500).send(error);
        }
    }
}

exports.find_user = async (req, res) => {
    if(req.query) {
        const uname = req.query.userName;

        try {
            let userdata = await User.find({ userName : uname });
            res.send(userdata);
        } catch (error) {
            res.status(500).send({ message: `Error retrieving author with ${uname}` });
        }
    } else {
        try {
            let data = await User.find();
            // console.log(data);
            res.send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

exports.find_user_by_id = async(req, res) => {
    const id = req.params.id;
    try {
        let userdata = await User.findById(id);
        res.send(userdata);
    } catch (error) {
        res.send(error);
    }
}

exports.update_userdata = async(req, res) => {
    const id = req.params.id;
    try {
        let updateddata = await User.findByIdAndUpdate(id, req.body);
        res.send(updateddata);
    } catch (error) {
        res.send(error);
    }
}

exports.update_book = async (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    try {
        let data = await Book.findByIdAndUpdate(id, req.body)
        res.send(data);

    } catch (error) {
        res.status(400).send(error);
    }
}

exports.author_update = async (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    try {
        let data = await Author.findByIdAndUpdate(id, req.body)
        res.send(data);
        console.log("Data updated successfully");
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.delete_book = async (req, res) => {
    const id = req.params.id;

    try {
        var deleted = await Book.findByIdAndDelete(id);
        res.send(deleted);
        // console.log(`Deleted data : ${deleted}`);
    } catch (error) {
        res.status(401).send(error);
    }
}

exports.author_delete = async (req, res) => {
    const id = req.params.id;

    try {
        var deleted = await Author.findByIdAndDelete(id);
        res.send(deleted);
        console.log(`Deleted data : ${deleted}`);
    } catch (error) {
        res.status(401).send(error);
    }
}


exports.book_find_author = async (req, res) => {
    const id = req.params.id;
    // const id = req.params.id;
    console.log(id);
    try {
        let bookdata = await Book.find({ authorId : id  }).populate('authorId');
        res.send(bookdata);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving book with id " + id })
    }
}

exports.book_view = async (req, res) => {
    const id = req.params.id;
    // const id = req.params.id;
    console.log(id);
    try {
        let bookdata = await Book.findById(id).populate('authorId');
        res.send(bookdata);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving book with id " + id })
    }
}

exports.add_wishlist = async(req, res) => {
    const bookid = req.query.bookId;
    const userid = req.query.userId;

    const wishlist = new Wishlist({
        bookId:bookid,
        userId:userid
    });

    try {
        let response = await wishlist.save();
        res.send(response);
    } catch (error) {
        res.send(error);
    }
}

exports.wish_list = async(req, res) => {
    // const u_id = mongoose.Types.ObjectId(req.params.id);
    const u_id = req.params.id;
    console.log(u_id);
    try {
        let wishlistdata = await Wishlist.find({ userId : u_id }).populate('bookId');
        res.send(wishlistdata);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving wishlist with id " + u_id });
    }
}

exports.delete_wishlist = async(req, res) => {
    const bookid = req.query.bookId;
    const userid = req.query.userId;

    try {
        let deleteddata = await Wishlist.deleteOne({ bookId : bookid, userId : userid });
        res.send(deleteddata);
    } catch (error) {
        res.send(error);
    }
}

exports.add_cart = async(req, res) => {
    const bookid = req.query.bookId;
    const userid = req.query.userId;

    const cart = new Cart({
        userId : userid,
        bookId : bookid
    });
    try {
        let response = await cart.save();
        res.send(response);
    } catch (error) {
        res.send(error);
    }
}

exports.cart_list = async(req, res) => {
    // const u_id = mongoose.Types.ObjectId(req.params.id);
    const u_id = req.params.id;
    console.log(u_id);
    try {
        let cartdata = await Cart.find({ userId : u_id }).populate('bookId');
        console.log(cartdata)
        res.send(cartdata);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving cart with id " + u_id });
    }
}

exports.delete_cart = async(req, res) => {
    const bookId = req.query.bookId;
    const userId = req.query.userId;

    try {
        let deletedata = await Cart.deleteOne({ userId : userId , bookId : bookId});
        res.send(deletedata);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving while deleting cart with id " + userId });
    }
}

exports.verifyMail = async(req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
        if(id != ''){
            let data = await User.updateOne(
                {
                    _id : id
                },
                {
                    $set : {
                        isVerify : true
                    }
                }
            );
            res.status(200).send({verified : "Verified Successfully.."});
        } else {
            res.status(300).send({verified : "Error while verifing.."});
        }
    } catch (error) {
        res.status(400).send({message : "Error while verifing.."});
    }
}