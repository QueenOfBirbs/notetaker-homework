const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

// activeNote tracks whats in the text area
const activeNote = {};

// grabs notes from db
const getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

//saves notes to db
const saveNote = function(note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

// shows activeNote if they have one, otherwise it's empty
const renderActiveNote = function() {
  $saveNoteBtn.hide();

  if (typeof activeNote.id === "number") {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

// grabs the note, saves to db and updates page
const handleNoteSave = function() {
  const newNote = {
    title: $noteTitle.val(),
    text: $noteText.val()
  };

  saveNote(newNote);
    getAndRenderNotes();
    renderActiveNote();
};

// grabs activeNote and displays it
const handleNoteView = function() {
  activeNote = $(this).data();
  renderActiveNote();
};

// makes activeNote to an empty object and lets you enter a new one
const handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};

// list of note titles
const renderNoteList = function(notes) {
  $noteList.empty();

  const noteListItems = [];

  for (const i = 0; i < notes.length; i++) {
    const note = notes[i];

    const $li = $("<li class='list-group-item'>").data(note);
    $li.data('id',i);

    const $span = $("<span>").text(note.title);
    const $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note' data-id="+i+">"
    );

    $li.append($span, $delBtn);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};

// grabs notes and show them on sidebar
const getAndRenderNotes = function() {
  return getNotes().then(function(data) {
    renderNoteList(data);
  });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// grabs and shows notes
getAndRenderNotes();