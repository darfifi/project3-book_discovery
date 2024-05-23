
import {reduceImage} from "./images_loader.js";
import {bookDetails} from "./book-details";
import {loadingEffect} from "./loading-effect.js";
import {MissingCategory, ValidationError, showError, closeError} from "./errors.js";


export default function dataFetch(category, offset, dataSet, books, startIndex) {
    
    // Elements preparation
    let container = document.getElementById('modal-window-container');
    let searchingMessageBefore = document.getElementById('searching-message-before');
    let searchingMessageAfter = document.getElementById('searching-message-after');
    let errorMessage = document.getElementById('error-message');
    
    try { // Errors management
        if (category === 'Search category') throw new ValidationError('You have to fill in with a valid category!');
        if (category.includes(' ')) throw new ValidationError('No spaces admitted in the search category!');
        if (category === ' ') throw new MissingCategory('No category specified!');
    
        // Search link creation
        const link = `https://openlibrary.org/subjects/`+ category + '.json' + `?offset=${offset}` + '&' + 'limit=160';

        // Code to display the search activity to the user
        container.style.display = 'block';
        if (offset == 0) {
            searchingMessageBefore.style.display = 'block';
            loadingEffect('before'); 
        } else {
            searchingMessageAfter.style.display = 'block';
            loadingEffect('after');
        }

        fetch(link) 
            .then(response => {
                if (!response.ok) {throw new Error('Error on request: ' + error.message)}
                return response.json();
            })
            .then(obj => {
                // Closing the modal window and its content
                container.style.display = 'none';
                searchingMessageBefore.style.display = 'none';
                searchingMessageAfter.style.display = 'none';
            try {
                let worksNumber = obj.work_count; // Total number of books under choosen category
                if (worksNumber == 0) throw new MissingCategory('No works available for this category!');
                
                // Variables inizialization
                let book = {}; // A specific book object
                let progressiveNumber = 1;
            
                // Filling array books with dataset books
                for (const elem of obj.works) {
                    if (elem.authors.length = 1) {
                        book = {
                            itemNumber: progressiveNumber + 160 * dataSet,
                            author: elem.authors[0]?.name,
                            title: elem.title,
                            key: elem.key
                        };
                        books.push(book);
                        progressiveNumber += 1;
                    } else if (elem.authors.length > 1) { // A book can have more than one author
                        for (let i = 0; i < (elem.authors.length - 1); i++) {
                            const authors = [];
                            authors.push(elem.authors[i].name);
                            book = {
                                itemNumber: progressiveNumber + 160 * dataSet,
                                author: authors,
                                title: elem.title,
                                key: elem.key
                            }; 
                            books.push(book);
                            progressiveNumber += 1;
                        }
                    } 
                }

                // Setting dataset for the next group of data 
                dataSet = books.length / 160
                if (dataSet > (worksNumber / 160)) {dataSet += 1};

                // Table visulization preparation
                reduceImage('image-container'); // The main image is reduced to a line
                import('.//result-table')
                .then(module => {
                    const createTable = module.default;
                    createTable(category, 'table-container', offset, dataSet, books, worksNumber, startIndex); // Function to create the table
                })
                

            } catch(error) {
                container.style.display = 'block';
                errorMessage.innerHTML = showError(error.name, error.message);
                closeError(container, errorMessage);
                errorMessage.style.display = 'flex';   
            }
        })
        
        .catch((error) => {  
            searchingMessageBefore.style.display = 'none';
            searchingMessageAfter.style.display = 'none';
            container.style.display = 'block';

            errorMessage.innerHTML = showError(error.name, error.message);
            closeError(container, errorMessage);
            errorMessage.style.display = 'flex';
        });

    } catch(error) {
        container.style.display = 'block';
        errorMessage.innerHTML = showError(error.name, error.message);
        closeError(container, errorMessage);
        errorMessage.style.display = 'flex';
    }
}

function fetchingDescription (choosenBook) { // The function provides the description of the choosen book
    const link = `https://openlibrary.org`+ choosenBook.key + '.json';
    fetch(link)
        .then(response => response.json())
        .then(obj => {
        let bookDescription;
        if (!obj.description) {
            bookDescription = 'Soory, at the moment no description available for this work!';
            bookDetails(choosenBook, bookDescription);
        } else {
            if (typeof(obj.description) == "object") {
                bookDescription = obj.description.value;
            } else {
                bookDescription = obj.description;
            }
        }
            bookDetails(choosenBook, bookDescription);
        }
        )};

export {fetchingDescription};









