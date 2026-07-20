import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { TextInput } from '@/components/ui/TextInput';
import { render, screen } from '@/test/render';

describe('TextInput', () => {
  it('renders a labelled input', () => {
    render(<TextInput id="title" label="Title" />);

    expect(screen.getByLabelText('Title')).toBeInTheDocument();
  });

  it('calls onChange when the user types', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<TextInput id="title" label="Title" onChange={onChange} />);
    await user.type(screen.getByLabelText('Title'), 'Hello');

    expect(onChange).toHaveBeenCalled();
  });

  it('shows an accessible error message', () => {
    render(<TextInput id="title" label="Title" error="Title is required" />);

    const input = screen.getByLabelText('Title');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Title is required');
  });

  it('can be disabled', () => {
    render(<TextInput id="title" label="Title" disabled />);

    expect(screen.getByLabelText('Title')).toBeDisabled();
  });
});
