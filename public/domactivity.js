// Path to the folder where images are stored
const imageFolder = './images/small/';

// Get reference to the <ul> inside <section id="paintings">
const paintingsSection = document.getElementById("paintings1");

// Array of image file names
const imageFiles = [
    "005010", 
    "095010",
    "099160",
    "100030",
    "101030",
    "104020",
    "105010",
    "105040",
    "118050"
];

// Function to fetch the paintings data from paintings.json
fetch('paintings.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();  // Parse the JSON from the response
  })
  .then(content => {
    // Once the JSON is loaded, use it in the rest of the code
    
    function getPaintingById(id) {
        const painting = content.find(p => p.id === id); // Look for the painting by id
        if (painting) {
          console.log("Painting found:");
          console.log("Artist:", painting.artist);
          console.log("Year:", painting.year);
          console.log("Title:", painting.title);
          console.log("Museum:", painting.museum);
          const title = document.getElementById('title');
          title.innerText = painting.title
          const artist = document.getElementById('artist');
          artist.innerText = painting.artist

          createHoverableBoxes(painting.features);
        } else {
          console.log(`Painting with ID ${id} not found.`);
        }
      }

    function loadPaintingInfo(e) {
        if (e.type === "click") {
            // Get the clicked image
            const clickedImage = e.target;
            
            // Extract the filename from the clicked image's src
            const imageFileName = clickedImage.src.split('/').pop().replace('.jpg', '');

            // Construct the URL for the larger image
            const largeImageUrl = `images/large/${imageFileName}.jpg`;
            
            // Update the larger image's src attribute
            const fullImage = document.getElementById('full');
            fullImage.src = largeImageUrl;

            // Get the painting information by ID
            getPaintingById(imageFileName);
        }
    }

    // Loop through each image file
    imageFiles.forEach(image => {
        // Create a new <li> element
        const listItem = document.createElement('li');
        listItem.classList.add("paintings");

        // Create an <img> element
        const imgElement = document.createElement('img');
        imgElement.src = `images/small/${image}.jpg`;
        imgElement.alt = image;  // You can set a more descriptive alt text here
        imgElement.classList.add("paintings");
        
        // Append the <img> to the <li>
        listItem.appendChild(imgElement);

        // Add event listener to handle clicks
        listItem.addEventListener("click", loadPaintingInfo);
        
        // Append the <li> to the <ul>
        paintingsSection.appendChild(listItem);
    });

    

      // Function to create hoverable boxes based on the features' coordinates
    // Function to create hoverable boxes based on the features' coordinates
    function createHoverableBoxes(features) {
        const imageContainer = document.getElementById('image-container'); // The container for the full image

        // Remove any existing hoverable boxes
        document.querySelectorAll('.box').forEach(box => box.remove());

        // Loop through each feature and create a box based on coordinates
        features.forEach((feature, index) => {
            const box = document.createElement('div');
            box.classList.add('box');
            
            // Set the position and dimensions of the box based on the coordinates
            const upperLeft = feature.upperLeft;
            const lowerRight = feature.lowerRight;
            const width = lowerRight[0] - upperLeft[0];
            const height = lowerRight[1] - upperLeft[1];
            
            box.style.position = 'absolute'; // Make the box absolutely positioned
            box.style.left = `${upperLeft[0]}px`;
            box.style.top = `${upperLeft[1]}px`;
            box.style.width = `${width}px`;
            box.style.height = `${height}px`;

            // Add event listeners for hover to update the description
            box.addEventListener('mouseover', () => {
                document.getElementById('description').innerText = feature.description;
                console.log(feature.description)
            });

            box.addEventListener('mouseout', () => {
                document.getElementById('description').innerText = 'Hover over image to see descriptions'; // Clear description when not hovering
            });

            // Append the hoverable box to the image container
            imageContainer.appendChild(box);
        });
    }


  })
  .catch(error => {
    console.error('Error fetching the paintings:', error);
  });