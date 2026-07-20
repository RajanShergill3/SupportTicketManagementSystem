import { describe, expect, it } from 'vitest';

import { StatCard } from '@/components/dashboard/StatCard';
import { render, screen } from '@/test/render';

describe('StatCard', () => {
  it('renders the metric title, value, description, and icon', () => {
    render(
      <StatCard
        title="Open Tickets"
        value={12}
        description="Awaiting response"
        icon={<span>ICON</span>}
      />,
    );

    expect(screen.getByText('Open Tickets')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Awaiting response')).toBeInTheDocument();
    expect(screen.getByText('ICON')).toBeInTheDocument();
  });
});
