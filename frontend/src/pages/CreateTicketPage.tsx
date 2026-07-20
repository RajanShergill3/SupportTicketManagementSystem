import { useNavigate } from 'react-router-dom';

import { ErrorMessage } from '@/components/ErrorMessage';
import { PageContainer } from '@/components/layout/PageContainer';
import { TicketForm } from '@/components/tickets/TicketForm';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingState } from '@/components/ui/LoadingState';
import { useCreateTicket } from '@/hooks/useCreateTicket';
import { useUsersOptions } from '@/hooks/useUsersOptions';
import { EMPTY_TICKET_FORM_VALUES, type CreateTicketInput } from '@/types/ticket-form.types';

export function CreateTicketPage() {
  const navigate = useNavigate();
  const { options, isLoading, error: usersError, refresh: refreshUsers } = useUsersOptions();
  const { submit, isSubmitting, error, fieldErrors, clearError } = useCreateTicket();

  const handleSubmit = async (values: CreateTicketInput) => {
    clearError();
    const ticket = await submit(values);

    if (ticket) {
      // TODO(ux): Show a success toast (e.g. "Ticket created successfully") before or after redirect.
      navigate(`/tickets/${ticket.id}`);
    }
  };

  if (isLoading) {
    return (
      <PageContainer
        title="Create Ticket"
        description="Submit a new support request for the team to triage and resolve."
      >
        <Card className="mt-6">
          <LoadingState message="Loading users..." />
        </Card>
      </PageContainer>
    );
  }

  if (usersError) {
    return (
      <PageContainer
        title="Create Ticket"
        description="Submit a new support request for the team to triage and resolve."
      >
        <Card className="mt-6 space-y-4">
          <ErrorMessage title="Failed to load users" message={usersError} />
          <Button variant="secondary" className="w-auto" onClick={refreshUsers}>
            Retry
          </Button>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Create Ticket"
      description="Submit a new support request for the team to triage and resolve."
    >
      <Card className="mt-6 space-y-6">
        {error ? <ErrorMessage title="Failed to create ticket" message={error} /> : null}

        <TicketForm
          initialValues={EMPTY_TICKET_FORM_VALUES}
          userOptions={options}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/tickets')}
          isSubmitting={isSubmitting}
          fieldErrors={fieldErrors}
          submitLabel="Create Ticket"
        />
      </Card>
    </PageContainer>
  );
}
