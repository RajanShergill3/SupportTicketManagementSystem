import { useEffect } from 'react';

/**
 * Prompts before the user leaves the page when the form has unsaved changes.
 *
 * TODO: In-app navigation blocking (e.g. clicking sidebar links) requires
 * `useBlocker` from React Router, which only works with a Data Router
 * (`createBrowserRouter` + `RouterProvider`). Migrate from `BrowserRouter`
 * before adding that behaviour here.
 */
export function useUnsavedChangesPrompt(isDirty: boolean): void {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) {
        return;
      }

      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);
}
