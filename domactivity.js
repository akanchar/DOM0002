/* add your code here */
/* add your code here */

document.addEventListener ('DOMContentLoaded', (event) => {

    const paintings = JSON.parse(content);
    // getting the section id paintings into javascript code (from the dom activity html)
    var paintingSection = document.getElementById('paintings');

    var paintingList = null;
    // if the section id paintings has a child node (in our case, it's <ul>)
    if (paintingSection.hasChildNodes() && paintingSection.children[0].nodeName == "UL") { 
        paintingList = paintingSection.children[0];
    }

    else {


    }

    for (var i = 0; i < paintings.length; i++) {
        // Create an <li> element for each painting
        var li = document.createElement('li');

        // Create an <img> element for the thumbnail
        var thumbnail = document.createElement('img');
        thumbnail.src = 'images/small/' + paintings[i].id + '.jpg'; // Set the image source to the thumbnail
        thumbnail.alt = paintings[i].title; // Set alt text for accessibility
        thumbnail.id = paintings[i].id;
        thumbnail.addEventListener('click', (event) =>  {
            document.getElementsByTagName("figure")[0].innerHTML = "";
            var largeImage = document.createElement('img');
            largeImage.src = 'images/large/' + event.target.id + '.jpg'; // Set the image source to the thumbnail
            document.getElementsByTagName("figure")[0].innerHTML = "";
            document.getElementsByTagName("figure")[0].appendChild(largeImage);

            for (var j = 0; j < paintings.length; j++) {
                if (paintings[j].id == event.target.id) {
                    document.getElementById("title").innerHTML = paintings[j].title
                    document.getElementById("artist").innerHTML = paintings[j].artist
            
                    for (var k = 0; k < paintings[j].features.length; k++) {
                        var rectangleLeft = paintings[j].features[k].upperLeft[0];
                        var rectangleTop = paintings[j].features[k].upperLeft[1];
                        var rectangleWidth = paintings[j].features[k].lowerRight[0] - paintings[j].features[k].upperLeft[0];
                        var rectangleHeight = paintings[j].features[k].lowerRight[1] - paintings[j].features[k].upperLeft[1];
                        var featurediv = document.createElement('div');
                        featurediv.className = "box"; 
                        featurediv.id = paintings[j].id + "|" + k;
                        featurediv.setAttribute("style","position: absolute; width: "  + rectangleWidth + "px; height:" + rectangleHeight + "px; top:" +rectangleTop+ "px; left:" +rectangleLeft+ "px;")
                        document.getElementsByTagName("figure")[0].appendChild(featurediv);

                        featurediv.addEventListener('mouseover', (event) =>  {
                            var eventID = event.target.id;
                            const idArray = eventID.split("|");
                            for (var l = 0; l < paintings.length; l++) {
                                for (var m = 0; m < paintings[l].features.length; m++) {
                                    if ((paintings[l].id == idArray[0]) && (m == idArray[1])) {
                                        document.getElementById("description").innerHTML = paintings[l].features[m].description;
                                }
                                }
                            }
                        });
                        featurediv.addEventListener('mouseout', (event) =>  {
                                        document.getElementById("description").innerHTML = "";
                        });
                    }
                }
            }
        });

           // Append the thumbnail to the <li>
           li.appendChild(thumbnail);

           // Append the <li> to the <ul>
           paintingList.appendChild(li);
    }
});
