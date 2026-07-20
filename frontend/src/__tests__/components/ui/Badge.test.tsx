import { describe, expect, it } from 'vitest';

import { Badge } from '@/components/ui/Badge';
import { render, screen } from '@/test/render';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Open</Badge>);

    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('applies the default variant styles', () => {
    render(<Badge>Open</Badge>);

    expect(screen.getByText('Open')).toHaveClass('bg-slate-100');
  });

  it('applies a custom variant', () => {
    render(<Badge variant="success">Resolved</Badge>);

    expect(screen.getByText('Resolved')).toHaveClass('bg-green-100');
  });
});
