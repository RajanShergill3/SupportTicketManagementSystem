import { Loading } from '@/components/Loading';

interface LoadingStateProps {
  message?: string;
}

/**
 * Reusable loading state wrapper for data views.
 */
export function LoadingState({ message = 'Loading users...' }: LoadingStateProps) {
  return <Loading message={message} />;
}
