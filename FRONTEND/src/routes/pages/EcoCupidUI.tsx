import { LoadingOverlay } from 'components/Common/Spinner';
import ErrorPage from 'layouts/ErrorPage';
import React, { lazy } from 'react';
import { Outlet } from 'react-router';
//LAZY LOADING COMPONENT
const EcoCupidComponentExample = lazy(() => import('pages/EcoCupidComponentExample'));

export const EcoCupidComponentRouter = {
  path: '/',
  element: (
    <React.Suspense fallback={<LoadingOverlay loading={true} />}>
      <Outlet />
    </React.Suspense>
  ),
  errorElement: <ErrorPage />,
  children: [{ path: 'ecocupid-ui', element: <EcoCupidComponentExample /> }],
};
