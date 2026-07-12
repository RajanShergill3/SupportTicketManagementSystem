# Functional Specification

## Project

**Support Ticket Management System**

---

# 1. Introduction

## Purpose

The Support Ticket Management System is a full-stack web application that enables internal teams to manage support requests through a structured workflow.

The application provides a centralized platform where users can:

- Create support tickets
- Update ticket details
- Assign tickets
- Track ticket progress
- Add comments
- Search and filter tickets
- Manage ticket lifecycle

---

# 2. Objectives

The project aims to demonstrate:

- AI-assisted software development
- Clean Architecture
- RESTful API design
- Database persistence
- Validation
- Error handling
- Testing
- Engineering documentation

---

# 3. Users

The application uses seeded users.

Roles include:

- Admin
- Developer
- QA

Authentication is not part of the Core implementation.

---

# 4. Core Entities

## User

| Field | Type |
|--------|------|
| id | ObjectId |
| name | String |
| email | String |
| role | Admin \| Developer \| QA |

---

## Ticket

| Field | Type |
|--------|------|
| id | ObjectId |
| title | String |
| description | String |
| priority | Low / Medium / High / Critical |
| status | TicketStatus |
| assignedTo | User |
| createdBy | User |
| createdAt | Date |
| updatedAt | Date |

---

## Comment

| Field | Type |
|--------|------|
| id | ObjectId |
| ticketId | Ticket |
| message | String |
| createdBy | User |
| createdAt | Date |

---

# 5. Ticket Lifecycle

Valid transitions:

```text
Open
    ↓
In Progress
    ↓
Resolved
    ↓
Closed
```

Additional transitions

```text
Open ---------> Cancelled

In Progress --> Cancelled
```

Invalid transitions must return HTTP 400.

---

# 6. Functional Requirements

## Ticket Management

The user shall be able to:

- Create Ticket
- View Ticket List
- View Ticket Details
- Update Ticket
- Assign Ticket
- Change Status

---

## Comments

The user shall be able to:

- View comments
- Add comments

---

## Search

The user shall be able to:

- Search by keyword
- Filter by status

---

## Validation

Backend must validate:

- Title required
- Description required
- Priority required
- Valid status transition
- Valid assignee

---

# 7. Frontend Screens

## Dashboard

Displays:

- Total Tickets
- Open Tickets
- In Progress Tickets
- Closed Tickets

---

## Ticket List

Features:

- Search
- Status Filter
- Pagination (Stretch)
- Sorting (Stretch)

---

## Create Ticket

Fields:

- Title
- Description
- Priority
- Assignee

---

## Ticket Details

Displays:

- Ticket Information
- Comments
- Status
- Activity

Actions:

- Update Ticket
- Change Status
- Add Comment

---

# 8. Backend API

## Tickets

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/tickets | List Tickets |
| GET | /api/tickets/:id | Ticket Details |
| POST | /api/tickets | Create Ticket |
| PUT | /api/tickets/:id | Update Ticket |
| PATCH | /api/tickets/:id/status | Update Status |

---

## Comments

| Method | Endpoint |
|---------|----------|
| POST | /api/tickets/:id/comments |

---

## Users

| Method | Endpoint |
|---------|----------|
| GET | /api/users |

---

# 9. Non-Functional Requirements

- Responsive UI
- Clean Architecture
- TypeScript
- REST APIs
- MongoDB Persistence
- Error Handling
- Input Validation
- Logging
- Reusable Components

---

# 10. Testing

Integration tests must verify:

- Ticket Creation
- Ticket Update
- Status Workflow
- Invalid Status Transition
- Comment Creation

---

# 11. Stretch Goals

If time permits:

- JWT Authentication
- Role-Based Authorization
- Swagger Documentation
- Docker
- CI/CD Pipeline
- Audit Logs
- Status History
- File Attachments
- Email Notifications

---

# 12. Success Criteria

The project is considered complete when:

- Users can create tickets
- Users can update tickets
- Users can change status
- Invalid transitions are rejected
- Comments work correctly
- Search and filtering work
- MongoDB persists data
- Integration tests pass
- Documentation is complete