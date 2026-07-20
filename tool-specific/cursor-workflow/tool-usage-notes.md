# Tool Usage Notes

## Overview

This project was developed using an AI-assisted workflow with **Cursor AI** as the primary development tool and **ChatGPT** as a technical advisor. AI was used to improve productivity throughout the project while maintaining manual control over architecture, implementation, testing, and final verification.

The objective was to use AI to accelerate development without compromising software engineering quality.

---

# Development Environment

| Tool | Purpose |
|------|---------|
| Cursor AI | AI-assisted coding and refactoring |
| ChatGPT | Technical guidance and documentation |
| Visual Studio Code | Development environment |
| Git | Version control |
| GitHub | Source code repository |
| Node.js 22 | Backend runtime |
| MongoDB Atlas | Database |
| Postman | API testing |
| Vitest | Frontend testing |
| Jest + Supertest | Backend integration testing |

---

# Cursor AI Usage

Cursor AI was used throughout the implementation to assist with repetitive development tasks.

Typical use cases included:

- Project scaffolding
- Code generation
- Refactoring
- TypeScript improvements
- API implementation
- Component generation
- Error investigation
- Test generation

Generated code was reviewed and modified before being committed.

---

# ChatGPT Usage

ChatGPT was used primarily for engineering guidance rather than direct code generation.

Typical activities included:

- Architecture discussions
- Backend design
- Frontend structure
- API design recommendations
- Debugging assistance
- Testing strategy
- Documentation preparation
- Repository organization

ChatGPT responses were treated as implementation guidance and validated during development.

---

# Development Workflow

The project followed an iterative workflow:

```
Understand Requirement
        │
        ▼
Plan Feature
        │
        ▼
Generate Initial Implementation
        │
        ▼
Manual Review
        │
        ▼
Refactor
        │
        ▼
Execute Tests
        │
        ▼
Verify Build
        │
        ▼
Commit Changes
```

Each feature followed the same development cycle.

---

# AI Review Process

Every AI-generated suggestion was evaluated before being accepted.

The review process included:

- Checking architectural consistency
- Verifying business logic
- Reviewing TypeScript types
- Running automated tests
- Verifying frontend behaviour
- Confirming backend responses

Only validated changes were committed.

---

# Testing Workflow

After implementing each feature, the following verification steps were performed:

Backend

- Build verification
- Lint verification
- Integration tests

Frontend

- Build verification
- Lint verification
- Component tests
- Hook tests
- Page integration tests

This process ensured that changes did not introduce regressions.

---

# Documentation Workflow

Documentation was created after the implementation was completed.

AI assisted with:

- Organizing documentation
- Improving technical explanations
- Structuring markdown files
- Reviewing consistency

The content was updated to reflect the final implementation.

---

# Responsible AI Usage

AI was used to improve development efficiency, while engineering decisions remained under developer control.

Manual responsibilities included:

- Requirement analysis
- Architecture decisions
- Business logic validation
- Code review
- Debugging
- Test execution
- Final verification
- Documentation review

---

# Lessons Learned

Using AI effectively requires:

- Clear requirements
- Incremental development
- Careful review of generated code
- Continuous testing
- Manual validation of all outputs

AI significantly accelerated repetitive development tasks, but software quality depended on engineering review and verification.

---

# Summary

Cursor AI and ChatGPT were used as development assistants throughout the project. They improved productivity by supporting implementation, debugging, testing, and documentation, while all major technical decisions, code reviews, and final validation remained the responsibility of the developer. This workflow combined the efficiency of AI-assisted development with established software engineering practices to produce a maintainable and well-tested application.