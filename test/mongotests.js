const Blog = require('../models/Blog');
//! assert is required to be 'required' 
const assert = require('assert');

//NOTE-THAT : Before running below test, we would obviously need to connect to the database first, which is done in supplementary.js under test
// LINK ./supplementary.js

//Under describe you can create multiple tests under one section.
//It takes 2 parameters : string(name of test section), function 

describe('Database Actions Tests', function(){

    //Make individual tests under 'it', which takes 2 parameters: string(name of test), function
    //#note that if tests involve promises, pass parameter 'done' in function to notify mocha when test is complete.
    it('Saves a blog to the database', function(done){
        var newBlog = new Blog({
            'title': 'Test Blog',
            'content': 'Test Blog Content 123'
        });
    
        //! the done() is necessary here since it is a promise to tell mocha that the test is complete and it can move onto the next test.
        newBlog.save()
            .then((result) => {
                done();
            })
            .catch((err) => {
                console.error(err);
            });
        });

    it('Finds test blog from the database', function(done){
        Blog.findOne({title: 'Test Blog'})
            .then((result) => {
                if(result.title === 'Test Blog'){
                    done();
                }
            }).catch((err) => {
                console.error(err);
            });
    });

    it('Deletes blog from the database', function(done){
        Blog.deleteOne({title: 'Test Blog'})
            .then((result) => {
                if(result.deletedCount === 1){
                    done();
                }
                else{
                    console.log('Test Blog was not found in database');
                }
            }).catch((err) => {
                console.error(err);
            });
    });

});

//NOTE-THAT : //!You need to specify using 'mocha' for unit tests in npm package.json, so under test of 'scripts' enter the key as mocha.
// LINK ../package.json:5