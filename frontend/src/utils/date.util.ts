/**
 * Shared date formatting utilities.
 */
export function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));
}

export function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

/**
 * Formats an ISO timestamp as a short relative label (e.g. "5 minutes ago").
 * Falls back to {@link formatDate} for older dates.
 */
export function formatRelativeTime(value: string, now: number = Date.now()): string {
  const then = new Date(value).getTime();

  if (Number.isNaN(then)) {
    return value;
  }

  const diffMs = Math.max(0, now - then);
  const seconds = Math.floor(diffMs / 1000);

  if (seconds < 60) {
    return 'just now';
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  }

  return formatDate(value);
}
