const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loaderDIV');

let photosArray = []; //empty array 
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// unsplash API FETCH REQUEST 
const count = 30;
const apiKEY = 'nozjS30fNHsnkKlfkpG4csZgn5mVs2xLGQ-LeWdSE10';
const apiURL = `https://api.unsplash.com/photos/random/
?client_id=${apiKEY}&count=${count}`;

//IMAGE LOADED FUNCTION - checking if images finished loading.
function imageLoaded() {
    console.log("READY:", ready);
    imagesLoaded++; //increment let var set above
    if (imagesLoaded === totalImages) {
        ready = true; // true when photoArray length reached.
        loader.hidden = true;
        console.log("READY: ", ready);
    }
}


//HELPER FUNCTION setting attributes for DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// CREATE ELEMENTS for returned photos add to dom // SECOND METHOD
function displayPhotos() {
    imagesLoaded = 0;

    totalImages = photosArray.length; //setting totalImages to lenght of photosArray
    console.log("TOTAL IMAGES: ", totalImages);
    //run function on each photo/ each photo is assigned to var called photo within an ARROW function
    photosArray.forEach((photo) => {

        //creates blank anchor element DIV to contain photos
        const anchorDIV = document.createElement('a');
        //CALLING HELPER FUNCTION INSTEAD OF USING REPEATING CODE
        setAttributes(anchorDIV, {
            href: photo.links.html,
            target: '_blank',
        })

        // Create img tag to call the photos
        const img = document.createElement('img');
        //CALLING HELPER FUNCTION INSTEAD OF USING REPEATING CODE
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        //EVENT LISTENER - Check that photos have finished loading
        img.addEventListener('load', imageLoaded());

        //Add img to inside of anchorDIV.
        anchorDIV.appendChild(img);
        //Add anchorDIV (containing img) to image-container DIV 
        imageContainer.appendChild(anchorDIV);
    });
}
// GET PHOTOS FROM API FUNCTION 
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();



    } catch (error) {

    }
}

//checking to see if scroll bar is near bottom of page. If so load more photos/
window.addEventListener('scroll', () => {
    //inner height = browser height/ 
    //scrollY - distance from top of page user has scroll
    //offsetHeight = total height of body element(all loads pictures) but not viewable in browser window. 
    // 1000 px random number
    //ready bool needs to be true
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false; //switches it back once photos loaded
        getPhotos();


    }
})

//PAGE LOAD
getPhotos();


