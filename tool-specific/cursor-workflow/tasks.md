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


## Task 5.6 – Tickets Management UI

**Status:** ✅ Completed

### Deliverables

- Tickets listing page
- Placeholder ticket dataset
- Search
- Status filter
- Priority filter
- Pagination
- Loading state
- Empty state
- Error placeholder
- Responsive layout

### Output

Implemented a reusable Tickets Management UI following the Users module architecture using placeholder data only.


## Task 5.7 – Tickets API Integration

**Status:** ✅ Completed

### Deliverables

- Ticket API service
- Ticket DTOs
- Ticket mapper
- Live API integration
- Search
- Filters
- Pagination
- Refresh
- Error handling
- Loading
- Empty state

### Output

Integrated the Tickets module with the backend using a service and mapper architecture while preserving the existing UI and client-side interactions.



## Task 5.8 – Ticket Details Page

**Status:** ✅ Completed

### Objective

Implement a dedicated Ticket Details page that displays complete information for a single ticket using the existing backend API while preparing the layout for future Comments integration.

### Deliverables

- Ticket Details page (`/tickets/:id`)
- Ticket fetched using existing Ticket Service
- Dedicated `useTicketDetails()` hook
- Loading state
- Error state
- "Ticket not found" page (404 handling)
- Shared badge utilities
- Shared date formatting utilities
- Responsive details layout
- Comments placeholder section
- Back to Tickets navigation
- View action navigates to Ticket Details
- Build and lint passing

### Implementation Summary

#### Routing

- Reused the existing `/tickets/:id` route.
- Connected the Tickets page "View" action to navigate to the Ticket Details page.

#### Data Fetching

Implemented a dedicated `useTicketDetails()` hook responsible for:

- fetching ticket data
- loading state
- retry behaviour
- error handling
- not-found handling

The hook consumes:

- `ticketService.getTicketById()`

No API logic exists inside the page component.

#### UI

Displays:

- Ticket title
- Ticket number
- Description
- Reporter
- Assignee
- Priority
- Status
- Created date
- Updated date

Includes:

- Back to Tickets button
- Disabled Edit Ticket button (placeholder)

#### Comments

Prepared the page for future Comments integration.

Current behaviour:

- Displays a "Comments" section
- Shows a placeholder message:
  - "No comments available."

No comment APIs are called in this task.

#### Shared Utilities

Created reusable utilities:

- `ticket-badges.ts`
  - Status badge variants
  - Priority badge variants

- `date.util.ts`
  - `formatDate()`
  - `formatDateTime()`

#### Error Handling

Implemented typed API errors.

Behaviour:

- Loading → LoadingState
- HTTP 404 → Friendly "Ticket not found" page
- Other errors → ErrorMessage with Retry

#### Responsive Behaviour

- Responsive information grid
- Responsive action buttons
- Description supports multiline content
- Mobile-friendly layout

### Output

- Dedicated Ticket Details page
- Reusable data-fetching hook
- Shared badge utilities
- Shared date formatting utilities
- Improved API error handling
- Responsive layout
- Comments placeholder ready for future implementation


## Task 5.9 – Comments Integration

**Status:** ✅ Completed

### Objective

Integrate the Ticket Details page with the existing backend Comments APIs, allowing users to view and create comments while maintaining the established frontend architecture.

### Deliverables

- Comment Service
- Comment DTOs
- Comment Mapper
- Comment Validation
- useComments hook
- Comments Section
- Comment Card
- Comment Form
- Loading state
- Empty state
- Error state
- Retry behaviour
- Comment creation
- Automatic refresh after submit

### Implementation Summary

#### Backend Integration

Consumed existing APIs:

- GET /api/v1/tickets/:id/comments
- POST /api/v1/tickets/:id/comments

No backend modifications.

#### Architecture

Implemented:

- comment.service.ts
- comment.mapper.ts
- useComments.ts

Following the same service → mapper → hook → UI architecture used throughout the application.

#### UI

Replaced the placeholder comments section with:

- Comment list
- Comment form
- Empty state
- Loading state
- Error state

#### Validation

Client-side validation:

- Required
- Trim whitespace
- Maximum 1000 characters

Validation extracted into reusable utilities.

#### Behaviour

- Comments loaded on mount
- Retry supported
- New comments submitted through API
- Comments automatically refreshed after successful creation

### Output

- Fully functional Comments module
- Shared architecture maintained
- Responsive implementation
- Build passes
- Lint passes


## Task 5.10 – Create Ticket

**Status:** ✅ Completed

### Objective

Implement a complete Create Ticket feature using the existing backend API while introducing a reusable TicketForm component that will also support future ticket editing.

### Deliverables

- Create Ticket page
- Reusable TicketForm component
- Create Ticket hook
- Ticket validation utilities
- User options hook
- Create Ticket API integration
- Loading state
- Validation
- Error handling
- Redirect to Ticket Details after creation

### Implementation Summary

#### API Integration

Consumed:

- POST /api/v1/tickets

No backend modifications.

#### Architecture

Implemented:

- ticketService.createTicket()
- useCreateTicket()
- TicketForm

Following the existing service → hook → UI architecture.

#### Form

Created a reusable TicketForm supporting:

- initialValues
- userOptions
- onSubmit
- onCancel
- submitLabel
- validation errors
- loading state

Designed for reuse in Edit Ticket.

#### Users

Reporter and Assignee are populated from the existing Users API using a dedicated useUsersOptions hook.

#### Validation

Client-side validation:

- Title required (max 150)
- Description required (max 5000)
- Priority required
- Reporter required
- Assignee required

Whitespace trimmed before submission.

#### Navigation

Implemented:

- New Ticket button
- /tickets/new route
- Redirect to Ticket Details after successful creation
- Cancel returns to Tickets list

### Output

- Fully functional Create Ticket feature
- Reusable TicketForm
- Shared architecture maintained
- Build passes
- Lint passes

### Acceptance Criteria

- ✅ New Ticket page implemented
- ✅ Reusable TicketForm created
- ✅ Users loaded for dropdowns
- ✅ Client-side validation
- ✅ Ticket created successfully
- ✅ Redirect to Ticket Details
- ✅ Loading state implemented
- ✅ Error handling implemented
- ✅ Build passes
- ✅ Lint passes

## Task 5.11 – Edit Ticket

### Objective
Implement a complete Edit Ticket workflow that allows users to update existing tickets using the backend Update Ticket API while reusing the existing TicketForm component and maintaining clear separation between create and update flows.

### Backend API
PUT /api/v1/tickets/:id

### Scope
- Create an Edit Ticket page.
- Load the existing ticket using GET /tickets/:id.
- Pre-populate the reusable TicketForm with current values.
- Submit updates through the backend Update Ticket API.
- Navigate back to the Ticket Details page after a successful update.
- Display loading, validation, error, and not found states.
- Keep Reporter read-only during editing to match backend behaviour.
- Preserve browser refresh/tab-close protection for unsaved changes.

### Implementation
- Added `EditTicketPage`.
- Added `useEditTicket` hook to manage data loading, validation, submission, and state.
- Reused the existing `TicketForm` in `mode="edit"`.
- Introduced separate update-specific validation and normalization functions:
  - `normalizeUpdateTicketInput()`
  - `validateUpdateTicketInput()`
  - `hasUpdateTicketChanges()`
- Added `UpdateTicketInput` type to separate Create and Update contracts.
- Added Edit navigation from both Tickets List and Ticket Details.
- Added loading, error, retry, and not-found states.
- Implemented browser `beforeunload` protection for unsaved changes.
- Removed React Router `useBlocker()` implementation because the application uses `BrowserRouter`; added TODO for future migration to `createBrowserRouter` + `RouterProvider` if in-app navigation blocking is required.

### Architecture
```
EditTicketPage
        │
        ▼
 useEditTicket()
        │
        ▼
normalizeUpdateTicketInput()
        │
        ▼
validateUpdateTicketInput()
        │
        ▼
 ticketService.updateTicket()
        │
        ▼
PUT /api/v1/tickets/:id
```

### Acceptance Criteria
- Edit page loads existing ticket data.
- Ticket form is pre-populated correctly.
- Reporter remains read-only during editing.
- Users can update title, description, priority, and assignee.
- Client-side validation works correctly.
- Backend validation errors are displayed.
- Successful updates redirect to Ticket Details.
- Loading, retry, and not-found states work correctly.
- Browser refresh/tab close warns about unsaved changes.
- Build and lint pass without errors.

### Status
✅ Completed

## Task 5.12 – Delete Ticket

### Objective
Implement a complete Delete Ticket workflow that allows users to permanently remove tickets using the backend Delete Ticket API while preserving the existing project architecture, error handling, and user experience.

### Backend API
DELETE /api/v1/tickets/:id

### Scope
- Delete tickets from the Ticket Details page.
- Delete tickets from the Tickets List page.
- Ask for user confirmation before deletion.
- Redirect to the Tickets page after successful deletion from the Details page.
- Refresh the ticket list after successful deletion from the List page.
- Prevent duplicate delete requests.
- Display loading and error states.
- Reuse existing shared UI components and service architecture.

### Implementation
- Extended `ticket.service.ts` with `deleteTicket(id)`.
- Added `useDeleteTicket` hook to encapsulate delete API interaction, loading state, and error handling.
- Added shared delete confirmation message in `ticket.constants.ts`.
- Added Delete action to Ticket Details page.
- Added Delete action to Tickets List action menu.
- Used native `window.confirm()` before calling the delete API.
- Disabled Delete actions while a delete request is in progress.
- Displayed `ErrorMessage` when deletion fails.
- Added Retry support after failed deletion.
- Refreshed the ticket list after successful deletion while preserving pagination where possible.
- Redirected to `/tickets` after successful deletion from the Details page.

### Architecture
```
TicketDetailsPage / TicketsPage
                │
                ▼
        useDeleteTicket()
                │
                ▼
      ticketService.deleteTicket()
                │
                ▼
       DELETE /api/v1/tickets/:id
```

### Acceptance Criteria
- Tickets can be deleted from the Details page.
- Tickets can be deleted from the Tickets List.
- Confirmation is shown before deletion.
- Duplicate delete requests are prevented.
- Successful deletion redirects from Details to Tickets.
- Successful deletion refreshes the ticket list.
- Loading state is displayed while deleting.
- Errors are handled consistently using shared components.
- Build and lint pass successfully.

### Status
✅ Completed

## Task 5.13 – Ticket Status Workflow

### Objective
Implement a complete Ticket Status workflow that allows users to update a ticket's status using the backend Status API while preserving the existing architecture, validation, and user experience.

### Backend API
PATCH /api/v1/tickets/:id/status

### Scope
- Allow ticket status updates from the Ticket Details page.
- Display the current status using a Select control.
- Show Save Status only when the selected value differs from the current status.
- Update the ticket without reloading the page.
- Preserve the existing read-only status display on the Tickets List page.
- Reuse existing shared components, validation, and service architecture.

### Implementation
- Extended `ticket.service.ts` with `updateTicketStatus(id, status)`.
- Added `useUpdateTicketStatus` hook for API interaction, loading state, and error handling.
- Added `ticket-status.validation.ts` for shared status validation.
- Reused `API_TICKET_STATUSES` as the single source of truth for status values.
- Updated `useTicketDetails` with `replaceTicket()` to refresh local state after a successful PATCH request.
- Replaced the editable status header with a Select control.
- Displayed Save Status only when the status changes.
- Disabled controls while updating or deleting.
- Displayed `ErrorMessage` when status updates fail.
- Updated local ticket state without performing an additional GET request.

### Architecture
```
TicketDetailsPage
        │
        ▼
useUpdateTicketStatus()
        │
        ▼
validateTicketStatus()
        │
        ▼
ticketService.updateTicketStatus()
        │
        ▼
PATCH /api/v1/tickets/:id/status
        │
        ▼
replaceTicket(updatedTicket)
```

### Acceptance Criteria
- Current status is displayed correctly.
- User can change the ticket status.
- Save Status appears only when the status changes.
- PATCH API sends only the status field.
- Ticket updates without page refresh.
- Local ticket state updates immediately.
- Loading and error states work correctly.
- Tickets List remains read-only.
- Build and lint pass successfully.

### Status
✅ Completed