//obtaining the delete button via DOM method
const delbtn = document.querySelector('a.delete');

//# METHOD USING JQUERY AND FETCH API :::::::::::::::
delbtn.addEventListener('click', (e) => {
    //setting the target url
    const endpoint = `/blog/${delbtn.dataset.doc}`;

    //invoking the fetch api
    fetch(endpoint, {
        method: 'DELETE'
    })
        .then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch((err) => console.error(err));
})


//# METHOD USING VANILLA JS FOR XMLREQ ::::::::::::::
delbtn.addEventListener('click', primitivedelete);
function primitivedelete(){
    var xhr = new XMLHttpRequest();
    //setting the target url
    const endpoint = `/singleblog/${delbtn.dataset.doc}`;
    console.log('primitive delete request has been made');
    xhr.open('DELETE', endpoint, true);
    xhr.onprogress = function(){
        console.log('request is being processed . . .');
    }
    xhr.onreadystatechange = function(){
        console.log('request has changed states . . .');
    }
    xhr.onload = function(){
        if(this.status === 200){
            console.log('request is ready with the response!');
            var resp = this.response;
            console.log(resp);
// FIX-THIS : //!Working perfectly, except an error throws up during redirection, which is linked below:
// LINK: ../../errors.txt:1
            window.location.href = resp.redirect;
        }
        else{
            console.error('Some error has occured');
        }
    }

    xhr.send();
}
