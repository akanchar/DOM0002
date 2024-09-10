document.addEventListener('DOMContentLoaded', function() {
    // Example JSON data with features
    const jsonData = '[{"id": 1, "name": "Mona Lisa", "thumbnail": "monalisa.jpg", "image": "monalisa_large.jpg", "artist": "Leonardo da Vinci", "features": [{"upperLeft": [50, 50], "lowerRight": [150, 150]}]}, {"id": 2, "name": "Starry Night", "thumbnail": "starrynight.jpg", "image": "starrynight_large.jpg", "artist": "Vincent van Gogh", "features": [{"upperLeft": [30, 30], "lowerRight": [100, 100]}]}, {"id": 3, "name": "The Scream", "thumbnail": "thescream.jpg", "image": "thescream_large.jpg", "artist": "Edvard Munch", "features": [{"upperLeft": [20, 20], "lowerRight": [80, 80]}]}]';
    
    // Parse JSON data into a JavaScript object
    const data = JSON.parse(jsonData);
    
    // Generate list of thumbnail images
    const ulElement = document.querySelector('ul');
    data.forEach(painting => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = painting.thumbnail;
        img.alt = painting.name;
        img.dataset.id = painting.id; // Add data-id attribute to identify the painting
        li.appendChild(img);
        ulElement.appendChild(li);
    });

    // Event delegation for handling clicks on thumbnails
    ulElement.addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG') {
            const paintingId = event.target.dataset.id;
            const painting = data.find(p => p.id == paintingId);

            if (painting) {
                const figureElement = document.querySelector('figure');
                const h2Element = document.querySelector('h2');
                const h3Element = document.querySelector('h3');

                // Empty the figure element
                figureElement.innerHTML = '';

                // Display the larger version of the painting
                const img = document.createElement('img');
                img.src = painting.image;
                img.alt = painting.name;
                figureElement.appendChild(img);

                // Display the painting's title and artist
                h2Element.textContent = painting.name;
                h3Element.textContent = painting.artist;

                // Loop through the features array and create rectangles
                painting.features.forEach(feature => {
                    const box = document.createElement('div');
                    box.className = 'box';
                    const [upperLeftX, upperLeftY] = feature.upperLeft;
                    const [lowerRightX, lowerRightY] = feature.lowerRight;
                    box.style.position = 'absolute';
                    box.style.left = `${upperLeftX}px`;
                    box.style.top = `${upperLeftY}px`;
                    box.style.width = `${lowerRightX - upperLeftX}px`;
                    box.style.height = `${lowerRightY - upperLeftY}px`;
                    figureElement.appendChild(box);
                });
            }
        }
    });
});