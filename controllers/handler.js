var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
module.exports = fetchHandler();


//constructing fetchHandler
function fetchHandler(){
    console.log('get button has been clicked')
    //creating xhr object
    var xhr = new XMLHttpRequest();
    //opening the xmlHttpRequest (req method, fetching source, async:true/sync:false)
    xhr.open('get','https://jsonplaceholder.typicode.com/todos/1', true);
    //optional method to execute while req is being made:
    xhr.onprogress = function(){
        console.log('request is being made');
    };
    //method to tell steps after the request is ready
    xhr.onload = function(){
        if(this.status === 200){
            console.log('The request has been completed !');
            console.log(this.responseText);
        }
        else{
            console.error('Faulty request');
        }
    };
    //finally you have to send the response
    xhr.send();
};
