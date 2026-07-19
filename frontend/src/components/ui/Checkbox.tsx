import { type InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label: string;
}

/**
 * Reusable checkbox with label.
 */
export function Checkbox({ id, label, className = '', ...props }: CheckboxProps) {
  return (
    <div className={['flex items-center gap-2', className].join(' ')}>
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
        {...props}
      />
      <label htmlFor={id} className="text-sm text-slate-600">
        {label}
      </label>
    </div>
  );
}
