# Shipping Rate Management System

This web interface allows users to manage shipping rates effectively. It provides functionalities to add, edit, delete, sort, and reorder rates with an intuitive drag-and-drop feature. The system also supports pagination and has a fully responsive design.

## Key Features

### Form Handling
- **Add/Edit Shipping Rates**: Utilize Formik for form management with Yup for validation.

### Table Management
- **Sorting**: Sort rates directly in the table without relying on external libraries.
- **Reordering**: Implement drag-and-drop functionality for reordering table rows.

### State Management
- **React Context API**: Efficiently manages application state, suitable for the lightweight nature of this project.

### Design
- **Tailwind CSS**: Provides utility-based styling for a responsive and customizable design.

### User Feedback
- **react-toastify**: Displays toast notifications for user feedback after various operations.

### Simulated API
- **Loading States**: Simulate API interactions using `setTimeout` and a loader to mimic real API behavior.

## Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: Formik, Yup (for validation)
- **State Management**: React Context API
- **Notifications**: react-toastify
- **Custom Implementations**: Drag-and-drop and table sorting logic
