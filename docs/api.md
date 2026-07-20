# API Reference

Base URL: `http://localhost:<PORT>`

Authenticated routes are not implemented. All endpoints below are currently open.

Unless noted otherwise, JSON success responses use:

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

Error responses use:

```json
{
  "success": false,
  "message": "Human-readable error",
  "errors": []
}
```

---

## Health

### `GET /health`

Health check for load balancers and monitoring.

**Response `200`**

```json
{
  "success": true,
  "status": "ok",
  "message": "Support Ticket Management System API is running."
}
```

---

## Users

### `GET /api/v1/users`

List all users.

**Response `200`**

```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "role": "Developer",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

**Roles:** `Admin` | `Developer` | `QA`

---

### `GET /api/v1/users/:id`

Get a single user.

**Path**

| Param | Type | Description |
|-------|------|-------------|
| `id` | string (ObjectId) | User id |

**Responses**

| Status | Meaning |
|--------|---------|
| `200` | User found |
| `404` | Invalid or missing user (`User not found`) |

---

## Tickets

### Enums

**Priority:** `Low` | `Medium` | `High` | `Critical`

**Status:** `Open` | `In Progress` | `Resolved` | `Closed` | `Cancelled`

---

### `POST /api/v1/tickets`

Create a ticket. Initial status is always `Open`.

**Request body**

```json
{
  "title": "Login failure",
  "description": "Users cannot sign in after deploy.",
  "priority": "High",
  "createdBy": "507f1f77bcf86cd799439013",
  "assignedTo": "507f1f77bcf86cd799439012"
}
```

| Field | Required | Notes |
|-------|----------|-------|
| `title` | Yes | Non-empty string |
| `description` | Yes | Non-empty string |
| `priority` | Yes | Priority enum |
| `createdBy` | Yes | Existing user ObjectId |
| `assignedTo` | Yes | Existing user ObjectId |

**Responses**

| Status | Meaning |
|--------|---------|
| `201` | Created |
| `400` | Validation failure or missing user |

**Response `data` (Ticket)**

```json
{
  "id": "507f1f77bcf86cd799439011",
  "title": "Login failure",
  "description": "Users cannot sign in after deploy.",
  "priority": "High",
  "status": "Open",
  "assignedTo": "507f1f77bcf86cd799439012",
  "createdBy": "507f1f77bcf86cd799439013",
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

---

### `GET /api/v1/tickets`

List tickets, optionally filtered.

**Query parameters**

| Param | Required | Description |
|-------|----------|-------------|
| `status` | No | Exact status filter |
| `keyword` | No | Case-insensitive match on title or description |

**Response `200`** — array of tickets (newest first)

**Response `400`** — invalid query values

---

### `GET /api/v1/tickets/:id`

Get one ticket.

**Responses**

| Status | Meaning |
|--------|---------|
| `200` | Found |
| `404` | Invalid or missing ticket (`Ticket not found`) |

---

### `PUT /api/v1/tickets/:id`

Update ticket fields. Reporter (`createdBy`) is not updatable.

**Request body** (at least one field)

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "priority": "Critical",
  "assignedTo": "507f1f77bcf86cd799439012"
}
```

**Responses**

| Status | Meaning |
|--------|---------|
| `200` | Updated |
| `400` | Validation failure |
| `404` | Ticket not found |

---

### `PATCH /api/v1/tickets/:id/status`

Update ticket status through the allowed state machine.

**Request body**

```json
{
  "status": "In Progress"
}
```

**Valid transitions**

| From | To |
|------|----|
| Open | In Progress, Cancelled |
| In Progress | Resolved, Cancelled |
| Resolved | Closed |
| Closed | _(none)_ |
| Cancelled | _(none)_ |

**Responses**

| Status | Meaning |
|--------|---------|
| `200` | Status updated |
| `400` | Invalid status value or `Invalid status transition` |
| `404` | Ticket not found |

---

### `DELETE /api/v1/tickets/:id`

Permanently delete a ticket.

**Responses**

| Status | Meaning |
|--------|---------|
| `204` | Deleted (empty body) |
| `404` | Ticket not found |

---

## Comments

### `GET /api/v1/tickets/:id/comments`

List comments for a ticket.

**Response `200`**

```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439031",
      "ticketId": "507f1f77bcf86cd799439011",
      "message": "Investigating now",
      "createdBy": "507f1f77bcf86cd799439013",
      "createdAt": "2026-01-03T00:00:00.000Z"
    }
  ]
}
```

**Response `404`** — ticket not found

---

### `POST /api/v1/tickets/:id/comments`

Create a comment on a ticket.

**Request body**

```json
{
  "message": "Investigating now",
  "createdBy": "507f1f77bcf86cd799439013"
}
```

| Field | Required | Notes |
|-------|----------|-------|
| `message` | Yes | Non-empty string |
| `createdBy` | Yes | Existing user ObjectId |

**Responses**

| Status | Meaning |
|--------|---------|
| `201` | Created |
| `400` | Validation failure |
| `404` | Ticket not found |

---

## Common Error Status Codes

| Status | Typical cause |
|--------|----------------|
| `400` | Validation / bad request / invalid status transition |
| `404` | Resource or route not found |
| `409` | Conflict (e.g. duplicate email if create-user is used internally) |
| `500` | Unexpected server error |
