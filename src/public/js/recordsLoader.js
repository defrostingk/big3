const loaderWindow = document.querySelector('.loader__window');

initLoader();

const moreBtn = loaderWindow.querySelector('.view-more-btn');
const board = loaderWindow.querySelector('.board');
moreBtn.addEventListener('click', () => {
  moreBtn.querySelector('i').classList.toggle('more');
  board.classList.toggle('more');
  // JavaScript에서 max-height 계산해서 직접 주자.
  board.style.maxHeight = board.style.maxHeight === '250px' ? '0' : '250px';
});

function initLoader() {
  initLoadBtn();
  initCloseBtn();
}

function initLoadBtn() {
  const loadBtn = document.querySelector('.load-btn');
  loadBtn.addEventListener('click', () => {
    loaderWindow.style.display = 'flex';
    loadRecords();
  });
}

function initCloseBtn() {
  const closeBtn = document.querySelector('.close-loader-btn');
  closeBtn.addEventListener('click', () => {
    loaderWindow.style.display = 'none';
  });
}

function loadRecords() {
  fetch('/workout/load')
    .then((res) => res.json())
    .then((data) => {
      const records = data;
      console.log(records);

      // To-do
      // date, category로 records#objectId 생성
      // get으로 얻은 records 값 활용하여 board 추가

      // loadBtn click 시
      // 얻은 records 값 활용하여 /workout에 note 추가
    })
    .catch((error) => console.log(error));
}
