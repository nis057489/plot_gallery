document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.getElementById('gallery');
    let imageCache = {}; // Cache to store image timestamps

    // Function to load images
    function loadImages() {
        fetch('/api/images')
            .then(response => response.json())
            .then(imageDetails => {
                // Check each image for updates
                imageDetails.forEach(detail => {
                    if (!imageCache[detail.name] || imageCache[detail.name] !== detail.mtime) {
                        // Image has changed or is new, update the cache and image
                        imageCache[detail.name] = detail.mtime;
                        updateImage(detail.name);
                    }
                });
            })
            .catch(error => console.error('Error loading images:', error));
    }

    // Function to update or add an image
    function updateImage(imageName) {
        const existingImg = document.querySelector(`img[src*="${imageName}"]`);
        const imgElement = document.createElement('img');
        imgElement.src = `plots/${imageName}?${new Date().getTime()}`; // Use current time to bypass cache
        imgElement.alt = imageName.split('.')[0];
        imgElement.style.width = '100%';

        const divElement = document.createElement('div');
        divElement.className = 'plot';
        divElement.appendChild(imgElement);

        if (existingImg) {
            existingImg.parentNode.replaceChild(divElement, existingImg.parentNode.firstChild);
        } else {
            gallery.appendChild(divElement);
        }
    }

    // Initial load
    loadImages();

    // Set interval to check for updates every 30 seconds
    setInterval(loadImages, 50);
});
