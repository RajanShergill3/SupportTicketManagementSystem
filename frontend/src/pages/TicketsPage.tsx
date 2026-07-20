import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { ErrorMessage } from '@/components/ErrorMessage';
import { PageContainer } from '@/components/layout/PageContainer';
import { ActionMenu } from '@/components/ui/ActionMenu';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/DataTable';
import { EmptyState } from '@/components/ui/EmptyState';
import { FilterSelect } from '@/components/ui/FilterSelect';
import { LoadingState } from '@/components/ui/LoadingState';
import { Pagination } from '@/components/ui/Pagination';
import { SearchInput } from '@/components/ui/SearchInput';
import { TableCell, TableRow } from '@/components/ui/Table';
import { DELETE_TICKET_CONFIRMATION_MESSAGE } from '@/constants/ticket.constants';
import { useDeleteTicket } from '@/hooks/useDeleteTicket';
import { useTicketsTable } from '@/hooks/useTicketsTable';
import { type Ticket } from '@/types/ticket.types';
import { formatDate } from '@/utils/date.util';
import { getTicketPriorityVariant, getTicketStatusVariant } from '@/utils/ticket-badges';

const ticketColumns = [
  { key: 'ticketNumber', header: 'Ticket ID' },
  { key: 'title', header: 'Title' },
  { key: 'reporter', header: 'Reporter' },
  { key: 'assignee', header: 'Assignee' },
  { key: 'priority', header: 'Priority' },
  { key: 'status', header: 'Status' },
  { key: 'createdAt', header: 'Created Date' },
  { key: 'actions', header: 'Actions' },
];

const statusFilterOptions = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Open', value: 'Open' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Resolved', value: 'Resolved' },
  { label: 'Closed', value: 'Closed' },
  { label: 'Cancelled', value: 'Cancelled' },
];

const priorityFilterOptions = [
  { label: 'All Priorities', value: 'all' },
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
  { label: 'Critical', value: 'Critical' },
];

export function TicketsPage() {
  const navigate = useNavigate();
  const [pendingDeleteTicketId, setPendingDeleteTicketId] = useState<string | null>(null);
  const {
    deleteTicket,
    isDeleting,
    error: deleteError,
    clearError: clearDeleteError,
  } = useDeleteTicket();
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    currentPage,
    setCurrentPage,
    isLoading,
    error,
    refresh,
    resetFilters,
    filteredTickets,
    paginatedTickets,
    totalPages,
    pageSize,
  } = useTicketsTable();

  const performDelete = async (ticketId: string): Promise<boolean> => {
    if (isDeleting) {
      return false;
    }

    setPendingDeleteTicketId(ticketId);
    const success = await deleteTicket(ticketId);

    if (success) {
      setPendingDeleteTicketId(null);
      refresh();
    }

    return success;
  };

  const handleDelete = async (ticketId: string) => {
    if (isDeleting) {
      return;
    }

    clearDeleteError();

    const confirmed = window.confirm(DELETE_TICKET_CONFIRMATION_MESSAGE);
    if (!confirmed) {
      return;
    }

    await performDelete(ticketId);
  };

  const handleRetryDelete = async () => {
    if (!pendingDeleteTicketId || isDeleting) {
      return;
    }

    clearDeleteError();
    await performDelete(pendingDeleteTicketId);
  };

  const renderTableContent = () => {
    if (isLoading) {
      return <LoadingState message="Loading tickets..." />;
    }

    if (error) {
      return (
        <div className="space-y-4">
          <ErrorMessage title="Failed to load tickets" message={error} />
          <Button variant="secondary" className="w-auto" onClick={refresh}>
            Retry
          </Button>
        </div>
      );
    }

    if (filteredTickets.length === 0) {
      return (
        <EmptyState
          title="No tickets found"
          description="Try adjusting your search or filters to find tickets."
          actionLabel="Reset filters"
          onAction={resetFilters}
        />
      );
    }

    return (
      <>
        <DataTable columns={ticketColumns}>
          {paginatedTickets.map((ticket: Ticket) => {
            const ticketPath = `/tickets/${ticket.id}`;

            return (
              <TableRow key={ticket.id} onClick={() => navigate(ticketPath)}>
                <TableCell>
                  <Link
                    to={ticketPath}
                    onClick={(event) => event.stopPropagation()}
                    className="font-medium text-primary-700 hover:text-primary-800 hover:underline"
                  >
                    {ticket.ticketNumber}
                  </Link>
                </TableCell>
                <TableCell className="max-w-xs">
                  <Link
                    to={ticketPath}
                    onClick={(event) => event.stopPropagation()}
                    className="block truncate font-medium text-slate-900 hover:text-primary-700 hover:underline"
                  >
                    {ticket.title}
                  </Link>
                </TableCell>
                <TableCell>{ticket.reporter}</TableCell>
                <TableCell>{ticket.assignee}</TableCell>
                <TableCell>
                  <Badge variant={getTicketPriorityVariant(ticket.priority)}>{ticket.priority}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getTicketStatusVariant(ticket.status)}>{ticket.status}</Badge>
                </TableCell>
                <TableCell>{formatDate(ticket.createdAt)}</TableCell>
                <TableCell>
                  <div onClick={(event) => event.stopPropagation()}>
                    <ActionMenu
                      disabled={isDeleting}
                      onView={() => navigate(ticketPath)}
                      onEdit={() => navigate(`${ticketPath}/edit`)}
                      onDelete={() => void handleDelete(ticket.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </DataTable>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredTickets.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </>
    );
  };

  return (
    <PageContainer
      title="Tickets"
      description="Track, prioritize, and manage support requests across your team."
    >
      <Card className="mt-6 space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <SearchInput
              id="ticket-search"
              label="Search"
              value={search}
              placeholder="Search by ID, title, reporter, or assignee"
              onChange={setSearch}
            />
            <FilterSelect
              id="status-filter"
              label="Status"
              value={statusFilter}
              options={statusFilterOptions}
              onChange={setStatusFilter}
            />
            <FilterSelect
              id="priority-filter"
              label="Priority"
              value={priorityFilter}
              options={priorityFilterOptions}
              onChange={setPriorityFilter}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" className="w-auto" onClick={refresh}>
              Refresh
            </Button>
            <Button className="w-auto" onClick={() => navigate('/tickets/new')}>
              New Ticket
            </Button>
          </div>
        </div>

        {deleteError ? (
          <div className="space-y-4">
            <ErrorMessage title="Failed to delete ticket" message={deleteError} />
            <Button
              variant="secondary"
              className="w-auto"
              disabled={isDeleting}
              isLoading={isDeleting}
              onClick={handleRetryDelete}
            >
              Retry
            </Button>
          </div>
        ) : null}

        {renderTableContent()}
      </Card>
    </PageContainer>
  );
}
