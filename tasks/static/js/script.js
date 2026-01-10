let tasks = [];
let editingTaskId = null;
let deletingTaskId = null;

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

async function fetchTasks() {
    try {
        const response = await fetch('/api/tasks/');
        if (!response.ok) throw new Error('Failed to connect to database');
        tasks = await response.json();
        renderTasks();
    } catch (error) {
        console.error('Error:', error);
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <h3>No tasks yet</h3>
                <p>Click the + button to create a new task</p>
            </div>
        `;
        return;
    }

    taskList.innerHTML = tasks.map(task => {
        const priorityClass = `priority-${task.priority}`;

        const priorityText = {
            low: 'Low',
            medium: 'Medium',
            high: 'High',
            urgent: 'Urgent'
        };

        let dateInfo = '';
        if (task.end_date) {
            dateInfo = `
                <span class="task-date">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 16px; height: 16px;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    ${task.end_date}
                </span>
            `;
        }

        return `
            <div class="task-item ${priorityClass}">
                <div class="task-header">
                    <h3 class="task-title">${task.name}</h3>
                    <span class="task-priority">${priorityText[task.priority]}</span>
                </div>
                <p class="task-description">${task.description}</p>
                <div class="task-meta">
                    ${dateInfo}
                    <div class="task-actions">
                        <button class="btn-icon btn-edit-icon" onclick="openEditModal(${task.id})" title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button class="btn-icon btn-delete-icon" onclick="openDeleteModal(${task.id})" title="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function showSuccessMessage(message) {
    const successMessage = document.getElementById('successMessage');
    successMessage.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 20px; height: 20px;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        ${message}
    `;
    successMessage.classList.add('show');

    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

function openCreateModal() {
    document.getElementById('createModal').classList.add('active');
}

function closeCreateModal() {
    document.getElementById('createModal').classList.remove('active');
    document.getElementById('createTaskForm').reset();
}

document.getElementById('createTaskForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('taskName').value;
    const description = document.getElementById('taskDescription').value;
    const priority = document.getElementById('taskPriority').value;
    const end_date = document.getElementById('taskEndDate').value || null;

    const taskData = {
        name,
        description,
        priority,
        end_date
    };

    try {
        const response = await fetch('/api/tasks/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(taskData)
        });

        if (response.ok) {
            closeCreateModal();
            fetchTasks();
            showSuccessMessage('Task created successfully!');
        } else {
            alert('An error occurred');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function openEditModal(taskId) {
    editingTaskId = taskId;
    const task = tasks.find(t => t.id === taskId);

    document.getElementById('editTaskName').value = task.name;
    document.getElementById('editTaskDescription').value = task.description;
    document.getElementById('editTaskPriority').value = task.priority;
    document.getElementById('editTaskEndDate').value = task.end_date || '';

    document.getElementById('editModal').classList.add('active');
}

function closeEditModal() {
    editingTaskId = null;
    document.getElementById('editModal').classList.remove('active');
}

document.getElementById('editTaskForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const taskData = {
        name: document.getElementById('editTaskName').value,
        description: document.getElementById('editTaskDescription').value,
        priority: document.getElementById('editTaskPriority').value,
        end_date: document.getElementById('editTaskEndDate').value || null
    };

    try {
        const response = await fetch(`/api/tasks/${editingTaskId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(taskData)
        });

        if (response.ok) {
            closeEditModal();
            fetchTasks();
            showSuccessMessage('Task updated successfully!');
        }
    } catch (error) {
        console.error(error);
    }
});

function openDeleteModal(taskId) {
    deletingTaskId = taskId;
    document.getElementById('deleteModal').classList.add('active');
}

function closeDeleteModal() {
    deletingTaskId = null;
    document.getElementById('deleteModal').classList.remove('active');
}

async function confirmDelete() {
    if (!deletingTaskId) return;

    try {
        const response = await fetch(`/api/tasks/${deletingTaskId}/`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': csrftoken
            }
        });

        if (response.ok) {
            closeDeleteModal();
            fetchTasks();
            showSuccessMessage('Task deleted successfully!');
        }
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('createModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeCreateModal();
    }
});

document.getElementById('editModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeEditModal();
    }
});

document.getElementById('deleteModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeDeleteModal();
    }
});

fetchTasks();
