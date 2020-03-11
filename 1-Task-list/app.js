// Define Variables

form = document.querySelector("#task-form");
taskInput = document.querySelector("#task");
taskList = document.querySelector(".collection");
clearBtn = document.querySelector(".clear-tasks");
filter = document.querySelector("#filter");

loadAllEventListeners();

// load all event listeners
function loadAllEventListeners() {
  // dom load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // remove task event
  taskList.addEventListener("click", removeTask);
  // clear task event
  clearBtn.addEventListener("click", clearTasks);
  // filter task event
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from Localstorage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    // create li element
    const li = document.createElement("li");
    // add class
    li.className = "collection-item";
    // create text node
    li.appendChild(document.createTextNode(task));
    // create a link element
    const link = document.createElement("a");
    // add class
    link.className = "delete-item secondary-content";
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.append(link);
    // append li to ul
    taskList.appendChild(li);
  });
}

// add Task
function addTask(e) {
  e.preventDefault();

  if (taskInput.value === "") {
    alert("You Should Insert A Task");
  }

  // create li element
  const li = document.createElement("li");
  // add class
  li.className = "collection-item";
  // create text node
  li.appendChild(document.createTextNode(taskInput.value));
  // create a link element
  const link = document.createElement("a");
  // add class
  link.className = "delete-item secondary-content";
  // add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append the link to li
  li.append(link);
  // append li to ul
  taskList.appendChild(li);

  // Store Task in localStorage
  storeTaskInLocalStorage(taskInput.value);
  // clear input
  taskInput.value = "";
}

// Store Task in localStorage function
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure to delete this task?")) {
      e.target.parentElement.parentElement.remove();

      // Remove Task from localstorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove Task from localstorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear Tasks
function clearTasks() {
  // taskList.innerHTML = "";

  // faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // clear tasks from localstorage
  clearTasksFromLocalStorage();
}

// clear tasks from localstorage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
