
import {reduceImage} from "./images_loader.js";
import {createTable} from "./result-table.js";

function dataFetch(category, offset, dataSet = 0) {
    const link = `http://openlibrary.org/subjects/`+ category + '.json' + `?offset=${offset}` + '&' + 'limit=160'; 
    fetch(link)
        .then(response => response.json())
        .then(obj => {
            let totalResults = obj.work_count;
            let packagesNumber = Math.floor(totalResults/160);
            let books = [];
            let book = {};
            let progressiveNumber = 1;
            for (const elem of obj.works) {
                if (elem.authors.length = 1) {
                    book = {
                        author: elem.authors[0].name,
                        title: elem.title,
                        itemNumber: progressiveNumber + offset * dataSet
                    };
                    books.push(book);
                    progressiveNumber += 1;
                } else if (elem.authors.length > 1) {
                    for (let i = 0; i < elem.authors.length - 1; i++) {
                        const authors = [];
                        authors.push(elem.authors[i].name);
                        book = {
                            author: authors,
                            title: elem.title,
                            itemNumber: progressiveNumber + offset * dataSet
                        }; 
                        books.push(book);
                        progressiveNumber += 1;
                    }
                }
            }
            reduceImage('image-container');
            createTable(category, 'table-container', books, totalResults);
        })
        /*
        .then(key => fetch(`http://openlibrary.org${key}.json`))
        .then(risposta => risposta.json())
        .then(oggetto => alert(oggetto.description)); */
}

export {dataFetch};









