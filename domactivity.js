document.addEventListener('DOMContentLoaded', function () {
    // Assuming the JSON data is stored in a variable named 'paintingsData'
    const paintingsData = JSON.parse(content); // Parses the JSON data to JavaScript object
    const paintingList = document.querySelector('#paintings ul'); // Selects the <ul> element for the list of paintings
    const figureElement = document.querySelector('figure'); // Selects the <figure> element where large images and rectangles will be displayed
    const titleElement = document.querySelector('#title'); // Selects the <h1> or similar element for painting title
    const artistElement = document.querySelector('#artist'); // Selects the <h2> or similar element for painting artist
    const descriptionElement = document.querySelector('#description'); // Selects the <p> or similar element for displaying feature descriptions

    // Loop through the paintings array and create thumbnail images
    paintingsData.forEach(painting => {
        const listItem = document.createElement('li'); // Creates a new <li> element for each painting
        listItem.innerHTML = `<img src="images/small/${painting.id}.jpg" data-id="${painting.id}" alt="${painting.title}" class="thumbnail">`; // Adds thumbnail images with the corresponding data-id attribute
        paintingList.appendChild(listItem); // Appends the <li> element to the <ul> element
    });
    
    // Event listener for clicks on the painting thumbnails
    paintingList.addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG') { // Checks if the clicked element is an <img> tag
            const paintingId = event.target.dataset.id; // Gets the data-id of the clicked image
            const selectedPainting = paintingsData.find(p => p.id === paintingId); // Finds the painting object from the data

            // Clear the figure element before adding new content
            figureElement.innerHTML = '';

            // Create and display a large image for the selected painting
            const largeImage = document.createElement('img');
            largeImage.src = `images/large/${selectedPainting.id}.jpg`;
            largeImage.alt = selectedPainting.title;
            figureElement.appendChild(largeImage);

            // Update title and artist information
            titleElement.textContent = selectedPainting.title;
            artistElement.textContent = selectedPainting.artist;

            // Loop through features and create rectangles for each feature
            selectedPainting.features.forEach(feature => {
                const box = document.createElement('div');
                box.classList.add('box'); // Apply the box class for styling

                // Set the CSS properties for the rectangle
                const [upperLeftX, upperLeftY] = feature.upperLeft;
                const [lowerRightX, lowerRightY] = feature.lowerRight;

                box.style.position = 'absolute'; // Position the rectangle absolutely within the figure
                box.style.left = upperLeftX + 'px'; // Set the left position
                box.style.top = upperLeftY + 'px'; // Set the top position
                box.style.width = (lowerRightX - upperLeftX) + 'px'; // Calculate and set the width
                box.style.height = (lowerRightY - upperLeftY) + 'px'; // Calculate and set the height

                // Append the rectangle to the figure element
                figureElement.appendChild(box);

                // Add mouseover event to display feature description when hovering over the rectangle
                box.addEventListener('mouseover', function () {
                    descriptionElement.textContent = feature.description; // Display the feature description
                });

                // Add mouseout event to clear the feature description when the mouse leaves
                box.addEventListener('mouseout', function () {
                    descriptionElement.textContent = ''; // Clear the feature description
                });
            });
        }
    }); 
});
