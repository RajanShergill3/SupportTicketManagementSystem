import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';

import { LoginPage } from '@/pages/LoginPage';
import { screen } from '@/test/render';

import { renderAtRoute } from './helpers';

describe('LoginPage', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the login form', () => {
    renderAtRoute('/login', <LoginPage />, '/login');

    expect(screen.getByRole('heading', { name: 'Welcome back' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    renderAtRoute('/login', <LoginPage />, '/login');

    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('shows a validation error for an invalid email', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    renderAtRoute('/login', <LoginPage />, '/login');

    await user.type(screen.getByLabelText('Email'), 'not-an-email');
    await user.type(screen.getByLabelText('Password'), 'secret');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  it('submits valid credentials and shows a loading state', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    renderAtRoute('/login', <LoginPage />, '/login');

    await user.type(screen.getByLabelText('Email'), 'you@company.com');
    await user.type(screen.getByLabelText('Password'), 'secret');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByRole('button', { name: /loading/i })).toBeDisabled();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1200);
    });

    expect(screen.getByRole('button', { name: 'Login' })).toBeEnabled();
  });

  it('shows a message when forgot password is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    renderAtRoute('/login', <LoginPage />, '/login');

    await user.click(screen.getByRole('button', { name: 'Forgot password?' }));

    expect(screen.getByText('Forgot password is not available yet.')).toBeInTheDocument();
  });
});
