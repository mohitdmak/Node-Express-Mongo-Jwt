const jwt = require('jsonwebtoken');
const JWTsecret = require('../JWTsecret');
const User = require('../models/User');

const checkLoggedUser = (req, res, next) => {
    const token = req.cookies.jwtAUTH;

    //* Our aim is to make the user and his attributes accessible everywhere in "views", should we ever need it.
    //* There is a property assignable to 'res', : 'locals' in which we can store objects (this storing will be done in a particular controller obviously, if no the middleware)
    //* and these objects will be accessible only in views which are rendered during that particular req-res cycle.
    //* We will apply the user object to locals here, in the middleware, and then will run this middleware before every get request as done here:
    // LINK ../app.js:

    
    if(token){
        jwt.verify(token, JWTsecret, async (err, decodedToken) => {
            if(err){
                res.locals.user = null;
                next();
            }
            else{
                //* Since findbyId will be a promise, we should put await here and async before function at the 3rd parameter of jwt.verify.
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }
    else{
        res.locals.user = null;
        next();
    }
}

module.exports = { checkLoggedUser };