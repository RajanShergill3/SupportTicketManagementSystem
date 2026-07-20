import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { TicketForm } from '@/components/tickets/TicketForm';
import { EMPTY_TICKET_FORM_VALUES } from '@/types/ticket-form.types';
import { render, screen } from '@/test/render';

const userOptions = [
  { label: 'Alice', value: 'user-1' },
  { label: 'Bob', value: 'user-2' },
];

const filledValues = {
  title: 'Login failure',
  description: 'Users cannot sign in',
  priority: 'High' as const,
  reporter: 'user-1',
  assignee: 'user-2',
};

describe('TicketForm', () => {
  it('renders create mode fields', () => {
    render(
      <TicketForm
        initialValues={EMPTY_TICKET_FORM_VALUES}
        userOptions={userOptions}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
        isSubmitting={false}
      />,
    );

    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Priority')).toBeInTheDocument();
    expect(screen.getByLabelText('Reporter')).toBeInTheDocument();
    expect(screen.getByLabelText('Assignee')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Ticket' })).toBeInTheDocument();
  });

  it('submits create values when the form is completed', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <TicketForm
        initialValues={EMPTY_TICKET_FORM_VALUES}
        userOptions={userOptions}
        onSubmit={onSubmit}
        onCancel={vi.fn()}
        isSubmitting={false}
      />,
    );

    await user.type(screen.getByLabelText('Title'), 'Login failure');
    await user.type(screen.getByLabelText('Description'), 'Users cannot sign in');
    await user.selectOptions(screen.getByLabelText('Priority'), 'High');
    await user.selectOptions(screen.getByLabelText('Reporter'), 'user-1');
    await user.selectOptions(screen.getByLabelText('Assignee'), 'user-2');
    await user.click(screen.getByRole('button', { name: 'Create Ticket' }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Login failure',
      description: 'Users cannot sign in',
      priority: 'High',
      reporter: 'user-1',
      assignee: 'user-2',
    });
  });

  it('renders reporter as read-only in edit mode', () => {
    render(
      <TicketForm
        mode="edit"
        initialValues={filledValues}
        userOptions={userOptions}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
        isSubmitting={false}
        submitLabel="Save Changes"
      />,
    );

    const reporter = screen.getByLabelText('Reporter');
    expect(reporter).toBeDisabled();
    expect(reporter).toHaveValue('Alice');
    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument();
  });

  it('submits update values without reporter in edit mode', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <TicketForm
        mode="edit"
        initialValues={filledValues}
        userOptions={userOptions}
        onSubmit={onSubmit}
        onCancel={vi.fn()}
        isSubmitting={false}
        submitLabel="Save Changes"
      />,
    );

    await user.clear(screen.getByLabelText('Title'));
    await user.type(screen.getByLabelText('Title'), 'Updated title');
    await user.click(screen.getByRole('button', { name: 'Save Changes' }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Updated title',
      description: filledValues.description,
      priority: filledValues.priority,
      assignee: filledValues.assignee,
    });
  });

  it('disables controls while submitting', () => {
    render(
      <TicketForm
        initialValues={filledValues}
        userOptions={userOptions}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
        isSubmitting
      />,
    );

    expect(screen.getByLabelText('Title')).toBeDisabled();
    expect(screen.getByRole('button', { name: /loading/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });

  it('shows field errors when provided', () => {
    render(
      <TicketForm
        initialValues={EMPTY_TICKET_FORM_VALUES}
        userOptions={userOptions}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
        isSubmitting={false}
        fieldErrors={{ title: 'Title is required' }}
      />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Title is required');
  });

  it('calls onCancel when Cancel is clicked without confirmation', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(
      <TicketForm
        initialValues={EMPTY_TICKET_FORM_VALUES}
        userOptions={userOptions}
        onSubmit={vi.fn()}
        onCancel={onCancel}
        isSubmitting={false}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('prompts before cancelling when discard confirmation is enabled and the form is dirty', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

    render(
      <TicketForm
        initialValues={EMPTY_TICKET_FORM_VALUES}
        userOptions={userOptions}
        onSubmit={vi.fn()}
        onCancel={onCancel}
        isSubmitting={false}
        enableDiscardConfirmation
      />,
    );

    await user.type(screen.getByLabelText('Title'), 'Changed');
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(confirmSpy).toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1);

    confirmSpy.mockRestore();
  });

  it('notifies onDirtyChange when values change', async () => {
    const user = userEvent.setup();
    const onDirtyChange = vi.fn();

    render(
      <TicketForm
        initialValues={EMPTY_TICKET_FORM_VALUES}
        userOptions={userOptions}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
        isSubmitting={false}
        onDirtyChange={onDirtyChange}
      />,
    );

    await user.type(screen.getByLabelText('Title'), 'Changed');

    expect(onDirtyChange).toHaveBeenCalledWith(true);
  });
});
