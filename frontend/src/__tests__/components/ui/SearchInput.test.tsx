import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { SearchInput } from '@/components/ui/SearchInput';
import { render, screen } from '@/test/render';

describe('SearchInput', () => {
  it('renders a labelled search input with default placeholder', () => {
    render(<SearchInput id="search" label="Search" value="" onChange={vi.fn()} />);

    const input = screen.getByLabelText('Search');
    expect(input).toHaveAttribute('type', 'search');
    expect(input).toHaveAttribute('placeholder', 'Search...');
  });

  it('calls onChange when the user types', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<SearchInput id="search" label="Search" value="" onChange={onChange} />);
    await user.type(screen.getByLabelText('Search'), 'a');

    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('uses a custom placeholder', () => {
    render(
      <SearchInput
        id="search"
        label="Search"
        value=""
        placeholder="Search tickets"
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByPlaceholderText('Search tickets')).toBeInTheDocument();
  });
});
