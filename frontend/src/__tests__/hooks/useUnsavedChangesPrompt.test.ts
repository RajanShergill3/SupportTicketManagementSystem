import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useUnsavedChangesPrompt } from '@/hooks/useUnsavedChangesPrompt';

describe('useUnsavedChangesPrompt', () => {
  it('registers a beforeunload listener when the form is dirty', () => {
    const addEventListener = vi.spyOn(window, 'addEventListener');
    const removeEventListener = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useUnsavedChangesPrompt(true));

    expect(addEventListener).toHaveBeenCalledWith('beforeunload', expect.any(Function));

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith('beforeunload', expect.any(Function));

    addEventListener.mockRestore();
    removeEventListener.mockRestore();
  });

  it('prevents unload when dirty and a beforeunload event is fired', () => {
    renderHook(() => useUnsavedChangesPrompt(true));

    const event = new Event('beforeunload', { cancelable: true }) as BeforeUnloadEvent;
    Object.defineProperty(event, 'returnValue', {
      writable: true,
      value: undefined,
    });
    const preventDefault = vi.spyOn(event, 'preventDefault');

    window.dispatchEvent(event);

    expect(preventDefault).toHaveBeenCalled();
    expect(event.returnValue).toBe('');
  });

  it('does not prevent unload when the form is clean', () => {
    renderHook(() => useUnsavedChangesPrompt(false));

    const event = new Event('beforeunload', { cancelable: true }) as BeforeUnloadEvent;
    Object.defineProperty(event, 'returnValue', {
      writable: true,
      value: undefined,
    });
    const preventDefault = vi.spyOn(event, 'preventDefault');

    window.dispatchEvent(event);

    expect(preventDefault).not.toHaveBeenCalled();
    expect(event.returnValue).toBeUndefined();
  });
});
