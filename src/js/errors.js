
class ValidationError extends Error { // Definition of a customized error
      constructor(message) {
        super(message);
        this.name = 'Validation Error!';
      }
}

class MissingCategory extends Error { // Definition of a customized error
    constructor(message) {
        super(message);
        this.name = 'Missing Category!'
    }
}

function showError(name, message) { // Function that manages the visualization of the error
  return `
  <div class="error-text-container">
      <div class="error-row1">${name}</div>
      <br>
      <div class="error-row2">${message}</div>
  </div>
  <div id="error-button" class="error-button">X</div>
  `
}

function closeError(container, errorMessage) { // Function that add a listener to the closing button of the error window
    let closeButton = document.getElementById('error-button');
    closeButton.addEventListener('click', () => {
        errorMessage.style.display = 'none';
        container.style.display = 'none';
    })
}

export {ValidationError, MissingCategory, showError, closeError}

