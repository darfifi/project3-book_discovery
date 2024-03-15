
let i = 0;
let interval;

function imageLoader(path, timing = 9000) {
        /* 
            La funzione accetta un parametro path costituito da un array di link relativio alle immagini che si vogliono caricare 
            ed un parametro di timing (default a 9000 ms) che decide dopo quanto tempo 
        
        */  
        const container = document.getElementById('image-container');
        const elementoImmagine = document.createElement('img');
        elementoImmagine.src = path[i];
        
        elementoImmagine.className = 'main-image';
    
        container.appendChild(elementoImmagine);

        if (i != (path.length-1)) { i++ }
        
        interval = setInterval(() => {
            /* 
               Controllo sulla lunghezza dell'array immagini. Nel caso ci fosse una sola immagine non si genera un loop 
               di caricamento delle immagini.
            */
            if (i === 0) { stop() } else {
                container.removeChild(elementoImmagine);
                imageLoader(path, timing);
            }
        }, timing); 
};

function stop() {
    clearInterval(interval);
}

function reduceImage(containerId) {
    let container = document.getElementById(containerId);
    
    container.style.animation = 'reduce 0.3s linear 0s 1 normal forwards';
    container.style.width = '80%';
    container.style.border = '3px solid rgb(198, 111, 12)';
    
}

export {imageLoader, reduceImage};




