import { TicketPriority } from '../../src/constants/ticket-priority.constants';
import { TicketMessages } from '../../src/constants/ticket-messages.constants';
import { TicketStatus } from '../../src/constants/ticket-status.constants';
import { TicketModel } from '../../src/models/ticket.model';
import {
  createObjectIdString,
  createTestTicket,
  createTestUser,
  testApi,
} from '../helpers';

describe('POST /api/v1/tickets', () => {
  it('creates a ticket and persists it in the database', async () => {
    const reporter = await createTestUser({ email: 'reporter.create@example.com' });
    const assignee = await createTestUser({ email: 'assignee.create@example.com' });

    const payload = {
      title: 'Login failure on staging',
      description: 'Users cannot authenticate after the last deploy.',
      priority: TicketPriority.HIGH,
      createdBy: reporter._id.toString(),
      assignedTo: assignee._id.toString(),
    };

    const response = await testApi.post('/api/v1/tickets').send(payload);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject({
      title: payload.title,
      description: payload.description,
      priority: payload.priority,
      status: TicketStatus.OPEN,
      createdBy: payload.createdBy,
      assignedTo: payload.assignedTo,
    });
    expect(response.body.data.id).toEqual(expect.any(String));

    const persisted = await TicketModel.findById(response.body.data.id).lean().exec();
    expect(persisted).not.toBeNull();
    expect(persisted?.title).toBe(payload.title);
    expect(persisted?.status).toBe(TicketStatus.OPEN);
  });
});

describe('GET /api/v1/tickets', () => {
  it('returns 200 with all tickets', async () => {
    await createTestTicket({ title: 'First ticket' });
    await createTestTicket({ title: 'Second ticket' });

    const response = await testApi.get('/api/v1/tickets');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data).toHaveLength(2);
  });

  it('filters tickets by status', async () => {
    await createTestTicket({ title: 'Open ticket', status: TicketStatus.OPEN });
    await createTestTicket({ title: 'Resolved ticket', status: TicketStatus.RESOLVED });

    const response = await testApi.get('/api/v1/tickets').query({ status: TicketStatus.RESOLVED });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].title).toBe('Resolved ticket');
    expect(response.body.data[0].status).toBe(TicketStatus.RESOLVED);
  });

  it('searches tickets by keyword in title or description', async () => {
    await createTestTicket({
      title: 'Database timeout',
      description: 'Connection pool exhausted under load.',
    });
    await createTestTicket({
      title: 'UI alignment issue',
      description: 'Button spacing is inconsistent on mobile.',
    });

    const response = await testApi.get('/api/v1/tickets').query({ keyword: 'timeout' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].title).toBe('Database timeout');
  });
});

describe('GET /api/v1/tickets/:id', () => {
  it('returns 200 for an existing ticket', async () => {
    const ticket = await createTestTicket({ title: 'Existing ticket' });

    const response = await testApi.get(`/api/v1/tickets/${ticket._id.toString()}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject({
      id: ticket._id.toString(),
      title: 'Existing ticket',
      status: TicketStatus.OPEN,
    });
  });

  it('returns 404 for an invalid ticket id', async () => {
    const response = await testApi.get('/api/v1/tickets/not-a-valid-id');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(TicketMessages.NOT_FOUND);
  });

  it('returns 404 for a missing ticket', async () => {
    const response = await testApi.get(`/api/v1/tickets/${createObjectIdString()}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(TicketMessages.NOT_FOUND);
  });
});

describe('PUT /api/v1/tickets/:id', () => {
  it('updates ticket fields and persists the changes', async () => {
    const ticket = await createTestTicket({
      title: 'Original title',
      description: 'Original description',
      priority: TicketPriority.LOW,
    });
    const newAssignee = await createTestUser({ email: 'new.assignee@example.com' });

    const payload = {
      title: 'Updated title',
      description: 'Updated description',
      priority: TicketPriority.CRITICAL,
      assignedTo: newAssignee._id.toString(),
    };

    const response = await testApi.put(`/api/v1/tickets/${ticket._id.toString()}`).send(payload);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject({
      id: ticket._id.toString(),
      title: payload.title,
      description: payload.description,
      priority: payload.priority,
      assignedTo: payload.assignedTo,
      createdBy: ticket.createdBy.toString(),
    });

    const persisted = await TicketModel.findById(ticket._id).lean().exec();
    expect(persisted).not.toBeNull();
    expect(persisted?.title).toBe(payload.title);
    expect(persisted?.priority).toBe(payload.priority);
    expect(persisted?.assignedTo.toString()).toBe(payload.assignedTo);
  });
});

describe('DELETE /api/v1/tickets/:id', () => {
  it('deletes an existing ticket and removes it from the database', async () => {
    const ticket = await createTestTicket({ title: 'Ticket to delete' });

    const response = await testApi.delete(`/api/v1/tickets/${ticket._id.toString()}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});

    const persisted = await TicketModel.findById(ticket._id).lean().exec();
    expect(persisted).toBeNull();
  });

  it('returns 404 when deleting a missing ticket', async () => {
    const response = await testApi.delete(`/api/v1/tickets/${createObjectIdString()}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(TicketMessages.NOT_FOUND);
  });
});
