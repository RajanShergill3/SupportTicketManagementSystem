import { type Comment } from '@/types/comment.types';
import { formatDateTime } from '@/utils/date.util';

interface CommentCardProps {
  comment: Comment;
}

export function CommentCard({ comment }: CommentCardProps) {
  // TODO(api): Display author name when the API returns populated user details.
  const authorLabel = comment.createdBy;
  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-slate-900">{authorLabel}</p>
        <time className="text-xs text-slate-500" dateTime={comment.createdAt}>
          {formatDateTime(comment.createdAt)}
        </time>
      </div>
      <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{comment.message}</p>
    </article>
  );
}
