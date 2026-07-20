import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ErrorMessage } from '@/components/ErrorMessage';
import { PageContainer } from '@/components/layout/PageContainer';
import { TicketForm } from '@/components/tickets/TicketForm';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingState } from '@/components/ui/LoadingState';
import { useEditTicket } from '@/hooks/useEditTicket';
import { useUnsavedChangesPrompt } from '@/hooks/useUnsavedChangesPrompt';
import { useUsersOptions } from '@/hooks/useUsersOptions';
import { type UpdateTicketInput } from '@/types/ticket-form.types';

export function EditTicketPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDirty, setIsDirty] = useState(false);

  const {
    ticket,
    initialValues,
    isLoading: isTicketLoading,
    isSubmitting,
    error,
    isNotFound,
    fieldErrors,
    refresh,
    submit,
    clearError,
  } = useEditTicket(id);

  const {
    options,
    isLoading: isUsersLoading,
    error: usersError,
    refresh: refreshUsers,
  } = useUsersOptions();

  useUnsavedChangesPrompt(isDirty);

  const handleSubmit = async (values: UpdateTicketInput) => {
    clearError();
    const updatedTicket = await submit(values);

    if (updatedTicket) {
      navigate(`/tickets/${updatedTicket.id}`);
    }
  };

  const handleCancel = () => {
    if (ticket) {
      navigate(`/tickets/${ticket.id}`);
    } else {
      navigate('/tickets');
    }
  };

  if (isTicketLoading || isUsersLoading) {
    return (
      <PageContainer
        title="Edit Ticket"
        description="Update ticket details and assignment."
      >
        <Card className="mt-6">
          <LoadingState message="Loading ticket..." />
        </Card>
      </PageContainer>
    );
  }

  if (isNotFound) {
    return (
      <PageContainer title="Edit Ticket" description="Update ticket details and assignment.">
        <Card className="mt-6 space-y-4 p-6 text-center sm:text-left">
          <h2 className="text-xl font-semibold text-slate-900">Ticket not found</h2>
          <p className="text-sm text-slate-600">
            The ticket you are trying to edit does not exist or may have been removed.
          </p>
          <Button variant="secondary" className="w-auto" onClick={() => navigate('/tickets')}>
            Back to Tickets
          </Button>
        </Card>
      </PageContainer>
    );
  }

  if (error && !initialValues) {
    return (
      <PageContainer title="Edit Ticket" description="Update ticket details and assignment.">
        <Card className="mt-6 space-y-4">
          <ErrorMessage title="Failed to load ticket" message={error} />
          <Button variant="secondary" className="w-auto" onClick={refresh}>
            Retry
          </Button>
        </Card>
      </PageContainer>
    );
  }

  if (usersError) {
    return (
      <PageContainer title="Edit Ticket" description="Update ticket details and assignment.">
        <Card className="mt-6 space-y-4">
          <ErrorMessage title="Failed to load users" message={usersError} />
          <Button variant="secondary" className="w-auto" onClick={refreshUsers}>
            Retry
          </Button>
        </Card>
      </PageContainer>
    );
  }

  if (!initialValues || !ticket) {
    return null;
  }

  return (
    <PageContainer title="Edit Ticket" description="Update ticket details and assignment.">
      <Card className="mt-6 space-y-6">
        {error ? <ErrorMessage title="Failed to update ticket" message={error} /> : null}

        <TicketForm
          key={ticket.id}
          mode="edit"
          initialValues={initialValues}
          userOptions={options}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          fieldErrors={fieldErrors}
          submitLabel="Save Changes"
          enableDiscardConfirmation
          onDirtyChange={setIsDirty}
        />
      </Card>
    </PageContainer>
  );
}
