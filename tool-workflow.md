# Tool Workflow

## Overview

This project was developed using an AI-assisted engineering workflow that combined **Cursor AI** and **ChatGPT** with manual software engineering practices.

AI tools were used to accelerate development, generate boilerplate code, suggest implementation approaches, assist with debugging, and draft documentation. All generated code was manually reviewed, validated, and tested before being incorporated into the final solution.

The overall objective was to use AI as a productivity tool while ensuring that architectural decisions, implementation quality, and final verification remained under developer control.

---

# Primary Tools

| Purpose | Tool |
|---------|------|
| AI Pair Programming | Cursor AI |
| Design & Technical Guidance | ChatGPT |
| IDE | Visual Studio Code |
| Version Control | Git & GitHub |
| Backend Runtime | Node.js 22 |
| Database | MongoDB Atlas |
| API Testing | Postman |
| Frontend Testing | Vitest + React Testing Library |
| Backend Testing | Jest + Supertest |

---

# Development Workflow

The project followed an iterative implementation approach rather than generating the entire application at once.

Each feature was completed through the following cycle:

1. Requirement Analysis
2. Feature Planning
3. AI-assisted Code Generation
4. Manual Review
5. Local Testing
6. Refactoring
7. Automated Testing
8. Documentation
9. Git Commit

This process was repeated for every major feature until the application was completed.

---

# Planning Phase

Before implementation, the project requirements were analyzed and divided into manageable tasks.

The planning process included:

- Reviewing the assessment requirements
- Identifying functional and non-functional requirements
- Defining project structure
- Designing backend architecture
- Designing frontend architecture
- Planning API endpoints
- Defining the ticket workflow
- Preparing implementation milestones

Cursor workflow artifacts were maintained throughout development to keep implementation organized.

---

# Backend Development Workflow

Backend implementation followed a layered architecture.

```
Request

↓

Route

↓

Controller

↓

Service

↓

Repository

↓

MongoDB
```

Each backend feature was implemented using the following process:

- Create data model
- Implement repository methods
- Implement business logic
- Add request validation
- Implement controller
- Register API routes
- Test endpoint
- Add integration tests

This approach ensured separation of concerns and simplified testing.

---

# Frontend Development Workflow

Frontend development followed a component-driven approach.

```
Pages

↓

Components

↓

Custom Hooks

↓

Services

↓

REST API
```

Each feature was implemented using reusable components and shared business logic through custom hooks.

The workflow included:

- Create page layout
- Build reusable UI components
- Implement API service
- Create custom hooks
- Connect UI with backend
- Validate user interactions
- Add automated tests

---

# AI Usage Throughout Development

AI tools were used to assist with:

## Project Scaffolding

- Initial folder structure
- Base project configuration
- TypeScript configuration
- Build setup

---

## Code Generation

AI assisted with generating:

- CRUD operations
- API endpoints
- React components
- Custom hooks
- Form validation
- Error handling
- Utility functions

Every generated implementation was manually reviewed before acceptance.

---

## Debugging

AI was used to investigate and resolve issues including:

- MongoDB connection configuration
- API validation
- React state management
- Route configuration
- Build failures
- TypeScript errors
- Node.js version compatibility
- Vitest configuration
- Jest integration
- ESLint issues

Root causes were verified manually before fixes were applied.

---

## Testing

AI assisted in generating automated tests for:

- Backend integration tests
- Frontend service tests
- Custom hooks
- Reusable components
- Page-level integration tests

Generated tests were reviewed, executed, and refined until all validations passed.

---

# Documentation Workflow

Documentation was produced after implementation was complete.

Each document was based on the final working implementation rather than generated before development.

The documentation covers:

- Requirements analysis
- Architecture
- API specification
- Data model
- Testing strategy
- Debugging notes
- AI usage
- Engineering decisions

---

# Quality Assurance

Every major feature was verified using:

- Manual functional testing
- Automated integration testing
- Automated component testing
- API validation
- Build verification
- Lint verification

Only verified code was committed.

---

# Version Control Workflow

Development followed a feature-based commit strategy.

Typical workflow:

1. Implement feature
2. Execute tests
3. Verify build
4. Verify lint
5. Commit changes
6. Push to repository

This ensured the repository remained in a working state throughout development.

---

# Final Validation

Before submission, the following checks were completed:

- Backend tests passed
- Frontend tests passed
- Build completed successfully
- Lint completed successfully
- Documentation reviewed
- Repository cleaned
- Environment examples verified

---

# Summary

The project combined AI-assisted development with manual engineering practices.

AI accelerated repetitive implementation tasks and provided technical guidance, while architectural decisions, code review, debugging, testing, and final validation were performed manually.

This workflow improved development efficiency while maintaining code quality, correctness, and maintainability.