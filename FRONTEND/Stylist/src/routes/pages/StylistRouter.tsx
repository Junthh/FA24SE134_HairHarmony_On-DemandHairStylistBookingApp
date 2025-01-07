import { LoadingOverlay } from 'components/Common/Spinner';
import { STYLIST_PATH } from 'configurations/paths/paths';
import AuthProvider from 'pages/Auth/AuthProvider';
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

//LAZY LOADING COMPONENT
const StylistPage = lazy(() => import('pages/Stylist'));
//
const TimeKeeping = lazy(() => import('pages/Stylist/Timekeeping'));
const RegisterWorkSchedule = lazy(() => import('pages/Stylist/RegisterWorkSchedule'));
const RegisterWorkScheduleV2 = lazy(() => import('pages/Stylist/StylistWorkship'));

const ScheduleList = lazy(() => import('pages/Stylist/ScheduleList'));
const Profile = lazy(() => import('pages/Stylist/Profile'));
const Salary = lazy(() => import('pages/Stylist/Salary'));
const ChangePassword = lazy(() => import('pages/Stylist/ChangePassword'));

const Feedback = lazy(() => import('pages/Stylist/Feedback'));
//
export const StylistRouter = {
  path: '/',
  element: (
    <React.Suspense fallback={<LoadingOverlay loading={true} />}>
      <AuthProvider>
        <StylistPage />
      </AuthProvider>
    </React.Suspense>
  ),
  children: [
    {
      path: '/',
      element: <Navigate to={`${STYLIST_PATH.TIMEKEEPING}`} replace />,
    },
    //
    {
      path: `${STYLIST_PATH.PROFILE}/:id`,
      element: (
        <AuthProvider>
          <Profile />
        </AuthProvider>
      ),
    },
    {
      path: `${STYLIST_PATH.SALARY}/:id`,
      element: (
        <AuthProvider>
          <Salary />
        </AuthProvider>
      ),
    },
    {
      path: `${STYLIST_PATH.CHANGE_PASSWORD}/:id`,
      element: (
        <AuthProvider>
          <ChangePassword />
        </AuthProvider>
      ),
    },
    {
      path: `${STYLIST_PATH.TIMEKEEPING}`,
      element: <RegisterWorkSchedule />,
    },
    // {
    //   path: `${STYLIST_PATH.TIMEKEEPING}`,
    //   element: <RegisterWorkScheduleV2 />,
    // },
    {
      path: `${STYLIST_PATH.SCHEDULE_LIST}`,
      element: <ScheduleList />,
    },
    {
      path: `${STYLIST_PATH.FEEDBACK}`,
      element: <Feedback />,
    },
  ],
};
