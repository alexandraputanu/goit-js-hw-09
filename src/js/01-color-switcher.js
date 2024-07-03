function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

let intervalId = null;

function startColorChange() {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startButton.disabled = true;
  stopButton.disabled = false;

  startButton.classList.add('inactive');
  startButton.classList.remove('active');
  stopButton.classList.remove('inactive');
  stopButton.classList.add('active');
}

function stopColorChange() {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;

  startButton.classList.remove('inactive');
  startButton.classList.add('active');
  stopButton.classList.add('inactive');
  stopButton.classList.remove('active');
}

startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', stopColorChange);

document.addEventListener('DOMContentLoaded', () => {
  stopButton.disabled = true;
  stopButton.classList.add('inactive');
});
