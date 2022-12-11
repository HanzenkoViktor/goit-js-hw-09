function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector("[data-start]"),
  stopBtn: document.querySelector("[data-stop]"),
};

let intervalId = null;

refs.startBtn.addEventListener("click", onStartClick);
refs.stopBtn.addEventListener("click", onStopClick);

function onStartClick() {
  toggleButtom();
  intervalId = setInterval(changeColor, 1000);
}

function onStopClick() {
  toggleButtom();
  clearInterval(intervalId);
}

function toggleButtom() {
  refs.startBtn.toggleAttribute("disabled");
  refs.stopBtn.toggleAttribute("disabled");
}

function changeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
