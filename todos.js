const listContainer = document.querySelector("#list-of-list");
const newListForm = document.querySelector("#list-of-list-form");
const newListInput = document.querySelector("#list_name_input");
const deleteListButton = document.querySelector("[data-delete-list-button]");
const listDisplayContainer = document.querySelector(
  "[data-list-display-container]"
);
const listTitleElement = document.querySelector("[data-list-title]");
// const listCountElement = document.querySelector("[data-list-count]");
const taskContainer = document.querySelector(".todos_from_list");
const listTemplate = document.getElementById("list-of-list-template");
const taskTemplate = document.getElementById("list-of-tasks-template");
const newTaskForm = document.querySelector(".new-task-form");
const newTaskInput = document.querySelector("#task_name_input");

//namespaces prevent overriding data in local storage OR preventing other websites from over riding data
const localStorageListKey = "task.lists";
const localStorageSelectedListIdKey = "task.selectedListId";

// create a variable to hold a list which is stored in local browser and convert it into an object as its currently a string
let lists = JSON.parse(localStorage.getItem(localStorageListKey)) || [];
let selectedListId = localStorage.getItem(localStorageSelectedListIdKey);

listContainer.addEventListener("click", event => {
  if (event.target.tagName.toLowerCase() === "li") {
    clearElement(taskContainer);

    selectedListId = event.target.dataset.listId;
    const selectedListName = event.target.dataset.listName;

    const listsSlider = document.querySelector("[lists_slider_container]");
    const tasksSlider = document.querySelector("[tasks_slider_container]");

    listsSlider.style.transform = "translateX(-100%)";
    tasksSlider.style.transform = "translateX(0%)";

    //add list name to tasks heading
    let tasksHeading = document.querySelector("[tasks-heading]");
    tasksHeading.innerText = `My Tasks from ${selectedListName} List`;
    //renders tasks from selected list
    const selectedList = lists.find(list => list.id === selectedListId);
    renderTasksOfSelectedList(selectedList);
  } else if (event.target.className == "list_name") {
    let listClicked = event.target.parentElement.parentElement;
    clearElement(taskContainer);

    selectedListId = listClicked.dataset.listId;
    const selectedListName = listClicked.dataset.listName;
    const listsSlider = document.querySelector("[lists_slider_container]");
    const tasksSlider = document.querySelector("[tasks_slider_container]");

    listsSlider.style.transform = "translateX(-100%)";
    tasksSlider.style.transform = "translateX(0%)";

    //add list name to task heading
    let tasksHeading = document.querySelector("[tasks-heading]");
    tasksHeading.innerText = `My Tasks from ${selectedListName} List`;
    //renders tasks from selected list
    const selectedList = lists.find(list => list.id === selectedListId);
    renderTasksOfSelectedList(selectedList);
    console.log(selectedListName);
  }
});

//select all lists that not equal to the current list

newListForm.addEventListener("submit", event => {
  event.preventDefault();
  const listName = newListInput.value;
  const modalCreateList = document.querySelector("#list_creation_modal");
  modalCreateList.style.display = "none";
  if (listName == null || listName === "") return;
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndrender();
});

newTaskForm.addEventListener("submit", event => {
  event.preventDefault();
  const taskName = newTaskInput.value;
  const modalCreateTask = document.querySelector("#task_creation_modal");
  modalCreateTask.style.display = "none";
  if (taskName == null || taskName === "") return;
  const task = createTask(taskName);
  newTaskInput.value = null;
  const selectedList = lists.find(list => list.id === selectedListId);
  selectedList.tasks.push(task);
  saveAndrender();
});

taskContainer.addEventListener("click", event => {
  if (event.target.tagName.toLowerCase() === "input") {
    const selectedList = lists.find(list => list.id === selectedListId);

    const selectedTask = selectedList.tasks.find(
      task => task.id === event.target.id
    );

    selectedTask.complete = event.target.checked;
    saveAndrender();
  }
});

function createTask(name) {
  return { id: Date.now().toString(), name: name, complete: false };
}
//create a function to capture name and task in local time and convert to string
function createList(name) {
  return { id: Date.now().toString(), name: name, tasks: [] };
}

function saveAndrender() {
  save();
  render();
}
function save() {
  localStorage.setItem(localStorageListKey, JSON.stringify(lists));
  localStorage.setItem(localStorageSelectedListIdKey, selectedListId);
}

//render and identify the list
function render() {
  clearElement(listContainer);
  renderListOfList();

  const selectedList = lists.find(list => list.id === selectedListId);
  clearElement(taskContainer);
  renderTasksOfSelectedList(selectedList);
}

function renderTasksOfSelectedList(selectedList) {
  try {
    selectedList.tasks.forEach(task => {
      console.log(task);
      const taskElement = document.importNode(taskTemplate.content, true);
      const checkbox = taskElement.querySelector("input");
      checkbox.id = task.id;
      checkbox.checked = task.complete;

      const label = taskElement.querySelector("label");
      label.htmlFor = task.id;
      label.append(task.name);

      const deleteButton = taskElement.querySelector("span i");
      deleteButton.dataset.deleteId = task.id;

      taskContainer.appendChild(taskElement);

      deletingTasks();
    });
  } catch {
    console.log("No tasks to show");
  }
}

function renderListOfList() {
  lists.forEach(list => {
    // //to know which list is being selected from lists of list
    const listElement = document.importNode(listTemplate.content, true);

    // query select on listElement to get the label
    const listLabel = listElement.querySelector(".list_name");
    //add label to the list
    listLabel.innerText = list.name;

    // select input and give it the correct id
    document.getElementById(selectedListId);
    const listTag = listElement.querySelector("li");

    // set paragrapg text as task name
    listTag.dataset.listId = list.id;
    listTag.dataset.listName = list.name;

    //add a data atribute to delete butun
    const deleteButton = listElement.querySelector("span i");
    deleteButton.dataset.deleteId = list.id;

    //update task count from list
    const incompleteTaskCount = list.tasks.filter(task => !task.complete)
      .length;
    const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
    const listCountElement = listElement.querySelector("[data-list-count]");
    listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;

    // add to a list container
    listContainer.appendChild(listElement);
    deletingLists();
  });
}

//clear existing elements
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// delete list

const deletingLists = () => {
  let deleteButtons = document
    .querySelector("#list-of-list")
    .querySelectorAll("i");

  for (let i = 0; i < deleteButtons.length; i++) {
    let deleteButton = deleteButtons[i];

    // <li> onclick, runAlert function
    deleteButton.onclick = deleteList;
  }
};

function deleteList() {
  let myList = this.getAttribute("data-delete-id");
  lists = lists.filter(list => list.id != myList);
  saveAndrender();
  deletingLists();
}

//delete task

const deletingTasks = () => {
  let deleteButtons = document
    .querySelector(".todos_from_list")
    .querySelectorAll("i");

  for (let i = 0; i < deleteButtons.length; i++) {
    let deleteButton = deleteButtons[i];

    // <li> onclick, runAlert function
    deleteButton.onclick = deleteTask;
  }
};

function deleteTask() {
  let myTask = this.getAttribute("data-delete-id");
  const selectedList = lists.find(list => list.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter(task => task.id != myTask);
  saveAndrender();
  deletingTasks();
}

render();
deletingLists();
deletingTasks();
