const loadBtn = document.querySelector('.load-btn');
const closeBtn = document.querySelector('.close-loader-btn');
const loaderWindow = document.querySelector('.loader__window');

loadBtn.addEventListener('click', () => {
  loaderWindow.style.display = 'flex';
});
closeBtn.addEventListener('click', () => {
  loaderWindow.style.display = 'none';
});
