

let getbtn2 = document.getElementById("2");
getbtn2.addEventListener('click', getmongoSimple());

function getmongoSimple(){
    var xmlmongo = new XMLHttpRequest();
    xmlmongo.open('GET', 'http://127.0.0.1:3000/all', true);
    xmlmongo.onprogress = function(){
        console.log('On progress . . .');
    };
    xmlmongo.send();
};

/*
function getmongoXml(){
    Topic.find()
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.error(err);
        });
};
*/