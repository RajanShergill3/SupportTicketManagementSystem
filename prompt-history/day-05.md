Prompt 13 – Frontend Foundation

Before making changes, read:

- tool-specific/cursor-workflow/project-context.md
- tool-specific/cursor-workflow/spec.md
- tool-specific/cursor-workflow/tasks.md
- tool-specific/cursor-workflow/acceptance-criteria.md
- tool-specific/cursor-workflow/cursor-rules.md

## Objective

Implement Sprint 5 – Task 5.1: Frontend Foundation.

The backend APIs are complete.

Create the frontend foundation using React, TypeScript and Vite.

Do not implement business features yet.

## Requirements

Create a scalable project structure suitable for a production React application.

Include folders such as:

- components/
- pages/
- layouts/
- hooks/
- services/
- api/
- types/
- utils/
- routes/

Configure React Router.

Create placeholder pages for:

- Login
- Dashboard
- Users
- Tickets
- Ticket Details
- Not Found

Implement:

- Main application layout
- Navigation/sidebar placeholder
- Header placeholder
- Routing configuration
- API client using Axios
- Environment configuration
- Global styles
- Loading component
- Error component

Configure Axios with:

- Base URL from environment
- JSON headers
- Response interceptor placeholder

Use the existing backend API URL through environment variables.

## Do NOT Implement

Do NOT implement:

- Login functionality
- Authentication
- CRUD operations
- Forms
- Tables
- API integration
- State management
- Comments
- Ticket workflow
- Tests

Only build the project structure and reusable foundation.

## Acceptance Criteria

- React Router configured
- Layout implemented
- Placeholder pages created
- API client configured
- Environment configuration added
- Folder structure created
- Application builds successfully
- npm run build passes
- npm run lint passes

## Output

After implementation summarize:

1. Files created
2. Files modified
3. Folder structure
4. Routes configured
5. Axios configuration
6. Assumptions
7. Build and lint results


Prompt 14 – Login Page UI.

Before making changes, read:

- tool-specific/cursor-workflow/project-context.md
- tool-specific/cursor-workflow/spec.md
- tool-specific/cursor-workflow/tasks.md
- tool-specific/cursor-workflow/acceptance-criteria.md
- tool-specific/cursor-workflow/cursor-rules.md

## Objective

Implement Sprint 5 – Task 5.2: Login Page UI.

The frontend foundation has already been completed.

Implement only the Login User Interface.

Do NOT implement authentication or backend integration.

## Requirements

Create a professional and responsive login page using React, TypeScript and Tailwind CSS.

The page should contain:

- Application title
- Welcome message
- Email input
- Password input
- Show/Hide password toggle
- Login button
- Remember Me checkbox
- Forgot Password link (placeholder)
- Loading state support
- Error message placeholder
- Footer with application version

The page should be responsive and centered on the screen.

Use reusable components where appropriate.

## Components

Create reusable components if they do not already exist:

- TextInput
- PasswordInput
- Button
- Card
- Checkbox

Keep components generic so they can be reused throughout the application.

## Validation

Implement only client-side UI validation.

Required fields:

- Email
- Password

Validate:

- Empty email
- Invalid email format
- Empty password

Display validation messages below each field.

Do NOT call any API.

## State

Manage form state using React hooks.

Disable Login button while loading.

Loading should be simulated with a local state only.

## Styling

Use Tailwind CSS.

Requirements:

- Clean modern layout
- Rounded card
- Responsive design
- Accessible labels
- Keyboard friendly
- Consistent spacing
- Reusable styling

## Routing

The Login page should remain available at:

/login

Do not modify protected routes.

## Do NOT Implement

Do NOT implement:

- Authentication
- JWT
- API calls
- Axios integration
- Context API
- Redux
- User session
- Route guards
- Forgot password functionality
- Registration
- Backend validation
- Tests

Only implement the UI.

## Acceptance Criteria

- Login page implemented
- Responsive layout
- Reusable input components
- Password visibility toggle
- Client-side validation
- Loading state
- Error placeholder
- Tailwind styling
- npm run build passes
- npm run lint passes

## Output

After implementation summarize:

1. Files created
2. Files modified
3. Components created
4. Validation implemented
5. Responsive behaviour
6. Assumptions
7. Build and lint results



Prompt 15: application shell.

Before making changes, read:

- tool-specific/cursor-workflow/project-context.md
- tool-specific/cursor-workflow/spec.md
- tool-specific/cursor-workflow/tasks.md
- tool-specific/cursor-workflow/acceptance-criteria.md
- tool-specific/cursor-workflow/cursor-rules.md

## Objective

Implement Sprint 5 – Task 5.3: Dashboard & Navigation.

The frontend foundation and Login UI are already completed.

Implement the authenticated application shell and dashboard layout.

Do NOT implement backend integration or business functionality.

## Requirements

Enhance the existing MainLayout into a professional dashboard layout.

The layout should contain:

- Responsive Sidebar
- Top Header
- Main Content Area
- Breadcrumb navigation
- User profile placeholder
- Mobile menu toggle
- Active navigation highlighting

## Sidebar

Include navigation links for:

- Dashboard
- Users
- Tickets

Each navigation item should have:

- Icon
- Label
- Active state
- Hover state

Sidebar should:

- Collapse on mobile
- Expand on desktop
- Be reusable

## Header

Display:

- Page title
- Breadcrumb
- User avatar placeholder
- User name placeholder
- Logout button placeholder

No authentication logic.

## Dashboard Page

Create a modern dashboard with placeholder data.

Include four summary cards:

- Total Users
- Open Tickets
- In Progress Tickets
- Closed Tickets

Each card should display:

- Icon
- Title
- Value (hardcoded placeholder)
- Small description

Below the summary cards create:

### Recent Tickets

Display 5 placeholder tickets using a reusable table component.

Columns:

- Ticket ID
- Title
- Status
- Priority
- Assigned To

### Recent Activity

Display placeholder activities in a timeline.

Example:

- Ticket created
- Ticket assigned
- Comment added
- Ticket resolved

No API calls.

## Reusable Components

Create reusable components:

- Sidebar
- Header
- Breadcrumb
- StatCard
- PageContainer
- Table
- TableRow
- Badge
- Avatar

Keep components generic.

## Styling

Use Tailwind CSS.

Requirements:

- Professional admin dashboard
- Responsive
- Consistent spacing
- Accessible
- Clean typography
- Card-based layout

## Navigation

React Router should navigate between:

- /
- /users
- /tickets

Highlight the active menu item.

## State

Use React state only for:

- Sidebar open/close
- Mobile navigation

Do NOT introduce Context API or Redux.

## Do NOT Implement

Do NOT implement:

- API calls
- Authentication
- Protected routes
- CRUD
- Forms
- Search
- Filtering
- Pagination
- Charts
- Notifications
- Dark mode
- Tests

Only implement layout and UI.

## Acceptance Criteria

- Responsive sidebar
- Responsive header
- Breadcrumb navigation
- Dashboard page
- Summary cards
- Placeholder recent tickets table
- Placeholder activity timeline
- Active navigation
- Mobile menu
- Reusable dashboard components
- npm run build passes
- npm run lint passes

## Output

After implementation summarize:

1. Files created
2. Files modified
3. Components created
4. Dashboard widgets
5. Navigation implemented
6. Responsive behaviour
7. Assumptions
8. Build and lint results


Prompt 16 – Users Management UI.

You are continuing the Support Ticket Management System project.

Before making changes, read:

- tool-specific/cursor-workflow/project-context.md
- tool-specific/cursor-workflow/spec.md
- tool-specific/cursor-workflow/tasks.md
- tool-specific/cursor-workflow/acceptance-criteria.md
- tool-specific/cursor-workflow/cursor-rules.md

## Objective

Implement Sprint 5 – Task 5.4: Users Management UI.

The application shell, dashboard and reusable UI components are already complete.

Implement only the Users Management User Interface.

Do NOT integrate with backend APIs.

Use placeholder/mock data only.

## Requirements

Create a professional Users page.

The page should contain:

- Page title
- Page description
- "Add User" button
- Search input
- Role filter dropdown
- Status filter dropdown
- Refresh button (UI only)

Below the toolbar display a responsive users table.

## Users Table

Columns:

- Avatar
- Full Name
- Email
- Role
- Status
- Created Date
- Actions

Actions:

- View
- Edit
- Delete

Actions are placeholders only.

No modal required.

## Mock Data

Create a placeholder data file.

Include approximately 10 users.

Fields:

- id
- name
- email
- role
- status
- createdAt

Roles:

- Admin
- Developer
- QA

Statuses:

- Active
- Inactive

Do NOT call any API.

## Components

Create reusable components where appropriate.

Examples:

- DataTable
- SearchInput
- FilterSelect
- EmptyState
- LoadingState
- Pagination
- ActionMenu

Reuse existing:

- Avatar
- Badge
- Button
- Card
- Table
- PageContainer

Do not duplicate components.

## UI Behaviour

Implement client-side only.

Search should filter placeholder data.

Role filter should filter placeholder data.

Status filter should filter placeholder data.

Refresh button should reset filters.

Pagination should be UI-only.

Display 5 users per page.

## States

Implement:

- Normal state
- Empty state
- Loading state (simulated)
- Error state placeholder

Do NOT implement API loading.

## Styling

Use Tailwind CSS.

Requirements:

- Responsive
- Accessible
- Clean admin dashboard style
- Sticky table header
- Hover row highlight
- Consistent spacing

## Routing

Users page remains:

/users

Do not modify other routes.

## Do NOT Implement

Do NOT implement:

- API calls
- Axios
- CRUD
- Create User form
- Edit User form
- Delete confirmation
- Authentication
- Authorization
- Redux
- Context API
- React Query
- Tests

Only implement the UI.

## Acceptance Criteria

- Responsive Users page
- Search implemented
- Role filter implemented
- Status filter implemented
- Refresh/reset implemented
- Mock data created
- Pagination implemented
- Empty state implemented
- Loading placeholder implemented
- Error placeholder implemented
- Reusable components created
- npm run build passes
- npm run lint passes

## Output

After implementation summarize:

1. Files created
2. Files modified
3. Components created
4. Mock data structure
5. Search/filter behaviour
6. Pagination behaviour
7. Responsive behaviour
8. Assumptions
9. Build and lint results