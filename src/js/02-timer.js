import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const day = document.querySelector('span[data-days]');
const hour = document.querySelector('span[data-hours]');
const minute = document.querySelector('span[data-minutes]');
const second = document.querySelector('span[data-seconds');
const btn = document.querySelector('button');

const selectedDate = flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() <= 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btn.disabled = true;
    } else {
      btn.disabled = false;
    }
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
btn.addEventListener('click', counter);

function counter() {
  let timer = null;
  clearInterval(timer);
  timer = setInterval(() => {
    let newDate = new Date(selectedDate.selectedDates[0]);
    let timeToEnd = newDate - Date.now();
    let time = convertMs(timeToEnd);
    day.textContent = addLeadingZero(time.days);
    hour.textContent = addLeadingZero(time.hours);
    minute.textContent = addLeadingZero(time.minutes);
    second.textContent = addLeadingZero(time.seconds);

    if (timeToEnd <= 0) {
      clearInterval(timer);
      btn.disabled = true;
      day.textContent = '00';
      hour.textContent = '00';
      minute.textContent = '00';
      second.textContent = '00';
    }
  }, 1000);
}
