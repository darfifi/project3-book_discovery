
let i = 0;
let interval;

function imageLoader(path, timing = 9000) {
        /* 
            The function accepts a parameter that is an array of links to the images we want to load. 
            The timing parameter decides instead the time after that the image changes. 
        */  
        const container = document.getElementById('image-container');
        const imageElement = document.createElement('img');
        imageElement.src = path[i];
        
        imageElement.className = 'main-image';
    
        container.appendChild(imageElement);

        if (i != (path.length-1)) { i++ }
        
        interval = setInterval(() => {
            /* 
               Check on the length of the array of images. In the event we have only one image a loop won't be generated.
            */
            if (i === 0) { stop() } else {
                container.removeChild(imageElement);
                imageLoader(path, timing);
            }
        }, timing); 
};

function stop() {
    clearInterval(interval);
}



function reduceImage(containerId) { // The function reduce the main image to a line with a transition/animation
    let container = document.getElementById(containerId);
    container.style.animation = 'reduce 0.3s linear 0s 1 normal forwards';
    container.style.width = '80%';
    container.style.border = '3px solid rgb(198, 111, 12)'
}

export {imageLoader, reduceImage};




