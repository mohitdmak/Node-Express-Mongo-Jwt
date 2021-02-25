var express = require('express');
//getting fetch handler
var fetchJSON = require('./controllers/handler.js');
//using express
var app = express();
//using express to deploy static files
app.use('/assets',express.static('assets'));
//using ejs as view engine
app.set('view engine','ejs');
//listening to port 3000
app.listen(3000);

//home page get request
app.get('/', function(req, res){
    console.log('host setup');
    res.render('index');
});

//fetch = get json button
var fetch = document.getElementById(1);
fetch.addEventListener('click', fetchHandler);
//passing flow to controller
fetchJSON();
