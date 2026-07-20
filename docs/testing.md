# Testing

## Testing Stack

### Backend

- Jest
- Supertest
- mongodb-memory-server
- ts-jest

### Frontend

- Vitest
- React Testing Library
- @testing-library/user-event
- @testing-library/jest-dom
- jsdom

---

## Final Test Count

| Suite | Tests |
|-------|------:|
| Backend integration | **27** |
| Frontend (all layers) | **216** |
| **Project total** | **243** |

---

## Backend Integration Tests

Location: `backend/tests/integration/`

Infrastructure:

- `tests/setup.ts` — starts in-memory MongoDB, connects Mongoose, clears collections before each test
- `tests/teardown.ts` — global teardown safety net
- `tests/helpers/` — app factory, Supertest helpers, user/ticket factories

Suites:

| File | Coverage |
|------|----------|
| `health.integration.test.ts` | `GET /health` |
| `users.integration.test.ts` | List users, get by id, invalid/missing ids |
| `tickets.integration.test.ts` | CRUD, keyword search, status filter, persistence checks |
| `ticket-status.integration.test.ts` | Valid and invalid status transitions |

Commands:

```bash
cd backend
npm test
npm run test:watch
npm run test:coverage
```

---

## Frontend Service Tests

Location: `frontend/src/__tests__/services/`

Approach: mock Axios (`@/api/client`) only; exercise real service + mapper logic.

| File | Service |
|------|---------|
| `ticket.service.test.ts` | get/create/update/delete/status |
| `user.service.test.ts` | list + get by id |
| `comment.service.test.ts` | list + create |

---

## Frontend Hook Tests

Location: `frontend/src/__tests__/hooks/`

Approach: `renderHook` + mocked services.

Covered hooks include:

- `useTicketDetails`, `useTicketsTable`, `useCreateTicket`, `useEditTicket`
- `useDeleteTicket`, `useUpdateTicketStatus`, `useComments`
- `useUsersTable`, `useUsersOptions`
- `usePageMeta`, `useUnsavedChangesPrompt`

---

## Frontend Component Tests

Location: `frontend/src/__tests__/components/`

Approach: RTL + user-event; mock hooks only for composing containers (e.g. `CommentsSection`).

Coverage spans:

- UI primitives (`Button`, `Select`, `Pagination`, `ActionMenu`, …)
- `TicketForm`, comment components
- Layout (`Header`, `Sidebar`, `Breadcrumb`, …)

---

## Frontend Page Tests

Location: `frontend/src/__tests__/pages/`

Approach: `MemoryRouter` + mocked service layer; pages run real hooks and components.

Pages covered:

- `DashboardPage`, `TicketsPage`, `TicketDetailsPage`
- `CreateTicketPage`, `EditTicketPage`, `UsersPage`
- `LoginPage`, `NotFoundPage`

Helpers: `src/__tests__/pages/helpers.tsx` (`renderAtRoute`, location assertions)

---

## Commands

```bash
# Frontend
cd frontend
npm test
npm run test:watch
npm run test:coverage

# Backend
cd backend
npm test
npm run test:watch
npm run test:coverage
```

**Note:** Frontend Vitest + jsdom requires Node.js 20.19+ (Node 22 recommended).
