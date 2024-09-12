/* add your code here */
document.addEventListener('DOMContentLoaded', function () {
    // Assuming the JSON data is stored in a variable named 'paintingsData'
    const paintingsData = JSON.parse(content); // Parses the JSON data to JavaScript object
    const paintingList = document.querySelector('#paintings ul'); // Selects the <ul> element
    const figureElement = document.querySelector('figure');
    const titleElement = document.querySelector('#title');
    const artistElement = document.querySelector('#artist');

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

            figureElement.innerHTML = '';

            const largeImage = document.createElement('img');
            largeImage.src = `images/large/${selectedPainting.id}.jpg`; // Set the path to the larger image using the id
            largeImage.alt = selectedPainting.title;
            figureElement.appendChild(largeImage);

            titleElement.textContent = selectedPainting.title;
            artistElement.textContent = selectedPainting.artist;
        }
    }) 
});