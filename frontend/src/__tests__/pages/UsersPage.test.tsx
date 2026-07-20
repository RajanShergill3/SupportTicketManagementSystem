import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

import { UsersPage } from '@/pages/UsersPage';
import { userService } from '@/services/user.service';
import { screen } from '@/test/render';

import { mockUser, mockUserTwo } from '../hooks/fixtures';
import { renderAtRoute } from './helpers';

vi.mock('@/services/user.service', () => ({
  userService: {
    getUsers: vi.fn(),
  },
}));

const getUsers = vi.mocked(userService.getUsers);

describe('UsersPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows a loading state while users are fetched', () => {
    getUsers.mockReturnValue(new Promise(() => undefined));

    renderAtRoute('/users', <UsersPage />, '/users');

    expect(screen.getByText('Loading users...')).toBeInTheDocument();
  });

  it('renders the users list when data is loaded', async () => {
    getUsers.mockResolvedValue([mockUser, mockUserTwo]);

    renderAtRoute('/users', <UsersPage />, '/users');

    await waitFor(() => expect(screen.getByText('Alice Johnson')).toBeInTheDocument());
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Users' })).toBeInTheDocument();
  });

  it('renders an empty state when there are no users', async () => {
    getUsers.mockResolvedValue([]);

    renderAtRoute('/users', <UsersPage />, '/users');

    await waitFor(() => expect(screen.getByText('No users found')).toBeInTheDocument());
  });

  it('renders an error state and retries', async () => {
    const user = userEvent.setup();
    getUsers.mockRejectedValueOnce(new Error('Network error')).mockResolvedValueOnce([mockUser]);

    renderAtRoute('/users', <UsersPage />, '/users');

    await waitFor(() => expect(screen.getByText('Failed to load users')).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'Retry' }));

    await waitFor(() => expect(screen.getByText('Alice Johnson')).toBeInTheDocument());
  });

  it('filters users by search text', async () => {
    const user = userEvent.setup();
    getUsers.mockResolvedValue([mockUser, mockUserTwo]);

    renderAtRoute('/users', <UsersPage />, '/users');

    await waitFor(() => expect(screen.getByText('Alice Johnson')).toBeInTheDocument());
    await user.type(screen.getByLabelText('Search'), 'bob');

    expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
  });

  it('filters users by role', async () => {
    const user = userEvent.setup();
    getUsers.mockResolvedValue([mockUser, mockUserTwo]);

    renderAtRoute('/users', <UsersPage />, '/users');

    await waitFor(() => expect(screen.getByText('Alice Johnson')).toBeInTheDocument());
    await user.selectOptions(screen.getByLabelText('Role'), 'QA');

    expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
  });
});
