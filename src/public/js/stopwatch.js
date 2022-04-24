const stopwatchTime = document.querySelector('.stopwatch__time');
const stopwatchTimePure = document.querySelector('.stopwatch__time--pure');

const TITLE_STOPWATCH = 'Stopwatch';
const TITLE_Break = 'Break';
const TITLE_RECORDS = 'Records';

// 이후의 멀티태스킹을 위해 date.now로 구현해야 한다.
// 그럼 변수를 서버에 보내 저장해야하고..
// start 시작 / puase 일시정지
// break 순수 운동 시간 멈추고 화면 전환
// reset 초기화
// quit 정지
// home 작동 중이라면 현재 시간 저장, 다시 들어올 때 (현재 시간-과거 시간)
// 작동 중이 아니라면 다시 들어올 때 (과거시간)
switchScreen(TITLE_STOPWATCH);
// switchScreen(TITLE_Break);
// switchScreen(TITLE_RECORDS);
initStopwatch();

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
  const navbar = document.querySelector('nav');
  headerTitle.innerText = title;

  const navbarMenus = navbar.querySelectorAll('a');

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
  stopwatchTime.innerText = '00:00:00.00';
  stopwatchTimePure.innerText = '00:00:00.00';
}
