# Prompt 01 – Backend Foundation

We are building a production-quality Support Ticket Management System for an AI Capability Exercise.

IMPORTANT

Before generating anything, read these documents carefully:

tool-specific/cursor-workflow/project-context.md

tool-specific/cursor-workflow/spec.md

tool-specific/cursor-workflow/tasks.md

tool-specific/cursor-workflow/acceptance-criteria.md

These documents define the architecture and coding standards.

---------------------------------------------------------

TASK

Initialize ONLY the backend application.

Do NOT create frontend files.

Do NOT create business logic.

Do NOT create models.

Do NOT create APIs.

Do NOT create authentication.

Do NOT generate CRUD.

Only scaffold the backend foundation.

---------------------------------------------------------

Technology Stack

- Node.js 22 LTS
- Express 5
- TypeScript
- MongoDB (Mongoose)
- ESLint
- Prettier
- dotenv

---------------------------------------------------------

Create the following structure inside backend only.

backend/

package.json

tsconfig.json

.env.example

.gitignore

src/

app.ts

server.ts

config/

constants/

controllers/

database/

middleware/

models/

repositories/

routes/

services/

validators/

types/

utils/

---------------------------------------------------------

Requirements

1. Configure Express.

2. Configure TypeScript.

3. Add npm scripts

- dev
- build
- start

4. Configure dotenv.

5. Configure basic error middleware.

6. Configure a Health Check endpoint

GET /health

Response

{
  "success": true,
  "message": "Support Ticket Management System API is running."
}

7. Configure MongoDB connection placeholder.

Do NOT connect to MongoDB yet.

Only create connection utility.

8. Add comments explaining important files.

9. Generate production-quality code.

10. Explain every generated file.

---------------------------------------------------------

Do NOT generate any Ticket, User or Comment code.

Stop after backend foundation is complete.


## Outcome

- Backend initialized
- Express configured
- TypeScript configured
- ESLint configured
- Prettier configured
- Health endpoint created
- Folder structure generated

## Verification

- ✅ npm run build
- ✅ npm run lint
- ✅ GET /health




# Prompt 02 – MongoDB Atlas Configuration 

Read these files before making any changes:

tool-specific/cursor-workflow/project-context.md

tool-specific/cursor-workflow/spec.md

tool-specific/cursor-workflow/tasks.md

tool-specific/cursor-workflow/acceptance-criteria.md

----------------------------------------------------

Task

Implement Sprint 1 - Task 1.2

Database Configuration

----------------------------------------------------

Requirements

Implement MongoDB configuration using Mongoose.

Create:

- database connection
- environment validation
- graceful shutdown
- connection logging

Update server.ts to establish the MongoDB connection before starting the Express server.

If MongoDB is unavailable, exit the application gracefully.

Do NOT create:

- Ticket Model
- User Model
- Comment Model
- Repositories
- Controllers
- APIs
- CRUD
- Authentication

After implementation:

1. Explain every changed file.

2. Explain why the architecture is correct.

3. Stop.

## Outcome

- MongoDB Atlas configured
- Environment validation added
- Graceful startup and shutdown implemented
- Database connection logging added

## Verification

- ✅ MongoDB Atlas connected
- ✅ Backend starts successfully
- ✅ Health endpoint working on port 3001