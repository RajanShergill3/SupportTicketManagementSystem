import { describe, expect, it } from 'vitest';

import { DashboardIcon, TicketsIcon, UsersIcon } from '@/components/icons/NavIcons';
import { render } from '@/test/render';

describe('NavIcons', () => {
  it('renders dashboard, users, and tickets icons', () => {
    const { container } = render(
      <>
        <DashboardIcon />
        <UsersIcon />
        <TicketsIcon />
      </>,
    );

    expect(container.querySelectorAll('svg')).toHaveLength(3);
  });
});
