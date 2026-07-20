# Support Ticket Management System

A full-stack **Support Ticket Management System** that enables internal teams to create, assign, track, and resolve support requests through a controlled ticket lifecycle. The application consists of a React frontend, an Express REST API, and a MongoDB database, with a strong emphasis on clean architecture, maintainability, and automated testing.

---

# Project Overview

The Support Ticket Management System allows users to manage support requests from creation through resolution. It provides a modern React-based user interface backed by a RESTful Express API and MongoDB for persistent storage.

The project demonstrates modern software engineering practices including:

- Layered backend architecture
- Component-based frontend architecture
- Type-safe development with TypeScript
- RESTful API design
- Centralized validation and error handling
- Automated testing
- AI-assisted development workflow
- Comprehensive technical documentation

---

# Architecture

```
                    React + TypeScript
                            │
                            ▼
                     Service Layer (Axios)
                            │
                            ▼
                    Express REST API
                            │
                            ▼
                     Controller Layer
                            │
                            ▼
                      Service Layer
                     (Business Logic)
                            │
                            ▼
                    Repository Layer
                            │
                            ▼
                         MongoDB
```

The project follows a layered architecture that separates presentation, business logic, and persistence to improve maintainability, scalability, and testability.

---

# Features

## Ticket Management

- Create support tickets
- View all tickets
- View ticket details
- Update ticket information
- Delete tickets
- Assign tickets to users
- Ticket lifecycle management

## Ticket Workflow

Supported workflow:

```
Open
├── In Progress
│   ├── Resolved
│   │   └── Closed
│   └── Cancelled
└── Cancelled
```

Invalid status transitions are rejected by the backend.

## Comments

- View ticket comments
- Add comments to tickets

## User Management

- View users
- Search users
- Filter users by role and status

## Search & Filtering

- Keyword search
- Status filtering
- Priority filtering

## Dashboard

- Ticket overview
- Recent activity
- Placeholder metrics for future analytics

## Additional Features

- Login interface with client-side validation (authentication is outside the scope of this assessment)
- Consistent API success and error responses
- Comprehensive automated testing

---

# Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router v7
- Axios
- Vitest
- React Testing Library
- user-event
- jsdom

## Backend

- Node.js
- Express 5
- TypeScript
- MongoDB
- Mongoose
- Jest
- Supertest
- mongodb-memory-server

---

# Repository Structure

```text
SupportTicketManagementSystem/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── validators/
│   │   ├── middleware/
│   │   ├── database/
│   │   └── utils/
│   ├── tests/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── test/
│   │   └── __tests__/
│   └── package.json
│
├── docs/
│
├── tool-specific/
│   └── cursor-workflow/
│
├── prompt/
│
└── README.md
```

---

# Installation

## Prerequisites

- Node.js 22+
- MongoDB (local or MongoDB Atlas)

Install dependencies:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

Create environment files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Update the environment variables before running the application.

---

# Environment Variables

## Backend

| Variable | Description |
|----------|-------------|
| MONGODB_URI | MongoDB connection string |
| PORT | Backend server port |
| NODE_ENV | Runtime environment |
| CORS_ORIGINS | Allowed frontend origins |
| CORS_CREDENTIALS | Enable CORS credentials |

---

## Frontend

| Variable | Description |
|----------|-------------|
| VITE_API_BASE_URL | Backend API base URL |

---

# Running the Application

## Backend

```bash
cd backend
npm run dev
```

Optional seed data:

```bash
npm run seed
```

---

## Frontend

```bash
cd frontend
npm run dev
```

Application URL:

```
http://localhost:5173
```

---

# Running Tests

Backend

```bash
cd backend

npm test

npm run test:coverage
```

Frontend

```bash
cd frontend

npm test

npm run test:coverage
```

---

# Build

Backend

```bash
cd backend
npm run build
```

Frontend

```bash
cd frontend
npm run build
```

---

# Lint

Backend

```bash
cd backend
npm run lint
```

Frontend

```bash
cd frontend
npm run lint
```

---

# Build Verification

Before submission, the following checks were successfully completed:

- ✅ Backend Build
- ✅ Backend Lint
- ✅ Backend Integration Tests
- ✅ Frontend Build
- ✅ Frontend Lint
- ✅ Frontend Unit & Integration Tests

---

# API Overview

Base URL

```
http://localhost:<PORT>/api/v1
```

Health endpoint

```
GET /health
```

## User APIs

| Method | Endpoint |
|--------|----------|
| GET | /api/v1/users |
| GET | /api/v1/users/:id |

---

## Ticket APIs

| Method | Endpoint |
|--------|----------|
| POST | /api/v1/tickets |
| GET | /api/v1/tickets |
| GET | /api/v1/tickets/:id |
| PUT | /api/v1/tickets/:id |
| PATCH | /api/v1/tickets/:id/status |
| DELETE | /api/v1/tickets/:id |

---

## Comment APIs

| Method | Endpoint |
|--------|----------|
| GET | /api/v1/tickets/:id/comments |
| POST | /api/v1/tickets/:id/comments |

Complete API documentation is available in:

- `docs/api-contract.md`

---

# Testing Summary

| Layer | Framework | Tests |
|--------|-----------|------:|
| Backend Integration | Jest + Supertest | **27** |
| Frontend (Services, Hooks, Components & Pages) | Vitest + React Testing Library | **216** |
| **Total Automated Tests** | | **243** |

---

# Documentation

The repository includes comprehensive technical documentation.

| Document |
|----------|
| Candidate Information |
| Tool Workflow |
| Requirements Analysis |
| Acceptance Criteria |
| Design Notes |
| API Contract |
| Data Model |
| UI Flow |
| Test Strategy |
| Debugging Notes |
| Code Review Notes |
| Review Fixes |
| Pull Request Description |
| Reflection |
| Final AI Usage Summary |

---

# AI-Assisted Development

This project was developed using **Cursor AI** and **ChatGPT** as engineering assistants.

AI was used for:

- Project planning
- Code scaffolding
- Architecture discussions
- Refactoring
- Debugging
- Test generation
- Documentation

All AI-generated suggestions were manually reviewed, modified where required, tested locally, and verified before being committed to the repository.

---

# Assumptions

- MongoDB is available through the configured connection string.
- User records already exist for ticket assignment.
- Authentication and authorization are outside the scope of this assessment.
- Dashboard metrics currently use placeholder data.
- CORS is configured for local development.

---

# Future Improvements

Possible future enhancements include:

- Authentication and authorization
- Role-based access control
- Email notifications
- File attachments
- Activity history
- Dashboard analytics
- WebSocket notifications
- Soft delete support
- Accessibility improvements
- End-to-end testing using Playwright or Cypress

---

# Author

**Rajan Shergill**

AI Capability Exercise – 2026