import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Select } from '@/components/ui/Select';
import { render, screen } from '@/test/render';

const options = [
  { label: 'Low', value: 'Low' },
  { label: 'High', value: 'High' },
];

describe('Select', () => {
  it('renders a labelled select with options', () => {
    render(
      <Select id="priority" label="Priority" value="" options={options} onChange={vi.fn()} />,
    );

    expect(screen.getByLabelText('Priority')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Low' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'High' })).toBeInTheDocument();
  });

  it('renders a placeholder option when provided', () => {
    render(
      <Select
        id="priority"
        label="Priority"
        value=""
        options={options}
        placeholder="Select priority"
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByRole('option', { name: 'Select priority' })).toBeInTheDocument();
  });

  it('calls onChange with the selected value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Select id="priority" label="Priority" value="" options={options} onChange={onChange} />,
    );

    await user.selectOptions(screen.getByLabelText('Priority'), 'High');

    expect(onChange).toHaveBeenCalledWith('High');
  });

  it('shows an accessible error message', () => {
    render(
      <Select
        id="priority"
        label="Priority"
        value=""
        options={options}
        error="Priority is required"
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('Priority')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Priority is required');
  });

  it('can be disabled', () => {
    render(
      <Select
        id="priority"
        label="Priority"
        value="Low"
        options={options}
        disabled
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('Priority')).toBeDisabled();
  });
});
