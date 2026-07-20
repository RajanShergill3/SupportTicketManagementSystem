import { type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CommentsSection } from '@/components/comments/CommentsSection';
import { ErrorMessage } from '@/components/ErrorMessage';
import { PageContainer } from '@/components/layout/PageContainer';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingState } from '@/components/ui/LoadingState';
import { useTicketDetails } from '@/hooks/useTicketDetails';
import { formatDate, formatDateTime } from '@/utils/date.util';
import { getTicketPriorityVariant, getTicketStatusVariant } from '@/utils/ticket-badges';

interface DetailFieldProps {
  label: string;
  value: ReactNode;
}

function DetailField({ label, value }: DetailFieldProps) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm text-slate-900">{value}</dd>
    </div>
  );
}

export function TicketDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ticket, isLoading, error, isNotFound, refresh } = useTicketDetails(id);

  if (isLoading) {
    return (
      <PageContainer>
        <Card className="mt-6">
          <LoadingState message="Loading ticket details..." />
        </Card>
      </PageContainer>
    );
  }

  if (isNotFound) {
    return (
      <PageContainer>
        <Card className="mt-6 space-y-4 p-6 text-center sm:text-left">
          <h2 className="text-xl font-semibold text-slate-900">Ticket not found</h2>
          <p className="text-sm text-slate-600">
            The ticket you are looking for does not exist or may have been removed.
          </p>
          <Button variant="secondary" className="w-auto" onClick={() => navigate('/tickets')}>
            Back to Tickets
          </Button>
        </Card>
      </PageContainer>
    );
  }

  if (error || !ticket) {
    return (
      <PageContainer>
        <Card className="mt-6 space-y-4">
          <ErrorMessage title="Failed to load ticket" message={error ?? 'Unable to load ticket details.'} />
          <Button variant="secondary" className="w-auto" onClick={refresh}>
            Retry
          </Button>
        </Card>
      </PageContainer>
    );
  }

  // TODO(auth): Replace with the authenticated session user id.
  const currentUserId = ticket.reporter;

  return (
    <PageContainer>
      <div className="mt-6 space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">{ticket.title}</h2>
              <p className="mt-1 text-sm text-slate-500">{ticket.ticketNumber}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant={getTicketStatusVariant(ticket.status)}>{ticket.status}</Badge>
              <Badge variant={getTicketPriorityVariant(ticket.priority)}>{ticket.priority}</Badge>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" className="w-auto" onClick={() => navigate('/tickets')}>
              Back to Tickets
            </Button>
            <Button className="w-auto" onClick={() => navigate(`/tickets/${ticket.id}/edit`)}>
              Edit Ticket
            </Button>
          </div>
        </div>

        <Card>
          <h3 className="text-lg font-semibold text-slate-900">Ticket Information</h3>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <DetailField label="Title" value={ticket.title} />
            <DetailField
              label="Description"
              value={<span className="whitespace-pre-wrap">{ticket.description}</span>}
            />
            <DetailField label="Reporter" value={ticket.reporter} />
            <DetailField label="Assignee" value={ticket.assignee} />
            <DetailField
              label="Priority"
              value={<Badge variant={getTicketPriorityVariant(ticket.priority)}>{ticket.priority}</Badge>}
            />
            <DetailField
              label="Status"
              value={<Badge variant={getTicketStatusVariant(ticket.status)}>{ticket.status}</Badge>}
            />
            <DetailField label="Created Date" value={formatDate(ticket.createdAt)} />
            <DetailField label="Last Updated" value={formatDateTime(ticket.updatedAt)} />
          </dl>
        </Card>

        <CommentsSection ticketId={ticket.id} currentUserId={currentUserId} />
      </div>
    </PageContainer>
  );
}
