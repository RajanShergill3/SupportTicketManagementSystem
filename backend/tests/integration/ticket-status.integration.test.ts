import { TicketMessages } from '../../src/constants/ticket-messages.constants';
import { TicketStatus } from '../../src/constants/ticket-status.constants';
import { TicketModel } from '../../src/models/ticket.model';
import { createTestTicket, testApi } from '../helpers';

describe('PATCH /api/v1/tickets/:id/status', () => {
  it('transitions Open to In Progress', async () => {
    const ticket = await createTestTicket({ status: TicketStatus.OPEN });

    const response = await testApi
      .patch(`/api/v1/tickets/${ticket._id.toString()}/status`)
      .send({ status: TicketStatus.IN_PROGRESS });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe(TicketStatus.IN_PROGRESS);

    const persisted = await TicketModel.findById(ticket._id).lean().exec();
    expect(persisted?.status).toBe(TicketStatus.IN_PROGRESS);
  });

  it('transitions Open to Cancelled', async () => {
    const ticket = await createTestTicket({ status: TicketStatus.OPEN });

    const response = await testApi
      .patch(`/api/v1/tickets/${ticket._id.toString()}/status`)
      .send({ status: TicketStatus.CANCELLED });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe(TicketStatus.CANCELLED);

    const persisted = await TicketModel.findById(ticket._id).lean().exec();
    expect(persisted?.status).toBe(TicketStatus.CANCELLED);
  });

  it('transitions In Progress to Resolved', async () => {
    const ticket = await createTestTicket({ status: TicketStatus.IN_PROGRESS });

    const response = await testApi
      .patch(`/api/v1/tickets/${ticket._id.toString()}/status`)
      .send({ status: TicketStatus.RESOLVED });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe(TicketStatus.RESOLVED);

    const persisted = await TicketModel.findById(ticket._id).lean().exec();
    expect(persisted?.status).toBe(TicketStatus.RESOLVED);
  });

  it('transitions In Progress to Cancelled', async () => {
    const ticket = await createTestTicket({ status: TicketStatus.IN_PROGRESS });

    const response = await testApi
      .patch(`/api/v1/tickets/${ticket._id.toString()}/status`)
      .send({ status: TicketStatus.CANCELLED });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe(TicketStatus.CANCELLED);

    const persisted = await TicketModel.findById(ticket._id).lean().exec();
    expect(persisted?.status).toBe(TicketStatus.CANCELLED);
  });

  it('transitions Resolved to Closed', async () => {
    const ticket = await createTestTicket({ status: TicketStatus.RESOLVED });

    const response = await testApi
      .patch(`/api/v1/tickets/${ticket._id.toString()}/status`)
      .send({ status: TicketStatus.CLOSED });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe(TicketStatus.CLOSED);

    const persisted = await TicketModel.findById(ticket._id).lean().exec();
    expect(persisted?.status).toBe(TicketStatus.CLOSED);
  });

  it('rejects Open to Closed and leaves status unchanged', async () => {
    const ticket = await createTestTicket({ status: TicketStatus.OPEN });

    const response = await testApi
      .patch(`/api/v1/tickets/${ticket._id.toString()}/status`)
      .send({ status: TicketStatus.CLOSED });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(TicketMessages.INVALID_STATUS_TRANSITION);

    const persisted = await TicketModel.findById(ticket._id).lean().exec();
    expect(persisted?.status).toBe(TicketStatus.OPEN);
  });

  it('rejects Open to Resolved and leaves status unchanged', async () => {
    const ticket = await createTestTicket({ status: TicketStatus.OPEN });

    const response = await testApi
      .patch(`/api/v1/tickets/${ticket._id.toString()}/status`)
      .send({ status: TicketStatus.RESOLVED });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(TicketMessages.INVALID_STATUS_TRANSITION);

    const persisted = await TicketModel.findById(ticket._id).lean().exec();
    expect(persisted?.status).toBe(TicketStatus.OPEN);
  });

  it('rejects In Progress to Closed and leaves status unchanged', async () => {
    const ticket = await createTestTicket({ status: TicketStatus.IN_PROGRESS });

    const response = await testApi
      .patch(`/api/v1/tickets/${ticket._id.toString()}/status`)
      .send({ status: TicketStatus.CLOSED });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(TicketMessages.INVALID_STATUS_TRANSITION);

    const persisted = await TicketModel.findById(ticket._id).lean().exec();
    expect(persisted?.status).toBe(TicketStatus.IN_PROGRESS);
  });

  it('rejects Resolved to Open and leaves status unchanged', async () => {
    const ticket = await createTestTicket({ status: TicketStatus.RESOLVED });

    const response = await testApi
      .patch(`/api/v1/tickets/${ticket._id.toString()}/status`)
      .send({ status: TicketStatus.OPEN });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(TicketMessages.INVALID_STATUS_TRANSITION);

    const persisted = await TicketModel.findById(ticket._id).lean().exec();
    expect(persisted?.status).toBe(TicketStatus.RESOLVED);
  });

  it('rejects Closed to Open and leaves status unchanged', async () => {
    const ticket = await createTestTicket({ status: TicketStatus.CLOSED });

    const response = await testApi
      .patch(`/api/v1/tickets/${ticket._id.toString()}/status`)
      .send({ status: TicketStatus.OPEN });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(TicketMessages.INVALID_STATUS_TRANSITION);

    const persisted = await TicketModel.findById(ticket._id).lean().exec();
    expect(persisted?.status).toBe(TicketStatus.CLOSED);
  });

  it('rejects Cancelled to Open and leaves status unchanged', async () => {
    const ticket = await createTestTicket({ status: TicketStatus.CANCELLED });

    const response = await testApi
      .patch(`/api/v1/tickets/${ticket._id.toString()}/status`)
      .send({ status: TicketStatus.OPEN });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(TicketMessages.INVALID_STATUS_TRANSITION);

    const persisted = await TicketModel.findById(ticket._id).lean().exec();
    expect(persisted?.status).toBe(TicketStatus.CANCELLED);
  });
});
