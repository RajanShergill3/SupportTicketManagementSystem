import { type FormEvent, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { validateCommentMessage } from '@/utils/comment.validation';

interface CommentFormProps {
  onSubmit: (message: string) => Promise<boolean>;
  isSubmitting: boolean;
  submitError?: string | null;
  onClearSubmitError?: () => void;
}

export function CommentForm({
  onSubmit,
  isSubmitting,
  submitError,
  onClearSubmitError,
}: CommentFormProps) {
  const [message, setMessage] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);

  const handleCancel = () => {
    setMessage('');
    setFieldError(null);
    onClearSubmitError?.();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateCommentMessage(message);
    if (validationError) {
      setFieldError(validationError);
      return;
    }

    setFieldError(null);
    const success = await onSubmit(message);

    if (success) {
      setMessage('');
      setFieldError(null);
      onClearSubmitError?.();
    }
  };

  const displayError = fieldError ?? submitError;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="comment-message" className="sr-only">
          Comment
        </label>
        <textarea
          id="comment-message"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            if (fieldError) {
              setFieldError(null);
            }
            if (submitError) {
              onClearSubmitError?.();
            }
          }}
          placeholder="Write a comment..."
          rows={4}
          maxLength={1000}
          aria-invalid={Boolean(displayError)}
          aria-describedby={displayError ? 'comment-message-error' : undefined}
          disabled={isSubmitting}
          className={[
            'w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors',
            'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
            'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500',
            displayError ? 'border-red-300 focus:ring-red-500' : 'border-slate-300',
          ].join(' ')}
        />
        {displayError ? (
          <p id="comment-message-error" className="mt-1.5 text-sm text-red-600" role="alert">
            {displayError}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="submit" className="w-auto" isLoading={isSubmitting} disabled={isSubmitting}>
          Add Comment
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="w-auto"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
