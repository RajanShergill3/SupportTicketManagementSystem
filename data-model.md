# Data Model

## Overview

The Support Ticket Management System stores application data in MongoDB using Mongoose as the Object Document Mapper (ODM).

The data model is intentionally simple and normalized to support maintainability while keeping the application easy to extend.

Primary collections:

- Users
- Tickets
- Comments

Relationships between collections are maintained using MongoDB ObjectId references.

---

# Entity Relationship

```
                +----------------+
                |     User       |
                +----------------+
                | _id            |
                | name           |
                | email          |
                | role           |
                +-------+--------+
                        |
                        |
         Reporter / Assignee
                        |
                        ▼
                +----------------+
                |     Ticket     |
                +----------------+
                | _id            |
                | title          |
                | description    |
                | priority       |
                | status         |
                | reporterId     |
                | assigneeId     |
                | createdAt      |
                | updatedAt      |
                +-------+--------+
                        |
                        |
                    has many
                        |
                        ▼
                +----------------+
                |    Comment     |
                +----------------+
                | _id            |
                | ticketId       |
                | userId         |
                | comment        |
                | createdAt      |
                +----------------+
```

---

# User Collection

Represents users who interact with the support ticket system.

## Fields

| Field | Type | Required |
|------|------|----------|
| _id | ObjectId | Yes |
| name | String | Yes |
| email | String | Yes |
| role | String | Yes |
| createdAt | Date | Auto |
| updatedAt | Date | Auto |

---

## Validation

- Name is required
- Email is required
- Email should be unique
- Role is required

---

## Relationships

A user can:

- Create many tickets
- Be assigned many tickets
- Create many comments

---

# Ticket Collection

Represents a support request.

## Fields

| Field | Type | Required |
|------|------|----------|
| _id | ObjectId | Yes |
| title | String | Yes |
| description | String | Yes |
| priority | String | Yes |
| status | String | Yes |
| reporterId | ObjectId | Yes |
| assigneeId | ObjectId | No |
| createdAt | Date | Auto |
| updatedAt | Date | Auto |

---

## Validation

Title

- Required
- Cannot be empty

Description

- Required

Priority

Allowed values:

- Low
- Medium
- High

Status

Allowed values:

- Open
- In Progress
- Resolved
- Closed
- Cancelled

Reporter

- Required

---

## Relationships

Each ticket:

- belongs to one reporter
- may have one assignee
- may contain multiple comments

---

# Comment Collection

Stores communication related to a ticket.

## Fields

| Field | Type | Required |
|------|------|----------|
| _id | ObjectId | Yes |
| ticketId | ObjectId | Yes |
| userId | ObjectId | Yes |
| comment | String | Yes |
| createdAt | Date | Auto |

---

## Validation

- Comment is required
- Ticket reference is required
- User reference is required

---

# Relationships

## User → Ticket

One user may create many tickets.

Relationship:

```
User (1)

↓

Tickets (N)
```

---

## User → Assigned Tickets

One user may be assigned multiple tickets.

```
User (1)

↓

Assigned Tickets (N)
```

---

## Ticket → Comments

One ticket contains multiple comments.

```
Ticket (1)

↓

Comments (N)
```

---

# Ticket Workflow Model

Ticket status follows a controlled lifecycle.

```
Open
├── In Progress
│   ├── Resolved
│   │   └── Closed
│   └── Cancelled
└── Cancelled
```

Status transitions are validated by the backend service layer before persistence.

---

# Indexing Strategy

The following fields are suitable for indexing to improve query performance:

Users

- email

Tickets

- status
- priority
- assigneeId
- reporterId
- createdAt

Comments

- ticketId

---

# Design Decisions

## MongoDB

MongoDB was selected because:

- flexible document model
- simple development workflow
- easy schema evolution
- native support through Mongoose

---

## Object References

Relationships are maintained using ObjectId references instead of embedding documents.

Benefits:

- avoids document duplication
- supports independent updates
- improves maintainability

---

## Timestamp Management

Mongoose automatically maintains:

- createdAt
- updatedAt

This removes manual timestamp handling from the application.

---

# Data Integrity

Data integrity is maintained through multiple validation layers.

Frontend

- Form validation

Backend

- Request validation
- Business rule validation
- Status workflow validation

Database

- Schema validation
- Required fields
- Enum validation
- ObjectId validation

---

# Future Enhancements

The current data model can be extended to support:

- File attachments
- Categories
- Labels
- Activity history
- Notifications
- SLA tracking
- Team management
- Multi-project support

These enhancements can be added without major structural changes.

---

# Summary

The data model follows a normalized design using MongoDB collections connected through ObjectId references. Validation is enforced at multiple layers, and the model is intentionally designed to be simple, maintainable, and scalable for future enhancements.