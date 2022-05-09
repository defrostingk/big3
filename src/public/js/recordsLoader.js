const loaderWindow = document.querySelector('.loader__window');
const loaderContainer = document.querySelector('.loader__container');

initLoader();

// dev
const moreBtn = loaderWindow.querySelector('.view-more-btn');
const board = loaderWindow.querySelector('.board');
moreBtn.addEventListener('click', () => {
  // JavaScript로 max-height 계산해서 직접 주자.
  // 관련 메서드를 찾아보자.
  board.style.maxHeight = board.style.maxHeight === '250px' ? '0' : '250px';
});
// / dev

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
    })
    .catch((error) => console.error(error));
}

function addRecords(records) {
  console.log(records);
  if (records.workout.length) {
    const loaderRecords = document.createElement('div');
    loaderRecords.classList.add('loader__records');
    addRecordsHeaderAndHandleBtn(records, loaderRecords);

    // To-do
    // records 값 활용하여 board 추가
    addLoadedBoard(records, loaderRecords);

    loaderContainer.append(loaderRecords);
  }
}

function addRecordsHeaderAndHandleBtn(records, loaderRecords) {
  // Create a records header
  const recordsHeader = document.createElement('div');
  recordsHeader.classList.add('loader-records__header');

  // Create and add a view more btn
  const viewMoreBtn = createViewMoreBtn();
  recordsHeader.append(viewMoreBtn);

  // Create and add a date
  const recordsDate = createDate(records);
  recordsHeader.append(recordsDate);

  // Create and add a category
  const recordsCategory = createCategory(records);
  recordsHeader.append(recordsCategory);

  // Create and add a load records btn
  const loadRecordsBtn = createLoadRecordsBtn();
  recordsHeader.append(loadRecordsBtn);

  // Add a records header
  loaderRecords.append(recordsHeader);

  // To-do
  // Handle view more btn
  // JavaScript 메서드 활용하여 max-height 계산
  // max-height toggle

  // Handle load records btn
  // loadBtn click 시
  // workout records clear 후
  // 얻은 records 값 활용하여 /workout에 note 추가
}

function createViewMoreBtn() {
  const viewMoreBtn = document.createElement('button');
  viewMoreBtn.classList.add('view-more-btn');
  const viewMoreBtnIcon = document.createElement('i');
  viewMoreBtnIcon.classList.add('fa-solid');
  viewMoreBtnIcon.classList.add('fa-chevron-down');
  viewMoreBtn.append(viewMoreBtnIcon);

  return viewMoreBtn;
}

function createDate(records) {
  const recordsDate = document.createElement('span');
  recordsDate.classList.add('loader-records__date');
  let { year, month, date, day } = records.date;
  month = month < 10 ? `0${month}` : month;
  date = date < 10 ? `0${date}` : date;
  recordsDate.innerText = `${year}. ${month}. ${date}. ${day}`;

  return recordsDate;
}

function createCategory(records) {
  const recordsCategory = document.createElement('span');
  recordsCategory.classList.add('loader-records__category');

  const { workout } = records;
  const categorySets = {};
  workout.forEach((contents) => {
    const { category, sets } = contents;
    categorySets[category] = categorySets[category]
      ? categorySets[category] + sets.length
      : sets.length;
  });

  let maxCategory = 'None';
  let maxSets = 0;
  for (let key in categorySets) {
    if (maxSets < categorySets[key]) {
      maxCategory = key;
    }
  }
  recordsCategory.innerText = maxCategory.substring(0, 5);

  return recordsCategory;
}

function createLoadRecordsBtn() {
  const loadRecordsBtn = document.createElement('button');
  loadRecordsBtn.classList.add('load-records-btn');
  const loadRecordsBtnIcon = document.createElement('i');
  loadRecordsBtnIcon.classList.add('fa-solid');
  loadRecordsBtnIcon.classList.add('fa-plus');
  loadRecordsBtn.append(loadRecordsBtnIcon);
  const loadRecordsBtnSpan = document.createElement('span');
  loadRecordsBtnSpan.innerText = 'Load';
  loadRecordsBtn.append(loadRecordsBtnSpan);

  return loadRecordsBtn;
}

function addLoadedBoard(records, loaderRecords) {
  const board = document.createElement('div');
  board.classList.add('board');

  records.workout.forEach((contents) => {
    const note = document.createElement('div');
    note.classList.add('note');
    const noteHeader = createLoadedNoteHeader(contents);
    note.append(noteHeader);

    // add note contents

    board.append(note);
  });

  loaderRecords.append(board);
}

function createLoadedNoteHeader(contents) {
  const { category, title } = contents;

  const noteHeader = document.createElement('note__header');
  noteHeader.classList.add('note__header');

  const noteTitle = document.createElement('span');
  noteTitle.classList.add('note__title');
  noteTitle.innerText = title;
  noteHeader.append(noteTitle);

  const noteCategory = document.createElement('select');
  noteCategory.classList.add('note__category');
  noteCategory.setAttribute('disabled', '');
  const noteCategoryOption = document.createElement('option');
  noteCategoryOption.innerText = category;
  noteCategory.append(noteCategoryOption);
  noteHeader.append(noteCategory);

  return noteHeader;
}
