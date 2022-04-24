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

// Break
const breakBtn = document.querySelector('.break-btn');
const breakEndBtn = document.querySelector('.break-end-btn');

// start 시작 / puase 일시정지
// break 순수 운동 시간 멈추고 화면 전환
// reset 초기화

// ????????
// 아래를 하려면
// stopwatchTime, stopwatchTimePure은
// 전체 container를 form으로 변경해야..
// quit, home을 input, submit으로 변경해서 post해야한다.

// home 현재 시간을 res.locals.currentStopwatchTime,
// res.locals.currentStopwatchTimePure에 저장하고 정지,
// pug에서 locals.currentStopwatchTime,
// res.locals.currentStopwatchTimePure을 stopwatch에 set

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
  startBtn.innerText = startBtn.innerText === 'Start' ? 'Pause' : 'Start';
});

// Stopwatch reset
resetBtn.addEventListener('click', () => {
  initBtn();
  clearTime();
});

// Start break
breakBtn.addEventListener('click', () => {
  switchScreen(TITLE_Break);
});

// End break
breakEndBtn.addEventListener('click', () => {
  switchScreen(TITLE_STOPWATCH);
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

function clearTime() {
  stopwatchTime.innerText = '00:00:00.00';
  stopwatchTimePure.innerText = '00:00:00.00';
}

function initBtn() {
  startBtn.innerText = 'Start';
}
