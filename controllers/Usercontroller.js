const express = require('express');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const JWTsecret = require('../JWTsecret');

//* jwt will render user info onto a cookie to let the browser know about the log status of the user.
//* It has 3 parts: Header(tells about the payload content to the browser), Payload( User info we pass into the jwt on cookie so that browser can verify the log status ),
//* and lastly a signature which encodes Header + Payload

const jwt = require('jsonwebtoken');


// SECTION : //#TOKEN CREATION.
//#region 
//function to create json web tokens which signs user's login status.
//* Note that JWT takes in time in 'seconds'. We create the max length of time for which the JWT is valid.
//* (It can stay in the browser later on but wont be valid for authentication)
const maxAge = 60*60*24;

//# Below function will be used to produce token to be embedded on a cookie. In terms of payload for the JWT,
//# we will pass the id of user created by mongo db.

const createToken = (id) => {

    //* jwt.sign() takes 3 arguments, 1st - JS array of payload, 2nd - Secret key used to encrypt the Header + Payload (Preferably long, not to be released publicly)
    //* 3rd - JS map of options like expiry time etc.

    return jwt.sign({id}, JWTsecret, {
        expiresIn: maxAge
    });
};
//|SECTION
//#endregion

// SECTION : //# ERROR HANDLING FOR THE FRONTEND.
//#region 
//error handling to determine the exact error user made in filling form of auth.
function handleError(err){

    //* We are creating a JS object with the types of errors, so that we can output them together to the user.
    let errors = {email: '', password: ''};

    if(err.message.includes('user validation failed')){
        //* Object.values(x) gives an array of only the values(not keys) of a map.
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
        console.error(errors);
    }

    //NOTE-THAT //* We cannot fill an error message with [true,''] for the 'unique' field in the schema like we did for other fields, thus seperate handling is required for it using err.code .
    if(err.code === 11000){
        errors.email = 'An account with this email id already exists.';
    }

    return errors;
}
//|SECTION
//#endregion

// SECTION : //# 2 METHODS HANDLING POST REQ TO SIGNUP.
//#region 
const post_signup = (req, res) => {
    var user = new User(req.body);
    user.save()
        .then((result) => {
            console.log('New User has registered.');

            //* Creating new jwt token for the user.
            const token = createToken(user._id);

            //* Setting the JWT onto a cookie named 'jwtAUTH', value token, keep httpOnly:true so that it cant be edited from the frontend
            //! Also cookie takes in value of time in milliseconds , whereas JWT takes in in seconds. *1000.
            //! LINK ./Usercontroller.js:11
            res.cookie('jwtAUTH', token, {httpOnly: true, maxAge: maxAge*1000});

            //NOTE-THAT :
            //* Here use 201 better than 200 status code, as 200 denotes request is successful and returns the page;
            //* whereas 201 denotes request is successful and it has led to the creation of a resource on the server.
            //* And 400 is used for error to denote that: server wont process the request due to 'Bad Request' from the client side.
            //* And 401 is used when request is not 'bad' but it doesnt match i.e unauthorized.

            res.status(201);
            res.redirect('/');

        }).catch((err) => {
            var error = handleError(err);
            var present = error.email + '\n' + error.password;

            res.status(400);
            console.log('User has made an error in signup form.')
            res.render('signup', {err: present});
        });
};

// NOTE-THAT : 
//# Below is implementation of primitived above fxn, but in async/await instead of ES6 promises. (see just for prac).
//# Just have async before fxn i.e: async(req, res) => instead of (req, res) =>.
//# Async tells that it is asynchronous function, and we put await wherever the execution runs in the background; and statements post it are executed after await statement is done.
/*
{
    try{
        const user = new User(req.body);
        await user.save();
        //NOTE-THAT we can use User.create(email, password) too here, but it requires the fields as parameters, whereas save requires a JS object.
        res.status(201).send(user.password);
    }
    catch(err){
        var error = handleError(err);
        res.status(200).send(error);
    }
    
};
*/
//|SECTION
//#endregion


const get_signup = (req, res) => {
    res.render('signup');
};

// SECTION : //# 2 METHODS HANDLING POST REQ TO LOGIN.
//#region 
const post_login = (req, res) => {

    // FIX-THIS : //! console.log(req.body) works, but console.log(`${req.body}`) gives [object Object] why !!?

    //NOTE-THAT : //! This method is wrong : take entered password, hash it and find user with email entered, and compare both hash password.
                  //! As bcrypt generates a new salt everytime we hash, thus even if the passwards originally match, their hashed versions wont match.
                  //! For this bcrypt provides a compare function: 2 parameters, 1st - unhashed password, 2nd - hashed password: and takes the salt of hashed password only to figure if they are equal.

    User.findOne({ email: req.body.email })
        .then((foundUser) => {
            if(foundUser !== null){
                bcrypt.compare(req.body.password, foundUser.password)
                    .then((result) => {
                        console.log(result);
                        if(result === true){
                            console.log('A user has logged in successfully.');
                            const token = createToken(foundUser._id);
                            res.cookie('jwtAUTH', token, {httpOnly: true, maxAge: maxAge*1000});
                            res.status(200).redirect('/');
                        }
                        else{
                            console.log('User has entered an incorrect password.');
                            res.status(401).render('login', {err: 'The password that you have entered is incorrect.'});
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            else{
                console.log(' User has tried to login through unregistered email id');
                res.status(401).render('login', {err: 'The email you have entered is not yet registered, please sign up.'});
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

//NOTE-THAT : //* There is another method too : 
//! ADDING STATIC METHODS TO MONGO COLLECTION
//* We have an option to add a custom method onto a model (User here), through static whose format is :
//* userSchema.static.<what you want the method to be called> = <function to perform> ; and its called by User.<what you want the method to be called>
//* This can be placed in whichever module the userSchema is accessible eg here:
//*= LINK ../models/User.js:32


// FIX-THIS : //! Also find why the try/except/async/await version does not work (site hangs due probably to the await not being fulfilled). here:
// LINK ./Usercontroller.js:190

//|SECTION 
//#endregion


const get_login = (req, res) => {
    res.render('login');
};


//NOTE-THAT : //* We cannot delete cookies set on the browser from the server itself, but we can update them.
              //* Thus we will set the value as an empty string instead of the token, and that too with maxAge as 1 millisecond ( the least ), effectively deleting it.

const get_logout = (req, res) => {
    res.cookie('jwtAUTH', '', { maxAge:  1 });
    res.redirect('/');
};

module.exports = {
    get_signup,
    get_login,
    post_signup,
    post_login,
    get_logout
}



// REVIEW-THIS : 
//#region 
/*
var usertosearch = req.body;
    try{
        async function hashpass(usertosearch){
            const salt = await bcrypt.genSalt();
            usertosearch.password = await bcrypt.hash(usertosearch.password, salt);
            return proceed;
        }
    }catch(err){
        console.log(err);
    }
    function proceed(){
        console.log(usertosearch.password);
        User.find({email: usertosearch.email})
            .then((result) => {
                if(result !== null){
                    if(result.password === usertosearch.password){
                        console.log(`A user ${result.email} has logged in`);
                        const token = createToken(result._id);
                        res.cookie('jwtAUTH', token, {httpOnly: true, maxAge: maxAge*1000});
                        res.status(200).render('home');
                    }
                    else{

                        console.log(`The User has entered an ${req.body}incorrect password for ${result.email}`)
                        res.status(401).render('login', {err: 'The password you have entered is incorrect.'});
                    }
                }
                else{
                    console.log('The User has entered an email which is not registered.');
                    res.status(401).render('login', {err: 'No user with provided email exists. Please register first.'});
                }
            }).catch((err) => {
                var checkerror = handleError(err);
                console.log(checkerror);
                console.log('User has made an error in login form');
                res.status(400).render('login', {err: checkerror});
            })
    }
*/
//#endregion