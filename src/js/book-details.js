
function bookDetails (choosenBook, bookDescription) { // Function that defines HTML to display the results of a choosen book
 
    let author = document.getElementById('author');
    let title = document.getElementById('title');
    let description = document.getElementById('description-container');
    author.innerHTML = `<span>${choosenBook.author}</span>`;
    title.innerHTML = `<em>${choosenBook.title}</em>`;
    description.innerText = bookDescription;

    let container = document.getElementById('modal-window-container');
    let resultWindow = document.getElementById('result-window');
    
    container.style.display = 'block'; // Background window of modal mode activation
    resultWindow.style.display = 'block'; // Result window becomes visible

    let button = document.getElementById('closing-button');
    button.addEventListener('click', () => {
        resultWindow.style.display = 'none';
        container.style.display = 'none';
    })
}

export {bookDetails};