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
      // moreBtn click 시 /workout/load/objectId로 get
      // get으로 얻은 records 값 활용하여 board 추가
      // global object에 objectId를 key로 하는 records 추가

      // loadBtn click 시
      // 먼저 global object에서 key값 확인하고
      // 없으면 /workout/load/objectId로 get
      // 둘 중 하나에서 얻은 records 값 활용하여 load
    })
    .catch((error) => console.log(error));
}
