import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

import { EditTicketPage } from '@/pages/EditTicketPage';
import { ticketService } from '@/services/ticket.service';
import { userService } from '@/services/user.service';
import { ApiError } from '@/utils/api-error.util';
import { screen } from '@/test/render';

import { mockTicket, mockUser, mockUserTwo } from '../hooks/fixtures';
import { renderAtRoute } from './helpers';

vi.mock('@/services/ticket.service', () => ({
  ticketService: {
    getTicketById: vi.fn(),
    updateTicket: vi.fn(),
  },
}));

vi.mock('@/services/user.service', () => ({
  userService: {
    getUsers: vi.fn(),
  },
}));

const getTicketById = vi.mocked(ticketService.getTicketById);
const updateTicket = vi.mocked(ticketService.updateTicket);
const getUsers = vi.mocked(userService.getUsers);

const reporterUser = { ...mockUser, id: mockTicket.reporter, name: 'Reporter User' };
const assigneeUser = { ...mockUserTwo, id: mockTicket.assignee, name: 'Assignee User' };

describe('EditTicketPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getUsers.mockResolvedValue([reporterUser, assigneeUser]);
  });

  it('shows a loading state while ticket and users are fetched', () => {
    getTicketById.mockReturnValue(new Promise(() => undefined));
    getUsers.mockReturnValue(new Promise(() => undefined));

    renderAtRoute('/tickets/:id/edit', <EditTicketPage />, `/tickets/${mockTicket.id}/edit`);

    expect(screen.getByText('Loading ticket...')).toBeInTheDocument();
  });

  it('shows not found when the ticket does not exist', async () => {
    getTicketById.mockRejectedValue(new ApiError('Ticket not found', 404));

    renderAtRoute('/tickets/:id/edit', <EditTicketPage />, `/tickets/${mockTicket.id}/edit`);

    await waitFor(() => expect(screen.getByText('Ticket not found')).toBeInTheDocument());
  });

  it('shows an error when ticket loading fails', async () => {
    getTicketById.mockRejectedValue(new Error('Server error'));

    renderAtRoute('/tickets/:id/edit', <EditTicketPage />, `/tickets/${mockTicket.id}/edit`);

    await waitFor(() => expect(screen.getByText('Failed to load ticket')).toBeInTheDocument());
  });

  it('renders the edit form with ticket values', async () => {
    getTicketById.mockResolvedValue(mockTicket);

    renderAtRoute('/tickets/:id/edit', <EditTicketPage />, `/tickets/${mockTicket.id}/edit`);

    await waitFor(() => expect(screen.getByDisplayValue('Login failure')).toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument();
    expect(screen.getByLabelText('Reporter')).toBeDisabled();
  });

  it('saves ticket changes and navigates to details', async () => {
    const user = userEvent.setup();
    getTicketById.mockResolvedValue(mockTicket);
    const updated = { ...mockTicket, title: 'Updated title' };
    updateTicket.mockResolvedValue(updated);

    renderAtRoute('/tickets/:id/edit', <EditTicketPage />, `/tickets/${mockTicket.id}/edit`, [
      { path: '/tickets/:id', element: <div>Ticket Details Screen</div> },
    ]);

    await waitFor(() => expect(screen.getByDisplayValue('Login failure')).toBeInTheDocument());

    await user.clear(screen.getByLabelText('Title'));
    await user.type(screen.getByLabelText('Title'), 'Updated title');
    await user.click(screen.getByRole('button', { name: 'Save Changes' }));

    await waitFor(() =>
      expect(updateTicket).toHaveBeenCalledWith(
        mockTicket.id,
        expect.objectContaining({ title: 'Updated title' }),
      ),
    );

    expect(screen.getByTestId('location-pathname')).toHaveTextContent(`/tickets/${mockTicket.id}`);
  });
});
