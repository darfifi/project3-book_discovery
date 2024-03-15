

let i = 0;

function sentencesLoader(sentences, timing = 2000) {
    /* 
        La funzione accetta un parametro sentences costituito da un array di oggetti "sentence" conteneti due proprietà: 
        phrase ed author ed un parametro di timing (default a 9000 ms) che decide dopo quanto tempo verrà cambiata la frase 
        visibile a schermo.
    */  
    const container = document.getElementById('text-container');
    const textElement = document.createElement('p');
    textElement.innerHTML = sentences[i].phrase + `<br>` + `<spam class="author">${sentences[i].author}</spam>`;
    textElement.className = 'text';

    container.appendChild(textElement);
    
    if (i != (sentences.length-1)) { i++ } else { i = 0 };
    
    setTimeout(() => {
            container.removeChild(textElement);
            sentencesLoader(sentences, timing);
    }, timing);
    
};

export {sentencesLoader};