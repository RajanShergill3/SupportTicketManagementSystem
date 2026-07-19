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