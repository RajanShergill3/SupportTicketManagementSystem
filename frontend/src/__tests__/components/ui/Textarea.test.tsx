import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Textarea } from '@/components/ui/Textarea';
import { render, screen } from '@/test/render';

describe('Textarea', () => {
  it('renders a labelled textarea', () => {
    render(<Textarea id="description" label="Description" />);

    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });

  it('calls onChange when the user types', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Textarea id="description" label="Description" onChange={onChange} />);
    await user.type(screen.getByLabelText('Description'), 'Details');

    expect(onChange).toHaveBeenCalled();
  });

  it('shows an accessible error message', () => {
    render(
      <Textarea id="description" label="Description" error="Description is required" />,
    );

    expect(screen.getByLabelText('Description')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Description is required');
  });
});
