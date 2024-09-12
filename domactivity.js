document.addEventListener("DOMContentLoaded", ()=>{
    const jsondata = JSON.parse(content);
    const paintinglist = document.querySelector('#paintings ul'); //this gets the list element under the paintings id section of html

    function thumbnails(){
        for(let element of jsondata){ //for every element in the data array...
            const listitem = document.createElement('li'); //creates a list item to go into the list above; got help from https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
            const image = document.createElement('img');
            image.src = `images/small/${element.id}.jpg`;
            image.alt = element.title;
            image.id = element.id;
            listitem.appendChild(image);
            paintinglist.appendChild(listitem);
        }
    }
    paintinglist.addEventListener("click", (e)=>{
        const figure = document.querySelector('#details figure');
        figure.innerHTML = "";
        const largepic = document.createElement('img');
        largepic.src = `images/large/${e.target.id}.jpg`;
        figure.appendChild(largepic);
        const title = document.querySelector('#title');
        const artist = document.querySelector('#artist')
        let newtitle = "";
        let newartist = "";
        for(let element of jsondata){
            if (element.id == e.target.id){
                newtitle = element.title;
                newartist = element.artist;
                break;
            }
        }
        title.textContent = newtitle;
        artist.textContent = newartist;

    })
        

    
    thumbnails();
});
