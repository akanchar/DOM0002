document.addEventListener('DOMContentLoaded', function () {
    // Assuming the JSON data is stored in a variable named 'paintingsData'
    const paintingsData = JSON.parse(content); // Parses the JSON data to JavaScript object
    const paintingList = document.querySelector('#paintings ul'); // Selects the <ul> element
    const figureElement = document.querySelector('figure');
    const titleElement = document.querySelector('#title');
    const artistElement = document.querySelector('#artist');
    const descriptionElement = document.querySelector('#description'); // Updated ID to match CSS

    // Loop through the paintings array and create thumbnail images
    paintingsData.forEach(painting => {
        const listItem = document.createElement('li'); // Creates a new <li> element
        listItem.innerHTML = `<img src="images/small/${painting.id}.jpg" data-id="${painting.id}" alt="${painting.title}" class="thumbnail">`; // Adds thumbnail images with the corresponding data-id
        paintingList.appendChild(listItem); // Appends the <li> to the <ul> element
    });
    
    paintingList.addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG') {
            const paintingId = event.target.dataset.id;
            const selectedPainting = paintingsData.find(p => p.id === paintingId);

            // Clear the figure and feature description elements
            figureElement.innerHTML = '';
        

            // Create a large image for the selected painting
            const largeImage = document.createElement('img');
            largeImage.src = `images/large/${selectedPainting.id}.jpg`;
            largeImage.alt = selectedPainting.title;
            figureElement.appendChild(largeImage);

            titleElement.textContent = selectedPainting.title;
            artistElement.textContent = selectedPainting.artist;

            selectedPainting.features.forEach(feature => {
                const box = document.createElement('div');
                box.classList.add('box');

                // Set the CSS properties for the recetangle
                const [upperLeftX, upperLeftY] = feature.upperLeft;
                const [lowerRightX, lowerRightY] = feature.lowerRight;

                box.style.position = 'absolute';
                box.style.left = upperLeftX + 'px';
                box.style.top = upperLeftY + 'px';
                box.style.width = (lowerRightX - upperLeftX) + 'px';
                box.style.height = (lowerRightY - upperLeftY) + 'px';

                // Append the rectangle to the figure element
                figureElement.appendChild(box);

                // ADd mouseover event to display feature description when hovering over the rectangle
                box.addEventListener('mouseover', function () {
                    descriptionElement.textContent = feature.description;
                });

                // Add mouseout event to clear the feature description when the mouse leaves
                box.addEventListener('mouseout', function () {
                    descriptionElement.textContent = '';
                })
            })
        }
    }); 
});
