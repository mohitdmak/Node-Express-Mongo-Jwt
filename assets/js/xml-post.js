var titletext = document.getElementById('Title');
var contenttext = document.getElementById('Body');
var postbtn = document.getElementById('xp');
var blogform = document.getElementById('form');
blogform.addEventListener('submit', (e) => {
    e.preventDefault();
    posthandler();
});
window.addEventListener('load', () => posthandler);

function posthandler(){
    var xhr = new XMLHttpRequest();
    console.log('xml Post request has been made');
    var params = new FormData(blogform);
    xhr.open('POST', '/create-blog', true);
    xhr.getResponseHeader('Content-type', 'application/x-www-form-urlencoded');
    console.log('workinn');
    xhr.onload = function(){
        if(this.status === 200){
            console.log('Request is ready and data has been uploaded !');
        }
        else{
            console.error('something went wrong');
        }
    }


    xhr.send(params);
}