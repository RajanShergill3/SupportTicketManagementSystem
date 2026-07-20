# Support Ticket Management System

A full-stack Support Ticket Management System for internal teams to create, assign, track, and resolve support requests through a controlled lifecycle.

---

## Project Overview

The system provides a React web application and an Express REST API backed by MongoDB. Users can manage tickets end to end: create requests, update details, transition status through an enforced workflow, add comments, search and filter the queue, and manage team members.

---

## Features

- Create, view, update, and delete support tickets
- Assign tickets to users
- Controlled ticket status workflow with invalid-transition rejection
- Comments on ticket details
- Search and filter tickets (keyword, status, priority)
- Users list with search and role/status filters
- Dashboard overview (placeholder metrics and recent activity)
- Login page UI (validation only; authentication not yet wired)
- Consistent API success/error responses
- Backend integration tests and frontend unit/integration tests

---

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router v7
- Axios
- Vitest, React Testing Library, user-event, jsdom

### Backend

- Node.js
- Express 5
- TypeScript
- MongoDB
- Mongoose
- Jest, Supertest, mongodb-memory-server

---

## Folder Structure

```text
SupportTicketManagementSystem/
├── frontend/                 # React SPA
│   ├── src/
│   │   ├── api/              # Axios client
│   │   ├── components/       # Reusable UI
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Route pages
│   │   ├── services/         # API service layer
│   │   ├── types/            # Frontend types
│   │   ├── utils/            # Mappers, validation, helpers
│   │   ├── test/             # Vitest setup + render helper
│   │   └── __tests__/        # Unit & page tests
│   └── package.json
├── backend/                  # Express API
│   ├── src/
│   │   ├── controllers/      # HTTP layer
│   │   ├── services/         # Business logic
│   │   ├── repositories/     # Data access
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # Route maps
│   │   ├── validators/       # Request validation
│   │   ├── middleware/       # CORS, errors
│   │   └── database/         # Connection + seed
│   ├── tests/                # Jest integration tests
│   └── package.json
├── docs/                     # Architecture, API, testing docs
├── tool-specific/            # Cursor workflow artifacts
├── prompt-history/           # Development prompt history
└── README.md
```

---

## Installation

Requirements:

- Node.js 22+ (recommended; backend engines and frontend Vitest/jsdom need modern Node)
- MongoDB running locally (or a reachable MongoDB URI)

```bash
# Backend
cd backend
npm install
cp .env.example .env   # then edit values

# Frontend
cd ../frontend
npm install
cp .env.example .env   # then edit values
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB connection string |
| `PORT` | No (default `3000`) | API port |
| `NODE_ENV` | No (default `development`) | Environment name |
| `CORS_ORIGINS` | Required outside development | Comma-separated allowed origins (dev defaults to `http://localhost:5173`) |
| `CORS_CREDENTIALS` | No (default `true`) | Whether credentials are allowed in CORS |

### Frontend (`frontend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_BASE_URL` | No | API base URL (default `http://localhost:3000/api/v1`) |

Keep the frontend base URL port aligned with the backend `PORT`.

---

## Running the Backend

```bash
cd backend
npm run dev
```

Optional demo data:

```bash
npm run seed
```

---

## Running the Frontend

```bash
cd frontend
npm run dev
```

App: `http://localhost:5173`

---

## Running Tests

Use Node 22+ for frontend tests.

```bash
# Backend integration tests
cd backend
npm test
npm run test:coverage

# Frontend unit + page tests
cd frontend
npm test
npm run test:coverage
```

---

## Build

```bash
cd backend && npm run build
cd frontend && npm run build
```

---

## Lint

```bash
cd backend && npm run lint
cd frontend && npm run lint
```

---

## API Overview

Base URL: `http://localhost:<PORT>/api/v1` (health is at `/health`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api/v1/users` | List users |
| `GET` | `/api/v1/users/:id` | Get user by id |
| `POST` | `/api/v1/tickets` | Create ticket |
| `GET` | `/api/v1/tickets` | List tickets (`status`, `keyword` query) |
| `GET` | `/api/v1/tickets/:id` | Get ticket |
| `PUT` | `/api/v1/tickets/:id` | Update ticket |
| `PATCH` | `/api/v1/tickets/:id/status` | Update status |
| `DELETE` | `/api/v1/tickets/:id` | Delete ticket |
| `GET` | `/api/v1/tickets/:id/comments` | List comments |
| `POST` | `/api/v1/tickets/:id/comments` | Create comment |

Full contracts: [docs/api.md](docs/api.md)

---

## Testing Summary

| Layer | Framework | Count |
|-------|-----------|-------|
| Backend integration | Jest + Supertest + mongodb-memory-server | **27** |
| Frontend (services, hooks, components, pages) | Vitest + RTL | **216** |
| **Total** | | **243** |

Details: [docs/testing.md](docs/testing.md)

---

## Documentation

- [Architecture](docs/architecture.md)
- [API Reference](docs/api.md)
- [Testing](docs/testing.md)

---

## Assumptions

- MongoDB is available at the configured URI
- User records already exist for ticket reporter/assignee (seed or manual insert)
- Login is UI-only; there is no real authentication or authorization yet
- Comment author currently uses the ticket reporter id as a stand-in for the session user
- Dashboard metrics use placeholder data (not live API aggregates)
- CORS allows the Vite origin in development by default

---

## Future Improvements

- Real authentication and session-based authorization
- Toast notifications for create/update/delete success
- Populate user names on tickets and comments instead of raw ids
- In-app unsaved-change navigation blocking via Data Router (`createBrowserRouter`)
- Live dashboard metrics from the API
- Soft delete / audit history
- E2E tests (Playwright or Cypress)

---

## Author

**Rajan Shergill**  
AI Capability Exercise – 2026
