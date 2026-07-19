# Sprint 3 – Ticket Management

## Task 3.1 – Ticket Domain

### Status

✅ Completed

### Deliverables

- Ticket Model
- Ticket Repository
- Ticket Service
- Ticket Validation

### Output

Complete Ticket domain implemented using the existing layered architecture.

---

## Task 3.2 – Ticket API

### Status

✅ Completed

### Deliverables

- Create Ticket
- Update Ticket
- Get Ticket
- List Tickets
- Delete Ticket

### Output

Complete REST API implemented for Ticket Management using the existing Controller → Service → Repository architecture.

---

## Task 3.3 – Ticket Assignment

### Status

✅ Completed

### Deliverables

- Assign User
- Change Priority
- Update Details

### Output

Ticket assignment, priority updates, and ticket detail updates are supported through the existing `PUT /api/v1/tickets/:id` endpoint. Assignment validates that the selected user exists before updating the ticket.

---

## Task 3.4 – Ticket Status Workflow

### Status

✅ Completed

### Deliverables

Implement a dedicated status update endpoint:

- PATCH /api/v1/tickets/:id/status

Supported status transitions:

Open

↓

In Progress

↓

Resolved

↓

Closed

Additional transitions:

- Open → Cancelled
- In Progress → Cancelled

Requirements:

- Reject invalid transitions
- Return HTTP 400 for invalid status changes
- Reuse existing Ticket Service and Repository
- Keep business rules inside the Service layer

### Output

Dedicated status update endpoint implemented successfully. Valid lifecycle transitions are enforced according to the project specification, invalid transitions return HTTP 400, terminal states (Closed and Cancelled) cannot transition further, and the existing Controller → Service → Repository architecture has been preserved.



### Task 4.1 – Comment Domain

**Status:** ✅ Completed

Implemented:
- Comment model
- Comment validator
- Comment repository
- Comment service

### Task 4.2 – Comment API

**Status:** ✅ Completed

Implemented:
- Comment controller
- Nested comment routes
- POST /api/v1/tickets/:id/comments
- GET /api/v1/tickets/:id/comments
- DTO mapper
- Route registration under Ticket routes

### Output

Complete Comment module implemented using the existing layered architecture. Business rules remain in the service layer, validation is reused from the domain validator, and comments are exposed through nested Ticket routes.

## Task 5.1 – Frontend Foundation

**Status:** ✅ Completed

### Deliverables

- React + Vite setup
- React Router configuration
- MainLayout
- Placeholder pages
- Axios client
- Environment configuration
- Global styles
- Loading and Error components

### Output

Established the frontend architecture for the Support Ticket Management System. Routing, layouts, API client, and reusable scaffolding are in place. No business functionality has been implemented yet.


## Task 5.2 – Login Page UI

**Status:** ✅ Completed

### Deliverables

- Responsive login page
- Reusable UI components
- Client-side validation
- Password visibility toggle
- Loading state
- Error placeholder

### Output

Implemented a reusable login interface using React and Tailwind CSS. Authentication is intentionally excluded. Generic UI components are available for reuse throughout the application.