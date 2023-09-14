const urlInput = document.querySelector('#url_input');
const urlButton = document.querySelector('#shorturl-button');

function isValidUrl(inputValue) {
  const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  return urlPattern.test(inputValue);
}

function validateUrlInput() {
  if (isValidUrl(urlInput.value)) {
    urlInput.classList.remove('is-invalid');
    urlInput.classList.add('is-valid');
    urlButton.disabled = false;
    urlButton.classList.remove('btn-outline-danger')
    urlButton.classList.add('btn-outline-success')
  } else {
    urlInput.classList.remove('is-valid');
    urlInput.classList.add('is-invalid');
    urlButton.disabled = true;
    urlButton.classList.remove('btn-outline-success')
    urlButton.classList.add('btn-outline-danger')
  }
}

urlInput.addEventListener('input', validateUrlInput);