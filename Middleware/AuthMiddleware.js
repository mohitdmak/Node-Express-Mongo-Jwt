const jwt = require('jsonwebtoken');
const JWTsecret = require('../JWTsecret');

//* For validation and checking for presence of jwtAUTH cookie on the browser before allowing access to restricted pages,
//* Rather than creating funciton to check it everytime, create a middleware, and middlewares can be passesd into routers 2nd arugments.

//* In this middleware we Firstly need to check if a jwt token exists at all, failing which we redirect them to login on restricted pages.
//* Secondly we need to check if it is valid, i.e that it is not tampered or edited at all and undamaged.

const reqAuth = (req, res, next) => {
    const token = req.cookies.jwtAUTH;

    //* JWT has a method to verify if the token is valid, called 'verify'. Takes 3 arguments:
    //* 1st - the cookie containing the JWT.
    //* 2nd - the secret string you provided to JWT to encode Header + Payload
    //* 3rd - function taking 2 arguments; 1st - error, if any occured during verification (i.e why it might not be untampered),
    //* and 2nd - the decodedtoken from the cookie containing the data of payload we put in JWT and some extra auth data.
    //* and This function is executed after the verification process is finished.
    //* If we dont send a response to the browser straight away at any of our points in controlflow, we need to call next() to execute the next middleware.

    if(token){
        jwt.verify(token, JWTsecret, (err, decodedToken) => {
            if(err){
                console.log('JWT token was not valid, redirecting . . .');
                res.redirect('/user/login');
            }
            else{
                console.log('Allowing authenticated User . . .');
                console.log(decodedToken);
                
                next();
            }
        });
    }
    else{
        res.redirect('/user/login');
    }
}

module.exports = { reqAuth };