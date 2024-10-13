import ErrorPage from 'layouts/ErrorPage';
import React, { lazy } from 'react';
import { LoadingOverlay } from 'components/Common/Spinner';
import { USER_PATH } from 'configurations/paths/paths';
import { Navigate } from 'react-router-dom';

//LAZY LOADING COMPONENT
const UsersPage = lazy(() => import('pages/Users'));
const UserHome = lazy(() => import('pages/Users/Home'));
const StylistDetails = lazy(() => import('pages/Users/StylistDetails'));
const Booking = lazy(() => import('pages/Users/Booking'));
const Appointment = lazy(() => import('pages/Users/Appointment'));

export const UsersRouter = {
  path: '',
  element: (
    <React.Suspense fallback={<LoadingOverlay loading={true} />}>
      <UsersPage />
    </React.Suspense>
  ),
  errorElement: <ErrorPage />,
  children: [
    {
      path: '',
      element: <Navigate to={`${USER_PATH.HOME}`} replace />,
    },
    {
      path: USER_PATH.HOME,
      element: <UserHome />,
    },
    {
      path: USER_PATH.STYLIST_DETAIL,
      element: <StylistDetails />,
    },
    {
      path: USER_PATH.BOOKING,
      element: <Booking />,
    },
    {
      path: USER_PATH.APPOINTMENT,
      element: <Appointment />,
    },
  ],
};
