// Nathaniel Gonzalez
// CSC 350-1
// IN-class DOM activity 002

/*
    Sources:
    - Creating an event handler
        https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event

    - Adding and modifying DOM elements
        https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

    - Event delegation in JavaScript
        https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation

    - Handling mouseover and mouseout events
        https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event

    - Setting CSS properties with JavaScript
        https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style

    - JSON.parse method
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse

    -  Debugging and refining logic with assistance from ChatGPT

*/



/* add your code here */

// DOMContentLoaded event handler
document.addEventListener('DOMContentLoaded', () => {

    const paintings = JSON.parse(content);
    const paintingSection = document.getElementById('paintings');
    let paintingList = paintingSection.querySelector('ul') || document.createElement('ul');

    paintings.forEach(painting => {
        let li = document.createElement('li');
        let thumbnail = document.createElement('img');
        thumbnail.src = `images/small/${painting.id}.jpg`;
        thumbnail.alt = painting.title;
        thumbnail.id = painting.id;

        // event listener for thumbnail click
        thumbnail.addEventListener('click', () => {
            const figure = document.querySelector('figure');
            figure.innerHTML = "";

            let largeImage = document.createElement('img');
            largeImage.src = `images/large/${painting.id}.jpg`;
            figure.appendChild(largeImage);

            document.getElementById('title').textContent = painting.title;
            document.getElementById('artist').textContent = painting.artist;

            // create feature boxes
            painting.features.forEach((feature, index) => {
                let featureDiv = document.createElement('div');
                featureDiv.className = 'box';
                featureDiv.style = `position: absolute; 
                                    width: ${feature.lowerRight[0] - feature.upperLeft[0]}px; 
                                    height: ${feature.lowerRight[1] - feature.upperLeft[1]}px; 
                                    top: ${feature.upperLeft[1]}px; 
                                    left: ${feature.upperLeft[0]}px;`;

                featureDiv.id = `${painting.id}|${index}`;
                featureDiv.addEventListener('mouseover', () => {
                    document.getElementById('description').textContent = feature.description;
                });
                featureDiv.addEventListener('mouseout', () => {
                    document.getElementById('description').textContent = '';
                });
                figure.appendChild(featureDiv);
            });
        });

        li.appendChild(thumbnail);
        paintingList.appendChild(li);
    });

    paintingSection.appendChild(paintingList);

});
