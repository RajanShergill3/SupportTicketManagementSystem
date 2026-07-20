import { useCallback, useEffect, useState } from 'react';

import { commentService } from '@/services/comment.service';
import { type Comment } from '@/types/comment.types';
import { validateCommentMessage } from '@/utils/comment.validation';

export function useComments(ticketId: string | undefined, currentUserId: string | undefined) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    if (!ticketId) {
      setComments([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await commentService.getComments(ticketId);
      setComments(data);
    } catch (err) {
      setComments([]);
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    void fetchComments();
  }, [fetchComments]);

  const addComment = useCallback(
    async (message: string): Promise<boolean> => {
      if (!ticketId || !currentUserId) {
        setSubmitError('Unable to add comment. Ticket context is missing.');
        return false;
      }

      const validationError = validateCommentMessage(message);
      if (validationError) {
        setSubmitError(validationError);
        return false;
      }

      setIsSubmitting(true);
      setSubmitError(null);

      try {
        await commentService.createComment(ticketId, {
          message: message.trim(),
          createdBy: currentUserId,
        });
        await fetchComments();
        return true;
      } catch (err) {
        setSubmitError(
          err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.',
        );
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [ticketId, currentUserId, fetchComments],
  );

  const clearSubmitError = useCallback(() => {
    setSubmitError(null);
  }, []);

  return {
    comments,
    isLoading,
    error,
    isSubmitting,
    submitError,
    refresh: fetchComments,
    addComment,
    clearSubmitError,
  };
}
