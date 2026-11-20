/* ==================================
   STUDYBUDDY: TASK FILTERS
   ================================== */

// Store the selected filter
let currentFilter = "all";
function applyTaskFilter() {

    const taskCards = document.querySelectorAll(".task-card");

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