interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * Reusable empty state for lists and tables.
 */
export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-600">{description}</p>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
