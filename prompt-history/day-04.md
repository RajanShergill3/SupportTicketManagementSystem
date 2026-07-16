
# Prompt 11 – Comment Domain.

Before making changes, read:

- tool-specific/cursor-workflow/project-context.md
- tool-specific/cursor-workflow/spec.md
- tool-specific/cursor-workflow/tasks.md
- tool-specific/cursor-workflow/acceptance-criteria.md
- tool-specific/cursor-workflow/cursor-rules.md

## Objective

Implement Task 4.1 – Comment Domain.

Implement only the Comment domain layer.

The implementation should include:

- Comment TypeScript types
- Comment Mongoose model
- Comment repository
- Comment service
- Comment validator

Reuse the existing backend architecture and coding patterns established by the User and Ticket modules.

## Requirements

The Comment entity must support the following fields:

- id
- ticketId
- message
- createdBy
- createdAt

The implementation should:

- Validate that the referenced Ticket exists.
- Validate that the referenced User exists.
- Reuse the existing UserService/TicketService or repository pattern where appropriate.
- Reuse existing validation utilities and error classes.

Business rules belong in the Service layer.

Repositories should contain database access only.

Validators should validate request data only.

## Validation

Validate:

- message is required
- message is not empty
- ticketId is a valid ObjectId
- createdBy is a valid ObjectId

The service must verify:

- Ticket exists
- User exists

## Do NOT Implement

Do NOT implement:

- Controllers
- Routes
- HTTP APIs
- Route registration
- Search
- Filtering
- Authentication
- Authorization
- Notifications
- Activity history
- Frontend
- Tests

## Acceptance Criteria

- Comment model implemented
- Comment repository implemented
- Comment service implemented
- Comment validator implemented
- Existing architecture preserved
- Shared utilities reused
- npm run build passes
- npm run lint passes

## Output

After implementation, summarize:

1. Files created
2. Files modified
3. Validation implemented
4. Business rules implemented
5. Assumptions made
6. Build and lint results