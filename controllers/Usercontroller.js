const express = require('express');
const User = require('../models/User.js');

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

const post_signup = (req, res) => {
    var user = new User(req.body);
    user.save()
        .then((result) => {
            console.log('New User has registered');

            //NOTE-THAT :
            //* Here use 201 better than 200 status code, as 200 denotes request is successful and returns the page;
            //* whereas 201 denotes request is successful and it has led to the creation of a resource on the server.

            res.status(201).send(user.password);
        }).catch((err) => {
            console.log(err);
            var error = handleError(err);
            res.status(200).send(error);
        });
};
// NOTE-THAT : 
//# Below is implementation of same above fxn, but in async/await instead of ES6 promises. (see just for prac).
//# Just have async before fxn i.e: async(req, res) => instead of (req, res) =>.
//# Async tells that it is asynchronous function, and we put await wherever the execution runs in the background.
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

const get_login = () => {};

const get_signup = () => {};

const post_login = () => {};

const get_logout = () => {};

module.exports = {
    get_signup,
    get_login,
    post_signup,
    post_login,
    get_logout
}