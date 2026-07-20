# Architecture

## Overview

The Support Ticket Management System is a layered full-stack application:

```text
React SPA (Vite)
      │  Axios
      ▼
Express REST API
      │
 Controllers → Services → Repositories → MongoDB (Mongoose)
```

Business rules live in the backend service layer. The frontend keeps thin pages, reusable components, hooks for state, and a service layer that talks to the API.

---

## Backend Architecture

### Layers

| Layer | Responsibility |
|-------|----------------|
| **Routes** | Map HTTP paths to controllers |
| **Controllers** | Parse request, call services, format responses |
| **Services** | Validation orchestration, business rules, status transitions |
| **Repositories** | MongoDB persistence only |
| **Models** | Mongoose schemas |
| **Validators** | Request payload / query validation |
| **Middleware** | CORS, not-found, global error handling |

### Application bootstrap

- `src/app.ts` exports `createApp()` — Express app factory (used by tests and server)
- `src/server.ts` connects MongoDB, starts HTTP, handles graceful shutdown

### Request flow

```text
HTTP Request
  → CORS / JSON middleware
  → Route
  → Controller
  → Service (validate + business rules)
  → Repository
  → MongoDB
  → Response mapper (toXxxResponse)
  → sendSuccess / error middleware
```

### Repository / service / controller pattern

- Controllers stay thin and have no database access
- Services own domain rules (for example, allowed status transitions and user existence checks)
- Repositories perform CRUD with Mongoose and return lean domain documents
- Shared API shapes use `ApiSuccessResponse` / `ApiErrorResponse`

### Ticket status state machine

```text
Open → In Progress → Resolved → Closed
Open → Cancelled
In Progress → Cancelled
```

Invalid transitions return HTTP 400 with `Invalid status transition`.

---

## Frontend Architecture

### Layers

| Layer | Responsibility |
|-------|----------------|
| **Pages** | Route-level composition and navigation |
| **Components** | Reusable UI (forms, tables, layout, comments) |
| **Hooks** | Loading/error/mutation state and data orchestration |
| **Services** | Axios calls + DTO → UI model mapping |
| **Utils** | Validation, mappers, display helpers |
| **Types** | Shared TypeScript contracts |

### React structure

```text
App
 └─ AppRoutes (BrowserRouter)
     ├─ /login → LoginPage
     └─ MainLayout
         ├─ DashboardPage
         ├─ UsersPage
         ├─ TicketsPage
         ├─ CreateTicketPage
         ├─ EditTicketPage
         └─ TicketDetailsPage
```

### Data flow

```text
Page
  → Hook (e.g. useTicketsTable)
    → Service (ticketService.getTickets)
      → Axios apiClient
        → Backend API
      ← mapped Ticket[]
  ← UI state (loading / error / data)
```

### Forms

- Create and Edit share `TicketForm` with `mode: 'create' | 'edit'`
- Create validates reporter; update does not (reporter is immutable)
- Dirty checking is split: `hasCreateTicketChanges` vs `hasUpdateTicketChanges`

---

## Folder Organization

### Backend (`backend/src`)

- `controllers/`, `services/`, `repositories/`, `models/`
- `routes/`, `validators/`, `middleware/`, `constants/`, `types/`, `utils/`
- `database/` — connection + seed scripts

### Frontend (`frontend/src`)

- `pages/`, `components/`, `hooks/`, `services/`, `api/`
- `layouts/`, `routes/`, `types/`, `utils/`, `config/`
- `test/` — Vitest setup and shared `render`
- `__tests__/` — services, hooks, components, pages

---

## Testing Strategy

| Area | Approach |
|------|----------|
| Backend | Real Express app + in-memory MongoDB; no mocks of domain logic |
| Frontend services | Mock Axios client only |
| Frontend hooks | `renderHook` + mocked services |
| Frontend components | RTL + user-event; mock hooks only when composing sections |
| Frontend pages | MemoryRouter + mocked services; exercise real hooks/components |

See [testing.md](./testing.md) for counts and commands.

---

## Cross-cutting Concerns

- **Errors:** Backend `AppError` hierarchy → consistent JSON errors; frontend `ApiError` / message helpers
- **CORS:** Configurable origins via env
- **Config:** Fail-fast validation for required environment variables
- **Seeding:** Dev seed script creates users, tickets, and comments for local demos
