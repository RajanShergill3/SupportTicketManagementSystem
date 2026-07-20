const MAX_COMMENT_LENGTH = 1000;

export function validateCommentMessage(value: string): string | null {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return 'Comment is required';
  }

  if (trimmed.length > MAX_COMMENT_LENGTH) {
    return 'Comment must be 1000 characters or fewer';
  }

  return null;
}
