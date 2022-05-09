const loaderWindow = document.querySelector('.loader__window');
const loaderContainer = document.querySelector('.loader__container');
const closeBtn = document.querySelector('.close-loader-btn');

initLoader();

function initLoader() {
  initLoadBtn();
  initCloseBtn();
}

function initLoadBtn() {
  const loadBtn = document.querySelector('.load-btn');
  loadBtn.addEventListener('click', () => {
    loaderWindow.style.display = 'flex';
    printLoadedRecords();
  });
}

function initCloseBtn() {
  closeBtn.addEventListener('click', () => {
    loaderWindow.style.display = 'none';
  });
}

function printLoadedRecords() {
  fetch('/workout/load')
    .then((res) => res.json())
    .then((data) => {
      const recordsArr = data;
      recordsArr.reverse();
      recordsArr.forEach((records) => {
        addLoadedRecordsAndHandleBtn(records);
      });
    })
    .catch((error) => console.error(error));
}

function addLoadedRecordsAndHandleBtn(records) {
  if (records.workout.length) {
    const loadedRecords = document.createElement('div');
    loadedRecords.classList.add('loader__records');

    // Add loaded records
    const loadedRecordsHeader = createLoadedRecordsHeader(records);
    loadedRecords.append(loadedRecordsHeader);
    const loadedBoard = createLoadedBoard(records);
    loadedRecords.append(loadedBoard);

    loaderContainer.append(loadedRecords);

    // Handle view more btn
    const viewMoreBtn = loadedRecords.querySelector('.view-more-btn');
    const height = loadedBoard.clientHeight;
    loadedBoard.style.maxHeight = 0;
    viewMoreBtn.addEventListener('click', () => {
      const viewMoreBtnIcon = viewMoreBtn.querySelector('i');
      viewMoreBtnIcon.classList.toggle('more');
      loadedBoard.style.maxHeight = viewMoreBtnIcon.classList.contains('more')
        ? `${height}px`
        : '0px';
    });

    // Handle load btn
    const loadRecordsBtn = loadedRecords.querySelector('.load-records-btn');
    loadRecordsBtn.addEventListener('click', () => {
      records.workout.forEach((loadedRecords) => addNote(loadedRecords));
      closeBtn.click();
    });
  }
}

function createLoadedRecordsHeader(records) {
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

  return recordsHeader;
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

function createLoadedBoard(records) {
  const board = document.createElement('div');
  board.classList.add('board');

  records.workout.forEach((contents) => {
    const { title, category, sets } = contents;

    // Create a note
    const note = document.createElement('div');
    note.classList.add('note');

    // Create and add a note header
    const noteHeader = createLoadedNoteHeader(title, category);
    note.append(noteHeader);

    // Create and add note sets
    const noteSets = createLoadedNoteSets(sets);
    note.append(noteSets);

    // Add a note to board
    board.append(note);
  });
  return board;
}

function createLoadedNoteHeader(title, category) {
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

function createLoadedNoteSets(sets) {
  const noteSets = document.createElement('ul');
  noteSets.classList.add('note__sets');

  sets.forEach((set, idx) => {
    const { weight, reps } = set;

    const noteSet = document.createElement('li');
    noteSet.classList.add('note__set');

    const setNumber = document.createElement('span');
    setNumber.innerText = idx + 1;
    noteSet.append(setNumber);

    const setWeight = document.createElement('span');
    setWeight.innerText = weight;
    noteSet.append(setWeight);

    const setReps = document.createElement('span');
    setReps.innerText = reps;
    noteSet.append(setReps);

    noteSets.append(noteSet);
  });

  return noteSets;
}
