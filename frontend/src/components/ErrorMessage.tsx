interface ErrorMessageProps {
  title?: string;
  message: string;
}

/**
 * Reusable error display for failed UI states.
 */
export function ErrorMessage({
  title = 'Something went wrong',
  message,
}: ErrorMessageProps) {
  return (
    <div
      className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
      role="alert"
      aria-live="assertive"
    >
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  );
}
