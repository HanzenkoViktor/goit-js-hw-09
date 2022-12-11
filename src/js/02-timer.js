// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.5.min.css";

const refs = {
  startButton: document.querySelector("button[data-start]"),
  dataPicker: document.querySelector("#datetime-picker"),
  dataDays: document.querySelector("[data-days]"),
  dataHours: document.querySelector("[data-hours]"),
  dataMinutes: document.querySelector("[data-minutes]"),
  dataSeconds: document.querySelector("[data-seconds]"),
};

let intervalId = null;
refs.startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
      refs.startButton.disabled = true;
      Notiflix.Notify.failure(
        "Please choose a date in the future! Do not look back.."
      );
      return;
    }
    if (selectedDates[0] > new Date()) {
      refs.startButton.disabled = false;
    }

    refs.startButton.addEventListener("click", () => {
      intervalId = setInterval(() => {
        const differenceInTime = selectedDates[0] - new Date();

        if (differenceInTime < 1000) {
          clearInterval(intervalId);
        }
        const result = convertMs(differenceInTime);
        viewOfTimer(result);
      }, 1000);
    });
  },
};

flatpickr("#datetime-picker", options);

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function viewOfTimer({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = `${days}`;
  refs.dataHours.textContent = `${hours}`;
  refs.dataMinutes.textContent = `${minutes}`;
  refs.dataSeconds.textContent = `${seconds}`;
}
