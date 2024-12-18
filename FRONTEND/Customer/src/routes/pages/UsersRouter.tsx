import ErrorPage from 'layouts/ErrorPage';
import React, { lazy } from 'react';
import { LoadingOverlay } from 'components/Common/Spinner';
import { USER_PATH } from 'configurations/paths/paths';
import { Navigate } from 'react-router-dom';
import Services from 'pages/Users/Services';
import AuthProvider from 'pages/Auth/AuthProvider';

//LAZY LOADING COMPONENT
const UsersPage = lazy(() => import('pages/Users'));
const UserHome = lazy(() => import('pages/Users/Home'));
const StylistDetails = lazy(() => import('pages/Users/StylistDetails'));
const Booking = lazy(() => import('pages/Users/Booking'));
const Appointment = lazy(() => import('pages/Users/Appointment'));
const AboutUs = lazy(() => import('pages/Users/AboutUs'));
const OurTeammates = lazy(() => import('pages/Users/OurTeammates'));
const News = lazy(() => import('pages/Users/News'));
const Profile = lazy(() => import('pages/Users/Profile'));
const ChangePassword = lazy(() => import('pages/Users/ChangePassword'));

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
      path: `${USER_PATH.PROFILE}/:id`,
      element: (
        <AuthProvider>
          <Profile />
        </AuthProvider>
      ),
    },
    {
      path: `${USER_PATH.CHANGE_PASSWORD}/:id`,
      element: (
        <AuthProvider>
          <ChangePassword />
        </AuthProvider>
      ),
    },
    {
      path: USER_PATH.HOME,
      element: <UserHome />,
    },
    {
      path: `${USER_PATH.SERVICES}/:id`,
      element: <Services />,
    },
    {
      path: `${USER_PATH.STYLIST_DETAIL}/:id`,
      element: <StylistDetails />,
    },
    {
      path: `${USER_PATH.NEWS}/:id`,
      element: <News />,
    },
    {
      path: USER_PATH.BOOKING,
      element: (
        <AuthProvider>
          <Booking />{' '}
        </AuthProvider>
      ),
    },
    {
      path: USER_PATH.APPOINTMENT,
      element: (
        <AuthProvider>
          <Appointment />
        </AuthProvider>
      ),
    },
    {
      path: USER_PATH.ABOUTUS,
      element: <AboutUs />,
    },
    {
      path: USER_PATH.OUR_TEAMMATES,
      element: <OurTeammates />,
    },
  ],
};
