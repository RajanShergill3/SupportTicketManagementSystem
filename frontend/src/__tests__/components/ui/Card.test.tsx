import { describe, expect, it } from 'vitest';

import { Card } from '@/components/ui/Card';
import { render, screen } from '@/test/render';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);

    expect(screen.getByText('Card content')).toBeInTheDocument();
  });
});
