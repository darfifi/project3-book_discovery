
import {imageLoader} from "./images_loader.js";
import {sentencesLoader} from "./sentences_loader.js";
import {dataFetch} from "./fetching.js";
import myPicture from '../images/library.js';
import '../images/books-stack.png';
import '../css/style1.css';
import '../css/result-table.css';


// Immagazzinamento della struttura principale HTML
const mainpage = document.documentElement.outerHTML;

const buttontwo = document.getElementById('buttontwo');
buttontwo.addEventListener('click', () => {
    document.documentElement.innerHTML = mainpage;
})

const immagine = myPicture();
let index = immagine.lastIndexOf('/');
const percorso = immagine.substring(index);
let imagesPath = [
    '.' + percorso    
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

// Listener su bottone di ricerca che avvia la ricerca chiamando la funzione relativa nel modulo fetching.js
searchButton.addEventListener('click', () => {
    if (textBox.value != '') {
        dataFetch(textBox.value, 0, 0, [], 0);
    }
});








