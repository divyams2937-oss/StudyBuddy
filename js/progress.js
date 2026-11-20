
// StudyBuddy - Progress Tracking

function updateStudyProgress() {

    const tasks = window.StudyBuddy.getTasks();

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(function(task) {
        return task.completed === true;
    }).length;

    const pendingTasks = totalTasks - completedTasks;

    // Calculate completion percentage
    const percentage = totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    // Update dashboard counters
    document.getElementById("total-tasks").textContent = totalTasks;

    document.getElementById("completed-tasks").textContent = completedTasks;

    document.getElementById("pending-tasks").textContent = pendingTasks;

    // Update progress text and bar
    document.getElementById("progress-text").textContent =
        percentage + "% Completed";

    document.getElementById("progress-bar").value = percentage;
}

// Update progress whenever tasks change
window.addEventListener("studybuddy:tasks-updated", updateStudyProgress);

// Update progress when the page loads
updateStudyProgress();
