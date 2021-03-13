//using mongodb via atlas host; using cluster topics via model Topic; importing mongdoDB auth securely 
const mongoose = require('mongoose');
const DBURI = require('../mongoatlas');

//NOTE-THAT :  Before running our main tests we need to connect to db, through below fucntion
//# before() executes before whole test suite in mocha, similarly beforeEach executes before each test
//! note that done() is required here too as it is also a promise.

before(function(done){
    //mongoose settings for depraciation errors
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    
    mongoose.connect(DBURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
        .then(() => {
            done();
            console.log('Database is Connected for running tests');
            
        }).catch(err => {
            console.log(err);
            done();
        });
});

afterEach(function(done){
    console.log(this.currentTest.state);
    done();
});


//#Once all tests completed, just disconnect to avoid any topology issues with main app connection.
after(function(done){
    mongoose.disconnect();
    console.log('Mongo disconnected for tests');
    done();
});