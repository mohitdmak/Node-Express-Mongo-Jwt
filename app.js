// SECTION - modules stuff for express and templating engine
//#region 
//using express; using express to deploy static files; using express's body-parser
const { render } = require('ejs');
const express = require('express');
const app = express();
app.use('/assets',express.static('assets'));
app.use('/blog/assets',express.static('assets'));
//#this parses data submitted through forms generally.
app.use(express.urlencoded({ extended:true }));
//#this parses data submitted in json format.
app.use(express.json());
//using ejs as view engine
app.set('view engine','ejs');
// |SECTION
//#endregion

// SECTION - modules stuff for mongoDB.
//#region 
//using mongodb via atlas host; using cluster topics via model Topic; importing mongdoDB auth securely 
const mongoose = require('mongoose');
const Blog = require('./models/Blog.js');
const DBURI = require('./mongoatlas');
//mongoose settings for depraciation errors
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
//|SECTION
//#endregion

// NOTE-THAT -
//#The mongoose.connect asynchronouly returns a promise.
//#Since the mongoose.connect is an asynchronous request, it will run in the background after app listens to :3000 if we keep the command seperate.
//#Thus instead include it in the .then of the promise as then, the app loads only after connecting to the db.
mongoose.connect(DBURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('Database Connected');
        app.listen(3000);
    }).catch(err => console.log(err));

    
//FIX-THIS - //!just understand the thing about usage and scope of 'this' keyword in ES5 fxns and arrow ES6 fxns, also see chained promises multiple .then.
// LINK ./models/User.js:25 
//! above fix this is also seen in above link.


//FIX-THIS - //!also figure how to send delete/put req using html forms, as they officially only support get/post methods.

// FIX-THIS - //!have fixed async requests without use of jquery for delete/get. Having an issue with post req, see the foll: (also lookout put):
// LINK ./assets/js/xml-post.js


// LINK ./app.js:30
//!Refer above #comment <<<
//listening to port 3000
//app.listen(3000);
//! >>>

// SECTION - using the blog router :
const Blogroutes = require('./routes/blogroutes');
app.use('/blog', Blogroutes);
// |SECTION


// SECTION - using the user router :
const Userroutes = require('./routes/Userroutes');
app.use('/user', Userroutes);
// |SECTION


//home page get request
app.get('/', function(req, res){
    console.log('\nhost has arrived at home page');
    res.render('home');
});

// NOTE-THAT : Below is the normal get request which acquires data from db server and reloads page to render.
//             Further below is an immplementation of same task using XML requestAnimationFrame, without JQuery,whose client js file is linked below:
// LINK ./assets/js/mongo-get.js
//#region 

app.get('/all', function(req, res){
    Blog.find()
        .then((result) => {
            console.log('blog data is fetched from mongo using jquery');
            res.render('home', {blogs : result});
        }).catch((err) => {
            console.error(err);
        });
}); 

app.get('/allblogs', function(req, res){
    Blog.find()
        .then((result) => {
            console.log('blog data is fetched from mongo atlas');
            res.send(result);
        }).catch((err) => {
            console.error(err);
        });
});
//#endregion
