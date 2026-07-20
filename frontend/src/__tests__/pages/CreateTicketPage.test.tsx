import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

import { CreateTicketPage } from '@/pages/CreateTicketPage';
import { ticketService } from '@/services/ticket.service';
import { userService } from '@/services/user.service';
import { screen } from '@/test/render';

import { mockTicket, mockUser, mockUserTwo } from '../hooks/fixtures';
import { renderAtRoute } from './helpers';

vi.mock('@/services/user.service', () => ({
  userService: {
    getUsers: vi.fn(),
  },
}));

vi.mock('@/services/ticket.service', () => ({
  ticketService: {
    createTicket: vi.fn(),
  },
}));

const getUsers = vi.mocked(userService.getUsers);
const createTicket = vi.mocked(ticketService.createTicket);

describe('CreateTicketPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows a loading state while users are fetched', () => {
    getUsers.mockReturnValue(new Promise(() => undefined));

    renderAtRoute('/tickets/new', <CreateTicketPage />, '/tickets/new');

    expect(screen.getByText('Loading users...')).toBeInTheDocument();
  });

  it('shows an error when users fail to load', async () => {
    const user = userEvent.setup();
    getUsers.mockRejectedValueOnce(new Error('Users unavailable')).mockResolvedValueOnce([
      mockUser,
      mockUserTwo,
    ]);

    renderAtRoute('/tickets/new', <CreateTicketPage />, '/tickets/new');

    await waitFor(() => expect(screen.getByText('Failed to load users')).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'Retry' }));

    await waitFor(() => expect(screen.getByLabelText('Title')).toBeInTheDocument());
  });

  it('renders the create ticket form when users are loaded', async () => {
    getUsers.mockResolvedValue([mockUser, mockUserTwo]);

    renderAtRoute('/tickets/new', <CreateTicketPage />, '/tickets/new');

    await waitFor(() => expect(screen.getByRole('heading', { name: 'Create Ticket' })).toBeInTheDocument());
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Ticket' })).toBeInTheDocument();
  });

  it('creates a ticket and navigates to the details page', async () => {
    const user = userEvent.setup();
    getUsers.mockResolvedValue([
      { ...mockUser, id: mockTicket.reporter },
      { ...mockUserTwo, id: mockTicket.assignee },
    ]);
    createTicket.mockResolvedValue(mockTicket);

    renderAtRoute('/tickets/new', <CreateTicketPage />, '/tickets/new', [
      { path: '/tickets/:id', element: <div>Ticket Details Screen</div> },
    ]);

    await waitFor(() => expect(screen.getByLabelText('Title')).toBeInTheDocument());

    await user.type(screen.getByLabelText('Title'), 'Login failure');
    await user.type(screen.getByLabelText('Description'), 'Users cannot sign in');
    await user.selectOptions(screen.getByLabelText('Priority'), 'High');
    await user.selectOptions(screen.getByLabelText('Reporter'), mockTicket.reporter);
    await user.selectOptions(screen.getByLabelText('Assignee'), mockTicket.assignee);
    await user.click(screen.getByRole('button', { name: 'Create Ticket' }));

    await waitFor(() =>
      expect(createTicket).toHaveBeenCalledWith({
        title: 'Login failure',
        description: 'Users cannot sign in',
        priority: 'High',
        reporter: mockTicket.reporter,
        assignee: mockTicket.assignee,
      }),
    );

    expect(screen.getByTestId('location-pathname')).toHaveTextContent(`/tickets/${mockTicket.id}`);
  });

  it('shows a create error when the service fails', async () => {
    const user = userEvent.setup();
    getUsers.mockResolvedValue([
      { ...mockUser, id: mockTicket.reporter },
      { ...mockUserTwo, id: mockTicket.assignee },
    ]);
    createTicket.mockRejectedValue(new Error('Create failed'));

    renderAtRoute('/tickets/new', <CreateTicketPage />, '/tickets/new');

    await waitFor(() => expect(screen.getByLabelText('Title')).toBeInTheDocument());

    await user.type(screen.getByLabelText('Title'), 'Login failure');
    await user.type(screen.getByLabelText('Description'), 'Users cannot sign in');
    await user.selectOptions(screen.getByLabelText('Priority'), 'High');
    await user.selectOptions(screen.getByLabelText('Reporter'), mockTicket.reporter);
    await user.selectOptions(screen.getByLabelText('Assignee'), mockTicket.assignee);
    await user.click(screen.getByRole('button', { name: 'Create Ticket' }));

    await waitFor(() => expect(screen.getByText('Failed to create ticket')).toBeInTheDocument());
    expect(screen.getByText('Create failed')).toBeInTheDocument();
  });
});
