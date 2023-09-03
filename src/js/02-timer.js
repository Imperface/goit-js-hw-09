import { Report } from 'notiflix/build/notiflix-report-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const refInputDateSelection = document.querySelector('#datetime-picker');
const refBtnStart = document.querySelector('button[data-start]');
const refsTimer = {
  seconds: document.querySelector('span[data-seconds]'),
  minutes: document.querySelector('span[data-minutes]'),
  hours: document.querySelector('span[data-hours]'),
  days: document.querySelector('span[data-days]'),
};
const { seconds, minutes, hours, days } = refsTimer;
refBtnStart.setAttribute('disabled', '');
let globTimerMs = 0;
const padString = value => String(value).padStart(2, '0');
const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
};
const renderDate = date => {
  seconds.textContent = padString(date.seconds);
  minutes.textContent = padString(date.minutes);
  hours.textContent = padString(date.hours);
  days.textContent = padString(date.days);
};

const fp = flatpickr(refInputDateSelection, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    const selDate = selectedDates[0];
    const timerMs = selDate - currentDate;
    if (timerMs < 0) {
      Report.failure('Please choose a date in the future', '', 'Okay');
      return;
    }
    refBtnStart.removeAttribute('disabled');
    globTimerMs = timerMs;
    const date = convertMs(timerMs);
    renderDate(date);
  },
});
let updateTimerIntervalIn = null;
const onBtnStartClick = () => {
  refBtnStart.setAttribute('disabled', '');
  const updateTimerInterval = () => {
    globTimerMs -= 1000;
    let msTransformToDate = convertMs(globTimerMs);
    renderDate(msTransformToDate);
    if (globTimerMs < 1000) {
      clearInterval(updateTimerIntervalIn);
      console.log('Stop interval, ms < 1000');
    }
  };
  updateTimerIntervalIn = setInterval(updateTimerInterval, 1000);
};
refBtnStart.addEventListener('click', onBtnStartClick);
