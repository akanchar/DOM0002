/*Web Dev
*Abhi 
* Sara Hrnciar
* In class assignment #1
*/

document.addEventListener("DOMContentLoaded", (event) => {
    //variable instantiation
    fullPic = document.getElementById("full");
    title = document.getElementById("title");
    artist = document.getElementById("artist");
    figure = document.querySelector("figure");
    desc = document.getElementById("description");
    ul = document.querySelector("ul");
    let count = 0;
    const data = JSON.parse(content);
    arr = [];

    //adds mini pics to ul elements; makes an array of painting objects
    data.forEach(item => {
        l =document.createElement("li");
        arr.push(item);
        i = document.createElement('img');
        i.id = count;
        i.src = "../inclassdomactivity002/images/small/" + item.id + ".jpg";
        l.appendChild(i);
        ul.appendChild(l);
        count++;
    });

    //when any item in ul is clicked thisll happen
    ul.addEventListener("click", (e)=>{
        if (e.target && e.target.nodeName == "IMG"){ //if clicking an img
            //clear past content and change to content associated with image that was clicked
            document.querySelector("figure").innerHTML = "";
            title.innerHTML = arr[e.target.id].title
            artist.innerHTML = arr[e.target.id].artist
            fullPic = document.createElement('img');
            figure.append(fullPic);
            fullPic.src = "../inclassdomactivity002/images/large/" + arr[e.target.id].id + ".jpg";
            
            arr[e.target.id].features.forEach(feat =>{ //go through all of the features associated with image and make boxes
                const rect = document.createElement("div");
                document.querySelector("figure").appendChild(rect);
                rect.className ="box";
                rect.style.position = "absolute";
                console.log(feat.upperLeft[0])
                rect.style.left = feat.upperLeft[0] + "px";
                rect.style.top = feat.upperLeft[1] + "px";
                rect.style.height =  feat.lowerRight[1] - feat.upperLeft[1] + "px";
                rect.style.width = feat.lowerRight[0] - feat.upperLeft[0] + "px";
                //assure description of specfic box appears on hover, and goes away when not hovered
                rect.addEventListener("mouseover", ()=>{
                    desc.textContent = feat.description;
                })
                rect.addEventListener("mouseout", ()=>{
                    desc.textContent = "";
                })
            });
        }})});
    