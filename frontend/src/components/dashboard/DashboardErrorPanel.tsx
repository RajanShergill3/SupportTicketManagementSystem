import { Button } from '@/components/ui/Button';

interface DashboardErrorPanelProps {
  message: string;
  onRetry: () => void;
}

function ErrorIllustration() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      />
    </svg>
  );
}

/**
 * Dashboard-specific error panel with retry.
 */
export function DashboardErrorPanel({ message, onRetry }: DashboardErrorPanelProps) {
  return (
    <div
      className="dashboard-panel flex flex-col items-center px-5 py-12 text-center sm:px-6 sm:py-14"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
        <ErrorIllustration />
      </div>
      <h2 className="mt-4 text-base font-semibold text-slate-900">Failed to load dashboard</h2>
      <p className="mt-1.5 max-w-md text-sm leading-5 text-slate-500">{message}</p>
      <Button type="button" variant="secondary" className="mt-5 w-auto px-3.5 py-2" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}
