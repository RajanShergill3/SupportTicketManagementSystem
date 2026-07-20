# Project Context

## Project Information

**Project Name:** Support Ticket Management System

**Project Type:** Full-Stack Web Application

**Developer:** Rajan Shergill

**Purpose:**

The Support Ticket Management System is a full-stack web application designed to help internal teams efficiently create, assign, manage, and resolve support requests through a structured ticket lifecycle.

This project was developed as part of the **AI Capability Exercise** and demonstrates responsible AI-assisted software engineering across the complete Software Development Life Cycle (SDLC), from planning and implementation to testing and documentation.

---

# Business Goal

The application provides a centralized platform for managing support requests while enforcing business rules through a controlled ticket workflow.

The system enables users to:

- Create support tickets
- View and update ticket information
- Assign tickets to team members
- Track ticket progress
- Change ticket status
- Add comments
- Search and filter tickets
- View and manage users

The application persists data in MongoDB and exposes REST APIs consumed by a React frontend.

---

# Core Requirements

The application supports the following core capabilities:

- User Management
- Ticket CRUD Operations
- Ticket Assignment
- Ticket Status Workflow
- Comment Management
- Search & Filtering
- Backend Validation
- Centralized Error Handling
- MongoDB Persistence
- Automated Testing
- Technical Documentation

---

# Ticket Lifecycle

The backend enforces a controlled ticket workflow.

Only the following transitions are allowed:

```text
Open
├── In Progress
│   ├── Resolved
│   │   └── Closed
│   └── Cancelled
└── Cancelled
```

Valid transitions:

| From | To |
|------|----|
| Open | In Progress |
| Open | Cancelled |
| In Progress | Resolved |
| In Progress | Cancelled |
| Resolved | Closed |

All invalid transitions are rejected by the backend through business rule validation.

---

# Technology Stack

## Frontend

- React 19
- TypeScript
- Vite
- React Router v7
- Tailwind CSS
- Axios

---

## Backend

- Node.js
- Express 5
- TypeScript
- MongoDB
- Mongoose

---

## Testing

### Backend

- Jest
- Supertest
- mongodb-memory-server

### Frontend

- Vitest
- React Testing Library
- user-event
- jsdom

---

# Architecture

The application follows a layered architecture that separates responsibilities across independent layers.

```text
React Frontend
        │
        ▼
Express REST API
        │
        ▼
Controllers
        │
        ▼
Services
(Business Logic)
        │
        ▼
Repositories
        │
        ▼
MongoDB
```

### Architectural Principles

- Controllers remain thin.
- Business logic resides in the Service layer.
- Data access is isolated in Repository classes.
- Validation occurs before business logic execution.
- API responses follow a consistent format.
- Components are reusable and maintainable.

---

# Project Structure

```text
SupportTicketManagementSystem/

├── backend/
│   ├── src/
│   └── tests/
│
├── frontend/
│   ├── src/
│   └── public/
│
├── docs/
│
├── tool-specific/
│   └── cursor-workflow/
│
├── prompt/
│
├── README.md
├── CHANGELOG.md
└── LICENSE
```

---

# Coding Standards

The following standards are applied throughout the project:

- TypeScript strict mode
- RESTful API design
- Layered architecture
- Thin controllers
- Business logic in services
- Repository pattern
- Request validation
- Centralized error handling
- Consistent API responses
- Reusable React components
- Maintainable and readable code
- Avoid duplicated logic

---

# API Response Standards

## Success Response

```json
{
  "success": true,
  "data": {}
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Human readable message",
  "errors": []
}
```

---

# AI-Assisted Development Guidelines

AI tools were used to improve development productivity while maintaining developer ownership of technical decisions.

AI assistance included:

- Project planning
- Architecture discussions
- Code scaffolding
- Refactoring
- Debugging
- Test generation
- Documentation

All AI-generated code and documentation were:

- Reviewed manually
- Modified where necessary
- Tested locally
- Verified before committing
- Kept consistent with the existing architecture

---

# Development Workflow

Each feature followed the same engineering workflow.

```text
Requirement Analysis
        │
        ▼
Feature Planning
        │
        ▼
AI-Assisted Implementation
        │
        ▼
Manual Review
        │
        ▼
Refactoring
        │
        ▼
Testing
        │
        ▼
Documentation Update
        │
        ▼
Git Commit
```

---

# Definition of Done

A feature is considered complete only when:

- ✅ Code compiles successfully
- ✅ Business rules are implemented
- ✅ Validation passes
- ✅ Error handling works correctly
- ✅ Automated tests pass
- ✅ Documentation is updated
- ✅ Acceptance criteria are satisfied
- ✅ AI workflow artifacts are updated
- ✅ Changes are committed to Git

---

# Project Vision

The objective of this project is not simply to generate code using AI.

The project demonstrates how AI can be integrated into a professional software engineering workflow while maintaining human oversight, engineering judgment, testing, and documentation throughout the entire Software Development Life Cycle.

The final outcome is a maintainable, well-tested, and production-oriented application that showcases responsible AI-assisted software development.