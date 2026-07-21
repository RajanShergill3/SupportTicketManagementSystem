# Candidate Information

## Candidate Details

**Name:** Rajan Shergill

**Role:** Frontend Technical Lead / Software Engineer

**Primary Technology Stack:** React, TypeScript, Node.js, Express, MongoDB

**Primary AI Tool Used:** Cursor AI and ChatGPT

**Project Option Selected:** Support Ticket Management System

**Assessment Start Date:** <your start date>

**Submission Date:** <your submission date>

---

# Project Summary

This project implements a full-stack **Support Ticket Management System** that enables users to create, manage, search, update, and track support tickets throughout their lifecycle.

The application consists of:

- React + TypeScript frontend
- Node.js + Express backend
- MongoDB database
- RESTful API architecture
- Automated testing
- Comprehensive project documentation

The core business logic is centered around the ticket status workflow. Status transitions are validated on the backend to ensure tickets only move through valid lifecycle states.

Supported workflow:

```
Open
├── In Progress
│   ├── Resolved
│   │   └── Closed
│   └── Cancelled
└── Cancelled
```

Invalid status transitions are rejected by the backend with appropriate validation responses.

Core functionality includes:

- Ticket CRUD
- User Management
- Comments
- Search & Filtering
- Dashboard
- Status Workflow
- Form Validation
- Error Handling

Additional work completed includes:

- Comprehensive automated testing
- Architecture documentation
- API documentation
- Testing documentation
- Repository cleanup

---

# Tools Used

| Purpose | Tool |
|---------|------|
| AI Assistant | Cursor AI, ChatGPT |
| Runtime | Node.js 22.13.1 |
| Frontend | React 19 + Vite + TypeScript |
| Backend | Express + TypeScript |
| Database | MongoDB + Mongoose |
| HTTP Client | Axios |
| Routing | React Router |
| Forms | React Hook Form |
| Testing (Frontend) | Vitest + React Testing Library |
| Testing (Backend) | Jest + Supertest |
| Version Control | Git + GitHub |

---

# Setup Summary

## Backend

```bash
cd backend

cp .env.example .env

npm install

npm run dev
```

Backend runs on:

```
http://localhost:3000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Validation

Backend

```bash
npm test
npm run build
npm run lint
```

Frontend

```bash
npm test
npm run build
npm run lint
```

---

# Testing Summary

| Layer | Tests |
|--------|------:|
| Backend Integration | 27 |
| Frontend Services | 25 |
| Frontend Hooks | 64 |
| Frontend Components | 85 |
| Frontend Pages | 42 |
| **Total** | **243** |

---

# Repository Structure

```
backend/
frontend/
docs/
README.md
```

Additional implementation details are available in the documentation under the `docs/` directory, including architecture, API specification, testing strategy, debugging notes, AI usage, and design decisions.