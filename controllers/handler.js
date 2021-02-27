/*
var XMLHttpRequest = require("xmlhttprequest");
module.exports = fetchHandler();

//constructing fetch-Handler
function fetchHandler(){
    console.log('get button has been clicked');
    //making an xml request object
    var xhr = new XMLHttpRequest();
    console.log('xml request has been made');
    //opening ajax request (methodtype, url, async:true/sync:false)
    //! For post request, after creating xml request object, just place "POST", url  needed
    xhr.open('GET','https://jsonplaceholder.typicode.com/todos/1', true);
    //optional onprogress argument
    //! also for post, since we arent using fetch API, response headers need to be sent
    //! so for eg, if response is in JSON, write:
    //! xhr.getResponseHeader('Content-type', 'application/json');
    xhr.onprogress = function(){
        console.log('request is being processed');
        document.getElementsByClassName("text-capitalize text-center text-dark bg-light").innerHTML = 'Fetching Data . . . '
    };
    //notifying for state changes
    xhr.onreadystatechange = function(){
        console.log(`The state currently is ${xhr.readyState}`);
        document.getElementsByClassName("text-capitalize text-center text-dark bg-light").innerHTML = 'Fetching Data . . . '
    };
    //open request completion
    xhr.onload = function(){
        if(this.status === 200){
            var resp = JSON.parse(this.responseText);
            console.log(`${this.responseText}`);
            document.getElementById('g1').innerHTML = resp['userId'];
            document.getElementById('g2').innerHTML = resp['id'];
            document.getElementById('g3').innerHTML = resp['title'];
            document.getElementById('g4').innerHTML = resp['completed'];
        }
        else{
            console.error('Some error has occured');
        }
    };
    //finally sending request
    //! for POST request, send the response with params
    //! params = '...';
    //! xhr.send(params);
    xhr.send();
};
*/
