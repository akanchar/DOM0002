document.addEventListener("DOMContentLoaded", ()=>{
    const jsondata = JSON.parse(content);
    const paintinglist = document.querySelector('#paintings ul'); //this gets the list element under the paintings id section of html
    const figure = document.querySelector('#details figure');
    const description = document.querySelector('#description');

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
        figure.innerHTML = "";
        const largepic = document.createElement('img');
        largepic.src = `images/large/${e.target.id}.jpg`;
        figure.appendChild(largepic);
        const title = document.querySelector('#title');
        const artist = document.querySelector('#artist');
        let newtitle = "";
        let newartist = "";
        let features = [];
        for(let element of jsondata){
            if (element.id == e.target.id){
                newtitle = element.title;
                newartist = element.artist;
                features = element.features;
                newdesc = element.description;
                break;
            }
        }
        title.textContent = newtitle;
        artist.textContent = newartist;
        for (let box of features){
            let upperleft = [];
            upperleft = box.upperLeft;
            let lowerright = [];
            lowerright = box.lowerRight;
            let width = (lowerright[0]-upperleft[0]);
            let height = (lowerright[1]-upperleft[1]);
            let featuredesc = box.description;
            

            let rectangle = document.createElement('div');
            rectangle.className = "box";
            rectangle.style.position = "absolute";
            rectangle.style.left = `${upperleft[0]}px`;
            rectangle.style.top = `${upperleft[1]}px`;
            rectangle.style.width = `${width}px`;
            rectangle.style.height =`${height}px`;
    
            figure.appendChild(rectangle);
            
            rectangle.addEventListener("mouseover", (e)=>{
                description.textContent = featuredesc;
            })
            rectangle.addEventListener("mouseout", (e)=>{
                description.textContent = "";
            })
        }

    })
    
    thumbnails();
});
