//believe this was file that we made to work on code together and not ruin main code file b/c of isssues
// we were having with github that normal file (domactivity.js) should be our main file


document.addEventListener('DOMContentLoaded', function() {
    // Fetch the paintings.json file
    fetch('paintings.json')
        .then(response => response.json())
        .then(data => {
            // Process the JSON data once it's loaded
            paintings(data);
        })

    // Helper function to load an image with flexible file extensions
    // Source: ChatGPT
    function getImagePath(basePath, imageName) {
        const jpgPath = `${basePath}/${imageName}.jpg`;
        const pngPath = `${basePath}/${imageName}.png`;
        const img = new Image();

        return new Promise((resolve) => {
            img.onload = () => resolve(jpgPath);
            img.onerror = () => {
                img.src = pngPath;
                img.onload = () => resolve(pngPath);
            };
            img.src = jpgPath;
        });
    }

    // Load thumbnails
    function paintings(data) {
        const ulElement = document.querySelector('#paintings ul');
        data.forEach(painting => {
            const li = document.createElement('li');
            const img = document.createElement('img');

            getImagePath('images/small', painting.id).then(smallImagePath => {
                img.src = smallImagePath;  // Set the thumbnail image
                img.alt = painting.title;  // Add alt text for accessibility
                img.dataset.id = painting.id;  // Store painting id in dataset for easy retrieval
                li.appendChild(img);
                ulElement.appendChild(li);
            });
        });

        // Event delegation to handle painting clicks
        ulElement.addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG') {
            const paintingId = event.target.dataset.id;
            const painting = data.find(p => p.id === paintingId);

            if (painting) {
                const figureElement = document.querySelector('figure');
                const titleElement = document.querySelector('#title');
                const artistElement = document.querySelector('#artist');
                const descriptionElement = document.querySelector('#description');

                // Clear the previous image and features from the <figure> element
                figureElement.innerHTML = '';
                descriptionElement.textContent = ''; // Also clear the previous description

                // Set the large image, title, and artist
                getImagePath('images/large', painting.id).then(largeImagePath => {
                    const fullImg = document.createElement('img');
                    fullImg.src = largeImagePath;
                    fullImg.alt = painting.title;
                    fullImg.id = 'full';
                    figureElement.appendChild(fullImg);
                });

                title.textContent = painting.title;
                artist.textContent = painting.artist;

                // Add feature rectangles
                painting.features.forEach(feature => {
                    const box = document.createElement('div');
                    box.classList.add('box');
                    const [x1, y1] = feature.upperLeft;
                    const [x2, y2] = feature.lowerRight;
                    const width = x2 - x1;
                    const height = y2 - y1;
                    box.style.left = `${x1}px`;
                    box.style.top = `${y1}px`;
                    box.style.width = `${width}px`;
                    box.style.height = `${height}px`;
                    box.style.position = 'absolute';

                    // Mouseover and mouseout events for showing the description
                    box.addEventListener('mouseover', function() {
                        descriptionElement.textContent = feature.description;
                    });
                    box.addEventListener('mouseout', function() {
                        descriptionElement.textContent = '';
                    });

                    figureElement.appendChild(box);
                });
            }
        }
        });
    }
});