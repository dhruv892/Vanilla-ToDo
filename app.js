const addNote = document.querySelector('.new-note');
const notes = document.querySelector('.notes');
const search = document.querySelector('.search');

const noteTemplate = note => {
    const newNoteHtml = `
        <li class="item">
            <span>${note}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;

    notes.innerHTML += newNoteHtml;
    addNote.reset();
}

//add new note
addNote.addEventListener('submit', (event) => {
    event.preventDefault();

    const note = addNote.add.value.trim();
    note.length && noteTemplate(note);
})

//delete note
notes.addEventListener('click', (event) => {
    event.target.classList.contains('delete') && event.target.parentElement.remove();
})

const filterNotes = keyword => {
    Array.from(notes.children)
        .filter((note) => !note.textContent.toLowerCase().includes(keyword))
        .map((note) => note.classList.add('filtered'))

    Array.from(notes.children)
        .filter((note) => note.textContent.toLowerCase().includes(keyword))
        .map((note) => note.classList.remove('filtered'))
}

search.addEventListener('keyup', () => {
    const keyword = search.value.trim().toLowerCase();
    filterNotes(keyword)
})