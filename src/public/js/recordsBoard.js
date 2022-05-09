const addNoteBtn = document.querySelector('.add-note-btn');
const saveRecordsBtn = document.querySelector('.save-btn');
let noteIdx = 0;
let noteSetIdx = [];

// Add note
addNoteBtn.addEventListener('click', addNote);

function addNote(loadedRecords) {
  const noteHeader = createNoteHeader(loadedRecords);
  const noteContents = createNoteContents(loadedRecords);

  // Create note
  const note = document.createElement('div');
  note.classList.add('note');
  note.append(noteHeader);
  note.append(noteContents);

  // Add note
  const board = document.querySelector('.board');
  board.append(note);
  noteIdx++;
}

function createNoteHeader(loadedRecords) {
  // Create header
  const noteHeader = document.createElement('div');
  noteHeader.classList.add('note__header');

  // Add title
  const noteTitle = document.createElement('input');
  noteTitle.classList.add('note__title');
  noteTitle.setAttribute('type', 'text');
  noteTitle.setAttribute('placeholder', 'Workout');
  if (loadedRecords) {
    const { title } = loadedRecords;
    noteTitle.setAttribute('value', title);
  }
  noteHeader.append(noteTitle);

  // Add category
  const noteCategory = document.createElement('select');
  noteCategory.classList.add('note__category');
  noteCategory.setAttribute('name', 'category');

  const options = [
    { value: 'None', innerText: 'Category' },
    { value: 'Chest', innerText: 'Chest' },
    { value: 'Back', innerText: 'Back' },
    { value: 'Shoulder', innerText: 'Shoulder' },
    { value: 'Lower body', innerText: 'Lower body' },
    { value: 'Biceps', innerText: 'Biceps' },
    { value: 'Triceps', innerText: 'Tryceps' },
    { value: 'Core', innerText: 'Core' },
    { value: 'Whole body', innerText: 'Whole body' },
  ];

  options.forEach((option) => {
    const optionTag = document.createElement('option');
    optionTag.setAttribute('value', option.value);
    optionTag.innerText = option.innerText;

    if (loadedRecords) {
      const { category } = loadedRecords;
      if (category === optionTag.innerText) {
        optionTag.selected = true;
      }
    }
    noteCategory.append(optionTag);
  });

  noteHeader.append(noteCategory);

  return noteHeader;
}

function createNoteContents() {
  noteSetIdx.push(0);
  const thisNoteIdx = noteIdx;
  const noteContents = document.createElement('div');
  noteContents.classList.add('note__contents');

  const noteSets = document.createElement('ul');
  noteSets.classList.add('note__sets');

  const noteSet = createNoteSet(thisNoteIdx);
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

  setAddBtn.addEventListener('click', () => {
    const newNoteSet = createNoteSet(thisNoteIdx);
    noteSets.append(newNoteSet);
  });

  return noteContents;
}

function createNoteSet(thisNoteIdx) {
  const noteSet = document.createElement('li');
  noteSet.classList.add('note__set');

  // Checkbox
  const setCheck = document.createElement('input');
  setCheck.classList.add('set-check');
  setCheck.setAttribute('type', 'checkbox');
  setCheck.setAttribute('id', `setCheck${noteIdx}-${noteSetIdx[thisNoteIdx]}`);
  noteSet.append(setCheck);

  const setCheckLabel = document.createElement('label');
  setCheckLabel.setAttribute(
    'for',
    `setCheck${noteIdx}-${noteSetIdx[thisNoteIdx]}`
  );
  noteSet.append(setCheckLabel);

  // Number
  const setNumber = document.createElement('span');
  setNumber.classList.add('set-number');
  setNumber.innerText = noteSetIdx[thisNoteIdx] + 1;
  noteSet.append(setNumber);

  // Weight
  const setWeight = document.createElement('input');
  setWeight.classList.add('set-weight');
  setWeight.setAttribute('type', 'text');
  setWeight.setAttribute('placeholder', 'weight');
  noteSet.append(setWeight);

  // Reps
  const setReps = document.createElement('input');
  setReps.classList.add('set-reps');
  setReps.setAttribute('type', 'text');
  setReps.setAttribute('placeholder', 'reps');
  noteSet.append(setReps);

  // Delete btn
  const deleteSetBtn = document.createElement('button');
  deleteSetBtn.classList.add('delete-set-btn');
  deleteSetBtn.setAttribute('type', 'button');
  const deleteSetIcon = document.createElement('i');
  deleteSetIcon.classList.add('fa-solid');
  deleteSetIcon.classList.add('fa-xmark');
  deleteSetBtn.append(deleteSetIcon);

  noteSet.append(deleteSetBtn);
  noteSetIdx[thisNoteIdx]++;

  // Delete set
  deleteSetBtn.addEventListener('click', () => {
    const sets = noteSet.parentNode;
    noteSetIdx[thisNoteIdx]--;
    if (noteSetIdx[thisNoteIdx] < 1) {
      sets.parentNode.parentNode.remove();
    } else {
      noteSet.remove();
      updateSetNumber(sets);
    }
  });

  return noteSet;
}

function updateSetNumber(sets) {
  const setNumbers = sets.querySelectorAll('.set-number');
  let number = 1;
  setNumbers.forEach((setNumber) => (setNumber.innerText = number++));
}

// Save and send records to server
saveRecordsBtn.addEventListener('click', async () => {
  const workoutRecords = getWorkoutRecords();
  console.log(workoutRecords);

  const fetchConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(workoutRecords),
  };

  fetch('/workout', fetchConfig)
    .then(() => {
      const message = document.querySelector('.message');
      message.classList.add('success-message');
      message.innerText = 'Save successfully.';
      setTimeout(() => {
        message.classList.remove('success-message');
        message.innerText = '';
      }, 5000);
    })
    .catch((error) => {
      const message = document.querySelector('.message');
      message.classList.add('error-message');
      message.innerText = 'Failed to save';
      setTimeout(() => {
        message.classList.remove('error-message');
        message.innerText = '';
      }, 5000);
      console.log(error);
    });
});

function getWorkoutRecords() {
  const timeWhole = document.querySelector('.stopwatch__time').innerText;
  const timePure = document.querySelector('.stopwatch__time--pure').innerText;
  const time = {
    whole: timeWhole,
    pure: timePure,
  };

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
    time,
    date: today,
    workout: [],
  };

  const recordsBoard = document.querySelector('.records__board');
  const notes = recordsBoard.querySelectorAll('.note');

  notes.forEach((note) => {
    const title = note.querySelector('.note__title').value;
    const category = note.querySelector('.note__category').value;

    const noteSets = note.querySelectorAll('.note__set');
    const sets = [];
    noteSets.forEach((set) => {
      const weight = set.querySelector('.set-weight').value;
      const reps = set.querySelector('.set-reps').value;
      sets.push({ weight, reps });
    });

    const noteObj = {
      title,
      category,
      sets,
    };

    workoutRecords.workout.push(noteObj);
  });

  return workoutRecords;
}
