let todos = [
  { text: "Ôn JavaScript", completed: true },
  { text: "Làm Todo App", completed: false },
];

function addTodo() {
  const taskInput = document.getElementById("taskInput");
  if (taskInput.value.trim() === "") {
    return;
  }
  todos.unshift({
    text: taskInput.value.trim(),
    completed: false,
  });
  taskInput.value = "";
  showTodo();
  saveTodo();
  console.log(`du lieu da them ${todos}`);
}
function showTodo() {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";
  todos.forEach((task, index) => {
    const li = document.createElement("li");
    // li.textContent = task;
    li.className = "task-item";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    const delTodos = document.createElement("button");
    delTodos.textContent = "delete";

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    
    taskText.style.textDecoration = task.completed ? "line-through" : "none";
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;

      taskText.style.textDecoration = task.completed ? "line-through" : "none";
      saveTodo();
    });
    delTodos.addEventListener("click", () => {
      deleteTodo(index);
    });
    li.append(taskText, checkbox, delTodos);
    ul.appendChild(li);
  });
  
  console.log("da thuc hien show");
}
function saveTodo() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
function loadTodo() {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  }
  showTodo();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodo();
  showTodo();
}

const addTaskButton = document.getElementById("addTaskButton");
addTaskButton.addEventListener("click", addTodo);

loadTodo();
