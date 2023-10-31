// Get references to HTML elements
const addButton = document.getElementById("addButton");
const completeAllButton = document.getElementById("completeAllButton");
const clearButton = document.getElementById("clearButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

// Add event listeners to buttons and input
addButton.addEventListener("click", addTask);
completeAllButton.addEventListener("click", toggleAllCompleted);
clearButton.addEventListener("click", clearAllTasks);
taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="check">&#10003;</span>
      <span>${taskText}</span>
      <span class="delete">X</span>
    `;
    taskList.appendChild(li);
    taskInput.value = "";
    addEventListeners(li); // Add event listeners to the new task
    updateTaskCount(); // Update the task count
  }
}

// Function to add event listeners to a task
function addEventListeners(li) {
  const check = li.querySelector(".check");
  const deleteBtn = li.querySelector(".delete");
  
  check.addEventListener("click", toggleTask); // Add click event listener to toggle a task
  deleteBtn.addEventListener("click", deleteTask); // Add click event listener to delete a task
}

// Function to toggle a task's completion status
function toggleTask(event) {
  const check = event.target;
  const task = check.parentElement;
  task.classList.toggle("completed"); // Toggle the 'completed' class
  updateTaskCount(); // Update the task count
}

// Function to delete a task
function deleteTask(event) {
  const deleteBtn = event.target;
  const task = deleteBtn.parentElement;
  taskList.removeChild(task); // Remove the task from the task list
  updateTaskCount(); // Update the task count
}

// Function to toggle the completion status of all tasks
function toggleAllCompleted() {
  const tasks = taskList.children;
  let allCompleted = true;

  for (const task of tasks) {
    const check = task.querySelector(".check");
    const completed = task.classList.contains("completed");

    if (!completed) {
      allCompleted = false;
      break;
    }
  }

  for (const task of tasks) {
    const check = task.querySelector(".check");
    const completed = task.classList.contains("completed");

    if (allCompleted) {
      task.classList.remove("completed");
      if (!completed) {
        check.textContent = "";
      }
    } else {
      task.classList.add("completed");
      if (!completed) {
        check.textContent = "✓";
      }
    }

    updateTaskCount(); // Update the task count
  }
}

// Function to clear all tasks
function clearAllTasks() {
  taskList.innerHTML = ""; // Clear all tasks by emptying the task list
  updateTaskCount(); // Update the task count
}

// Function to update the task count display
function updateTaskCount() {
  const totalTasks = taskList.children.length;
  const completedTasks = taskList.querySelectorAll(".completed").length;
  taskCount.textContent = `${completedTasks} tasks completed out of ${totalTasks} total tasks`;
}
