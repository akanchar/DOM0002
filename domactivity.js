/* add your code here */
document.addEventListener('DOMContentLoaded', function () {
    // Assuming the JSON data is stored in a variable named 'paintingsData'
    const paintingsData = JSON.parse(content); // Parses the JSON data to JavaScript object
    const paintingList = document.querySelector('#paintings ul'); // Selects the <ul> element

    // Loop through the paintings array and create thumbnail images
    paintingsData.forEach(painting => {
        const listItem = document.createElement('li'); // Creates a new <li> element
        listItem.innerHTML = `<img src="thumbnails/${painting.id}.jpg" data-id="${painting.id}" alt="${painting.title}" class="thumbnail">`; // Adds thumbnail images with the corresponding data-id
        paintingList.appendChild(listItem); // Appends the <li> to the <ul> element
    });
 
});