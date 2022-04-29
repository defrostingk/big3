const addNoteBtn = document.querySelector('.add-note-btn');
let noteNum = 0;

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
    { value: '', innerText: 'Category' },
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
