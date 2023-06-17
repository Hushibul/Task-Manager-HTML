const saveTaskBtn = document.getElementById("save");
const titleInput = document.getElementById("title");
const notesInput = document.getElementById("notes");
const popup = document.getElementById("pop-up");
const searchInput = document.getElementById("search");

const errorTitle = document.querySelector("#error-title");

let notes;

//Calls the function when the site first renders
window.addEventListener(
  "DOMContentLoaded",
  (function () {
    notes = window.localStorage.getItem("notes");

    showTask();
  })()
);

//Create Task
function createTask() {
  notes = window.localStorage.getItem("notes");

  const obj = { title: "", notes: "" };

  if (titleInput.value === "" && notesInput.value === "") {
    errorTitle.innerText = "Title and Note is required to save the note!";
  } else {
    popup.innerText = `${titleInput.value} Saved`;
    popup.classList.replace("d-none", "d-block");

    setTimeout(() => {
      popup.classList.replace("d-block", "d-none");
    }, 2000);

    obj.title = titleInput.value;
    obj.notes = notesInput.value;

    if (notes === null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }

    notesObj.push(obj);
    window.localStorage.setItem("notes", JSON.stringify(notesObj));
    // window.localStorage.setItem("notes", JSON.stringify(notes));

    showTask();

    titleInput.value = "";
    notesInput.value = "";
  }
}

//Show Tasks
function showTask() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.map(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text"> ${element.notes}</p>
                        <button id="${index}" onclick="deleteTask(this.id)" class="btn btn-danger">Delete</button>
                        <button id="${index}" onclick="editTask(this.id)" class="btn btn-warning">Edit</button>
                        <button id="${index}" onclick="updateTask(this.id)" class="btn btn-success">Update</button>
                    </div>
                </div>`;
  });

  let notesElem = document.getElementById("noteContainer");

  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `Nothing to show use Add Notes to add Notes`;
  }
}

//Edit Task
function editTask(index) {
  const notes = localStorage.getItem("notes");

  if (notes === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  titleInput.value = notesObj[index].title;
  notesInput.value = notesObj[index].notes;
}

//Update Task
function updateTask(index) {
  popup.innerText = `${titleInput.value} Updated`;
  popup.classList.replace("d-none", "d-block");

  setTimeout(() => {
    popup.classList.replace("d-block", "d-none");
  }, 2000);

  const notes = localStorage.getItem("notes");

  if (notes === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  const obj = { title: "", notes: "" };

  obj.title = titleInput.value;
  obj.notes = notesInput.value;

  notesObj.splice(index, 1, obj);

  localStorage.setItem("notes", JSON.stringify(notesObj));

  showTask();
}

//Delete Task
function deleteTask(index) {
  popup.innerText = `${titleInput.value} Deleted`;
  popup.classList.replace("d-none", "d-block");

  setTimeout(() => {
    popup.classList.replace("d-block", "d-none");
  }, 2000);

  const notes = localStorage.getItem("notes");

  if (notes === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  showTask();
}

//Search Task
function searchTask() {
  const notes = localStorage.getItem("notes");

  if (notes === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  const searchValue = searchInput.value.toLowerCase();

  let searchedNotes = notesObj.filter((item) =>
    item.title.toLowerCase().includes(searchValue)
  );

  let html = "";
  searchedNotes.map(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text"> ${element.notes}</p>
                        <button id="${index}" onclick="deleteTask(this.id)" class="btn btn-danger">Delete</button>
                        <button id="${index}" onclick="editTask(this.id)" class="btn btn-warning">Edit</button>
                        <button id="${index}" onclick="updateTask(this.id)" class="btn btn-success">Update</button>
                    </div>
                </div>`;
  });

  let notesElem = document.getElementById("noteContainer");

  if (searchedNotes.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `Nothing to show use Add Notes to add Notes`;
  }
}
