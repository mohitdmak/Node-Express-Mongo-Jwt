const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { isEmail } = require('validator');
//FIX-THIS //! Lookup this format of { ... } = require()  

const bcrypt = require('bcrypt');
// Bcrypt required for hashing passwords.


//NOTE-THAT : //* Validator is a library which will parse strings according to the request, we could have used Regex as well for validating email id.
const Userschema = new schema({
    email: {
        type: String,
        required: [true, 'An email address is required'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email addresss']
    },
    password: {
        type: String,
        required: [true, 'A password is required to authenticate'],
        minlength: [5, 'Password should have minimum of 5 characters']
    },
});



//NOTE-THAT : //* Here we use mongodb's middleware (pre/post/etc..) which are like addeventlisteners of DOM, but performed on events relating to db.
              //* We have 4 types of middleware for mongo, reference here : https://mongoosejs.com/docs/middleware
              //* Here we are adding event every time, a 'save' function is performed on User model.
              //* Also for all middlewares we need to have 'next()' to move onto next middleware.


Userschema.pre('save', async function(next){
    //REVIEW-THIS: //! Again lookup the thing  about use of 'this' in ES5 JS fxns and ES6 JS fxns.
    //* Here 'this' would not be available for the model if => fxn is used instead of normal JS fxn.

    const salt = await bcrypt.genSalt();
    //* The way bcrypt hashes is, it passes the password through a hashing algo to generate a hashed string equivalent;
    //* but also adds a 'salt' before the password before passing it, so that the hashed password cannot be reverse decoded.
    this.password = await bcrypt.hash(this.password, salt);

    // Thus we are converting the password to a hashed one before storing/saving in the db.
    next();
});

const User = mongoose.model('user', Userschema);
module.exports = User;