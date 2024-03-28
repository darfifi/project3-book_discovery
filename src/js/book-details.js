


function bookDetails (choosenBook, bookDescription) {
 
    let author = document.getElementById('author');
    let title = document.getElementById('title');
    let description = document.getElementById('description-container');
    author.innerHTML = `<span>${choosenBook.author}</span>`;
    title.innerHTML = `<em>${choosenBook.title}</em>`;
    description.innerText = bookDescription;

    let container = document.getElementById('modal-window');
    container.style.display = 'block';

    let button = document.getElementById('closing-button');
    button.addEventListener('click', () => {
        container.style.display = 'none';
    })
}




export { bookDetails };