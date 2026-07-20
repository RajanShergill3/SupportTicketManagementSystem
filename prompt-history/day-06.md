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