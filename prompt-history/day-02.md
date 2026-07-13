
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

Prompt 04
Before making any changes, read these documents carefully:

tool-specific/cursor-workflow/project-context.md

tool-specific/cursor-workflow/spec.md

tool-specific/cursor-workflow/tasks.md

tool-specific/cursor-workflow/acceptance-criteria.md

prompt-history/day-01.md

prompt-history/day-02.md

----------------------------------------------------

Before implementing, briefly explain your understanding of the task.

----------------------------------------------------

Task

Implement Sprint 2 - Task 2.1

User Domain

----------------------------------------------------

Objective

Implement the backend User domain foundation.

Create the User model, repository, service, and domain-specific validation.

Do not expose the User domain through HTTP APIs yet.

----------------------------------------------------

User Requirements

A User represents a person who can participate in the Support Ticket Management System.

Each user must contain:

- name
- email
- role

Supported roles:

- Admin
- Developer
- QA

Use a consistent internal representation for roles.

Choose an appropriate TypeScript and Mongoose representation and explain the decision after implementation.

----------------------------------------------------

1. User Model

Create a Mongoose User model.

Requirements:

- name is required
- name must be a non-empty string
- email is required
- email must be normalized appropriately
- email must be unique
- role is required
- role must support only Admin, Developer, and QA
- timestamps must be enabled

Use strict TypeScript typing.

Do not use the `any` type.

Do not add authentication fields such as password, passwordHash, refreshToken, or login metadata.

----------------------------------------------------

2. User Repository

Create a User repository responsible only for database access.

Support the operations required by the current User domain:

- find all users
- find user by ID
- find user by email
- create user

Do not place business rules in the repository.

Do not expose raw database access outside the repository where avoidable.

Do not create update or delete operations unless required by the current task.

----------------------------------------------------

3. User Service

Create a User service.

The service should:

- retrieve all users
- retrieve a user by ID
- create a user

When retrieving a user by ID:

- validate the identifier where appropriate
- throw the existing NotFoundError when the user does not exist

When creating a user:

- validate input using the User domain validator
- prevent duplicate email addresses
- use the existing ConflictError for duplicate email
- delegate persistence to the User repository

Do not add HTTP Request or Response objects to the service.

----------------------------------------------------

4. User Validation

Create domain-specific User validation inside:

src/validators/

Reuse the existing generic validation utilities where they provide clear value.

Validate:

- name
- email
- role

Requirements:

- name must be present and non-empty
- email must be present
- email must use a reasonable email format validation
- role must be one of the supported roles

Invalid domain input must result in the existing BadRequestError and use the standard error structure.

Do not introduce an external validation library for this task.

----------------------------------------------------

5. Shared Foundation Reuse

Reuse the existing shared backend foundation where applicable:

- AppError hierarchy
- BadRequestError
- NotFoundError
- ConflictError
- logger
- generic validation utilities
- shared constants

Do not duplicate shared error handling.

Do not create another API response helper.

Do not create another logger.

----------------------------------------------------

Architecture Rules

The dependency direction must remain:

Routes
↓
Controllers
↓
Services
↓
Repositories
↓
Mongoose Models
↓
MongoDB Atlas

For this task, implement only:

Service
↓
Repository
↓
User Model

with User validation supporting the service.

Rules:

- Mongoose database logic belongs in the model/repository layer.
- Business rules belong in the service.
- Domain validation belongs in the User validator.
- The User service must not depend on Express.
- Do not place business logic in the Mongoose model.
- Avoid circular dependencies.

----------------------------------------------------

Engineering Quality Rules

- Generate production-quality TypeScript suitable for a senior software engineering code review.
- Prefer readability and maintainability over cleverness.
- Keep functions focused and reasonably small.
- Follow SOLID principles where they provide clear value.
- Do not introduce unnecessary abstractions or over-engineering.
- Reuse the existing shared backend foundation where applicable.
- Maintain strict TypeScript typing.
- Avoid the `any` type.
- Follow the existing project architecture and naming conventions.
- Do not modify unrelated files unless technically required for this task.
- Explain important architectural decisions after implementation.
- Stop after completing the requested task.

----------------------------------------------------

Do NOT create:

- User Controller
- User Routes
- GET /users
- GET /users/:id

- Ticket Model
- Ticket Repository
- Ticket Service
- Ticket Controller
- Ticket Routes

- Comment Model
- Comment Repository
- Comment Service
- Comment Controller
- Comment Routes

- Authentication
- JWT
- Password fields
- Role-Based Authorization
- CRUD APIs
- Seed Users

Do not modify the health endpoint.

Do not modify MongoDB Atlas connection behaviour.

Do not modify the server startup lifecycle.

----------------------------------------------------

Verification

After implementation:

1. Run npm run build.

2. Run npm run lint.

3. Verify GET /health still returns HTTP 200.

4. Verify no User API route has been exposed.

5. Review the User model schema and TypeScript types.

6. Review repository responsibilities.

7. Review service responsibilities.

8. Review User validation.

9. Explain every created file.

10. Explain every modified file.

11. Explain how duplicate emails are handled.

12. Explain how invalid MongoDB user IDs are handled.

13. Review the implementation against acceptance-criteria.md.

14. List any remaining gaps relevant to Task 2.1.

Do not implement gaps outside Task 2.1.

----------------------------------------------------

Stop after Task 2.1 is complete.

Do not continue to Task 2.2 – User API.

Do not create seed users.

---

## Outcome

- Implemented the User domain foundation.
- Created a strongly typed Mongoose User model.
- Added support for Admin, Developer, and QA roles.
- Added User role and User message constants.
- Created User domain TypeScript interfaces and input types.
- Created a User repository for database persistence.
- Created a User service for business rules and orchestration.
- Added domain-specific User validation.
- Added reusable email normalization.
- Added duplicate email protection using the service layer and MongoDB unique constraint.
- Added MongoDB duplicate key error handling for race-condition safety.
- Added invalid MongoDB ObjectId handling.
- Reused the existing shared error foundation.
- No User controller or User API routes were introduced.

## Verification

- ✅ `npm run build` passed.
- ✅ `npm run lint` passed.
- ✅ `GET /health` returned HTTP 200 and remained unchanged.
- ✅ User API routes are not exposed.
- ✅ `/api/users` currently returns HTTP 404.
- ✅ User roles are restricted to Admin, Developer, and QA.
- ✅ Duplicate email handling uses `ConflictError`.
- ✅ Invalid and non-existing User IDs use `NotFoundError`.
- ✅ TypeScript strict typing is maintained.
- ✅ No `any` type was introduced.
- ✅ No Ticket or Comment domain code was created.

## Human Review

The User domain implementation was reviewed for architecture, scope, and responsibility boundaries.

The repository contains database access only. User business rules, duplicate email handling, and not-found behaviour remain in the service layer. Domain-specific input validation is implemented in the User validator.

The `UserRole` constant object with string literal values was accepted because it provides strict TypeScript typing while keeping MongoDB values aligned with the project specification.

The `normalizeEmail()` utility was kept under shared utilities because both validation and persistence require consistent email normalization.

The `UserRepository.findAll()` implementation was manually reviewed after the Cursor response displayed an intermediate duplicate return statement. The actual source file contains only one correctly typed return statement.

Task 2.1 was accepted without additional code changes.

## Remaining Gaps

The following items are intentionally outside the scope of Task 2.1:

- User controller and routes — Task 2.2.
- `GET /users` API — Task 2.2.
- `GET /users/:id` API — Task 2.2.
- Default User seed data — Task 2.3.
- User integration tests — Testing Sprint.