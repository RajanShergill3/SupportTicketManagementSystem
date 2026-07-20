import { ErrorMessage } from '@/components/ErrorMessage';
import { CommentCard } from '@/components/comments/CommentCard';
import { CommentForm } from '@/components/comments/CommentForm';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingState } from '@/components/ui/LoadingState';
import { useComments } from '@/hooks/useComments';

interface CommentsSectionProps {
  ticketId: string;
  currentUserId: string;
}

export function CommentsSection({ ticketId, currentUserId }: CommentsSectionProps) {
  const {
    comments,
    isLoading,
    error,
    isSubmitting,
    submitError,
    refresh,
    addComment,
    clearSubmitError,
  } = useComments(ticketId, currentUserId);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-slate-900">Comments</h3>

      <div className="mt-4">
        {isLoading ? (
          <LoadingState message="Loading comments..." />
        ) : error ? (
          <div className="space-y-4">
            <ErrorMessage title="Failed to load comments" message={error} />
            <Button variant="secondary" className="w-auto" onClick={refresh}>
              Retry
            </Button>
          </div>
        ) : comments.length === 0 ? (
          <p className="text-sm text-slate-500">No comments yet.</p>
        ) : (
          <ul className="space-y-3">
            {comments.map((comment) => (
              <li key={comment.id}>
                <CommentCard comment={comment} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {!isLoading && !error ? (
        <div className="mt-6 border-t border-slate-200 pt-6">
          <CommentForm
            onSubmit={addComment}
            isSubmitting={isSubmitting}
            submitError={submitError}
            onClearSubmitError={clearSubmitError}
          />
        </div>
      ) : null}
    </Card>
  );
}
