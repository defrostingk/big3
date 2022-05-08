const loaderWindow = document.querySelector('.loader__window');
const loaderContainer = document.querySelector('.loader__container');

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
      const recordsArr = data;
      console.log(recordsArr);
      recordsArr.reverse();

      recordsArr.forEach((records) => {
        addRecords(records);
      });

      // To-do
      // date, category로 records#objectId 생성
      // get으로 얻은 records 값 활용하여 board 추가

      // loadBtn click 시
      // 얻은 records 값 활용하여 /workout에 note 추가
    })
    .catch((error) => console.log(error));
}

function addRecords(records) {
  console.log(records);
  const loaderRecords = document.createElement('div');
  loaderRecords.classList.add('loader__records');

  // Records header
  const recordsHeader = document.createElement('div');
  recordsHeader.classList.add('loader-records__header');

  // View more btn
  const viewMoreBtn = document.createElement('button');
  viewMoreBtn.classList.add('view-more-btn');
  const viewMoreBtnIcon = document.createElement('i');
  viewMoreBtnIcon.classList.add('fa-solid');
  viewMoreBtnIcon.classList.add('fa-chevron-down');
  viewMoreBtn.append(viewMoreBtnIcon);
  recordsHeader.append(viewMoreBtn);

  // Date
  const recordsDate = document.createElement('span');
  recordsDate.classList.add('loader-records__date');
  let { year, month, date, day } = records.date;
  month = month < 10 ? `0${month}` : month;
  date = date < 10 ? `0${date}` : date;
  recordsDate.innerText = `${year}. ${month}. ${date}. ${day}`;
  recordsHeader.append(recordsDate);

  // Category
  const recordsCategory = document.createElement('span');
  recordsCategory.classList.add('loader-records__category');

  const { workout } = records;
  const categorySets = {};
  workout.forEach((content) => {
    const { category, sets } = content;
    categorySets[category] = categorySets[category]
      ? categorySets[category] + sets.length
      : sets.length;
  });

  let maxCategory = 'none';
  let maxSets = 0;
  for (let key in categorySets) {
    if (maxSets < categorySets[key]) {
      maxCategory = key;
    }
  }

  const categoryTable = [
    { value: 'none', innerText: 'None' },
    { value: 'chest', innerText: 'Chest' },
    { value: 'back', innerText: 'Back' },
    { value: 'shoulder', innerText: 'Shoulder' },
    { value: 'lower', innerText: 'Lower' },
    { value: 'biceps', innerText: 'Biceps' },
    { value: 'triceps', innerText: 'Tryceps' },
    { value: 'core', innerText: 'Core' },
    { value: 'whole', innerText: 'Whole' },
  ];

  for (let i = 0; i < categoryTable.length; i++) {
    if (categoryTable[i].value === maxCategory) {
      recordsCategory.innerText = categoryTable[i].innerText;
      break;
    }
  }

  recordsHeader.append(recordsCategory);

  // Load btn
  const loadRecordsBtn = document.createElement('button');
  loadRecordsBtn.classList.add('load-records-btn');
  const loadRecordsBtnIcon = document.createElement('i');
  loadRecordsBtnIcon.classList.add('fa-solid');
  loadRecordsBtnIcon.classList.add('fa-plus');
  loadRecordsBtn.append(loadRecordsBtnIcon);
  const loadRecordsBtnSpan = document.createElement('span');
  loadRecordsBtnSpan.innerText = 'Load';
  loadRecordsBtn.append(loadRecordsBtnSpan);
  recordsHeader.append(loadRecordsBtn);

  // Add header
  loaderRecords.append(recordsHeader);
  loaderContainer.append(loaderRecords);
}
