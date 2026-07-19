interface LoadingProps {
  message?: string;
}

/**
 * Reusable loading indicator for async UI states.
 */
export function Loading({ message = 'Loading...' }: LoadingProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-12 text-slate-600"
      role="status"
      aria-live="polite"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-primary-600" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
