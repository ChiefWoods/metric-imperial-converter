const form = document.querySelector('form');
const result = document.querySelector('#result');
const jsonResult = document.querySelector('#json-result');

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);

  fetch('/api/convert?' + new URLSearchParams(formData).toString())
    .then(response => response.json())
    .then(data => {
      result.textContent = data.string || data;
      jsonResult.textContent = JSON.stringify(data);
    });
});