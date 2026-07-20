# Functional Specification

## Project

**Support Ticket Management System**

---

# 1. Introduction

## Purpose

The Support Ticket Management System is a full-stack web application designed to help internal teams create, assign, manage, and resolve support requests through a structured ticket lifecycle.

The system provides a centralized platform where users can:

- Create support tickets
- View ticket information
- Update ticket details
- Assign tickets to team members
- Manage ticket status through a controlled workflow
- Add comments to tickets
- Search and filter tickets
- View and manage users
- Track ticket progress

The application demonstrates modern full-stack software engineering practices using React, Express, TypeScript, and MongoDB.

---

# 2. Project Objectives

The project demonstrates the following software engineering concepts:

- AI-assisted software development
- Layered architecture
- RESTful API design
- MongoDB persistence
- TypeScript development
- Input validation
- Business rule enforcement
- Error handling
- Automated testing
- Technical documentation
- Maintainable and reusable code

---

# 3. Project Scope

## Included

The application includes:

- User Management
- Ticket Management
- Comment Management
- Ticket Workflow
- Search & Filtering
- Backend Validation
- MongoDB Persistence
- Automated Testing
- Technical Documentation

## Out of Scope

The following features are intentionally excluded from this implementation:

- User Authentication
- Authorization
- Email Notifications
- File Attachments
- Real-time Notifications
- Dashboard Analytics
- Audit History

---

# 4. Users

The application uses pre-seeded users stored in MongoDB.

Supported roles:

- Admin
- Developer
- QA

Authentication is outside the scope of this implementation.

---

# 5. Core Entities

## User

| Field | Type |
|--------|------|
| id | ObjectId |
| name | String |
| email | String |
| role | Admin / Developer / QA |
| status | Active / Inactive |

---

## Ticket

| Field | Type |
|--------|------|
| id | ObjectId |
| title | String |
| description | String |
| priority | Low / Medium / High / Critical |
| status | Open / In Progress / Resolved / Closed / Cancelled |
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

# 6. Ticket Lifecycle

The backend enforces a controlled ticket workflow.

## Valid Transitions

```text
Open
├── In Progress
│   ├── Resolved
│   │   └── Closed
│   └── Cancelled
└── Cancelled
```

Supported transitions:

| From | To |
|------|----|
| Open | In Progress |
| Open | Cancelled |
| In Progress | Resolved |
| In Progress | Cancelled |
| Resolved | Closed |

Invalid transitions are rejected by the backend with an appropriate validation error.

---

# 7. Functional Requirements

## User Management

The user shall be able to:

- View all users
- Search users
- Filter users by role
- Filter users by status

---

## Ticket Management

The user shall be able to:

- Create a ticket
- View all tickets
- View ticket details
- Update ticket information
- Delete a ticket
- Assign a ticket
- Change ticket status

---

## Comment Management

The user shall be able to:

- View ticket comments
- Add comments to a ticket

---

## Search & Filtering

The user shall be able to:

- Search tickets by keyword
- Filter tickets by status
- Filter tickets by priority

---

## Validation

The backend validates:

- Required title
- Required description
- Required priority
- Valid user assignment
- Valid ObjectId values
- Valid ticket status transitions
- Invalid request payloads

---

# 8. Frontend Screens

## Dashboard

Displays:

- Total Tickets
- Open Tickets
- In Progress Tickets
- Resolved Tickets
- Closed Tickets
- Recent Activity (placeholder)

---

## Login

Provides:

- Email validation
- Password validation

Authentication is outside the scope of this implementation.

---

## Users

Provides:

- User List
- Search
- Role Filter
- Status Filter

---

## Ticket List

Provides:

- Ticket Listing
- Search
- Status Filter
- Priority Filter

Stretch Features:

- Pagination
- Sorting

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
- Status
- Comments
- Activity

Actions:

- Update Ticket
- Change Status
- Add Comment

---

# 9. Backend API

Base URL

```
/api/v1
```

## Health

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /health | Health Check |

---

## Users

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/v1/users | List Users |
| GET | /api/v1/users/:id | User Details |

---

## Tickets

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/v1/tickets | Create Ticket |
| GET | /api/v1/tickets | List Tickets |
| GET | /api/v1/tickets/:id | Ticket Details |
| PUT | /api/v1/tickets/:id | Update Ticket |
| PATCH | /api/v1/tickets/:id/status | Update Status |
| DELETE | /api/v1/tickets/:id | Delete Ticket |

---

## Comments

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/v1/tickets/:id/comments | List Comments |
| POST | /api/v1/tickets/:id/comments | Add Comment |

---

# 10. Non-Functional Requirements

The system shall provide:

- Responsive user interface
- Layered architecture
- TypeScript implementation
- RESTful APIs
- MongoDB persistence
- Centralized error handling
- Input validation
- Logging
- Reusable components
- Maintainable codebase
- Automated testing

---

# 11. Testing Requirements

Automated tests verify:

## Backend

- User APIs
- Ticket CRUD operations
- Ticket workflow
- Status transitions
- Validation
- Error handling
- Comment APIs

## Frontend

- Service layer
- React hooks
- Components
- Page rendering
- User interactions

The project includes comprehensive backend integration tests and frontend unit/integration tests.

---

# 12. Stretch Goals

Potential future enhancements include:

- JWT Authentication
- Role-Based Authorization
- Swagger / OpenAPI Documentation
- Docker Support
- CI/CD Pipeline
- Audit History
- Status History
- File Attachments
- Email Notifications
- Dashboard Analytics
- WebSocket Notifications

---

# 13. Success Criteria

The project is considered complete when:

- Users can view and manage users
- Users can create tickets
- Users can update tickets
- Users can delete tickets
- Users can assign tickets
- Users can change ticket status
- Invalid status transitions are rejected
- Comments function correctly
- Search and filtering operate correctly
- MongoDB persists application data
- Backend validation prevents invalid requests
- Automated tests execute successfully
- The application builds successfully
- Technical documentation is complete
- The repository is ready for evaluation