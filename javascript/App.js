function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

export function renderNotes (notes) {
    let newNote = notes.map(({
        id,
        notes,
        title,
        isPinned,
        isArchived
    }) => {
        const dateTime = formatDate(id);
        return `<div class="single-note relative shadow">
                    <div class="d-flex align-center title-container">
                        <span class="single-note-title">${title}</span>
                        <button class="button del-btn v-hidden" data-type="del" data-id="${id}">
                            <span data-type="del" data-id="${id}" class="material-icons-outlined">delete</span>
                        </button>
                    </div>
                    <p>${notes}</p> 
                    <div class="options d-flex gap-md">
                        <button class="button btn pinned-btn v-hidden" data-pinned=${isPinned} data-type="pinned" data-id="${id}">
                            <span class=${isPinned ? "material-icons" : "material-icons-outlined" } data-pinned=${isPinned} data-type="pinned" data-id="${id}">push_pin</span>
                        </button>
                    </div>   
                    <p class="note-date-time">Created on: ${dateTime}</p> <!-- Display the date and time -->
                </div>`;
    });
    newNote = newNote.join("");
    return newNote;
};