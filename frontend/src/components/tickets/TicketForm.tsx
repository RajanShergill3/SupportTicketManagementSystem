import { type FormEvent, useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { TextInput } from '@/components/ui/TextInput';
import { Textarea } from '@/components/ui/Textarea';
import {
  type CreateTicketInput,
  type TicketFormValues,
  type UpdateTicketInput,
} from '@/types/ticket-form.types';
import { type TicketPriority } from '@/types/ticket.types';
import {
  hasCreateTicketChanges,
  hasUpdateTicketChanges,
  type TicketFormErrors,
  toCreateTicketInput,
  toUpdateTicketInput,
} from '@/utils/ticket.validation';
import { type UserOption } from '@/hooks/useUsersOptions';

const priorityOptions: { label: string; value: TicketPriority }[] = [
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
  { label: 'Critical', value: 'Critical' },
];

const DISCARD_CONFIRMATION_MESSAGE =
  'You have unsaved changes. Discard them and leave this page?';

interface TicketFormBaseProps {
  initialValues: TicketFormValues;
  userOptions: UserOption[];
  onCancel: () => void;
  isSubmitting: boolean;
  fieldErrors?: TicketFormErrors;
  submitLabel?: string;
  enableDiscardConfirmation?: boolean;
  discardConfirmationMessage?: string;
  onDirtyChange?: (isDirty: boolean) => void;
}

interface CreateTicketFormProps extends TicketFormBaseProps {
  mode?: 'create';
  onSubmit: (values: CreateTicketInput) => void | Promise<void>;
}

interface EditTicketFormProps extends TicketFormBaseProps {
  mode: 'edit';
  onSubmit: (values: UpdateTicketInput) => void | Promise<void>;
}

type TicketFormProps = CreateTicketFormProps | EditTicketFormProps;

export function TicketForm({
  initialValues,
  userOptions,
  onSubmit,
  onCancel,
  isSubmitting,
  fieldErrors = {},
  submitLabel = 'Create Ticket',
  mode = 'create',
  enableDiscardConfirmation = false,
  discardConfirmationMessage = DISCARD_CONFIRMATION_MESSAGE,
  onDirtyChange,
}: TicketFormProps) {
  const [values, setValues] = useState<TicketFormValues>(initialValues);
  const isEditMode = mode === 'edit';

  useEffect(() => {
    const hasChanges = isEditMode
      ? hasUpdateTicketChanges(initialValues, values)
      : hasCreateTicketChanges(initialValues, values);

    onDirtyChange?.(hasChanges);
  }, [initialValues, isEditMode, onDirtyChange, values]);

  const updateValue = <K extends keyof TicketFormValues>(key: K, value: TicketFormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (isEditMode) {
      const editOnSubmit = onSubmit as EditTicketFormProps['onSubmit'];
      await editOnSubmit(toUpdateTicketInput(values));
      return;
    }

    const createOnSubmit = onSubmit as CreateTicketFormProps['onSubmit'];
    await createOnSubmit(toCreateTicketInput(values));
  };

  const handleCancel = () => {
    const hasChanges = isEditMode
      ? hasUpdateTicketChanges(initialValues, values)
      : hasCreateTicketChanges(initialValues, values);

    if (enableDiscardConfirmation && hasChanges) {
      const confirmed = window.confirm(discardConfirmationMessage);
      if (!confirmed) {
        return;
      }
    }

    onCancel();
  };

  const reporterLabel = userOptions.find((option) => option.value === values.reporter)?.label;

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
        {isEditMode ? (
          <TextInput
            id="ticket-reporter"
            label="Reporter"
            value={reporterLabel ?? values.reporter}
            disabled
            readOnly
          />
        ) : (
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
        )}

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
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
