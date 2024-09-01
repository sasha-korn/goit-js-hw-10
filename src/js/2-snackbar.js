// Described in the documentation
import iziToast from 'izitoast';
// Additional import of styles
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const delay = document.querySelector('[name="delay"]').value.trim();
  const isFulfilled =
    document.querySelector('[name="state"]:checked').value === 'fulfilled';

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilled) {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  })
    .then(message => {
      showNotification(message, 'limegreen');
    })
    .catch(err => {
      showNotification(err, 'indianred');
    });

  form.reset();
}

function showNotification(message, color) {
  iziToast.show({
    message: message,
    position: 'topRight',

    progressBar: false,
    theme: 'dark',
    backgroundColor: color,
  });
}

// https://marcelodolza.github.io/iziToast/#Start
