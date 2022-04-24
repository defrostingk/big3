const navbar = document.querySelector('nav');
const navbarMenus = navbar.querySelectorAll('a');

const TITLE_STOPWATCH = 'Stopwatch';
const TITLE_Break = 'Break';
const TITLE_RECORDS = 'Records';

// Stopwatch
const stopwatchTime = document.querySelector('.stopwatch__time');
const stopwatchTimePure = document.querySelector('.stopwatch__time--pure');
const startBtn = document.querySelector('.start-btn');
const resetBtn = document.querySelector('.reset-btn');
let centisecond = 0;
let centisecondPure = 0;
let startInterval = false;
let startStopwatch = false;
let startStopwatchPure = false;

const CENTI_SECONDS_IN_A_SECOND = 100;

const SECONDS_IN_A_MINUTE = 60;
const CENTI_SECONDS_IN_A_MINUTE =
  CENTI_SECONDS_IN_A_SECOND * SECONDS_IN_A_MINUTE;

const MINUTES_IN_A_HOUR = 60;
const CENTI_SECONDS_IN_A_HOUR = CENTI_SECONDS_IN_A_MINUTE * MINUTES_IN_A_HOUR;

const HOURS_IN_A_DAY = 24;
const CENTI_SECONDS_IN_A_DAY = CENTI_SECONDS_IN_A_HOUR * HOURS_IN_A_DAY;

// Break
const breakBtn = document.querySelector('.break-btn');
const breakEndBtn = document.querySelector('.break-end-btn');

// break 순수 운동 시간 멈추고 화면 전환

initStopwatch();

// Select navbar
navbarMenus.forEach((navbarMenu) =>
  navbarMenu.addEventListener('click', () => {
    const navbarMenuTitle = navbarMenu.querySelector('span');
    switchScreen(navbarMenuTitle.innerText);
  })
);

// Stopwatch start
startBtn.addEventListener('click', () => {
  toggleBtn();
  startStopwatch = !startStopwatch;
  startStopwatchPure = !startStopwatchPure;
  if (!startInterval) {
    initInterval();
    startInterval = true;
  }
});

// Stopwatch reset
resetBtn.addEventListener('click', () => {
  startStopwatch = false;
  startStopwatchPure = false;
  resetTime();
  initBtn();
  clearTime();
});

// Start break
breakBtn.addEventListener('click', () => {
  switchScreen(TITLE_Break);
  startStopwatchPure = false;
});

// End break
breakEndBtn.addEventListener('click', () => {
  switchScreen(TITLE_STOPWATCH);
  startStopwatchPure = true;
});

function switchScreen(screen) {
  const containerStopwatch = document.querySelector('.stopwatch__container');
  const containerBreak = document.querySelector('.break__container');
  const containerRecords = document.querySelector('.records__container');

  containerStopwatch.style.display = 'none';
  containerBreak.style.display = 'none';
  containerRecords.style.display = 'none';

  if (screen === TITLE_STOPWATCH) {
    setHeaderTitle(TITLE_STOPWATCH);
    containerStopwatch.style.display = 'flex';
  } else if (screen === TITLE_Break) {
    setHeaderTitle(TITLE_STOPWATCH);
    containerBreak.style.display = 'flex';
  } else if (screen === TITLE_RECORDS) {
    setHeaderTitle(TITLE_RECORDS);
    containerRecords.style.display = 'flex';
  }
}

function setHeaderTitle(title) {
  const headerTitle = document.querySelector('.header__title');
  headerTitle.innerText = title;

  navbarMenus.forEach((navbarMenu) => {
    const navbarMenuTitle = navbarMenu.querySelector('span');
    if (title === navbarMenuTitle.innerText) {
      navbarMenu.classList.add('selected');
    } else {
      if (navbarMenu.classList.contains('selected'))
        navbarMenu.classList.remove('selected');
    }
  });
}

function initStopwatch() {
  switchScreen(TITLE_STOPWATCH);
  initBtn();
  clearTime();
}

function initInterval() {
  setInterval(() => {
    if (startStopwatch) {
      if (CENTI_SECONDS_IN_A_DAY - 1 < centisecond) return;
      centisecond++;
      const time = getTime(centisecond);
      setTime(stopwatchTime, time);
    }
    if (startStopwatchPure) {
      if (CENTI_SECONDS_IN_A_DAY - 1 < centisecondPure) return;
      centisecondPure++;
      const timePure = getTime(centisecondPure);
      setTime(stopwatchTimePure, timePure);
    }
  }, 10);
}

function initBtn() {
  startBtn.innerText = 'Start';
}

function toggleBtn() {
  startBtn.innerText = startBtn.innerText === 'Start' ? 'Pause' : 'Start';
}

function resetTime() {
  centisecond = 0;
  centisecondPure = 0;
}

function clearTime() {
  stopwatchTime.innerText = '00:00:00.00';
  stopwatchTimePure.innerText = '00:00:00.00';
}

function getTime(centiSec) {
  let remainder = centiSec;
  const hours = addZeroTime(Math.floor(remainder / CENTI_SECONDS_IN_A_HOUR));
  remainder = remainder % CENTI_SECONDS_IN_A_HOUR;
  const minutes = addZeroTime(
    Math.floor(remainder / CENTI_SECONDS_IN_A_MINUTE)
  );
  remainder = remainder % CENTI_SECONDS_IN_A_MINUTE;
  const seconds = addZeroTime(
    Math.floor(remainder / CENTI_SECONDS_IN_A_SECOND)
  );
  const centiSeconds = addZeroTime(remainder % CENTI_SECONDS_IN_A_SECOND);

  return `${hours}:${minutes}:${seconds}.${centiSeconds}`;
}

function addZeroTime(time) {
  return time < 10 ? `0${time}` : time;
}

function setTime(timeElement, time) {
  timeElement.innerText = time;
}

// Stopwatch 00:00:00.00으로 다듬기
