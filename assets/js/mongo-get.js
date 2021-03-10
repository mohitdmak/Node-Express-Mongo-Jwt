//obtaining Get MongoDb button through DOM method
let getbtn2 = document.getElementById("2");
getbtn2.addEventListener('click', primitivegetmongo);

// Creating xml request to database
function primitivegetmongo(){
    var xmlmongo = new XMLHttpRequest();
    console.log('Primitive XML request has been made to acquire mongo data');
    xmlmongo.open('GET', '/allblogs', true);
    xmlmongo.onprogress = function(){
        console.log('Request On progress . . .');
    };
    xmlmongo.onload = function(){
        if(this.status === 200){
            console.log('Request is ready with the response !');
            var resp = this.response;
            var responseprocessed = JSON.parse(resp)
            console.log(responseprocessed);
            var list = document.getElementById('list');
            responseprocessed.forEach(blog => {
                var li = document.createElement('li');
                var innerA = document.createElement('a');
                innerA.href = `/blog/${blog._id}`;
                innerA.innerHTML = blog.title;
                li.appendChild(innerA);
                list.appendChild(li);
            })
        }
        else{
            console.error("Some error has occured");
        }
    }
    xmlmongo.send();
};