import { type ReactNode } from 'react';

interface PageContainerProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

/**
 * Consistent page wrapper for authenticated views.
 */
export function PageContainer({ title, description, children }: PageContainerProps) {
  return (
    <div className="page-container">
      {title ? <h1 className="page-title">{title}</h1> : null}
      {description ? <p className="page-description">{description}</p> : null}
      {children}
    </div>
  );
}
