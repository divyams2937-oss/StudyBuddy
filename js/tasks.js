
// StudyBuddy - Task Functionality
// Member 3: Add, Display, Edit, Delete and Local Storage

const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskSubject = document.getElementById("task-subject");
const taskDeadline = document.getElementById("task-deadline");
const taskPriority = document.getElementById("task-priority");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");

const STORAGE_KEY = "studyBuddyTasks";

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let editingTaskId = null;

// Save tasks in Local Storage
function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

    window.dispatchEvent(
        new CustomEvent("studybuddy:tasks-updated", {
            detail: { tasks: getTasks() }
        })
    );
}

// Get all tasks
function getTasks() {
    return [...tasks];
}

// Display tasks

function displayTasks() {

    // Remove only previously displayed task cards
    taskList.querySelectorAll(".task-item").forEach(item => {
        item.remove();
    });

    // Show empty message if there are no tasks
    emptyMessage.style.display =
        tasks.length === 0 ? "block" : "none";

    // Display each task
    tasks.forEach((task) => {

        const taskItem = document.createElement("div");
        taskItem.className = "task-item";

        const title = document.createElement("h3");
        title.textContent = task.title;

        const subject = document.createElement("p");
        subject.textContent = "Subject: " + task.subject;

        const deadline = document.createElement("p");
        deadline.textContent = "Deadline: " + task.deadline;

        const priority = document.createElement("p");
        priority.textContent = "Priority: " + task.priority;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.type = "button";
        editButton.addEventListener("click", () => {
            editTask(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";
        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        taskItem.append(
            title,
            subject,
            deadline,
            priority,
            editButton,
            deleteButton
        );

        taskList.appendChild(taskItem);
    });
}


// Add a new task
function addTask(task) {
    const newTask = {
        id: Date.now().toString(),
        title: task.title,
        subject: task.subject,
        deadline: task.deadline,
        priority: task.priority
    };

    tasks.push(newTask);
    saveTasks();
    displayTasks();
}

// Edit an existing task
function editTask(id) {
    const task = tasks.find((item) => item.id === id);

    if (!task) return;

    taskTitle.value = task.title;
    taskSubject.value = task.subject;
    taskDeadline.value = task.deadline;
    taskPriority.value = task.priority;

    editingTaskId = id;

    const submitButton = taskForm.querySelector(
        'button[type="submit"], input[type="submit"]'
    );

    if (submitButton) {
        submitButton.textContent = "Update Task";
    }

    taskTitle.focus();
}

// Update task details
function updateTask(id, updatedTask) {
    tasks = tasks.map((task) =>
        task.id === id
            ? { ...task, ...updatedTask }
            : task
    );

    saveTasks();
    displayTasks();
}

// Delete a task
function deleteTask(id) {
    if (!confirm("Are you sure you want to delete this task?")) {
        return;
    }

    tasks = tasks.filter((task) => task.id !== id);

    saveTasks();
    displayTasks();
}

// Form validation and submission
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const subject = taskSubject.value.trim();
    const deadline = taskDeadline.value;
    const priority = taskPriority.value;

    if (!title || !subject || !deadline || !priority) {
        alert("Please fill in all task details.");
        return;
    }

    if (deadline < new Date().toISOString().split("T")[0]) {
        alert("Please select today or a future deadline.");
        return;
    }

    const taskData = {
        title,
        subject,
        deadline,
        priority
    };

    if (editingTaskId) {
        updateTask(editingTaskId, taskData);
        editingTaskId = null;
    } else {
        addTask(taskData);
    }

    taskForm.reset();

    const submitButton = taskForm.querySelector(
        'button[type="submit"], input[type="submit"]'
    );

    if (submitButton) {
        submitButton.textContent = "Add Task";
    }
});

// Share functions with Member 4
window.StudyBuddy = {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
    displayTasks
};

// Display saved tasks when the page loads
displayTasks();
