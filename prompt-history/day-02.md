
Prompt 03

Before making any changes, read these documents carefully:

tool-specific/cursor-workflow/project-context.md

tool-specific/cursor-workflow/spec.md

tool-specific/cursor-workflow/tasks.md

tool-specific/cursor-workflow/acceptance-criteria.md

----------------------------------------------------

Before implementing, briefly explain your understanding of the task.

----------------------------------------------------

Task

Implement Sprint 1 - Task 1.3

Shared Backend Foundation

----------------------------------------------------

Objective

Create reusable backend infrastructure that will be used by the User, Ticket, and Comment modules.

Do not implement any business domain modules yet.

----------------------------------------------------

Requirements

1. API Response Helper

Create reusable helpers for successful API responses.

The helper should support:

- success
- data
- message
- HTTP status code

The response format must align with acceptance-criteria.md.

Example success response:

{
  "success": true,
  "data": {},
  "message": "Operation completed successfully."
}

Do not add business-specific response logic.

----------------------------------------------------

2. Custom Application Errors

Create reusable application error classes.

Implement a base AppError.

Support common HTTP errors:

- Bad Request - 400
- Not Found - 404
- Conflict - 409
- Internal Server Error - 500

Errors must integrate with the existing global error middleware.

The API error response must align with acceptance-criteria.md.

Example:

{
  "success": false,
  "message": "Validation failed",
  "errors": []
}

----------------------------------------------------

3. Logger Utility

Create a lightweight reusable logger utility.

Support:

- info
- warn
- error

Do not introduce an external logging library unless there is a clear technical requirement.

Do not log secrets, passwords, MongoDB credentials, or environment variable values.

----------------------------------------------------

4. Application Constants

Create reusable application constants where appropriate.

Examples:

- HTTP status codes
- API messages

Do not create Ticket, User, Comment, Priority, Role, or Status domain constants yet.

----------------------------------------------------

5. Validation Utilities

Create reusable validation utilities for common validation behaviour.

Do not implement User validation.

Do not implement Ticket validation.

Do not implement Comment validation.

The validation foundation should be reusable by future domain validators.

Do not add an external validation library unless required by the existing project specification.

----------------------------------------------------

6. Health Route Integration

Review the existing health.routes.ts.

Use the shared API response helper only if it improves consistency without changing the existing health endpoint behaviour.

The health endpoint must continue to return HTTP 200 and indicate that the Support Ticket Management System API is running.

----------------------------------------------------

Architecture Rules

- Follow the existing layered architecture.
- Keep controllers thin.
- Business logic belongs in services.
- Database access belongs in repositories.
- Shared utilities must remain domain-independent.
- Use TypeScript strict typing.
- Avoid the any type.
- Do not duplicate existing types or utilities.
- Do not modify MongoDB Atlas connection behaviour.
- Do not change the server startup lifecycle.
- Do not modify environment configuration unless technically required.

----------------------------------------------------

Do NOT create:

- User Model
- User Repository
- User Service
- User Controller
- User API

- Ticket Model
- Ticket Repository
- Ticket Service
- Ticket Controller
- Ticket API

- Comment Model
- Comment Repository
- Comment Service
- Comment Controller
- Comment API

- Authentication
- JWT
- Role-Based Authorization
- CRUD APIs

----------------------------------------------------

Verification

After implementation:

1. Run npm run build.

2. Run npm run lint.

3. Verify GET /health still works.

4. Verify an unknown route returns the standard error response.

5. Explain every created file.

6. Explain every modified file.

7. Explain how the shared foundation will be reused by future modules.

8. Review your implementation against acceptance-criteria.md.

9. List any remaining gaps relevant to this task.

Do not implement any gaps that are outside Task 1.3.

----------------------------------------------------

Stop after Task 1.3 is complete.

Do not continue to the User Module.


---

## Outcome

- Created reusable API response helper.
- Added custom application error classes.
- Added shared HTTP status and API message constants.
- Added lightweight logger utility.
- Added reusable validation utilities.
- Integrated shared error infrastructure with global error middleware.
- Kept the health endpoint behaviour unchanged.
- No User, Ticket, or Comment domain code was introduced.

## Verification

- ✅ `npm run build`
- ✅ `npm run lint`
- ✅ `GET /health` returned HTTP 200
- ✅ Unknown route returned standard HTTP 404 error response
- ✅ TypeScript strict typing maintained
- ✅ No `any` type introduced
- ✅ Reviewed implementation against `acceptance-criteria.md`

## Human Review

The implementation was reviewed for scope and architecture.

Generic validation helpers remain under `src/utils/`, while future domain-specific validators will be created under `src/validators/`.

The shared `AppError` flow and global error middleware will be used instead of adding a separate `sendError()` helper.

Task 1.3 was accepted without additional code changes.