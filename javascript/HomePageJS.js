import { renderNotes } from "/javascript/App.js";

let title = document.querySelector(".title");
let notes = document.querySelector(".note");
let addNoteButton = document.querySelector(".add-btn");
let notesDisplay = document.querySelector(".notes-display");
let pinnedNotes = document.querySelector(".pinned-notes-container");
let unpinnedNotes = document.querySelector(".notes-container");
let arrayOfNotes = JSON.parse(localStorage.getItem("myNotes")) || [];
let pinnedTitle = document.querySelector(".pin-title");
let unpinnedTitle = document.querySelector(".other-title");

if (arrayOfNotes.length > 0){
  pinnedTitle.classList.toggle("d-none");
  unpinnedTitle.classList.toggle("d-none");
}

notesDisplay.addEventListener("click", (event) => {
  let type = event.target.dataset.type;
  let noteID = event.target.dataset.id;
  //console.log({type,noteID});
  switch(type){
    case "del":
      arrayOfNotes = arrayOfNotes.filter(({id}) => id.toString() != noteID);
      unpinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned}) => !isPinned )) //Display Values whose pinned is false
      pinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned}) => isPinned ))
      localStorage.setItem("myNotes",JSON.stringify(arrayOfNotes));
      break;
    case "pinned":
      arrayOfNotes = arrayOfNotes.map( note => note.id.toString() == noteID ? {...note, isPinned : !note.isPinned} : note);
      pinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned}) => isPinned )) //Display Values whose pinned is true
      unpinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned}) => !isPinned )) //Display Values whose pinned is false
      localStorage.setItem("myNotes",JSON.stringify(arrayOfNotes));
      break;
  }

});

addNoteButton.addEventListener("click", () => {
  if (notes.value.trim().length > 0 || title.value.trim().length > 0) {
    arrayOfNotes = [...arrayOfNotes,{
      id: Date.now(),
      title: title.value.trim(),
      notes: notes.value.trim(),
      isPinned: false,
      isArchived: false
    }];
    title.value = "";
    notes.value = "";
    unpinnedNotes.innerHTML = renderNotes(arrayOfNotes);
    localStorage.setItem("myNotes",JSON.stringify(arrayOfNotes));
  }
});

// Function to handle the search functionality
function searchNotes() {
    const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
  
    // Filter notes based on the search term
    const filteredNotes = arrayOfNotes.filter(note => {
      const noteText = note.notes.toLowerCase();
      return noteText.includes(searchTerm);
    });
  
    // Display the filtered notes
    pinnedNotes.innerHTML = renderNotes(filteredNotes.filter(({ isPinned }) => isPinned));
    unpinnedNotes.innerHTML = renderNotes(filteredNotes.filter(({ isPinned }) => !isPinned));
  }
  
  // Event listener for the search button click
  document.getElementById("searchButton").addEventListener("click", searchNotes);
  
  // Event listener for the Enter key press inside the search input field
  document.getElementById("searchInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchNotes();
    }
  });

  // Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }
  
  // Event listener for the dark mode button click
  document.getElementById("darkModeButton").addEventListener("click", toggleDarkMode);
  

  pinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned}) => isPinned )) //Display Values whose pinned is true
  unpinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned}) => !isPinned )) //Display Values whose pinned is false