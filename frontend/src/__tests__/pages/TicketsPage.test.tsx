import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

import { TicketsPage } from '@/pages/TicketsPage';
import { ticketService } from '@/services/ticket.service';
import { screen } from '@/test/render';

import { mockTicket, mockTicketTwo } from '../hooks/fixtures';
import { renderAtRoute } from './helpers';

vi.mock('@/services/ticket.service', () => ({
  ticketService: {
    getTickets: vi.fn(),
    deleteTicket: vi.fn(),
  },
}));

const getTickets = vi.mocked(ticketService.getTickets);
const deleteTicket = vi.mocked(ticketService.deleteTicket);

describe('TicketsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows a loading state while tickets are fetched', () => {
    getTickets.mockReturnValue(new Promise(() => undefined));

    renderAtRoute('/tickets', <TicketsPage />, '/tickets');

    expect(screen.getByText('Loading tickets...')).toBeInTheDocument();
  });

  it('renders the ticket list when data is loaded', async () => {
    getTickets.mockResolvedValue([mockTicket, mockTicketTwo]);

    renderAtRoute('/tickets', <TicketsPage />, '/tickets');

    await waitFor(() => expect(screen.getByText('Login failure')).toBeInTheDocument());
    expect(screen.getByText('UI spacing issue')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Tickets' })).toBeInTheDocument();
  });

  it('renders an empty state when there are no tickets', async () => {
    getTickets.mockResolvedValue([]);

    renderAtRoute('/tickets', <TicketsPage />, '/tickets');

    await waitFor(() => expect(screen.getByText('No tickets found')).toBeInTheDocument());
  });

  it('renders an error state and retries', async () => {
    const user = userEvent.setup();
    getTickets.mockRejectedValueOnce(new Error('Network error')).mockResolvedValueOnce([mockTicket]);

    renderAtRoute('/tickets', <TicketsPage />, '/tickets');

    await waitFor(() => expect(screen.getByText('Failed to load tickets')).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: 'Retry' }));

    await waitFor(() => expect(screen.getByText('Login failure')).toBeInTheDocument());
  });

  it('filters tickets by search text', async () => {
    const user = userEvent.setup();
    getTickets.mockResolvedValue([mockTicket, mockTicketTwo]);

    renderAtRoute('/tickets', <TicketsPage />, '/tickets');

    await waitFor(() => expect(screen.getByText('Login failure')).toBeInTheDocument());

    await user.type(screen.getByLabelText('Search'), 'spacing');

    expect(screen.queryByText('Login failure')).not.toBeInTheDocument();
    expect(screen.getByText('UI spacing issue')).toBeInTheDocument();
  });

  it('filters tickets by status', async () => {
    const user = userEvent.setup();
    getTickets.mockResolvedValue([mockTicket, mockTicketTwo]);

    renderAtRoute('/tickets', <TicketsPage />, '/tickets');

    await waitFor(() => expect(screen.getByText('Login failure')).toBeInTheDocument());

    await user.selectOptions(screen.getByLabelText('Status'), 'Resolved');

    expect(screen.queryByText('Login failure')).not.toBeInTheDocument();
    expect(screen.getByText('UI spacing issue')).toBeInTheDocument();
  });

  it('navigates to create ticket from New Ticket', async () => {
    const user = userEvent.setup();
    getTickets.mockResolvedValue([mockTicket]);

    renderAtRoute('/tickets', <TicketsPage />, '/tickets', [
      { path: '/tickets/new', element: <div>Create Ticket Screen</div> },
    ]);

    await waitFor(() => expect(screen.getByText('Login failure')).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'New Ticket' }));

    expect(screen.getByTestId('location-pathname')).toHaveTextContent('/tickets/new');
  });

  it('deletes a ticket from the action menu after confirmation', async () => {
    const user = userEvent.setup();
    getTickets.mockResolvedValue([mockTicket]);
    deleteTicket.mockResolvedValue(undefined);
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

    renderAtRoute('/tickets', <TicketsPage />, '/tickets');

    await waitFor(() => expect(screen.getByText('Login failure')).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.click(screen.getByRole('menuitem', { name: 'Delete' }));

    expect(confirmSpy).toHaveBeenCalled();
    await waitFor(() => expect(deleteTicket).toHaveBeenCalledWith(mockTicket.id));

    confirmSpy.mockRestore();
  });
});
