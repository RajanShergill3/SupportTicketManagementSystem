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

✅ Completed

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

Dedicated status update endpoint implemented successfully. Valid lifecycle transitions are enforced according to the project specification, invalid transitions return HTTP 400, terminal states (Closed and Cancelled) cannot transition further, and the existing Controller → Service → Repository architecture has been preserved.



### Task 4.1 – Comment Domain

**Status:** ✅ Completed

Implemented:
- Comment model
- Comment validator
- Comment repository
- Comment service

### Task 4.2 – Comment API

**Status:** ✅ Completed

Implemented:
- Comment controller
- Nested comment routes
- POST /api/v1/tickets/:id/comments
- GET /api/v1/tickets/:id/comments
- DTO mapper
- Route registration under Ticket routes

### Output

Complete Comment module implemented using the existing layered architecture. Business rules remain in the service layer, validation is reused from the domain validator, and comments are exposed through nested Ticket routes.

## Task 5.1 – Frontend Foundation

**Status:** ✅ Completed

### Deliverables

- React + Vite setup
- React Router configuration
- MainLayout
- Placeholder pages
- Axios client
- Environment configuration
- Global styles
- Loading and Error components

### Output

Established the frontend architecture for the Support Ticket Management System. Routing, layouts, API client, and reusable scaffolding are in place. No business functionality has been implemented yet.


## Task 5.2 – Login Page UI

**Status:** ✅ Completed

### Deliverables

- Responsive login page
- Reusable UI components
- Client-side validation
- Password visibility toggle
- Loading state
- Error placeholder

### Output

Implemented a reusable login interface using React and Tailwind CSS. Authentication is intentionally excluded. Generic UI components are available for reuse throughout the application.


## Task 5.3 – Dashboard & Navigation

**Status:** ✅ Completed

### Deliverables

- Responsive MainLayout
- Sidebar
- Header
- Breadcrumb
- Dashboard
- Stat Cards
- Placeholder Table
- Placeholder Timeline
- Navigation
- Avatar
- Badge

### Output

Implemented a responsive admin dashboard with reusable layout components, navigation, summary widgets, placeholder data, and shared UI components. Business functionality and API integration remain intentionally excluded.


## Task 5.4 – Users Management UI

**Status:** ✅ Completed

### Deliverables

- Users page
- Mock users
- Search
- Filters
- Pagination
- Empty state
- Loading state
- Action menu
- DataTable
- Reusable UI components

### Output

Implemented a complete Users Management interface using reusable components and placeholder data. Search, filtering, pagination, and loading states are handled client-side through a dedicated custom hook. Backend integration is intentionally deferred to the next task.


## Task 5.5 – Users API Integration

**Status:** ✅ Completed

### Deliverables

- User service
- DTO mapping
- API response types
- API error utility
- Real backend integration
- Retry support
- Loading state
- Refresh support

### Output

Integrated the Users Management module with the backend REST APIs. Components remain decoupled from HTTP through a dedicated service layer and DTO mapping. Existing search, filtering, pagination, loading, and error handling continue to function using live backend data.


## Infrastructure – CORS Configuration

**Status:** ✅ Completed

### Deliverables

- Dedicated CORS middleware
- Environment-based origin configuration
- Credential support
- Production-safe allowlist
- No route changes

### Output

Configured the Express backend to support secure cross-origin requests from the frontend development server using a dedicated middleware and environment-driven allowlist.