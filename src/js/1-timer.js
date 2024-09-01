import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
let days = document.querySelector('[data-days]');
let hours = document.querySelector('[data-hours]');
let minutes = document.querySelector('[data-minutes]');
let seconds = document.querySelector('[data-seconds]');
const btn = document.querySelector('[type="button"]');
const inp = document.querySelector('#datetime-picker');

let userSelectedDate = {};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const now = new Date();
    if (userSelectedDate.getTime() < now.getTime()) {
      btn.disabled = true;
      showNotification();
      return;
    }
    btn.disabled = false;
  },
};

function showNotification() {
  iziToast.show({
    message: 'Please choose a date in the future',
    position: 'topRight',
    progressBar: false,
    theme: 'dark',
    backgroundColor: 'red',
  });
}

flatpickr('#datetime-picker', options);
btn.addEventListener('click', startCountDown);
let interval;
function startCountDown() {
  inp.disabled = true;
  btn.disabled = true;
  interval = setInterval(updCountDown, 1000);
}

function updCountDown() {
  const now = new Date();
  if (now >= userSelectedDate) {
    inp.disabled = false;
    btn.disabled = false;
    clearInterval(interval);
    return;
  }
  const timeRemain = convertMs(userSelectedDate.getTime() - now.getTime());
  days.innerText = formatDigit(timeRemain.days);
  hours.innerText = formatDigit(timeRemain.hours);
  minutes.innerText = formatDigit(timeRemain.minutes);
  seconds.innerText = formatDigit(timeRemain.seconds);
}

function formatDigit(n) {
  return ` ${n.toString().padStart(2, '0')} `;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
