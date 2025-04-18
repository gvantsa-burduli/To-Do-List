
  // Load tasks from localStorage on page load
  window.onload = () => {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => addTaskToDOM(task.text, task.category, task.completed));
    checkIfEmpty();
  };

  // Main function to add task
  let funcion = () => {
    let input = document.getElementById("input");
    let text = input.value.trim();
    let category = document.getElementById("category").value;

    if (text === '') {
      alert("Please write your plans!");
    } else {
      addTaskToDOM(text, category, false); // false for incomplete tasks
      saveTask(text, category);
      input.value = '';
    }
  };

  // Add task to DOM with checkbox and category
  function addTaskToDOM(text, category, completed) {
    let li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${completed ? 'checked' : ''}>
      <span class="task-text">${text}</span>
      <span class="task-category">${category}</span>
    `;
    document.getElementById("ul").appendChild(li);

    // Checkbox functionality to mark as completed
    li.querySelector('.task-checkbox').addEventListener("click", () => {
      li.classList.toggle("completed");
      updateTaskCompletion(text, li.classList.contains("completed"));
    });

    // Edit task on double-click
    li.querySelector('.task-text').addEventListener("dblclick", () => {
      let newText = prompt("Edit your task:", text);
      if (newText && newText !== text) {
        li.querySelector('.task-text').textContent = newText;
        updateTaskText(text, newText);
      }
    });

    checkIfEmpty();
  }

  // Save task to localStorage
  function saveTask(text, category) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, category, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Remove task from localStorage
  function removeTask(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Update task completion status in localStorage
  function updateTaskCompletion(text, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
      if (task.text === text) {
        task.completed = completed;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Update task text in localStorage
  function updateTaskText(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
      if (task.text === oldText) {
        task.text = newText;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Show or hide empty message
  function checkIfEmpty() {
    const list = document.getElementById("ul");
    const message = document.getElementById("emptyMessage");
    message.style.display = list.children.length === 0 ? "block" : "none";
  }

  // Add with button
  document.getElementById("add").addEventListener("click", funcion);

  // Add with Enter key
  document.getElementById("input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      funcion();
    }
  });
