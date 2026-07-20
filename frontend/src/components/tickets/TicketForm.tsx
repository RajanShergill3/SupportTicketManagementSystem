import { type FormEvent, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { TextInput } from '@/components/ui/TextInput';
import { Textarea } from '@/components/ui/Textarea';
import {
  type CreateTicketInput,
  type TicketFormValues,
} from '@/types/ticket-form.types';
import { type TicketPriority } from '@/types/ticket.types';
import { type TicketFormErrors, toCreateTicketInput } from '@/utils/ticket.validation';
import { type UserOption } from '@/hooks/useUsersOptions';

const priorityOptions: { label: string; value: TicketPriority }[] = [
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
  { label: 'Critical', value: 'Critical' },
];

interface TicketFormProps {
  initialValues: TicketFormValues;
  userOptions: UserOption[];
  onSubmit: (values: CreateTicketInput) => void | Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  fieldErrors?: TicketFormErrors;
  submitLabel?: string;
}

export function TicketForm({
  initialValues,
  userOptions,
  onSubmit,
  onCancel,
  isSubmitting,
  fieldErrors = {},
  submitLabel = 'Create Ticket',
}: TicketFormProps) {
  const [values, setValues] = useState<TicketFormValues>(initialValues);

  const updateValue = <K extends keyof TicketFormValues>(key: K, value: TicketFormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    await onSubmit(toCreateTicketInput(values));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-busy={isSubmitting}>
      <TextInput
        id="ticket-title"
        label="Title"
        value={values.title}
        maxLength={150}
        disabled={isSubmitting}
        error={fieldErrors.title}
        onChange={(event) => updateValue('title', event.target.value)}
      />

      <Textarea
        id="ticket-description"
        label="Description"
        value={values.description}
        rows={6}
        maxLength={5000}
        disabled={isSubmitting}
        error={fieldErrors.description}
        onChange={(event) => updateValue('description', event.target.value)}
      />

      <Select
        id="ticket-priority"
        label="Priority"
        value={values.priority}
        placeholder="Select priority"
        disabled={isSubmitting}
        error={fieldErrors.priority}
        options={priorityOptions}
        onChange={(value) => updateValue('priority', value as TicketPriority | '')}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Select
          id="ticket-reporter"
          label="Reporter"
          value={values.reporter}
          placeholder="Select reporter"
          disabled={isSubmitting}
          error={fieldErrors.reporter}
          options={userOptions}
          onChange={(value) => updateValue('reporter', value)}
        />

        <Select
          id="ticket-assignee"
          label="Assignee"
          value={values.assignee}
          placeholder="Select assignee"
          disabled={isSubmitting}
          error={fieldErrors.assignee}
          options={userOptions}
          onChange={(value) => updateValue('assignee', value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="submit" className="w-auto" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="w-auto"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
