// script.js

// ← your Web App URL
const ENDPOINT = 'https://script.google.com/macros/s/AKfycbziZEfHtwjri1mNKsAifZZm9yShW3XVxY9jNnEnJWWiOVJkWP22_R8bpN4PaHo-ZV1t/exec';


function bindForm(formId, next) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    data.form = formId;   // tag which form this is

    fetch(ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',       // still needed for Apps Script CORS
      // headers: { 'Content-Type': 'application/json' },  ← remove this
      body: JSON.stringify(data)   // default content-type will be text/plain
    })
    .then(() => {
      if (next) {
        // go to the next HTML step
        window.location.href = next;
      } else {
        // last form: show thank you, then blank screen
        alert('All done—thanks!');
        // clear out everything on the page
        document.body.innerHTML = '';
        // ensure background is white (in case you had something else)
        document.body.style.background = '#fff';
      }
    })
    .catch(err => {
      console.error('Network error:', err);
      alert('Network error—please check your connection.');
    });
  });
}

// bind each of your three forms in sequence:
bindForm('gems-form',    'valence.html');
bindForm('valence-form', 'basic.html');
bindForm('basic-form',   null);
