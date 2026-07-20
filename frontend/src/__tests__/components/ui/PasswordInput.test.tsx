import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { PasswordInput } from '@/components/ui/PasswordInput';
import { render, screen } from '@/test/render';

describe('PasswordInput', () => {
  it('renders a labelled password field', () => {
    render(<PasswordInput id="password" label="Password" />);

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('toggles visibility when Show/Hide is clicked', async () => {
    const user = userEvent.setup();

    render(<PasswordInput id="password" label="Password" />);

    await user.click(screen.getByRole('button', { name: 'Show password' }));
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text');

    await user.click(screen.getByRole('button', { name: 'Hide password' }));
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('shows an accessible error message', () => {
    render(<PasswordInput id="password" label="Password" error="Password is required" />);

    expect(screen.getByLabelText('Password')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Password is required');
  });
});
