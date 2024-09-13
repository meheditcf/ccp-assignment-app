# Shipping Rate Management System

This web interface allows users to manage shipping rates effectively. It provides functionalities to add, edit, delete, sort, and reorder rates with an intuitive drag-and-drop feature. The system also supports pagination and has a fully responsive design.

## Key Features

### Form Handling
- **Add/Edit Shipping Rates**: Utilized Formik for form management with Yup for validation.

### Table Management
- **Edit/Delete**: Implemented edit/delete shipping rate option.
- **Sorting**: Implemented Sorting rates directly in the table without using external libraries.
- **Drag-n-Drop**: Implemented drag-and-drop functionality for reordering table rows without using external libraries
- **Pagination**: Added pagination for the table.

### State Management
- **React Context**: It was used to efficiently manage the application state, which is suitable for a lightweight project like this.
- **useState hook**: Used useState hook for local state management.

### Design
- **Tailwind CSS**: I used Tailwind CSS because it is a utility-based framework that gives the flexibility to modify everything and also because I am very familiar with it.
- **Responsiveness**: Tailwind provides utility-based styling for a responsive and customizable design. Used Tailwind utility classes to make the design responsive.

### Success/Failed Notification
- **react-toastify**: Used this library to display toast notifications after various operations.

### Simulated API
- **Loading States**: Tried to make changes look like API calls using `setTimeout` and a loader.

## Testing
- **Vitest**: I used it as it is a suitable unit testing framework for Vite projects.
- **@testing-library/react**: Provides utilities to test React components.

## Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: Formik, Yup (for validation)
- **State Management**: React Context
- **Notifications**: react-toastify
- **Custom Implementations**: Drag-and-drop and table sorting logic
