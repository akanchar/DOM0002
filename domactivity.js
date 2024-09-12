//Event listener creation
addEventListener("DOMContentLoaded", (event) => {
    //parse JSON file and store in variable
    var information = JSON.parse(content);
    //lists to hold info later on
    var ids = [];
    var thumbnailImages = [];
    //for loop to go through elements in information list
    for (i = 0; i<information.length; i++) {
        ids[i] = information[i].id
        //create img element and source it properly
        var temp = document.createElement("img")
        temp.src = "/images/small/"+ids[i]+".jpg"
        temp.setAttribute("data-value", ids[i])
        //create list element and store image in list element
        var li = document.createElement("li")
        li.appendChild(temp)
        li.addEventListener("click", (event) =>{
            identifier = event.target.getAttribute("data-value")
            for (i = 0; i<information.length; i++){
                if (information[i].id == identifier){
                    var figure = document.getElementById("large_image")
                    figure.innerHTML = ""
                    loc = document.createElement("img")
                    loc.src = "/images/large/"+information[i].id+".jpg"
                    document.getElementById("large_image").append(loc)
                    document.getElementById("title").innerHTML = information[i].title
                    document.getElementById("artist").innerHTML = "By " + information[i].artist
                    for (item in information[i].features){
                        let newBox = document.createElement("div")
                        newBox.className = "box"
                        newBox.style.position ="absolute"
                        upLeft = information[i].features[item].upperLeft
                        botRight = information[i].features[item].lowerRight
                        console.log(upLeft)
                        height = botRight[1]-upLeft[1]
                        width = botRight[0]-upLeft[0]
                        newBox.style.left = `${upLeft[0]}px`;
                        newBox.style.top = `${upLeft[1]}px`;
                        newBox.style.width = `${width}px`;
                        newBox.style.height = `${height}px`;
                        newBox.value = item.description
                        console.log(newBox)
                        document.getElementById("large_image").append(newBox)
                    }
                };
            };;
        })
        thumbnailImages[i] = li
    };
    //set images into unordered list "thumbnails"
    thumbList = document.getElementById("thumbnails")
    for (i=0; i<thumbnailImages.length; i++){
        thumbList.appendChild(thumbnailImages[i])
    };
});
