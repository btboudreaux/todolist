toDoList = [{
  toDoTask: "Thing to do",
  dueDate: "2022-10-31",
  id: "001",
  isChecked: false,
  isEdit: false
}]

const createToDo = () => {
  const toDoText = document.getElementById("todo-add-text");
  const dueDate = document.getElementById("due-date");
  if (toDoText.value.trim() != 0) {
    toDoList.push({
      toDoTask: toDoText.value,
      dueDate: dueDate.value,
      id: new Date().getTime().toString(),
      isChecked: false,
      isEdit: false
    })
  }
  toDoText.value = "";
  render();
}

const deleteToDo = toDoID => {
  toDoList = toDoList.filter(function (toDoObject) {
    if (toDoObject.id === toDoID) {
      return false;
    } else {
      return true;
    }
  }) 
  render();
}

const editToDo = (toDoObject, textareaToDoEdit, dueDateEdit) => {
  if (toDoObject.isEdit === false) {
    toDoObject.isEdit = true;
  } else {
    toDoObject.dueDate = dueDateEdit.value;
    toDoObject.toDoTask = textareaToDoEdit.value;
    toDoObject.isEdit = false;
  }
  render();
}

const clickCheckBox = (toDoObject) => {
  if (toDoObject.isChecked === false) {
    toDoObject.isChecked = true;
  } else {
    toDoObject.isChecked = false;
  }
  render();
}

isHeaderEdit = false;
const inputHeader = document.createElement("input");

const editHeader = () => {
  const divHeader = document.getElementById("header-text");
  const headerEditButton = document.getElementById("header-edit");
  if (isHeaderEdit === false) {
    headerText = divHeader.innerHTML;
    divHeader.innerHTML = "";
    inputHeader.value = headerText;
    divHeader.appendChild(inputHeader);
    headerEditButton.innerHTML = "Update";
    headerEditButton.classList = "header-edit header-update";
    isHeaderEdit = true;
  } else {
    divHeader.innerHTML = inputHeader.value;
    headerEditButton.innerHTML = "Edit";
    headerEditButton.classList = "header-edit";
    isHeaderEdit = false;
  }
}

const render = () => {
  const divToDoTask = document.getElementById("to-do-task");
  divToDoTask.innerHTML = "";
  toDoList.forEach(toDoObject => {
    //todo-row div
    const divToDoRow = document.createElement("div");
    divToDoRow.classList = "todo-row";
    //todo-title div
    const divToDoTitle = document.createElement("div");
    //Create text area
    const textareaToDoEdit = document.createElement("textarea");
    //create calendar element
    const dueDateEdit = document.createElement("input");
    dueDateEdit.type = "date";
    dueDateEdit.classList = "due-date";
    //todo-buttons div
    const divToDoButtons = document.createElement("div");
    divToDoButtons.classList = "todo-buttons";
    divToDoRow.appendChild(divToDoButtons);
    //Edit Button
    const buttonToDoEdit = document.createElement("button");
    buttonToDoEdit.classList = "todo-edit";
    buttonToDoEdit.onclick = function() {editToDo(toDoObject, textareaToDoEdit, dueDateEdit)};
    divToDoButtons.appendChild(buttonToDoEdit); 
    //todo-delete button
    const buttonToDoDelete = document.createElement("button");
    buttonToDoDelete.innerHTML = "X";
    buttonToDoDelete.classList = "todo-delete";
    buttonToDoDelete.onclick = function () {deleteToDo(toDoObject.id)}
    divToDoButtons.appendChild(buttonToDoDelete);
    if (toDoObject.isEdit === false) {
      //todo-title div
      divToDoTitle.innerHTML = toDoObject.toDoTask;
      buttonToDoEdit.innerHTML = "Edit";
      divToDoRow.appendChild(divToDoTitle);
      //todo-due-date div
      const divToDoDate = document.createElement("div");
      if (toDoObject.dueDate != "") {
        divToDoDate.classList = "todo-due-date";
        divToDoDate.innerHTML = `Due Date: ${toDoObject.dueDate}`
        divToDoRow.appendChild(divToDoDate);
      }
    //todo-checkbox
      const inputCheckBox = document.createElement("input");
      inputCheckBox.type = "checkbox";
      inputCheckBox.checked = toDoObject.isChecked;
      inputCheckBox.classList = "todo-checkbox";
      inputCheckBox.onchange = function () {clickCheckBox(toDoObject)}
      divToDoRow.appendChild(inputCheckBox);
      //check box status
      if (toDoObject.isChecked === false) {
        divToDoTitle.classList = "todo-title";
      } else {
        divToDoRow.classList = "todo-row todo-row-done";
        divToDoTitle.classList = "todo-title text-done";
        divToDoDate.classList = "todo-due-date todo-due-date-done"
      }
      //Attaches entire div to main
      divToDoTask.appendChild(divToDoRow);
    }
  else {
    //Modify toDoTitle div
    divToDoTitle.classList = "todo-title todo-add-text-button-container";
    //Create text area settings
    textareaToDoEdit.rows = "4";
    textareaToDoEdit.classList = "todo-add-text";
    textareaToDoEdit.value = toDoObject.toDoTask;
    divToDoTitle.appendChild(textareaToDoEdit);
    //Due Date Edit
    dueDateEdit.value = toDoObject.dueDate;
    //todo-update button
    buttonToDoEdit.classList = "todo-edit todo-update";
    buttonToDoEdit.innerHTML = "Update";
    //append things
    divToDoTitle.appendChild(dueDateEdit);
    divToDoRow.appendChild(divToDoTitle);
    divToDoTask.appendChild(divToDoRow);
  }
});
}

render();

const toDoAddButton = document.getElementById("todo-add-button").addEventListener("click", createToDo);
const editHeaderButton = document.getElementById("header-edit").addEventListener("click", editHeader);