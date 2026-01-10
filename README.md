# Task Manager

A modern, full-featured task management application built with Django and vanilla JavaScript.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Django](https://img.shields.io/badge/Django-4.1+-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

✨ **Complete CRUD Operations**
- Create, read, update, and delete tasks
- Confirmation dialogs for destructive actions
- Real-time success notifications

🎨 **Modern UI Design**
- Jira/Todoist-inspired color scheme
- Gradient backgrounds and smooth animations
- Responsive design for all devices
- Scrollable task list with custom scrollbar

📋 **Task Management**
- Priority levels: Low, Medium, High, Urgent
- Optional due dates
- Automatic urgent priority for overdue tasks
- Tasks sorted by creation date (newest first)

🔧 **Technical Features**
- Django REST Framework API
- SQLite database
- CSRF protection
- Floating action button for task creation
- Icon-based actions (edit/delete)

## Screenshots

### Main Interface
- Clean, modern task list with color-coded priorities
- Floating + button for creating new tasks
- Icon buttons for quick actions

### Priority Colors
- **Low**: Green border (#10b981)
- **Medium**: Orange border (#f59e0b)
- **High**: Red border (#ef4444)
- **Urgent**: Red border + red background with pulse animation (#dc2626)

## Installation

### Prerequisites
- Python 3.8 or higher
- pip

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager
   ```

2. **Create virtual environment (optional but recommended)**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install django djangorestframework
   ```

4. **Run migrations**
   ```bash
   python manage.py migrate
   ```

5. **Start the development server**
   ```bash
   python manage.py runserver
   ```

6. **Open in browser**
   Navigate to [http://127.0.0.1:8000](http://127.0.0.1:8000)

## Project Structure

```
task-manager/
├── config/                 # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── tasks/                  # Main application
│   ├── migrations/         # Database migrations
│   ├── static/             # Static files
│   │   ├── css/
│   │   │   └── styles.css
│   │   └── js/
│   │       └── script.js
│   ├── templates/          # HTML templates
│   │   └── tasks/
│   │       └── index.html
│   ├── models.py           # Task model
│   ├── serializers.py      # DRF serializers
│   ├── views.py            # API views
│   └── urls.py             # URL routing
├── manage.py               # Django management script
└── README.md               # This file
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks/` | List all tasks |
| POST | `/api/tasks/` | Create a new task |
| GET | `/api/tasks/<id>/` | Get task details |
| PUT | `/api/tasks/<id>/` | Update a task |
| DELETE | `/api/tasks/<id>/` | Delete a task |

## Usage

### Creating a Task
1. Click the floating + button in the bottom-right corner
2. Fill in the task details:
   - Task Name (required)
   - Description (required)
   - Priority (required)
   - Due Date (optional)
3. Click "Create"

### Editing a Task
1. Click the edit icon (pencil) on any task
2. Modify the task details
3. Click "Save" to confirm or "Cancel" to discard changes

### Deleting a Task
1. Click the delete icon (trash) on any task
2. Confirm deletion in the dialog
3. Click "Yes, Delete" to confirm or "Cancel" to abort

### Automatic Deadline Tracking
- Tasks with past due dates automatically change to "Urgent" priority
- Urgent tasks display with a red background and pulse animation
- Deadline checking occurs on page load and task rendering

## Technologies Used

- **Backend**: Django 4.1+, Django REST Framework
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Database**: SQLite
- **Icons**: Heroicons (SVG)
- **Design**: Custom CSS with modern gradients and animations

## Development

### Running in Development Mode
```bash
python manage.py runserver
```

### Creating a Superuser (for Django Admin)
```bash
python manage.py createsuperuser
```

Access admin panel at [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Built with ❤️ using Django and modern web technologies.

## Acknowledgments

- Design inspired by Jira and Todoist
- Icons from Heroicons
- Color palette from Tailwind CSS
