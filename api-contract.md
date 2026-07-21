# API Contract

## Overview

The backend exposes a RESTful API for managing users, support tickets, comments, and ticket status updates.

All endpoints exchange data using JSON.

Base URL (Development)

```
http://localhost:3000/api/v1
```

---

# Response Format

Successful responses follow a consistent structure.

```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully"
}
```

Error responses:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

---

# Users API

## Get All Users

**GET**

```
/users
```

### Description

Returns all users.

### Response

```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "Developer"
    }
  ]
}
```

Status Codes

| Code | Meaning |
|------|----------|
| 200 | Success |
| 500 | Server Error |

---

## Get User Details

**GET**

```
/users/:id
```

Returns details of a single user.

Status Codes

| Code | Meaning |
|------|----------|
| 200 | Success |
| 404 | User Not Found |

---

# Ticket API

## Get Tickets

**GET**

```
/tickets
```

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| search | Search by keyword |
| status | Filter by status |
| priority | Filter by priority |
| assignee | Filter by assigned user |
| page | Page number |
| limit | Records per page |

Status Codes

| Code | Meaning |
|------|----------|
| 200 | Success |

---

## Create Ticket

**POST**

```
/tickets
```

### Request

```json
{
  "title": "Unable to login",
  "description": "Login fails with 500 error",
  "priority": "High",
  "assignee": "USER_ID"
}
```

### Response

```json
{
  "success": true,
  "data": {}
}
```

Status Codes

| Code | Meaning |
|------|----------|
| 201 | Created |
| 400 | Validation Error |

---

## Get Ticket

**GET**

```
/tickets/:id
```

Status Codes

| Code | Meaning |
|------|----------|
| 200 | Success |
| 404 | Not Found |

---

## Update Ticket

**PATCH**

```
/tickets/:id
```

Updates editable ticket fields.

Status Codes

| Code | Meaning |
|------|----------|
| 200 | Updated |
| 400 | Validation Error |
| 404 | Not Found |

---

## Delete Ticket

**DELETE**

```
/tickets/:id
```

Status Codes

| Code | Meaning |
|------|----------|
| 204 | Deleted |
| 404 | Not Found |

---

# Ticket Status API

## Update Ticket Status

**PATCH**

```
/tickets/:id/status
```

Updates the ticket lifecycle state.

Example

```json
{
  "status": "In Progress"
}
```

---

## Valid Workflow

```
Open
├── In Progress
│   ├── Resolved
│   │   └── Closed
│   └── Cancelled
└── Cancelled
```

Invalid transitions are rejected.

Status Codes

| Code | Meaning |
|------|----------|
| 200 | Updated |
| 400 | Invalid Transition |
| 404 | Ticket Not Found |

---

# Comments API

## Get Comments

**GET**

```
/tickets/:id/comments
```

Returns all comments for a ticket.

Status Codes

| Code | Meaning |
|------|----------|
| 200 | Success |

---

## Add Comment

**POST**

```
/tickets/:id/comments
```

Example

```json
{
  "comment": "Issue reproduced and under investigation."
}
```

Status Codes

| Code | Meaning |
|------|----------|
| 201 | Created |
| 400 | Validation Error |

---

# Common Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Resource Created |
| 204 | Resource Deleted |
| 400 | Bad Request |
| 404 | Resource Not Found |
| 500 | Internal Server Error |

---

# Validation Rules

The backend validates:

- Required fields
- Invalid identifiers
- Invalid request payloads
- Ticket status workflow
- Business rules

Validation errors return descriptive messages.

---

# API Design Principles

The API follows these principles:

- RESTful resource naming
- Consistent response structure
- Proper HTTP status codes
- Centralized validation
- Separation of CRUD and workflow operations
- JSON request and response payloads

---

# Summary

The API provides a clean and consistent interface for managing users, tickets, comments, and ticket status transitions. Business rules are enforced on the backend to ensure data integrity while exposing predictable REST endpoints for frontend integration.