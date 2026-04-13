# React Frontend Architecture - Medical Appointment System

## Tech Stack
React 18
React Router DOM v6
Axios
Vite

## Project Structure

src
  components
    Layout.jsx
    Navbar.jsx
    AppointmentCard.jsx
    AppointmentForm.jsx

  pages
    AppointmentsPage.jsx
    CreateAppointmentPage.jsx
    EditAppointmentPage.jsx
    ViewAppointmentPage.jsx

  services
    appointmentService.js

  utils
    dateUtils.js
    validators.js

  App.jsx
  main.jsx

## Routing

/ -> AppointmentsPage
/create -> CreateAppointmentPage
/edit/:id -> EditAppointmentPage
/view/:id -> ViewAppointmentPage

## Architecture Overview

The application follows a component-based architecture using React functional components.

Separation of concerns:
- components: reusable UI elements
- pages: route-level views
- services: API communication layer
- utils: helper functions and validations

## Core Components

Layout
- Wrapper component
- Renders Navbar
- Displays child routes using outlet

Navbar
- Navigation between routes
- Links to home and create appointment

AppointmentCard
- Displays appointment summary
- Shows patient, doctor, date, status
- Includes actions (view, edit, delete)

AppointmentForm
- Form for creating and editing appointments
- Handles validation
- Inputs: patientId, doctorId, date, reason

## Pages

AppointmentsPage
- Fetch all appointments
- Render list using AppointmentCard

CreateAppointmentPage
- Render AppointmentForm
- Submit to create appointment

EditAppointmentPage
- Load appointment by id
- Populate form
- Submit update

ViewAppointmentPage
- Show full appointment details

## Services Layer

appointmentService.js

Responsibilities:
- HTTP communication with backend
- CRUD operations

Functions:
- getAllAppointments
- getAppointmentById
- createAppointment
- updateAppointment
- deleteAppointment

Use Axios for requests

## State Management

Use React hooks:
- useState for local state
- useEffect for lifecycle

Optional:
- useContext if global state is needed

## Validation Rules

- Required fields: patientId, doctorId, date
- Date must be valid
- Prevent empty strings
- Validate formats (numbers, text length)

## Date Handling

Use dateUtils.js:
- formatDate
- parseDate

## Error Handling

- Handle API errors in services
- Show user-friendly messages in UI
- Prevent form submission on invalid data

## UI Behavior

- Forms must be controlled components
- Show loading states when fetching data
- Display success and error messages

## Future Improvements

- Add global state management
- Add authentication
- Add pagination and filters
- Improve UI styling