# Project Context

## Project Information

**Project Name:** Support Ticket Management System

**Project Type:** Full-Stack Web Application

**Purpose:**
Develop a modern Support Ticket Management System that enables internal teams to create, manage, assign, track, and resolve support tickets through a controlled workflow.

This project is developed as part of the AI Capability Exercise and demonstrates AI-assisted software engineering across the complete Software Development Life Cycle (SDLC).

---

# Business Goal

The application should help organizations manage support requests efficiently while enforcing a structured ticket lifecycle.

Users should be able to:

- Create tickets
- Update tickets
- Assign tickets
- Track ticket status
- Add comments
- Search and filter tickets

The system must persist data in MongoDB and expose REST APIs consumed by a React frontend.

---

# Core Requirements

The application must support:

- Ticket CRUD
- Comment Management
- Status Workflow
- Search
- Filtering
- Backend Validation
- Error Handling
- Database Persistence
- Integration Testing

---

# Ticket Lifecycle

Only the following status transitions are allowed.

Open
→ In Progress

In Progress
→ Resolved

Resolved
→ Closed

Open
→ Cancelled

In Progress
→ Cancelled

All invalid transitions must be rejected by the backend.

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- React Hook Form
- Zod

## Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose

## Testing

- Jest
- Supertest

---

# Architecture

The application follows Layered Architecture.

Presentation Layer

↓

Controllers

↓

Services

↓

Repositories

↓

MongoDB

Business logic must remain inside the Service layer.

Controllers should be thin.

Database access should remain inside Repository classes.

---

# Project Structure

frontend/

backend/

docs/

database/

tests/

tool-specific/

prompt-history/

---

# Coding Standards

Follow these standards throughout the project.

- Use TypeScript strict mode.
- Follow RESTful API conventions.
- Keep controllers small.
- Business logic belongs in services.
- Validate every request.
- Return consistent API responses.
- Handle all exceptions gracefully.
- Write reusable code.
- Avoid duplicated logic.

---

# Error Response Format

Every API error should return

{
  "success": false,
  "message": "Human readable message",
  "errors": []
}

---

# Success Response Format

{
  "success": true,
  "data": {}
}

---

# AI Usage Guidelines

When generating code:

- Read this document first.
- Do not change project architecture.
- Do not introduce unnecessary libraries.
- Generate production-quality code.
- Explain important design decisions.
- Suggest improvements where appropriate.
- Never generate code without explaining it.

---

# Definition of Done

A feature is complete only if:

✔ Code compiles

✔ Validation works

✔ Errors handled

✔ Tests pass

✔ Documentation updated

✔ Prompt history updated

✔ Git commit created

---

# Project Vision

The goal is not simply to generate code with AI.

The goal is to demonstrate responsible AI-assisted software engineering by combining human decision-making with AI assistance throughout the entire software development lifecycle.