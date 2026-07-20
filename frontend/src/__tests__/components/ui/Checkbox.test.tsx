import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from '@/components/ui/Checkbox';
import { render, screen } from '@/test/render';

describe('Checkbox', () => {
  it('renders a labelled checkbox', () => {
    render(<Checkbox id="remember" label="Remember me" />);

    expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('calls onChange when toggled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Checkbox id="remember" label="Remember me" onChange={onChange} />);
    await user.click(screen.getByLabelText('Remember me'));

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
