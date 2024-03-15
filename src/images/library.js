import library from './library.png';

function picture() {
    const immagine = new Image();
    immagine.src = library;
    return immagine.src;
}

export default picture;


