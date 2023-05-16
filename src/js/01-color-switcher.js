const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const bodyBg = document.body;

let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBackgroundColor() {
  const color = getRandomHexColor();
  bodyBg.style.backgroundColor = color;
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  intervalId = setInterval(changeBackgroundColor, 1000);
});

stopButton.addEventListener('click', () => {
  startButton.disabled = false;
  clearInterval(intervalId);
});
