import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

/**
 * Reusable button with loading state support.
 */
export function Button({
  variant = 'primary',
  isLoading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const variantClasses =
    variant === 'primary'
      ? 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500'
      : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-primary-500';

  return (
    <button
      type="button"
      disabled={disabled ?? isLoading}
      aria-busy={isLoading}
      className={[
        'inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses,
        className,
      ].join(' ')}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
