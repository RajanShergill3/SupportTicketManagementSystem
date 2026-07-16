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

🔄 Next

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

Status workflow implemented with transition validation and proper HTTP error handling.