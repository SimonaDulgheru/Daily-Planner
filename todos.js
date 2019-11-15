console.log('todos.js')
const listContainer = document.querySelector('#list-of-list')
const newListForm = document.querySelector('#list-of-list-form')
const newListInput = document.querySelector('#list_name_input')
const deleteListButton = document.querySelector('[data-delete-list-button]')
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const listCountElement = document.querySelector('[data-list-count]')
const taskContainer = document.querySelector('[data-tasks]')
const listTemplate = document.getElementById('list-of-list-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')

//namespaces prevent overriding data in local storage OR preventing other websites from over riding data
const localStorageListKey = 'task.lists'
const localStorageSelectedListIdKey = 'task.selectedListId'
// create a variable to hold a list which is stored in local browser and convert it into an object as its currently a string
let lists = JSON.parse(localStorage.getItem(localStorageListKey)) || []
let selectedListId = localStorage.getItem(localStorageSelectedListIdKey)

listContainer.addEventListener('click' , event => {
if(event.target.tagName.toLowerCase() === 'li'){
    selectedListId = event.target.dataset.listId
    console.log(selectedListId)

    // prompt for new task
   let task =  prompt("Add a task")
   const selectedList = lists.find(list => list.id === selectedListId)
   console.log(selectedList);
    // add task to list in storage
    selectedList.tasks.push(task)
    // alert the task list
    alert(selectedList.tasks)

    saveAndrender()
}
})

// taskContainer.addEventListener('click', event => {
//     if(event.target.tagName.toLowerCase() === 'input'){
//       const selectedList = lists.find(list => list.id === selectedListId)
//       const selectedTask = selectedList.tasks.find(task => task.id === addEventListener.target.id)
//       selectedTask.complete = event.target.checked
//         save()
//         renderTaskCount(selectedList)
//     }
// })
//select all lists that not equal to the current list 


newListForm.addEventListener('submit', event => {
    event.preventDefault()
    const listName = newListInput.value
    if(listName == null || listName === '') return
    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    saveAndrender()
})
// newTaskForm.addEventListener('submit', event => {
//     event.preventDefault()
//     const taskName = newTaskInput.value
//     if(taskName == null || taskName === '') return
//     const task = createTask(taskName)
//     newTaskInput.value = null
//     const selectedList = list.find(list => list.id === selectedListId)
//     selectedList.tasks.push(task)
//     saveAndrender()
// })

function createTask(name){
    return {id: Date.now().toString(), name:name, complete: false }
}
//create a function to capture name and task in local time and convert to string
function createList(name){
    return {id: Date.now().toString(), name:name, tasks: [] }
}
console.log(name)

function saveAndrender(){
    save()
    render()
}
function save(){
    localStorage.setItem(localStorageListKey, JSON.stringify(lists))
    localStorage.setItem(localStorageSelectedListIdKey, selectedListId)
}

//render and identify the list 
function render () {
  clearElement (listContainer)  
  renderListOfList()
const selectedList = lists.find(list => list.id === selectedListId)
//   if(selectedListId == null){
//       listDisplayContainer.style.display = 'none'
//   }else{
//     listDisplayContainer.style.display = ''
//     listTitleElement.innerText = selectedList.name
//     renderTaskCount(selectedList)
//     clearElement(taskContainer)
//     renderTask(selectedList)
//   } 
 }

function renderTask(selectedList){
    selectedList.task.forEach(task => {
      const  taskElement = listTemplate.cloneNode(true)
      const checkbox = taskElement.querySelector("input")
      checkbox.id = task.id
      checkbox.checked = task.complete
      const label = taskElement.querySelector('label')
      label.htmlFor = task.id
      label.append(task.name)
      taskContainer.appendChild(taskElement)
    })
}
function renderTaskCount(selectedList){
const incompleteTaskCount = selectedList.tasks.filter(!task.complete).length
const taskString = incompleteTaskCount === 1 ? "task" :"tasks"
//if more than one task this can be pluralised, before semi colon is true if id = to 1
listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`
}

function renderListOfList(){
    lists.forEach(list => {
   
        // //to know which list is being selected from lists of list 
        // listElement.dataset.listId = list.id
        // listElement.classList.add("li_frame")
        console.log(document.getElementById('task_name_input').innerText);
      const  listElement = document.importNode(listTemplate.content, true)

      // query select on listElement to get the label
      const listLabel = listElement.querySelector('listLabel')

      // select input and give it the correct id
        
      // set label text as task name






    //prints out list name
        // listElement.innerText = list.name
        // if (list.id === selectedListId) {
        //     listElement.classList.add('current-list')
        // }
    // add to a list container
        listContainer.appendChild(listElement)
      })
}

//clear existing elements
function clearElement (element){
while(element.firstChild){
    element.removeChild(element.firstChild)
    }
}

render()