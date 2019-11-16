const listContainer = document.querySelector("#list-of-list");
const newListForm = document.querySelector("#list-of-list-form");
const newListInput = document.querySelector("#list_name_input");
const deleteListButton = document.querySelector("[data-delete-list-button]");
const listDisplayContainer = document.querySelector(
  "[data-list-display-container]"
);
const listTitleElement = document.querySelector("[data-list-title]");
const listCountElement = document.querySelector("[data-list-count]");
const taskContainer = document.querySelector(".todos_from_list");
const listTemplate = document.getElementById("list-of-list-template");
const newTaskForm = document.querySelector(".new-task-form");
const newTaskInput = document.querySelector("#task_name_input");

//namespaces prevent overriding data in local storage OR preventing other websites from over riding data
const localStorageListKey = "task.lists";
const localStorageSelectedListIdKey = "task.selectedListId";

// create a variable to hold a list which is stored in local browser and convert it into an object as its currently a string
let lists = JSON.parse(localStorage.getItem(localStorageListKey)) || [];
let selectedListId = localStorage.getItem(localStorageSelectedListIdKey);

listContainer.addEventListener("click", event => {
  if (
    event.target.tagName.toLowerCase() === "li" ||
    event.target.className == "list_name"
  ) {
    clearElement(taskContainer);
    selectedListId = event.target.dataset.listId;
    const selectedListName = event.target.dataset.listName;

    const listsSlider = document.querySelector("[lists_slider_container]");
    const tasksSlider = document.querySelector("[tasks_slider_container]");

    listsSlider.style.transform = "translateX(-100%)";
    tasksSlider.style.transform = "translateX(0%)";

    //add list name to task heading

    let tasksHeading = document.querySelector("[tasks-heading]");
    tasksHeading.innerText = `My Tasks from ${selectedListName} Lists`;

    const selectedList = lists.find(list => list.id === selectedListId);
    renderTasksOfSelectedList(selectedList);
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
  console.log(selectedList);
}

function renderTasksOfSelectedList(selectedList) {
  selectedList.tasks.forEach(task => {
    console.log(task);
    const taskElement = document.importNode(listTemplate.content, true);
    const checkbox = taskElement.querySelector("input");
    //checkbox.id = task.id
    // checkbox.checked = task.complete;
    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.name);
    taskContainer.appendChild(taskElement);
  });
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

    // set label text as task name
    listTag.dataset.listId = list.id;
    listTag.dataset.listName = list.name;

    // add to a list container
    listContainer.appendChild(listElement);
  });
}

//clear existing elements
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render();
