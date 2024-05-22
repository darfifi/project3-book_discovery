
import library from './library-1.webp';

function picture() {
    const immagine = new Image();
    immagine.src = library;
    return immagine.src;
}

export default picture;


