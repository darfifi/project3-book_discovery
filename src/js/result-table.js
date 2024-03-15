
import { dataFetch } from "./fetching";

function createTable(category, container, books, worksNumber, referenceNumber = 0) {

    // Determinazione di numero di pagine totali per scorere l'intera ricerca
    let pagesNumber = Math.floor(worksNumber/16);
    if (worksNumber % 16) {pagesNumber +=1};

    // Creazione testa tabella
    const tableContainer = document.getElementById(container);
    tableContainer.innerHTML = `
            <table id="table">
                <thead>
                    <tr>
                        <th class = "first-column-data progressive-number" scope='col'>#</th>
                        <th class = "second-column-data table-author" scope='col'>Author</th>
                        <th class = "third-column-data table-title" scope='col'>Title</th>
                    </tr>
                </thead>
            </table>
    `;

    // Creazione del body della tabella
    let table = document.getElementById('table');
    let body = document.createElement('tbody');
    let rowElements;

    let rowNumber = 1;


    for (let i = referenceNumber; i < (referenceNumber + 16); i++) {
        let newRow = document.createElement('tr');
        if ((i % 2) == 0 | i == 0) {
            rowElements = `
                <td id = "first-column-data${rowNumber}" class="first-column-data">${books[i].itemNumber}</td>
                <td class="second-column-data">${books[i].author}</td>
                <td class="third-column-data">${books[i].title}</td>      
        `;
        } else {
            rowElements = `
                <td id = "first-column-data${rowNumber}" class="first-column-data odd">${books[i].itemNumber}</td>
                <td class="second-column-data odd">${books[i].author}</td>
                <td class="third-column-data odd">${books[i].title}</td>      
        `;
        }    
        newRow.innerHTML = rowElements
        body.appendChild(newRow);
        table.appendChild(body);
        rowNumber +=1;   
    }
    document.getElementById('text-box').style.display = 'none';
    document.getElementById('search-button').style.display = 'none';
    tablePages(category, pagesNumber, books, worksNumber);
};

function tablePages(category, pages, books, totalResults) {
    let container = document.getElementById('table-pages');
    container.innerHTML = `
        <span class="page-back">&lt   </span>` + 'Page   ' + `<span class="initial-page">1</span>` + `   of    ${pages}   ` + `<span id="page-forward" class="page-forward">   &gt</span>`;
    
    
    // Inserimento listener per cambio pagina
        const forwardButton = document.getElementById('page-forward');
        forwardButton.addEventListener('click', () => {
        
        let tableIndex = +document.getElementById('first-column-data16').innerText;

        
        if ((tableIndex % 160) != 0) {
            createTable(category, 'table-container', books, totalResults, tableIndex);
        } else {
            dataFetch(category, (tableIndex + 1), (tableIndex/160));
        }
        

    });  
}
        

export {createTable};
