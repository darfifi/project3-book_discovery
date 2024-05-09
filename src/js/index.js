
import {imageLoader} from "./images_loader.js";
import {sentencesLoader} from "./sentences_loader.js";
import {dataFetch} from "./fetching.js";
import myPicture from '../images/library.js';
import '../images/books-stack.png';
import '../css/index.css';
import '../css/index-other-sizes.css';
import '../css/result-table.css';
import '../css/modal-window.css';
import '../css/modal-window-other-sizes.css';


const mainpage = document.body.innerHTML; // Saving the original HTML structure

const image = myPicture();
let index = image.lastIndexOf('/');
const percorso = image.substring(index);
let imagesPath = [
    `.${percorso}`    
];
imageLoader(imagesPath);

// Definizione dell'array di oggetti "sentence" e relativo caricamento in pagina chiamando la funzione relativa nel modulo sentences_loader.js
const sentences = [
    {phrase: 'A reader lives a thousand lives before he dies. The man who never reads lives only one.', author: 'George R.R. Martin'},
    {phrase: `The more that you read, the more things you will know. The more that you learn, the more places you'll go.`, author: 'Dr. Seuss'},
    {phrase: `You can find magic wherever you look. Sit back and relax, all you need is a book.`, author: 'Dr. Seuss'},
    {phrase: `Today a reader, tomorrow a leader.`, author: 'Margaret Fuller'},
    {phrase: `The journey of a lifetime starts with the turning of a page.`, author: 'Rachel Anders'},
    {phrase: `Books are a uniquely portable magic.`, author: 'Stephen King'},
    {phrase: `Reading is to the mind what exercise is to the body.`, author: 'Joseph Addison'},
    {phrase: `The man who does not read has no advantage over the man who cannot read.`, author: 'Mark Twain'}
];
sentencesLoader(sentences);

// Selezione elementi textbox e button di avvio ricerca 
const textBox = document.getElementById('text-box');
const searchButton = document.getElementById('search-button');

// Listener su textbox che fa sparire la scritta di default non appena la textbox viene selezionata
textBox.addEventListener('click', () => {
    if (textBox.value === 'Search category') {textBox.value = ''}
    
});

// Listener on search button to start fetching.js
searchButton.addEventListener('click', () => {
    let searchParameter = textBox.value;
    if (searchParameter != '') {
        searchParameter = searchParameter.toLowerCase(); // To prevent errors in case the user writes search words with one or more capital letters 
        dataFetch(searchParameter, 0, 0, [], 0);
    }
});

// Listeners on INFO button

const infoButton = document.getElementById('info');
const infoContainer = document.getElementById('info-container');

infoButton.addEventListener('mouseover', () => {

    // Coordinates of the left upper corner of info button
    const infoButtonDimension = infoButton.getBoundingClientRect();
    const xInfoButtonUpperLeft = infoButtonDimension.left;
    const yInfoButtonUpperLeft = infoButtonDimension.top;

    // Positioning of info window
    infoContainer.style.display = 'block';

    infoContainer.style.animation = "expand 0.3s linear 0s 1 normal forwards";
    
    infoContainer.style.top = yInfoButtonUpperLeft + infoButton.clientHeight - 3 + 'px';
    infoContainer.style.left = xInfoButtonUpperLeft - infoContainer.clientWidth +infoButton.clientWidth/2 + 'px'; 
})


infoButton.addEventListener('mouseout', () => {
    document.getElementById('info-container').style.display = 'none';
})

export {mainpage};





