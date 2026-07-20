import { describe, expect, it } from 'vitest';

import { formatDate, formatRelativeTime } from '@/utils/date.util';

describe('date.util', () => {
  it('formats relative times', () => {
    const now = Date.parse('2026-01-10T12:00:00.000Z');

    expect(formatRelativeTime('2026-01-10T11:59:30.000Z', now)).toBe('just now');
    expect(formatRelativeTime('2026-01-10T11:55:00.000Z', now)).toBe('5 minutes ago');
    expect(formatRelativeTime('2026-01-10T10:00:00.000Z', now)).toBe('2 hours ago');
    expect(formatRelativeTime('2026-01-08T12:00:00.000Z', now)).toBe('2 days ago');
    expect(formatRelativeTime('2025-01-01T00:00:00.000Z', now)).toBe(
      formatDate('2025-01-01T00:00:00.000Z'),
    );
  });
});
