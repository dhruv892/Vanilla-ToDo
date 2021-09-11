const addNote = document.querySelector('.new-note');
const allNotes = document.querySelector('.notes');
const noteInput = document.querySelector('.add-new');
const search = document.querySelector('.search');
const btnSend = document.querySelector('.btn-send');

let notesHTML = "";
const serverURL = "https://safe-note-api.herokuapp.com/notes";

// rendering notes 
const renderNotes = notes => {
    notes.map((note) => {
        notesHTML +=
            `<li class="item" data-id=${note._id}>
                <span class="note-content">${note.note}</span>
                <div class="icons">
                    <i class="far fa-copy copy" id="copy-note"></i>
                    <i class="far fa-edit edit" id="edit-note"></i>
                    <i class="far fa-trash-alt delete" id="delete-note"></i>
                </div>
            </li>
        `
    })

    allNotes.innerHTML = notesHTML;
}

// getting all notes from server
// Method: GET
const getAllNotes = async () => {
    await fetch(serverURL)
        .then(response => response.json())
        .then(data => renderNotes(data))
}

// adding new note to server
// Method: POST
const addNewNote = note => {
    fetch(serverURL, {
        method: "POST",
        body: JSON.stringify({
            note: note
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(res => res.json())
        .then((data) => {
            // pushing data to array and sending single note to render 
            const dataArray = [];
            dataArray.push(data);
            renderNotes(dataArray);
        })
}

// taking input value for new note
addNote.addEventListener('submit', (event) => {
    event.preventDefault();

    // grabbing the input value 
    const note = addNote.add.value.trim();
    note.length && addNewNote(note);
    addNote.add.value = "";
})

// btnSend.addEventListener('click', (event) => {
//     event.preventDefault();

//     // grabbing the input value 
//     const note = noteInput.value.trim();
//     note.length && addNewNote(note);
//     noteInput.value = "";
// })

allNotes.addEventListener('click', (event) => {
    event.preventDefault();

    // delete existing note by id
    // Method: DELETE
    let delBtn = event.target.id == "delete-note";
    id = event.target.parentElement.parentElement.dataset.id;

    if (delBtn) {
        fetch(`${serverURL}/${id}`, {
            method: "DELETE"
        }).then(res => res.json())
            .then(() => location.reload())
    }

    // update existing node
    // Method: PATCH
    let editBtn = event.target.id == "edit-note";

    if (editBtn) {
        const parent = event.target.parentElement.parentElement;
        let noteContent = parent.querySelector('.note-content').textContent;

        noteInput.value = noteContent.trim();
    }

    btnSend.addEventListener('click', (event) => {
        event.preventDefault();

        fetch(`${serverURL}/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                note: noteInput.value
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json())
            .then(() => location.reload());
    })

    // copy functionality 
    let copyBtn = event.target.id == "copy-note";

    if (copyBtn) {
        const parent = event.target.parentElement.parentElement;
        let noteContent = parent.querySelector('.note-content').textContent;

        navigator.clipboard.writeText(noteContent.trim());
    }
})

// search functionality 
const filterNotes = keyword => {
    Array.from(allNotes.children)
        .filter((note) => !note.textContent.toLowerCase().includes(keyword))
        .map((note) => note.classList.add('filtered'))

    Array.from(allNotes.children)
        .filter((note) => note.textContent.toLowerCase().includes(keyword))
        .map((note) => note.classList.remove('filtered'))
}

search.addEventListener('keyup', () => {
    const keyword = search.value.trim().toLowerCase();
    filterNotes(keyword)
})

getAllNotes();
