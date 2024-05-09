
import { dataFetch, fetchingDescription } from "./fetching";
import { mainpage } from "./index";

function createTable(category, container, offset, dataSet, books, worksNumber, startIndex) {

    


    // Determination of total number of pages
    let totalPages = Math.floor(worksNumber/16);
    if (worksNumber % 16) {totalPages +=1};

    // Table creation
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

    // Body table creation
    let table = document.getElementById('table');
    let body = document.createElement('tbody');
    let rowElements;

    let rowNumber = 1; 

    for (let i = startIndex; i < (startIndex + 16); i++) {
        let newRow = document.createElement('tr');
        
        // Alternate background color definition on table rows
        if ((i % 2) == 0 | i == 0) {
            rowElements = `
                <td id = "first-column-data${rowNumber}" class="first-column-data">${books[i]?.itemNumber}</td>
                <td class="second-column-data">${books[i]?.author}</td>
                <td class="third-column-data">${books[i]?.title}</td>      
        `;
        } else {
            rowElements = `
                <td id = "first-column-data${rowNumber}" class="first-column-data odd">${books[i]?.itemNumber}</td>
                <td class="second-column-data odd">${books[i]?.author}</td>
                <td class="third-column-data odd">${books[i]?.title}</td>      
        `;
        }   
        if (books[i]) {
            newRow.innerHTML = rowElements;
            body.appendChild(newRow);
            rowNumber +=1; 
        }      
    }
    table.appendChild(body); // Insertion of tbody element after table creation 

    // inputbox and search button hiding, insertion of back button

   
    document.getElementById('text-box').style.display = 'none';
    document.getElementById('search-button').style.display = 'none';
    document.getElementById('back-button-container').style.display = 'block';

    // Table info creation and page changing setting buttons







    // Determination of the progressive value of the last table row if it exists
    let actualTablePage;

    if (startIndex != 0) {
        

        actualTablePage = +document.getElementById('first-column-data16')?.innerText / 16;
        if (actualTablePage == totalPages - 1) {
            
            
            if (isNaN(actualTablePage)) {
                actualTablePage +=1;
            }    
        }
        // actualTablePage = +document.getElementById('first-column-data16').innerText / 16;
    } else {actualTablePage = 1};


    let pagesContainer = document.getElementById('table-pages');

    pagesContainer.innerHTML = `
        <span id="page-back" class="page-back">&lt   </span>` + 'Page   ' + `<span id = "initial-page" class="initial-page">${actualTablePage}</span>` + `   of    ${totalPages}   ` + `<span id="page-forward" class="page-forward">   &gt</span>`;

    // Listener variables definition
    const forwardButton = document.getElementById('page-forward');
    const backButton = document.getElementById('page-back');
    let lastBookNumber;
        
    // Listener on forward button
    forwardButton.addEventListener('click', () => {
        if (!(actualTablePage == totalPages)) { // Verify if we are on the last page of the collection
            let tableIndex = +document.getElementById('first-column-data16')?.innerText;
            if (!(isNaN(tableIndex))) {
                if ((tableIndex % 160) != 0) {
                    startIndex += 16;
                    createTable(category, 'table-container', offset, dataSet, books, worksNumber, startIndex);
                    let pageCounter = document.getElementById('initial-page');
                    pageCounter.innerText = `${tableIndex/16 + 1}`;
                } else {
                    startIndex +=16;
                    if (books.length > startIndex) { // Verify if data already exist in the array 
                        createTable(category, 'table-container', offset, dataSet, books, worksNumber, startIndex);
                    } else {
                        dataFetch(category, tableIndex, (tableIndex/160), books, startIndex);
                    }
                }
            }
        }
        
    }); 

    // Listener on back button 
    backButton.addEventListener('click', () => {
        let index;
        let tableIndex = +document.getElementById('first-column-data16')?.innerText;
        
        if (isNaN(tableIndex) && actualTablePage != 1) {
            tableIndex = worksNumber;
            index = tableIndex - (16 + (tableIndex % 16));
        } else {index = tableIndex - 32}
        if (!(index < 0)) { // Verify if the actual page is the first page
            createTable(category, 'table-container', offset, dataSet, books, worksNumber, index);
        }
    });

    // Listener on book selection
    table.addEventListener('click', (event) => {
        // data collecting on clicked row
        let clickedElement = event.target;
        let parent = clickedElement.parentNode;
        let bookProgressiveNumber = +parent.firstElementChild.innerText-1;
        let choosenBook = books[bookProgressiveNumber];
        
        // call fetching description
        fetchingDescription(choosenBook);
    });

    // Listener on button for returning to the initial page

    const buttontwo = document.getElementById('buttontwo');
    buttontwo.style.marginTop = "-30px";
    
    buttontwo.addEventListener('click', () => {
        
        document.body.innerHTML = mainpage;
        let initialScript = document.createElement('script');
        initialScript.src = '/js/index.js';
        
        document.body.appendChild(initialScript);
        window.location.reload();
    })
}

export {createTable};


