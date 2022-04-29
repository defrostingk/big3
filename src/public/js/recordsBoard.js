const addNoteBtn = document.querySelector('.add-note-btn');
const saveRecordsBtn = document.querySelector('.save-btn');
let noteNum = 0;

// 저장 누르면 note를 querySelectorAll로 받아서
// 각각의 input을 하나의 object에 넣고
// 각각의 note에서 만들어진 object를 records object에 넣어 db에 저장.

// fetch를 사용해 서버에 object를 넘기고, 거기서 db에 저장.

// Add note
addNoteBtn.addEventListener('click', addNote);

function addNote() {
  const noteHeader = createNoteHeader();
  const noteContents = createNoteContents();

  // Create note
  const note = document.createElement('div');
  note.classList.add('note');
  note.append(noteHeader);
  note.append(noteContents);

  // Add note
  const board = document.querySelector('.board');
  board.append(note);
  noteNum++;
}

function createNoteHeader() {
  // Create header
  const noteHeader = document.createElement('div');
  noteHeader.classList.add('note__header');

  // Add title
  const noteTitle = document.createElement('input');
  noteTitle.classList.add('note__title');
  noteTitle.setAttribute('type', 'text');
  noteTitle.setAttribute('placeholder', 'Workout');
  noteHeader.append(noteTitle);

  // Add category
  const noteCategory = document.createElement('select');
  noteCategory.classList.add('note__category');
  noteCategory.setAttribute('name', 'category');

  const options = [
    { value: 'none', innerText: 'Category' },
    { value: 'chest', innerText: 'Chest' },
    { value: 'back', innerText: 'Back' },
    { value: 'shoulder', innerText: 'Shoulder' },
    { value: 'lower', innerText: 'Lower body' },
    { value: 'biceps', innerText: 'Biceps' },
    { value: 'triceps', innerText: 'Tryceps' },
    { value: 'core', innerText: 'Core' },
    { value: 'whole', innerText: 'Whole body' },
  ];

  options.forEach((option) => {
    const optionTag = document.createElement('option');
    optionTag.setAttribute('value', option.value);
    optionTag.innerText = option.innerText;
    noteCategory.append(optionTag);
  });
  noteHeader.append(noteCategory);

  return noteHeader;
}

function createNoteContents() {
  let idx = 0;
  const noteContents = document.createElement('div');
  noteContents.classList.add('note__contents');

  const noteSets = document.createElement('ul');
  noteSets.classList.add('note__sets');

  const noteSet = createNoteSet(idx);
  noteSets.append(noteSet);
  noteContents.append(noteSets);

  const setAddBtn = document.createElement('button');
  setAddBtn.classList.add('add-set-btn');
  setAddBtn.setAttribute('type', 'button');
  const setAddIcon = document.createElement('i');
  setAddIcon.classList.add('fa-solid');
  setAddIcon.classList.add('fa-plus');
  setAddBtn.append(setAddIcon);
  noteContents.append(setAddBtn);

  setAddBtn.addEventListener('click', (event) => {
    const newNoteSet = createNoteSet(++idx);
    noteSets.append(newNoteSet);
  });

  return noteContents;
}

function createNoteSet(idx) {
  const noteSet = document.createElement('li');
  noteSet.classList.add('note__set');

  const setCheck = document.createElement('input');
  setCheck.classList.add('set-check');
  setCheck.setAttribute('type', 'checkbox');
  setCheck.setAttribute('id', `setCheck${noteNum}-${idx}`);
  noteSet.append(setCheck);

  const setCheckLabel = document.createElement('label');
  setCheckLabel.setAttribute('for', `setCheck${noteNum}-${idx}`);
  noteSet.append(setCheckLabel);

  const setNumber = document.createElement('span');
  setNumber.classList.add('set-number');
  setNumber.innerText = `${idx + 1}`;
  noteSet.append(setNumber);

  const setWeight = document.createElement('input');
  setWeight.classList.add('set-weight');
  setWeight.setAttribute('type', 'text');
  setWeight.setAttribute('placeholder', 'weight');
  noteSet.append(setWeight);

  const setReps = document.createElement('input');
  setReps.classList.add('set-reps');
  setReps.setAttribute('type', 'text');
  setReps.setAttribute('placeholder', 'reps');
  noteSet.append(setReps);

  const deleteSetBtn = document.createElement('button');
  deleteSetBtn.classList.add('delete-set-btn');
  deleteSetBtn.setAttribute('type', 'button');
  const deleteSetIcon = document.createElement('i');
  deleteSetIcon.classList.add('fa-solid');
  deleteSetIcon.classList.add('fa-xmark');
  deleteSetBtn.append(deleteSetIcon);
  noteSet.append(deleteSetBtn);

  return noteSet;
}

// Save records
saveRecordsBtn.addEventListener('click', () => {
  const workoutRecords = getWorkoutRecords();
  console.log(workoutRecords);
});

function getWorkoutRecords() {
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  const currentDate = date.getDate();
  const currentDay = day[date.getDay()];
  const today = {
    year: currentYear,
    month: currentMonth,
    date: currentDate,
    day: currentDay,
  };

  const workoutRecords = {
    date: today,
    workout: {},
  };

  let workoutNum = 0;
  const notes = document.querySelectorAll('.note');

  notes.forEach((note) => {
    const title = note.querySelector('.note__title').value;
    const category = note.querySelector('.note__category').value;

    const noteSets = note.querySelectorAll('.note__set');
    const sets = [];
    noteSets.forEach((set) => {
      const weight = set.querySelector('.set-weight').value;
      const reps = set.querySelector('.set-reps').value;
      sets.push([weight, reps]);
    });

    const noteObj = {
      title,
      category,
      sets,
    };

    workoutRecords.workout[`${workoutNum++}`] = noteObj;
  });

  return workoutRecords;
}