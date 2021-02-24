var express = require('express');

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