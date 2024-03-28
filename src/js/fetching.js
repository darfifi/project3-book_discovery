
import {reduceImage} from "./images_loader.js";
import {createTable} from "./result-table.js";
import { bookDetails } from "./book-details";



function dataFetch(category, offset, dataSet, books, startIndex) {
    // Definizione del link per il fetch dei dati dal server
    const link = `http://openlibrary.org/subjects/`+ category + '.json' + `?offset=${offset}` + '&' + 'limit=160'; 
    fetch(link)
        .then(response => response.json())
        .then(obj => {
            
            // Recupero dato relativo al numero di libri sotto la categoria scelta
            let worksNumber = obj.work_count;
            
            // Inizializzazione variabili
            let book = {};
            let progressiveNumber = 1;
            
            // Popolamento array books con dataset libri
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
                    } else if (elem.authors.length > 1) {
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

            // Impostazione del dataset per gruppo dati successivo 
            dataSet = books.length / 160
            if (dataSet > (worksNumber / 160)) {dataSet += 1};

            // Preparazione alla visualizzazione della tabella
            reduceImage('image-container');
            createTable(category, 'table-container', offset, dataSet, books, worksNumber, startIndex);
        })
}

function fetchingDescription (choosenBook) {
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


export {dataFetch, fetchingDescription};









