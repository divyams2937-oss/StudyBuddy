/* ==================================
   STUDYBUDDY: TASK FILTERS
   ================================== */

// Store the selected filter
let currentFilter = "all";
function applyTaskFilter() {

    const taskCards = document.querySelectorAll(".task-item");

    taskCards.forEach(function(card) {

        const isCompleted = card.dataset.completed === "true";

        if (currentFilter === "all") {
            card.style.display = "";
        }

        else if (currentFilter === "pending") {
            card.style.display = isCompleted ? "none" : "";
        }

        else if (currentFilter === "completed") {
            card.style.display = isCompleted ? "" : "none";
        }

    });

}

function createFilterButtons() {

    const taskSection = document.getElementById("my-tasks");

    if (!taskSection) return;

    if (document.getElementById("task-filters")) return;

    const filterContainer = document.createElement("div");

    filterContainer.id = "task-filters";
    filterContainer.className = "task-filters";

    filterContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">
            All
        </button>

        <button class="filter-btn" data-filter="pending">
            Pending
        </button>

        <button class="filter-btn" data-filter="completed">
            Completed
        </button>
    `;

    const taskList = document.getElementById("task-list");

    if (taskList) {
        taskSection.insertBefore(filterContainer, taskList);
    }
}
document.addEventListener("click", function(event) {

    const filterButton = event.target.closest(".filter-btn");

    if (filterButton) {

        currentFilter = filterButton.dataset.filter;

        document.querySelectorAll(".filter-btn").forEach(function(button) {
            button.classList.remove("active");
        });

        filterButton.classList.add("active");

        applyTaskFilter();
    }

});
// Make the filter function available to other files
window.applyTaskFilter = applyTaskFilter;

// Create the filter buttons
createFilterButtons();
// Add completion checkbox to each task
function addCompletionButtons() {

    const taskCards = document.querySelectorAll(".task-item");
    const tasks = window.StudyBuddy.getTasks();

    taskCards.forEach(function(card, index) {

        const task = tasks[index];

        if (!task || card.querySelector(".completion-checkbox")) return;

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.className = "completion-checkbox";
        checkbox.checked = task.completed || false;

        const label = document.createElement("label");
        label.textContent = "Completed";
        label.style.marginLeft = "5px";

        card.prepend(label);
        card.prepend(checkbox);

        card.dataset.completed = checkbox.checked.toString();

        checkbox.addEventListener("change", function() {

            window.StudyBuddy.updateTask(task.id, {
                completed: checkbox.checked
            });

        });

    });

    applyTaskFilter();
}

// Watch for newly displayed tasks
const taskObserver = new MutationObserver(function() {
    addCompletionButtons();
});

const taskListElement = document.getElementById("task-list");

if (taskListElement) {
    taskObserver.observe(taskListElement, {
        childList: true
    });
}

// Add checkboxes to existing tasks
addCompletionButtons();