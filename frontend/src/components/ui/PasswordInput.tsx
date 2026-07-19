import { useState, type InputHTMLAttributes } from 'react';

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label: string;
  error?: string;
}

/**
 * Reusable password input with show/hide toggle.
 */
export function PasswordInput({
  id,
  label,
  error,
  className = '',
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isVisible ? 'text' : 'password'}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={[
            'w-full rounded-lg border bg-white px-3 py-2 pr-10 text-sm text-slate-900 shadow-sm transition-colors',
            'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
            error ? 'border-red-300 focus:ring-red-500' : 'border-slate-300',
            className,
          ].join(' ')}
          {...props}
        />
        <button
          type="button"
          onClick={() => setIsVisible((current) => !current)}
          className="absolute inset-y-0 right-0 rounded-r-lg px-3 text-xs font-medium text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label={isVisible ? 'Hide password' : 'Show password'}
        >
          {isVisible ? 'Hide' : 'Show'}
        </button>
      </div>
      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
