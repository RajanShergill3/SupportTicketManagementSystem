import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

import { NotFoundPage } from '@/pages/NotFoundPage';
import { screen } from '@/test/render';

import { renderAtRoute } from './helpers';

describe('NotFoundPage', () => {
  it('renders the 404 message', () => {
    renderAtRoute('/404', <NotFoundPage />, '/404');

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    expect(
      screen.getByText('The page you are looking for does not exist.'),
    ).toBeInTheDocument();
  });

  it('navigates to the dashboard from the recovery link', async () => {
    const user = userEvent.setup();

    renderAtRoute('/404', <NotFoundPage />, '/404', [
      { path: '/', element: <div>Dashboard Screen</div> },
    ]);

    await user.click(screen.getByRole('link', { name: 'Go to Dashboard' }));

    expect(screen.getByTestId('location-pathname')).toHaveTextContent('/');
    expect(screen.getByText('Dashboard Screen')).toBeInTheDocument();
  });
});
