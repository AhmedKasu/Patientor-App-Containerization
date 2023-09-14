import React, { ReactElement, isValidElement } from 'react';
import { render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { PatientsProvider } from '../../context/patientsContext';
import { AuthProvider } from '../../context/authContext';

interface RenderOptions {
  element: ReactElement;
  path: string;
}

const isReactElement = (obj: unknown): obj is ReactElement => {
  return typeof obj === 'object' && obj !== null && isValidElement(obj);
};

const renderWithRouter = (
  children: ReactElement | RenderOptions,
  routes: RenderOptions[] = []
): ReturnType<typeof render> => {
  const options: RenderOptions = isReactElement(children)
    ? { element: children, path: '/' }
    : children;

  const router = createMemoryRouter([{ ...options }, ...routes], {
    initialEntries: [options.path],
    initialIndex: 1,
  });

  return render(
    <PatientsProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </PatientsProvider>
  );
};

export default renderWithRouter;
