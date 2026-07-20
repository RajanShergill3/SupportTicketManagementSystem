import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { CommentForm } from '@/components/comments/CommentForm';
import { render, screen } from '@/test/render';

describe('CommentForm', () => {
  it('renders the comment field and actions', () => {
    render(<CommentForm onSubmit={vi.fn()} isSubmitting={false} />);

    expect(screen.getByLabelText('Comment')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Comment' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('shows a validation error for an empty comment', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<CommentForm onSubmit={onSubmit} isSubmitting={false} />);

    await user.click(screen.getByRole('button', { name: 'Add Comment' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Comment is required');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits a valid comment and clears the field on success', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(true);

    render(<CommentForm onSubmit={onSubmit} isSubmitting={false} />);

    await user.type(screen.getByLabelText('Comment'), 'Looking into this');
    await user.click(screen.getByRole('button', { name: 'Add Comment' }));

    expect(onSubmit).toHaveBeenCalledWith('Looking into this');
    expect(screen.getByLabelText('Comment')).toHaveValue('');
  });

  it('keeps the message when submission fails', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(false);

    render(<CommentForm onSubmit={onSubmit} isSubmitting={false} />);

    await user.type(screen.getByLabelText('Comment'), 'Looking into this');
    await user.click(screen.getByRole('button', { name: 'Add Comment' }));

    expect(screen.getByLabelText('Comment')).toHaveValue('Looking into this');
  });

  it('disables controls while submitting', () => {
    render(<CommentForm onSubmit={vi.fn()} isSubmitting />);

    expect(screen.getByLabelText('Comment')).toBeDisabled();
    expect(screen.getByRole('button', { name: /loading/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });

  it('clears the field and submit error on cancel', async () => {
    const user = userEvent.setup();
    const onClearSubmitError = vi.fn();

    render(
      <CommentForm
        onSubmit={vi.fn()}
        isSubmitting={false}
        submitError="Server error"
        onClearSubmitError={onClearSubmitError}
      />,
    );

    await user.type(screen.getByLabelText('Comment'), 'Draft');
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.getByLabelText('Comment')).toHaveValue('');
    expect(onClearSubmitError).toHaveBeenCalled();
  });

  it('shows a submit error from props', () => {
    render(
      <CommentForm onSubmit={vi.fn()} isSubmitting={false} submitError="Create failed" />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Create failed');
  });
});
