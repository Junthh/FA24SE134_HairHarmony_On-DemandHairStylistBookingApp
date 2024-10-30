import { LoadingOverlay } from 'components/Common/Spinner';
import { STYLIST_PATH } from 'configurations/paths/paths';
import AuthProvider from 'pages/Auth/AuthProvider';
import ScheduleList from 'pages/Stylist/ScheduleList';
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

//LAZY LOADING COMPONENT
const StylistPage = lazy(() => import('pages/Stylist'));
//
const TimeKeeping = lazy(() => import('pages/Stylist/Timekeeping'));
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
      path: `${STYLIST_PATH.TIMEKEEPING}`,
      element: <></>,
    },
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
