import { describe, expect, it } from 'vitest';

import { Avatar, AvatarWithName } from '@/components/ui/Avatar';
import { render, screen } from '@/test/render';

describe('Avatar', () => {
  it('renders initials from the user name', () => {
    render(<Avatar name="Alice Johnson" />);

    expect(screen.getByText('AJ')).toBeInTheDocument();
  });
});

describe('AvatarWithName', () => {
  it('renders the name and optional subtitle', () => {
    render(<AvatarWithName name="Alice Johnson" subtitle="Developer" />);

    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('AJ')).toBeInTheDocument();
  });

  it('hides the subtitle when it is not provided', () => {
    render(<AvatarWithName name="Alice Johnson" />);

    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.queryByText('Developer')).not.toBeInTheDocument();
  });
});
