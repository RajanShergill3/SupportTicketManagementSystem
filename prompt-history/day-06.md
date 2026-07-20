Prompt 19 – Tickets Management UI

Before making changes, read:

- tool-specific/cursor-workflow/project-context.md
- tool-specific/cursor-workflow/spec.md
- tool-specific/cursor-workflow/tasks.md
- tool-specific/cursor-workflow/acceptance-criteria.md
- tool-specific/cursor-workflow/cursor-rules.md

## Objective

Implement Sprint 5 – Task 5.6: Tickets Management UI.

The application foundation, dashboard, and Users module are complete.

Implement the Tickets Management User Interface using placeholder data only.

Do NOT integrate with backend APIs yet.

The implementation should follow the same architecture and coding style used in the Users module.

Reuse existing components whenever possible.

## Page Layout

The Tickets page should include:

- Page title
- Page description
- Create Ticket button (UI only)
- Search input
- Status filter
- Priority filter
- Refresh button (UI only)

Below the toolbar display a responsive table.

## Ticket Table

Columns:

- Ticket ID
- Title
- Reporter
- Assignee
- Priority
- Status
- Created Date
- Actions

Actions:

- View
- Edit
- Delete

Actions are placeholders only.

No modal implementation.

No CRUD.

## Ticket Data

Create placeholder data.

Approximately 15 tickets.

Fields:

- id
- ticketNumber
- title
- description
- reporter
- assignee
- priority
- status
- createdAt

Priority values:

- Low
- Medium
- High
- Critical

Status values:

- Open
- In Progress
- Blocked
- Resolved
- Closed

Descriptions should be realistic but only displayed in the detail page later.

Table should display title only.

## Components

Reuse existing components whenever possible.

Examples:

- DataTable
- SearchInput
- FilterSelect
- Pagination
- EmptyState
- LoadingState
- ActionMenu
- Badge
- Button
- Card
- Avatar
- Table

Create new components only if genuinely reusable.

## UI Behaviour

Client-side only.

Search:

- ticket number
- title
- reporter
- assignee

Filters:

- Status
- Priority

Refresh:

Reset placeholder data while preserving filters if possible.

Pagination:

5 tickets per page.

## Ticket Badges

Priority colors:

Critical → red

High → orange

Medium → yellow

Low → blue

Status colors:

Open

In Progress

Blocked

Resolved

Closed

Use the existing Badge component.

Do not duplicate badge implementations.

## States

Implement:

- Loading
- Empty
- Error placeholder
- Normal

Use the same UX as the Users module.

## Routing

Continue using:

/tickets

Do not modify other routes.

## Do NOT Implement

Do NOT implement:

- Backend integration
- Axios
- CRUD
- Ticket creation
- Ticket editing
- Ticket deletion
- Authentication
- Authorization
- React Query
- Redux
- Context API
- Tests

Only implement the UI.

## Acceptance Criteria

- Tickets page completed
- Placeholder tickets created
- Search works
- Status filter works
- Priority filter works
- Pagination works
- Refresh works
- Loading state
- Empty state
- Error placeholder
- Responsive
- Reuses existing UI components
- Build passes
- Lint passes

## Output

After implementation summarize:

1. Files created
2. Files modified
3. Components reused
4. New components created
5. Placeholder data structure
6. Search/filter behaviour
7. Pagination behaviour
8. Responsive behaviour
9. Assumptions
10. Build and lint results


Prompt 20 – Tickets API Integration.


Before making changes, read:

- tool-specific/cursor-workflow/project-context.md
- tool-specific/cursor-workflow/spec.md
- tool-specific/cursor-workflow/tasks.md
- tool-specific/cursor-workflow/acceptance-criteria.md
- tool-specific/cursor-workflow/cursor-rules.md

## Objective

Implement Sprint 5 – Task 5.7: Tickets API Integration.

The Tickets Management UI has already been completed using placeholder data.

Replace the placeholder implementation with live backend data while preserving the existing UI, user experience, and architecture.

Do NOT redesign the page.

Follow the same architecture already used in the Users module.

---

## Backend APIs

Use the existing backend endpoints.

GET /api/v1/tickets

GET /api/v1/tickets/:id

Do not modify backend code.

---

## Requirements

Create a dedicated Ticket Service.

Example structure:

frontend/src/services/ticket.service.ts

The service should:

- use the shared Axios client
- return typed models
- normalize API responses
- convert backend DTOs into frontend models
- never contain UI logic

---

## API Types

Create dedicated API DTO types.

Example:

frontend/src/types/ticket-api.types.ts

Create API response types only if required.

Reuse existing shared API response types where possible.

---

## Mapping Layer

Implement a mapper.

Example:

frontend/src/utils/ticket.mapper.ts

Responsibilities:

- convert backend DTOs
- normalize missing fields if necessary
- isolate frontend from backend schema changes

Do NOT perform UI formatting inside the mapper.

---

## Hook

Update:

frontend/src/hooks/useTicketsTable.ts

Replace placeholder loading with API calls.

The hook should:

- fetch tickets on mount
- expose loading
- expose error
- expose refresh()
- preserve search/filter/pagination logic
- preserve existing UI behaviour

Search, filtering and pagination must remain client-side.

---

## Search

Continue supporting:

- ticket number
- title
- reporter
- assignee

Case-insensitive.

---

## Filters

Status

Priority

Client-side.

---

## Refresh

Refresh should:

- call the backend again
- preserve current search text
- preserve filters
- preserve current page when possible

No simulated loading.

---

## Error Handling

Network failure

Server error

Unexpected response

Display existing ErrorMessage component.

Provide Retry behaviour.

Do not expose Axios errors directly to UI.

Create or reuse a shared API error utility.

---

## Empty State

An empty array returned from the backend is NOT an error.

Display the existing EmptyState component.

---

## Loading

Use the existing LoadingState component.

Remove simulated loading delays.

---

## Placeholder Data

Remove dependency on:

frontend/src/data/tickets.placeholder.ts

Do not delete the file if future prompts may still reference it, but it should no longer be used by the application.

---

## Components

Reuse existing components.

Do not create duplicate components.

Reuse:

- DataTable
- Badge
- Pagination
- SearchInput
- FilterSelect
- ActionMenu
- ErrorMessage
- LoadingState
- EmptyState

---

## Constraints

Do NOT implement:

- Ticket creation
- Ticket editing
- Ticket deletion
- Ticket details
- Comments
- Authentication
- Route guards
- React Query
- Redux
- Context API
- Tests

Only API integration.

---

## Acceptance Criteria

✓ Tickets load from backend

✓ Existing UI unchanged

✓ Existing search works

✓ Existing filters work

✓ Existing pagination works

✓ Refresh reloads backend data

✓ Loading state works

✓ Empty state works

✓ Error state works

✓ API service created

✓ Mapper created

✓ Typed DTOs

✓ Build passes

✓ Lint passes

---

## Output

After implementation summarize:

1. Files created

2. Files modified

3. API endpoints consumed

4. Mapping strategy

5. Error handling strategy

6. Search/filter behaviour

7. Pagination behaviour

8. Refresh behaviour

9. Assumptions

10. Build result

11. Lint result