document.addEventListener('DOMContentLoaded', function() {
    // Assuming paintings.json content is stored in a variable called content
    const paintingsData = JSON.parse(content);
    const thumbnailList = document.querySelector('ul');
    const figure = document.querySelector('figure');
    const title = document.querySelector('h2');
    const artist = document.querySelector('h3');
    const description = document.querySelector('#description');

    // Load thumbnails
    paintingsData.forEach(painting => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = `images/small/${painting.id}.png`;  // Set the thumbnail image
        img.alt = painting.title;  // Add alt text for accessibility
        img.dataset.id = painting.id;  // Store painting id in dataset for easy retrieval
        li.appendChild(img);
        thumbnailList.appendChild(li);
    });

    // Event delegation to handle painting clicks
    thumbnailList.addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG') {
            const paintingId = event.target.dataset.id;
            const painting = paintingsData.find(p => p.id === paintingId);

            // Clear the current figure content
            figure.innerHTML = '';

            // Set the large image, title, and artist
            const largeImg = document.createElement('img');
            largeImg.src = `images/large/${painting.id}.jpg`;
            largeImg.alt = painting.title;
            figure.appendChild(largeImg);
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
                    description.textContent = feature.description;
                });
                box.addEventListener('mouseout', function() {
                    description.textContent = '';
                });

                figure.appendChild(box);
            });
        }
    });
});
