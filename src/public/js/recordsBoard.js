const addNoteBtn = document.querySelector('.add-note-btn');

// Add note
addNoteBtn.addEventListener('click', addNote);

function addNote() {
  const board = document.querySelector('.board');
  const note = document.createElement('div');
  note.classList.add('note');
  const noteHeader = CreateNoteHeader();
  // const noteContents = CreateNoteContents();
  note.append(noteHeader);
  // note.append(noteContents);
  board.append(note);
}
function CreateNoteHeader() {
  const noteHeader = document.createElement('div');
  noteHeader.classList.add('note__header');

  const noteTitle = document.createElement('input');
  noteTitle.classList.add('note__title');
  noteTitle.setAttribute('type', 'text');
  noteTitle.setAttribute('placeholder', 'Title');

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

  noteHeader.append(noteTitle);
  noteHeader.append(noteCategory);

  return noteHeader;
}
function CreateNoteContents() {}
