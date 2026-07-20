import { type ReactElement, type ReactNode } from 'react';
import { render as rtlRender, type RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
}

interface WrapperProps {
  children: ReactNode;
}

/**
 * Renders UI with the providers used by the application.
 * MemoryRouter is used instead of BrowserRouter for deterministic routing in tests.
 */
function render(
  ui: ReactElement,
  { initialEntries = ['/'], ...options }: CustomRenderOptions = {},
) {
  function Wrapper({ children }: WrapperProps) {
    return <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
export { render };
