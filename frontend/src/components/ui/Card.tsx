import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reusable card container.
 */
export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={[
        'rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
