import { LoadingOverlay } from 'components/Common/Spinner';
import { STAFF_PATH, STATE } from 'configurations/paths/paths';
import AuthProvider from 'pages/Auth/AuthProvider';
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

//LAZY LOADING COMPONENT
const StaffPage = lazy(() => import('pages/Staff'));
//
const BookingHistory = lazy(() => import('pages/Staff/BookingHistory'));
const ScheduleList = lazy(() => import('pages/Staff/ScheduleList'));
const StylistStatus = lazy(() => import('pages/Staff/StylistStatus'));
const Booking = lazy(() => import('pages/Staff/Booking'));
const News = lazy(() => import('pages/Staff/News'));
const ChangePassword = lazy(() => import('pages/Staff/ChangePassword'));
const Profile = lazy(() => import('pages/Staff/Profile'));

export const StaffRouter = {
  path: '/',
  element: (
    <React.Suspense fallback={<LoadingOverlay loading={true} />}>
      <AuthProvider>
        <StaffPage />
      </AuthProvider>
    </React.Suspense>
  ),
  children: [
    {
      path: '/',
      element: <Navigate to={`${STAFF_PATH.BOOKING}`} replace />,
    },
    {
      path: `${STAFF_PATH.BOOKING}`,
      element: <Booking />,
    },
    {
      path: `${STAFF_PATH.PROFILE}/:id`,
      element: (
        <AuthProvider>
          <Profile />
        </AuthProvider>
      ),
    },
    {
      path: `${STAFF_PATH.CHANGE_PASSWORD}/:id`,
      element: (
        <AuthProvider>
          <ChangePassword />
        </AuthProvider>
      ),
    },
    //
    {
      path: `${STAFF_PATH.SCHEDULE_LIST}`,
      element: <ScheduleList />,
    },
    {
      path: `${STAFF_PATH.HISTORY}`,
      element: <BookingHistory />,
    },
    {
      path: `${STAFF_PATH.STYLIST_STATUS}`,
      element: <StylistStatus />,
    },
    {
      path: `${STAFF_PATH.NEWS}`,
      element: <News />,
    },
  ],
};
