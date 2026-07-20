import { useNavigate } from 'react-router-dom';

import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Table, TableCell, TableRow } from '@/components/ui/Table';
import { type DashboardRecentTicket } from '@/types/dashboard.types';
import { formatDate } from '@/utils/date.util';
import { getTicketPriorityVariant, getTicketStatusVariant } from '@/utils/ticket-badges';

const recentTicketColumns = [
  { key: 'id', header: 'Ticket ID' },
  { key: 'title', header: 'Title' },
  { key: 'status', header: 'Status' },
  { key: 'priority', header: 'Priority' },
  { key: 'assignedTo', header: 'Assigned To' },
  { key: 'createdAt', header: 'Created Date' },
];

function TicketsEmptyIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

interface RecentTicketsPanelProps {
  tickets: DashboardRecentTicket[];
}

/**
 * Recent tickets panel with sticky header and clickable rows.
 */
export function RecentTicketsPanel({ tickets }: RecentTicketsPanelProps) {
  const navigate = useNavigate();

  return (
    <section className="dashboard-panel flex min-h-0 flex-col overflow-hidden">
      <div className="dashboard-panel-header">
        <h2 className="dashboard-section-title">Recent Tickets</h2>
        <p className="dashboard-section-subtitle">Latest tickets across the support queue.</p>
      </div>

      <div className="min-h-0 flex-1">
        {tickets.length === 0 ? (
          <div className="dashboard-panel-body">
            <EmptyState
              icon={<TicketsEmptyIcon />}
              title="No tickets yet"
              description="Create a ticket to see recent activity on the dashboard."
              actionLabel="Create ticket"
              onAction={() => navigate('/tickets/new')}
            />
          </div>
        ) : (
          <div className="max-h-[26rem] overflow-auto">
            <Table columns={recentTicketColumns} stickyHeader density="compact">
              {tickets.map((ticket) => {
                const ticketPath = `/tickets/${ticket.id}`;

                return (
                  <TableRow
                    key={ticket.id}
                    onClick={() => navigate(ticketPath)}
                    className="group"
                  >
                    <TableCell
                      density="compact"
                      className="whitespace-nowrap font-medium text-primary-700 group-hover:text-primary-800"
                    >
                      {ticket.ticketNumber}
                    </TableCell>
                    <TableCell density="compact" className="max-w-[12rem] sm:max-w-[16rem]">
                      <span className="block truncate font-medium text-slate-900 group-hover:text-primary-700">
                        {ticket.title}
                      </span>
                    </TableCell>
                    <TableCell density="compact">
                      <Badge
                        className="dashboard-table-badge"
                        variant={getTicketStatusVariant(ticket.status)}
                      >
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell density="compact">
                      <Badge
                        className="dashboard-table-badge"
                        variant={getTicketPriorityVariant(ticket.priority)}
                      >
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell density="compact" className="whitespace-nowrap text-slate-600">
                      {ticket.assignedTo}
                    </TableCell>
                    <TableCell density="compact" className="whitespace-nowrap text-slate-500">
                      {formatDate(ticket.createdAt)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </Table>
          </div>
        )}
      </div>
    </section>
  );
}
