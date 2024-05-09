let i = 0;

function sentencesLoader(sentences, timing = 5000) {
    /* 
        The function accepts a parameter sentences that is an array of objects "sentence" with two properties: phrase and author. 
        The timing parameter decides how much time after the phrase visible on the screen will be changed.
    */  
    const container = document.getElementById('text-container');
    const textElement = document.createElement('p');
    textElement.innerHTML = sentences[i].phrase + `<br>` + `<span class="author">${sentences[i].author}</span>`;
    textElement.className = 'text';

    container.appendChild(textElement);
    
    if (i != (sentences.length-1)) { i++ } else { i = 0 };
    
    setTimeout(() => {
            container.removeChild(textElement);
            sentencesLoader(sentences, timing);
    }, timing);
    
};

export {sentencesLoader};