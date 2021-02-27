const express = require('express');
//using express
const app = express();
//using mongodb via mlabs host
const mongoose = require('mongoose');
//using cluster topics vis model Topic
const Topic = require('./models/Topic.js');
//using express to deploy static files
app.use('/assets',express.static('assets'));
const DBURI = require('./mongoatlas');

//using ejs as view engine
app.set('view engine','ejs');

//mongoose settings for depraciation errors
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


//#The mongoose.connect asynchronouly returns a promise.
//#Since the mongoose.connect is an asynchronous request, it will run in the background after app listens to :3000 if we keep the command seperate.
//#Thus instead include it in the .then of the promise as then, the app loads only after connecting to the db.
const dbURI = DBURI;
try{
    mongoose.connect(dbURI, () =>
    app.listen(3000));
    console.log('Db connected, app listening on port 3000')
}catch(err){
    console.error(err);
}

//!Refer above #comment <<<
//listening to port 3000
//*app.listen(3000);
//! >>>

//home page get request
app.get('/', function(req, res){
    console.log('host setup');
    res.render('index');
});

//mongo-db sandbox routes
app.get('/add', function(req, res){
    var topic = new Topic({
        title: 'hey here is the second post to the db',
        content: 'I have the exact same issue. '
    });
    topic.save()
        .then((result) => {
            res.send(result);
            console.log(result);
        }).catch((err) => {
            console.error(err);
        });
});

app.get('/all', function(req, res){
    Topic.find()
        .then((result) => {
            console.log(result);
            res.render('index', {topics : result})
        }).catch((err) => {
            console.error(err);
        });
});