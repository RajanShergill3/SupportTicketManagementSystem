import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

import { TicketDetailsPage } from '@/pages/TicketDetailsPage';
import { commentService } from '@/services/comment.service';
import { ticketService } from '@/services/ticket.service';
import { ApiError } from '@/utils/api-error.util';
import { screen } from '@/test/render';

import { mockComment, mockTicket } from '../hooks/fixtures';
import { renderAtRoute } from './helpers';

vi.mock('@/services/ticket.service', () => ({
  ticketService: {
    getTicketById: vi.fn(),
    deleteTicket: vi.fn(),
    updateTicketStatus: vi.fn(),
  },
}));

vi.mock('@/services/comment.service', () => ({
  commentService: {
    getComments: vi.fn(),
    createComment: vi.fn(),
  },
}));

const getTicketById = vi.mocked(ticketService.getTicketById);
const deleteTicket = vi.mocked(ticketService.deleteTicket);
const updateTicketStatus = vi.mocked(ticketService.updateTicketStatus);
const getComments = vi.mocked(commentService.getComments);
const createComment = vi.mocked(commentService.createComment);

describe('TicketDetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getComments.mockResolvedValue([mockComment]);
  });

  it('shows a loading state while ticket details are fetched', () => {
    getTicketById.mockReturnValue(new Promise(() => undefined));

    renderAtRoute('/tickets/:id', <TicketDetailsPage />, `/tickets/${mockTicket.id}`);

    expect(screen.getByText('Loading ticket details...')).toBeInTheDocument();
  });

  it('shows not found when the ticket does not exist', async () => {
    getTicketById.mockRejectedValue(new ApiError('Ticket not found', 404));

    renderAtRoute('/tickets/:id', <TicketDetailsPage />, `/tickets/${mockTicket.id}`);

    await waitFor(() => expect(screen.getByText('Ticket not found')).toBeInTheDocument());
  });

  it('shows an error state when loading fails', async () => {
    getTicketById.mockRejectedValue(new Error('Server error'));

    renderAtRoute('/tickets/:id', <TicketDetailsPage />, `/tickets/${mockTicket.id}`);

    await waitFor(() => expect(screen.getByText('Failed to load ticket')).toBeInTheDocument());
  });

  it('renders ticket details, status controls, and comments', async () => {
    getTicketById.mockResolvedValue(mockTicket);

    renderAtRoute('/tickets/:id', <TicketDetailsPage />, `/tickets/${mockTicket.id}`);

    await waitFor(() => expect(screen.getByRole('heading', { name: 'Login failure' })).toBeInTheDocument());
    expect(screen.getByText('TKT-001')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toHaveValue('Open');
    expect(screen.getByRole('heading', { name: 'Comments' })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Investigating now')).toBeInTheDocument());
  });

  it('updates the ticket status when Save Status is clicked', async () => {
    const user = userEvent.setup();
    getTicketById.mockResolvedValue(mockTicket);
    updateTicketStatus.mockResolvedValue({ ...mockTicket, status: 'In Progress' });

    renderAtRoute('/tickets/:id', <TicketDetailsPage />, `/tickets/${mockTicket.id}`);

    await waitFor(() => expect(screen.getByLabelText('Status')).toBeInTheDocument());

    await user.selectOptions(screen.getByLabelText('Status'), 'In Progress');
    await user.click(screen.getByRole('button', { name: 'Save Status' }));

    await waitFor(() =>
      expect(updateTicketStatus).toHaveBeenCalledWith(mockTicket.id, 'In Progress'),
    );
  });

  it('deletes the ticket and navigates back to the list', async () => {
    const user = userEvent.setup();
    getTicketById.mockResolvedValue(mockTicket);
    deleteTicket.mockResolvedValue(undefined);
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

    renderAtRoute('/tickets/:id', <TicketDetailsPage />, `/tickets/${mockTicket.id}`, [
      { path: '/tickets', element: <div>Tickets List Screen</div> },
    ]);

    await waitFor(() => expect(screen.getByRole('heading', { name: 'Login failure' })).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: 'Delete Ticket' }));

    await waitFor(() => expect(deleteTicket).toHaveBeenCalledWith(mockTicket.id));
    expect(screen.getByTestId('location-pathname')).toHaveTextContent('/tickets');

    confirmSpy.mockRestore();
  });

  it('navigates to the edit page', async () => {
    const user = userEvent.setup();
    getTicketById.mockResolvedValue(mockTicket);

    renderAtRoute('/tickets/:id', <TicketDetailsPage />, `/tickets/${mockTicket.id}`, [
      { path: '/tickets/:id/edit', element: <div>Edit Ticket Screen</div> },
    ]);

    await waitFor(() => expect(screen.getByRole('heading', { name: 'Login failure' })).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'Edit Ticket' }));

    expect(screen.getByTestId('location-pathname')).toHaveTextContent(
      `/tickets/${mockTicket.id}/edit`,
    );
  });

  it('adds a comment from the comments section', async () => {
    const user = userEvent.setup();
    getTicketById.mockResolvedValue(mockTicket);
    getComments.mockResolvedValueOnce([]).mockResolvedValueOnce([mockComment]);
    createComment.mockResolvedValue(mockComment);

    renderAtRoute('/tickets/:id', <TicketDetailsPage />, `/tickets/${mockTicket.id}`);

    await waitFor(() => expect(screen.getByLabelText('Comment')).toBeInTheDocument());

    await user.type(screen.getByLabelText('Comment'), 'Investigating now');
    await user.click(screen.getByRole('button', { name: 'Add Comment' }));

    await waitFor(() =>
      expect(createComment).toHaveBeenCalledWith(mockTicket.id, {
        message: 'Investigating now',
        createdBy: mockTicket.reporter,
      }),
    );
  });
});
