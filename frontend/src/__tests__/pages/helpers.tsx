import { type ReactElement } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { render } from '@/test/render';

export function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location-pathname">{location.pathname}</div>;
}

/**
 * Renders a page at a MemoryRouter route, with optional companion routes for navigation assertions.
 */
export function renderAtRoute(
  path: string,
  element: ReactElement,
  initialEntry: string,
  extraRoutes: Array<{ path: string; element: ReactElement }> = [],
) {
  return render(
    <>
      <Routes>
        <Route path={path} element={element} />
        {extraRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      <LocationDisplay />
    </>,
    { initialEntries: [initialEntry] },
  );
}
