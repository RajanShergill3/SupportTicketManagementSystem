
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


# Prompt 12 – Comment API.

Before making changes, read:

- tool-specific/cursor-workflow/project-context.md
- tool-specific/cursor-workflow/spec.md
- tool-specific/cursor-workflow/tasks.md
- tool-specific/cursor-workflow/acceptance-criteria.md
- tool-specific/cursor-workflow/cursor-rules.md

## Objective

Implement Task 4.2 – Comment API.

The Comment Domain has already been implemented.

Implement only the HTTP API layer by reusing the existing Comment Service without duplicating business logic.

## Requirements

Implement the following endpoints:

POST /api/v1/tickets/:id/comments

GET /api/v1/tickets/:id/comments

The endpoints must use the existing Comment Service.

Do not move business logic into controllers.

## POST /api/v1/tickets/:id/comments

Create a new comment for the specified ticket.

The request body should contain:

- message
- createdBy

The ticketId must come from the route parameter (`:id`), not from the request body.

The controller should construct the payload expected by the Comment Service.

Return the newly created comment using the existing API response helper.

## GET /api/v1/tickets/:id/comments

Return all comments for the specified ticket.

Comments should be returned in ascending order of `createdAt`.

Reuse the existing `getCommentsByTicketId()` service method.

## Controller

Create a dedicated Comment controller.

The controller should:

- remain thin
- delegate business logic to CommentService
- reuse the existing response helper
- use the existing DTO pattern where appropriate

## Routes

Create Comment routes and register them with the application.

The API should expose:

POST /api/v1/tickets/:id/comments

GET /api/v1/tickets/:id/comments

The routes should integrate cleanly with the existing Ticket module.

## Validation

Reuse the existing validator.

Do not duplicate validation logic in the controller.

Reuse existing error classes and middleware.

## Do NOT Implement

Do NOT implement:

- Update Comment
- Delete Comment
- Edit Comment
- Authentication
- Authorization
- Search
- Filtering
- Notifications
- Activity history
- Frontend
- Tests

## Acceptance Criteria

- Comment controller implemented
- Comment routes implemented
- Route registration completed
- POST endpoint implemented
- GET endpoint implemented
- Existing architecture preserved
- Existing response helper reused
- Existing error handling reused
- npm run build passes
- npm run lint passes

## Output

After implementation, summarize:

1. Files created
2. Files modified
3. Endpoints implemented
4. Validation reused
5. Assumptions made
6. Build and lint results