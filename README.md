# Todo List Application

This project is a **Frontend Todo List App** built using **Next.js**. It allows users to manage their tasks efficiently by providing features to create, edit, delete, and toggle task completion statuses. The application uses **Formik** and **Yup** for form handling and validation, and **Axios** for API communication.

---

## Features

### Frontend
- **Home View**:
  - Displays a list of tasks with their title, status (completed/not completed), and options to edit or delete.
  - A summary of tasks: "Tasks: X" and "Completed: Y of X".
  - Allows toggling the completion status of tasks.
  - Includes a button to navigate to the "Create Task" page.
- **Create/Edit Task Page**:
  - Form for adding or editing tasks with fields for:
    - **Title** (required, minimum of 3 characters).
    - **Color** (selectable options).
  - Form validation using **Formik** and **Yup**.
  - Axios is used for API calls to create or update tasks.

---

## Project Setup

### Frontend

1. Install dependencies:
    ```bash
    npm install
    ```

2. Start the development server:
    ```bash
    npm run dev
    ```

3. The frontend application will be accessible at `http://localhost:3000`.

---

## Components

### `TaskCard`
- Displays individual task details and actions for editing, deleting, or toggling completion status.

### `TaskForm`
- A reusable form component for creating and editing tasks, using Formik for form handling and Yup for validation.

---

## Notes
- This project is designed with modularity and reusability in mind. Reusable components like `TaskCard` and `TaskForm` simplify the frontend codebase.
- Error handling is implemented for API interactions using Axios, ensuring proper feedback to users.

---

## License
This project is open-source and available under the [MIT License](LICENSE).
