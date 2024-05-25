
import { fetchingDescription } from "./fetching";
import { mainpage } from "./index";

export default function createTable(category, container, offset, dataSet, books, worksNumber, startIndex) {

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

    
    // Determination of the progressive value of the table page
    let actualTablePage;

    if (startIndex != 0) {
        actualTablePage = +document.getElementById('first-column-data16')?.innerText / 16;
        if (actualTablePage == totalPages - 1) {
            if (isNaN(actualTablePage)) {
                actualTablePage +=1; // This is the last increment (The last page) when we obtain NaN on the actualTablePage calculation
            }    
        }
        // actualTablePage = +document.getElementById('first-column-data16').innerText / 16;
    } else {
        actualTablePage = 1}; // We are at the first page if startIndex = 0


    let pagesContainer = document.getElementById('table-pages');

    // Visualization of the table page number
    pagesContainer.innerHTML = `<span id="page-back" class="page-back page-change-button">&lt   </span>` + 'Page   ' + `<span id = "initial-page" class="initial-page">${actualTablePage}</span>` + `   of    ${totalPages}   ` + `<span id="page-forward" class="page-forward page-change-button">   &gt</span>`;

    // Listener variables definition
    const forwardButton = document.getElementById('page-forward');
    const backButton = document.getElementById('page-back');
    let lastBookNumber;
        
    // Section to manage the pages change with the forward and back buttons

    forwardButton.addEventListener('click', () => { // Listener on forward button
        if (!(actualTablePage == totalPages)) { // Verify if we are on the last page of the collection - We have no effect on the button pressing

            let tableIndex = +document.getElementById('first-column-data16')?.innerText;
            
            if (!(isNaN(tableIndex))) { 
                if ((tableIndex % 160) != 0) {
                    startIndex += 16;
                    createTable(category, 'table-container', offset, dataSet, books, worksNumber, startIndex);
                    let pageCounter = document.getElementById('initial-page');
                    pageCounter.innerText = `${tableIndex/16 + 1}`;
                } else {
                    startIndex +=16;
                    if (books.length > startIndex) { // Verify if data already exist in the array else dataFetch function will be called again to load other results
                        createTable(category, 'table-container', offset, dataSet, books, worksNumber, startIndex);
                    } else {
                        import('.//fetching')
                        .then(module => {
                            const dataFetch = module.default;
                            dataFetch(category, tableIndex, (tableIndex/160), books, startIndex);
                        })
                    }
                } 
            }
        }   
    })

    backButton.addEventListener('click', () => { // Listener on back button 
        let index;
        let tableIndex = +document.getElementById('first-column-data16')?.innerText;
        
        if (isNaN(tableIndex) && actualTablePage != 1) {
            tableIndex = worksNumber;
            index = tableIndex - (16 + (tableIndex % 16));
            createTable(category, 'table-container', offset, dataSet, books, worksNumber, index);
        } else if (isNaN(tableIndex) && actualTablePage == 1) {

        } else {
            index = tableIndex - 32;
            if (!(index < 0)) { // Verify if the actual page is the first page
                createTable(category, 'table-container', offset, dataSet, books, worksNumber, index);
            }
        }
    });

    // Listener on book selection

    table.addEventListener('click', (event) => {
        // data collecting on clicked row
        let clickedElement = event.target;
        let parent = clickedElement.parentNode;
        let bookProgressiveNumber = +parent.firstElementChild.innerText-1;
        if (bookProgressiveNumber || bookProgressiveNumber === 0) { // Have to verify if user accidentally clicked on table head  
            let choosenBook = books[bookProgressiveNumber];
        
            // call fetching description
            fetchingDescription(choosenBook);
        }
        
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



