const loadBtn = document.querySelector('.load-btn');
const closeBtn = document.querySelector('.close-loader-btn');
const loaderWindow = document.querySelector('.loader__window');

loadBtn.addEventListener('click', () => {
  loaderWindow.style.display = 'flex';
});
closeBtn.addEventListener('click', () => {
  loaderWindow.style.display = 'none';
});

const moreBtn = loaderWindow.querySelector('.view-more-btn');
const board = loaderWindow.querySelector('.board');
moreBtn.addEventListener('click', () => {
  moreBtn.querySelector('i').classList.toggle('more');
  board.classList.toggle('more');
  // JavaScript에서 max-height 계산해서 직접 주자.
  board.style.maxHeight = board.style.maxHeight === '250px' ? '0' : '250px';
});
