import { describe, expect, it } from 'vitest';

import { PageContainer } from '@/components/layout/PageContainer';
import { render, screen } from '@/test/render';

describe('PageContainer', () => {
  it('renders children only when title and description are omitted', () => {
    render(
      <PageContainer>
        <p>Page body</p>
      </PageContainer>,
    );

    expect(screen.getByText('Page body')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('renders title and description when provided', () => {
    render(
      <PageContainer title="Tickets" description="Manage support requests.">
        <p>Page body</p>
      </PageContainer>,
    );

    expect(screen.getByRole('heading', { name: 'Tickets' })).toBeInTheDocument();
    expect(screen.getByText('Manage support requests.')).toBeInTheDocument();
  });
});
