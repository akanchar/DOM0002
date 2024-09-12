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
        thisId = ids[i]
        //create list element and store image in list element
        var li = document.createElement("li")
        li.appendChild(temp)
        li.addEventListener("click", (event) =>{
            console.log(event.target)
            identifier = event.target
            for (i = 0; i<information.length; i++){
                console.log("click", identifier)
                if (information[i].id == identifier){
                    let loc = document.getElementById("full")
                    loc.src = "/images/large/"+thisId+".jpg"
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
