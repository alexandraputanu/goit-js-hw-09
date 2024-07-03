import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let selectedEndDate = null;
let timerInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      window.alert('Please choose a date in the future');
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
      selectedEndDate = selectedDate;
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  // Debugging log for calculations
  console.log(
    `ms: ${ms}, days: ${days}, hours: ${hours}, minutes: ${minutes}, seconds: ${seconds}`
  );

  return { days, hours, minutes, seconds };
}

function updateTimer(endTime) {
  if (timerInterval) {
    clearInterval(timerInterval); // Clear the existing interval
  }

  timerInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeRemaining = endTime - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      console.log('Timer has ended!');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeRemaining);

    // Log the values for debugging
    console.log({ days, hours, minutes, seconds });

    document.querySelector('[data-days]').textContent = days
      .toString()
      .padStart(2, '0');
    document.querySelector('[data-hours]').textContent = hours
      .toString()
      .padStart(2, '0');
    document.querySelector('[data-minutes]').textContent = minutes
      .toString()
      .padStart(2, '0');
    document.querySelector('[data-seconds]').textContent = seconds
      .toString()
      .padStart(2, '0');
  }, 1000); // Update every second
}

document.querySelector('[data-start]').addEventListener('click', () => {
  if (selectedEndDate) {
    const endTime = selectedEndDate.getTime();
    updateTimer(endTime);
    document.querySelector('[data-start]').disabled = true;
  }
});
