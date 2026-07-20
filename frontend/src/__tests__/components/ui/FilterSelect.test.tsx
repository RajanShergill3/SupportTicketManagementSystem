import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { FilterSelect } from '@/components/ui/FilterSelect';
import { render, screen } from '@/test/render';

const options = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Open', value: 'Open' },
];

describe('FilterSelect', () => {
  it('renders a labelled filter select', () => {
    render(
      <FilterSelect id="status" label="Status" value="all" options={options} onChange={vi.fn()} />,
    );

    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Open' })).toBeInTheDocument();
  });

  it('calls onChange with the selected value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <FilterSelect id="status" label="Status" value="all" options={options} onChange={onChange} />,
    );

    await user.selectOptions(screen.getByLabelText('Status'), 'Open');

    expect(onChange).toHaveBeenCalledWith('Open');
  });
});
