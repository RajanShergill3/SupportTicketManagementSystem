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


Prompt 21 – Ticket Details Page

You are continuing the Support Ticket Management System project.

Before making changes, read:

- tool-specific/cursor-workflow/project-context.md
- tool-specific/cursor-workflow/spec.md
- tool-specific/cursor-workflow/tasks.md
- tool-specific/cursor-workflow/acceptance-criteria.md
- tool-specific/cursor-workflow/cursor-rules.md

## Objective

Implement Sprint 5 – Task 5.8: Ticket Details Page.

The Tickets Management module is complete and integrated with the backend.

Implement a Ticket Details page that displays all information for a single ticket.

The page must consume the existing backend API and prepare the layout for the upcoming Comments feature.

Do NOT implement comments in this task.

---

## Backend API

Use the existing endpoint.

GET /api/v1/tickets/:id

Reuse the existing:

- ticketService.getTicketById()

Do not modify backend code.

---

## Routing

Add a new route.

Route:

/tickets/:id

The Tickets table "View" action should navigate to this page.

Use React Router.

---

## Page Layout

Display the following:

-------------------------------------------------

Breadcrumb

Dashboard / Tickets / Ticket Details

-------------------------------------------------

Header

Ticket Title

Ticket Number

Status Badge

Priority Badge

-------------------------------------------------

Information Card

Title

Description

Reporter

Assignee

Priority

Status

Created Date

Last Updated

-------------------------------------------------

Actions

Back to Tickets

Edit Ticket (disabled placeholder)

-------------------------------------------------

Comments Section

Display only:

Section title:

Comments

Placeholder text:

"No comments available."

This section will be replaced during the next task.

Do NOT fetch comments.

Do NOT implement comment APIs.

---

## Components

Reuse existing components whenever possible.

Reuse:

- PageContainer
- Card
- Badge
- Button
- LoadingState
- ErrorMessage

Create reusable components only if genuinely needed.

---

## Loading State

Display LoadingState while fetching.

---

## Error State

Display ErrorMessage.

Provide Retry behaviour.

---

## Empty State

If the ticket does not exist (404),

display a friendly "Ticket not found" page.

Include:

- explanation
- Back to Tickets button

Do not crash.

---

## Navigation

Update the Tickets page.

The View action should navigate to:

/tickets/:id

Do not modify Edit/Delete behaviour.

---

## Formatting

Format dates consistently.

Use existing utilities if available.

Otherwise create a reusable formatter utility.

Do not format inside components repeatedly.

---

## Constraints

Do NOT implement:

- Comments
- Comment APIs
- Comment forms
- Ticket editing
- Ticket deletion
- Ticket creation
- Authentication
- Route guards
- React Query
- Redux
- Context API
- Tests

Only Ticket Details.

---

## Acceptance Criteria

✓ Route added

✓ View action navigates correctly

✓ Ticket fetched from backend

✓ Loading state

✓ Error state

✓ Ticket not found page

✓ Ticket information displayed

✓ Status badge

✓ Priority badge

✓ Back navigation

✓ Comments placeholder

✓ Responsive layout

✓ Build passes

✓ Lint passes

---

## Output

After implementation summarize:

1. Files created

2. Files modified

3. Routes added

4. Components reused

5. New reusable components

6. Data fetching strategy

7. Error handling strategy

8. Empty/not found behaviour

9. Responsive behaviour

10. Assumptions

11. Build result

12. Lint result




Prompt 22 – Comments Integration

Before making changes, read:

- tool-specific/cursor-workflow/project-context.md
- tool-specific/cursor-workflow/spec.md
- tool-specific/cursor-workflow/tasks.md
- tool-specific/cursor-workflow/acceptance-criteria.md
- tool-specific/cursor-workflow/cursor-rules.md

## Objective

Implement Sprint 5 – Task 5.9: Comments Integration.

The Ticket Details page is complete and currently displays a placeholder Comments section.

Replace the placeholder with a fully functional Comments module using the existing backend APIs.

Do NOT modify backend code.

Reuse the architecture already established in the Users and Tickets modules.

---

## Backend APIs

Use the existing endpoints.

GET /api/v1/tickets/:id/comments

POST /api/v1/tickets/:id/comments

Reuse the existing backend implementation.

Do not modify controllers, services or repositories.

---

## Service Layer

Create:

frontend/src/services/comment.service.ts

Responsibilities:

- use the shared Axios client
- expose:
  - getComments(ticketId)
  - createComment(ticketId, payload)
- normalize API responses
- return typed frontend models
- never contain UI logic

---

## Types

Create:

frontend/src/types/comment.types.ts

Frontend model:

interface Comment {
  id: string;
  ticketId: string;
  message: string;
  createdBy: string;
  createdAt: string;
}

Create:

frontend/src/types/comment-api.types.ts

for backend DTOs.

Reuse shared API response types.

---

## Mapper

Create:

frontend/src/utils/comment.mapper.ts

Responsibilities:

- convert backend DTO
- isolate frontend from backend schema changes
- normalize optional fields if needed

No UI formatting.

---

## Hook

Create:

frontend/src/hooks/useComments.ts

Responsibilities:

- fetch comments on mount
- loading state
- error state
- retry
- refresh
- submit new comment
- optimistic UI is NOT required

The hook owns all comment state.

No API calls inside components.

---

## Ticket Details Page

Replace the placeholder Comments section.

Display:

--------------------------------

Comments

--------------------------------

If comments exist:

For each comment show:

- author (currently user ID)
- created date/time
- message

Newest comments should appear last (chronological order).

Use Card styling consistent with the application.

---

If there are no comments:

Display:

"No comments yet."

---

## Add Comment

Below the comments list display:

Textarea

Placeholder:

"Write a comment..."

Buttons:

Add Comment

Cancel

Requirements:

- message required
- trim whitespace
- minimum 1 character
- maximum 1000 characters
- disable submit while posting
- clear textarea after successful submit
- automatically reload comments after creation

No rich text editor.

Plain textarea only.

---

## Validation

Client-side validation.

Display inline validation errors.

Reuse existing validation patterns where appropriate.

---

## Error Handling

Handle:

- network errors
- server errors
- validation errors

Display existing ErrorMessage component.

Retry should reload comments.

---

## Loading

Use existing LoadingState.

Loading should only affect the Comments section.

Do not block the rest of the Ticket Details page.

---

## Empty State

No comments is NOT an error.

Display:

"No comments yet."

with subtle styling.

---

## Components

Reuse existing components wherever possible.

Reuse:

- Card
- Button
- LoadingState
- ErrorMessage

Create reusable components only if genuinely useful.

Examples:

CommentCard

CommentForm

Only if reused or improves readability.

---

## Constraints

Do NOT implement:

- Edit comment
- Delete comment
- Reply
- Nested comments
- Attachments
- Rich text
- Authentication
- Route guards
- Tests

Only comments viewing and creation.

---

## Acceptance Criteria

✓ Comments load from backend

✓ Comments displayed chronologically

✓ Loading state implemented

✓ Empty state implemented

✓ Error state implemented

✓ Add comment form

✓ Validation

✓ Submit comment

✓ Refresh comments after submit

✓ Existing Ticket Details layout preserved

✓ Shared architecture maintained

✓ Build passes

✓ Lint passes

---

## Output

After implementation summarize:

1. Files created

2. Files modified

3. API endpoints consumed

4. Service implementation

5. Mapping strategy

6. Hook responsibilities

7. Validation behaviour

8. Error handling strategy

9. Refresh behaviour

10. Assumptions

11. Build result

12. Lint result


Prompt 23 – Create Ticket 

Before making changes, read:

- tool-specific/cursor-workflow/project-context.md
- tool-specific/cursor-workflow/spec.md
- tool-specific/cursor-workflow/tasks.md
- tool-specific/cursor-workflow/acceptance-criteria.md
- tool-specific/cursor-workflow/cursor-rules.md

## Objective

Implement Sprint 5 – Task 5.10: Create Ticket.

The backend already exposes:

POST /api/v1/tickets

Implement a complete "Create Ticket" feature following the existing frontend architecture.

Do NOT modify backend code.

Reuse the existing architecture established for Users, Tickets and Comments.

---

## API

Use:

POST /api/v1/tickets

Do not create duplicate API clients.

Reuse the shared Axios client.

---

## Service Layer

Extend:

frontend/src/services/ticket.service.ts

Add:

createTicket(payload)

Responsibilities:

- call POST /api/v1/tickets
- normalize API response
- return frontend Ticket model
- throw normalized ApiError
- no UI logic

---

## Types

Create if not already present:

frontend/src/types/ticket-form.types.ts

Example:

interface CreateTicketInput {
    title: string;
    description: string;
    priority: TicketPriority;
    reporter: string;
    assignee: string;
}

Reuse existing Ticket types wherever possible.

---

## Validation

Create:

frontend/src/utils/ticket.validation.ts

Validate:

- title required
- title max 150 characters
- description required
- description max 5000 characters
- priority required
- reporter required
- assignee required

Trim whitespace.

Return validation errors only.

No UI.

---

## Hook

Create:

frontend/src/hooks/useCreateTicket.ts

Responsibilities:

- submit
- loading
- validation
- success
- error

The hook owns all state.

No API calls inside components.

---

## Reusable Form

Create:

frontend/src/components/tickets/TicketForm.tsx

The form should be reusable.

This component will also be reused for Edit Ticket later.

Props:

- initialValues
- onSubmit
- isSubmitting

Fields:

Title

Description

Priority

Reporter

Assignee

Buttons:

Create Ticket

Cancel

---

## Users

Reporter and Assignee must be selectable.

Reuse:

userService.getUsers()

Do NOT duplicate user fetching logic.

Create:

useUsersOptions()

if required.

Display:

User Name

Internally store:

User ID

---

## Page

Create:

frontend/src/pages/CreateTicketPage.tsx

Responsibilities:

- load users
- render TicketForm
- submit using useCreateTicket
- redirect after successful creation

No API calls.

---

## Routing

Add route:

/tickets/new

Update Sidebar if required.

---

## Tickets Page

Add:

New Ticket button

Position:

Top-right beside Refresh.

Clicking:

Navigate to:

/tickets/new

---

## Success Behaviour

After successful creation:

Redirect to:

/tickets/:id

Show the newly created ticket.

Do NOT return to Tickets list.

---

## Cancel

Cancel returns to:

/tickets

without saving.

---

## Loading

Disable form while submitting.

Show loading state on button.

---

## Error Handling

Reuse:

ErrorMessage

Display API validation failures.

Display network failures.

No browser alerts.

---

## Styling

Reuse existing UI.

Use:

Card

Button

TextInput

Textarea

Select

PageContainer

Maintain consistency with Login and Ticket Details pages.

---

## Constraints

Do NOT implement:

Edit Ticket

Delete Ticket

Status workflow

Attachments

Authentication

Drafts

Autosave

File upload

Rich text editor

Tests

Only Create Ticket.

---

## Acceptance Criteria

✓ New Ticket button added

✓ /tickets/new route created

✓ Reusable TicketForm component

✓ User dropdowns populated from API

✓ Client-side validation

✓ Ticket created successfully

✓ Redirect to Ticket Details

✓ Cancel returns to Tickets list

✓ Loading state implemented

✓ Error handling implemented

✓ Shared architecture maintained

✓ Build passes

✓ Lint passes

---

## Output

After implementation summarize:

1. Files created

2. Files modified

3. API endpoint consumed

4. Service implementation

5. Hook responsibilities

6. Validation behaviour

7. Form architecture

8. Navigation flow

9. Error handling

10. Assumptions

11. Build result

12. Lint result



Prompt 24 – Edit Ticket


Before making changes, read:

- tool-specific/cursor-workflow/project-context.md
- tool-specific/cursor-workflow/spec.md
- tool-specific/cursor-workflow/tasks.md
- tool-specific/cursor-workflow/acceptance-criteria.md
- tool-specific/cursor-workflow/cursor-rules.md

## Objective

Implement Sprint 5 – Task 5.11: Edit Ticket.

The backend already exposes:

PUT /api/v1/tickets/:id

Reuse the existing TicketForm created during the Create Ticket feature.

Do NOT modify backend code.

Maintain the same frontend architecture used throughout the project.

---

## API

Reuse:

ticketService

Add:

updateTicket(ticketId, payload)

Responsibilities:

- call PUT /api/v1/tickets/:id
- normalize response
- return frontend Ticket model
- throw normalized ApiError

Do NOT duplicate service logic.

---

## Types

Reuse:

CreateTicketInput
TicketFormValues
Ticket

Do not create duplicate edit-specific types unless absolutely necessary.

---

## Hook

Create:

frontend/src/hooks/useEditTicket.ts

Responsibilities:

- load ticket
- populate initial form values
- submit updates
- loading
- submitting
- validation
- error
- retry

The hook owns all state.

No API calls inside components.

---

## Page

Create:

frontend/src/pages/EditTicketPage.tsx

Responsibilities:

- read ticket id from route
- load ticket
- load users
- render TicketForm
- save updates
- redirect to Ticket Details after successful update

No business logic.

---

## Ticket Form

Reuse:

TicketForm

Do NOT duplicate the form.

Provide:

initialValues

submitLabel:

"Save Changes"

---

## Users

Reuse:

useUsersOptions()

Reporter and Assignee remain selectable.

No duplicated fetching.

---

## Routing

Add:

/tickets/:id/edit

Route order must remain correct.

Ensure:

/tickets/new

continues to resolve correctly.

---

## Ticket Details Page

Add:

Edit Ticket button

Click:

Navigate to

/tickets/:id/edit

Reuse existing Button component.

---

## Tickets Page

Add an Edit action.

Either:

- Action menu

or

- Inline Edit button

Reuse existing navigation.

---

## Unsaved Changes

Detect whether the form has changed.

If the user attempts to:

- Cancel
- Navigate away

while changes exist,

display a confirmation dialog.

Browser confirmation is acceptable.

If nothing changed,

Cancel immediately returns to Ticket Details.

---

## Success Behaviour

After successful update:

Redirect to

/tickets/:id

Display updated ticket.

Do not return to Tickets list.

---

## Loading

While loading ticket:

Display existing LoadingState.

While submitting:

Disable all controls.

Prevent duplicate submission.

---

## Error Handling

Reuse:

ErrorMessage

Handle:

- load failure
- update failure
- validation failure
- not found

Provide Retry for loading failures.

---

## Validation

Reuse:

ticket.validation.ts

Do NOT duplicate validation.

Normalize input before validation and submission.

Reuse:

normalizeCreateTicketInput()

---

## Constraints

Do NOT implement:

Delete Ticket

Status workflow

Attachments

Authentication

History

Versioning

Autosave

Tests

Only Edit Ticket.

---

## Acceptance Criteria

✓ Edit Ticket page created

✓ Existing TicketForm reused

✓ Existing ticket loaded

✓ Users loaded

✓ Form pre-populated

✓ Validation reused

✓ Unsaved changes detection

✓ Update API integrated

✓ Redirect to Ticket Details

✓ Edit button added

✓ Loading state implemented

✓ Error handling implemented

✓ Build passes

✓ Lint passes

---

## Output

After implementation summarize:

1. Files created

2. Files modified

3. API endpoint consumed

4. Service implementation

5. Hook responsibilities

6. Form reuse strategy

7. Unsaved changes behaviour

8. Navigation flow

9. Validation reuse

10. Error handling

11. Assumptions

12. Build result

13. Lint result


# Prompt 25 – Delete Ticket

The Ticket CRUD flow is almost complete.

Create Ticket and Edit Ticket are already implemented.

Your task is to implement **Delete Ticket** using the existing backend API.

==================================================
OBJECTIVE
==================================================

Implement a complete Delete Ticket workflow.

Backend API:

DELETE /api/v1/tickets/:id

The implementation must follow the existing project architecture and coding style.

Do NOT implement any other feature.

==================================================
CURRENT ARCHITECTURE
==================================================

Already implemented:

- ticket.service.ts
- useTicketsTable.ts
- useTicketDetails.ts
- useCreateTicket.ts
- useEditTicket.ts
- TicketDetailsPage
- TicketsPage
- TicketForm
- Shared ErrorMessage
- Shared LoadingState
- Shared Button
- Shared Card

Reuse existing patterns.

==================================================
SERVICE LAYER
==================================================

Extend:

src/services/ticket.service.ts

Add:

deleteTicket(id: string): Promise<void>

Requirements:

- validate id
- call DELETE /tickets/:id
- reuse Axios client
- reuse existing API error handling
- throw ApiError consistently

==================================================
HOOK
==================================================

Create:

src/hooks/useDeleteTicket.ts

Responsibilities:

- manage delete request
- loading state
- error state
- retry support
- expose:

deleteTicket()

isDeleting

error

clearError()

No UI logic.

==================================================
DELETE CONFIRMATION
==================================================

Do NOT introduce a modal library.

Use:

window.confirm()

Message:

Delete this ticket?

This action cannot be undone.

Only call deleteTicket() when confirmed.

==================================================
TICKET DETAILS PAGE
==================================================

Add:

Delete button

Placement:

next to Edit button.

Behaviour:

Click Delete

↓

confirmation

↓

DELETE API

↓

redirect to

/tickets

after success.

While deleting:

disable Edit/Delete buttons.

==================================================
TICKETS LIST PAGE
==================================================

Add Delete action.

Reuse the existing row action menu.

Flow:

Delete

↓

confirmation

↓

DELETE API

↓

refresh ticket list

The page must remain on the current pagination if possible.

==================================================
ERROR HANDLING
==================================================

If delete fails:

display ErrorMessage

allow retry

Do not redirect.

==================================================
LOADING
==================================================

Disable Delete button while deleting.

Prevent duplicate submissions.

==================================================
ROUTING
==================================================

No routing changes required.

==================================================
OUT OF SCOPE
==================================================

Do NOT implement:

Toast notifications

Bulk delete

Undo

Soft delete

Optimistic UI

Permissions

Authentication

Status workflow

==================================================
ACCEPTANCE CRITERIA
==================================================

✓ Ticket can be deleted from Details page

✓ Ticket can be deleted from Tickets list

✓ Confirmation shown

✓ Duplicate clicks prevented

✓ Redirect after successful delete

✓ List refreshes after deletion

✓ Error handling consistent

✓ Loading state shown

✓ Existing architecture preserved

✓ Build passes

✓ ESLint passes

==================================================
OUTPUT
==================================================

Provide:

1. Files created

2. Files modified

3. Architecture decisions

4. Build result

5. Lint result