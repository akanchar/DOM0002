/* add your code here */

addEventListener("DOMContentLoaded", (event) => {
    var information = JSON.parse(content);
    var ids = [];
    var thumbnailImages = [];
    for (i = 0; i<information.length; i++) {
        ids[i] = information[i].id
        var temp = document.createElement("img")
        temp.src = "/images/small/"+ids[i]+".jpg"
        var li = document.createElement("li")
        li.appendChild(temp)
        thumbnailImages[i] = li
    };
    console.log(thumbnailImages)
    thumbList = document.getElementById("thumbnails")
    for (i=0; i<thumbnailImages.length; i++){
        thumbList.appendChild(thumbnailImages[i])
    };
});
