const clock = document.querySelector('#clock');
const clockCenter = document.querySelector('#clock #center');
const hourHand = document.querySelector('#hour-hand');
const minuteHand = document.querySelector('#minute-hand');
const secondHand = document.querySelector('#second-hand');

const TICKS_PER_SECOND = 4;
const INTERVAL = 1000 / TICKS_PER_SECOND;

function removeMarksAndNumbers() {
  const marksAndNumbers = document.querySelectorAll('.mark, .number');
  for (const markOrNumber of marksAndNumbers) {
    clock.removeChild(markOrNumber);
  }
}

function createMarks() {
  const clockDiameter = parseFloat(getComputedStyle(clock).width);

  for (let i = 0; i < 60; i++) {
    const mark = document.createElement('div');

    mark.classList.add('mark');
    mark.style.transform = `translate(-50%) rotate(${i * 6}deg) translate(0, calc(${clockDiameter / 2}px - var(--mark-length)))`;
    if (i % 5 === 0) {
      mark.classList.add('mark-thick');
      mark.style.transform = `translate(-50%) rotate(${i * 6}deg) translate(0, calc(${
        clockDiameter / 2
      }px - var(--thick-mark-length)))`;
    }

    clock.appendChild(mark);
  }
}

function createNumbers() {
  for (let i = 1; i <= 12; i++) {
    const number = document.createElement('div');

    number.classList.add('number');
    number.style.transform = `translate(-50%, -50%) rotate(${i * 30}deg) translate(0,  -30vmin) rotate(-${i * 30}deg)`;
    number.textContent = i;

    clock.appendChild(number);
  }
}

function displayTime() {
  const currentDate = new Date();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const second = currentDate.getSeconds();

  const hourHandDegrees = ((hour % 12) + minute / 60 + second / 3600) * (360 / 12) + 180;
  const minuteHandDegrees = (minute + second / 60) * (360 / 60) + 180;
  const secondHandDegrees = second * (360 / 60) + 180;

  hourHand.style.transform = `translate(-50%, 0) rotate(${hourHandDegrees}deg)`;
  minuteHand.style.transform = `translate(-50%, 0) rotate(${minuteHandDegrees}deg)`;
  secondHand.style.transform = `translate(-50%, 0) rotate(${secondHandDegrees}deg)`;

  setInterval(() => {
    const currentDate = new Date();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const second = currentDate.getSeconds();

    const hourHandDegrees = ((hour % 12) + minute / 60 + second / 3600) * (360 / 12) + 180;
    const minuteHandDegrees = (minute + second / 60) * (360 / 60) + 180;
    const secondHandDegrees = second * (360 / 60) + 180;

    hourHand.style.transform = `translate(-50%, 0) rotate(${hourHandDegrees}deg)`;
    minuteHand.style.transform = `translate(-50%, 0) rotate(${minuteHandDegrees}deg)`;
    secondHand.style.transform = `translate(-50%, 0) rotate(${secondHandDegrees}deg)`;
  }, INTERVAL);
}

// Re-compute marks and numbers positions on window resize
window.addEventListener('resize', (e) => {
  removeMarksAndNumbers();
  createMarks();
  createNumbers();
});

createMarks();
createNumbers();
displayTime();
