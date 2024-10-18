import { LoadingOverlay } from 'components/Common/Spinner';
import { STAFF_PATH, STATE } from 'configurations/paths/paths';
import AuthProvider from 'pages/Auth/AuthProvider';
import ScheduleList from 'pages/Owner/ScheduleList';
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

//LAZY LOADING COMPONENT
const StaffPage = lazy(() => import('pages/Owner'));
//
//
export const OwnerRouter = {
  path: '/',
  element: (
    <React.Suspense fallback={<LoadingOverlay loading={true} />}>
      {/* <AuthProvider> */}
      <StaffPage />
      {/* </AuthProvider> */}
    </React.Suspense>
  ),
  children: [
    {
      path: '/',
      element: <Navigate to={`${STAFF_PATH.SCHEDULE_LIST}`} replace />,
    },
    //
    // {
    //   path: `${STAFF_PATH.SCHEDULE_LIST}`,
    //   element: <ScheduleList />,
    // },
    // {
    //   path: `${STAFF_PATH.HISTORY}`,
    //   element: <BookingHistory />,
    // },
    // {
    //   path: `${STAFF_PATH.STYLIST_STATUS}`,
    //   element: <StylistStatus />,
    // },
  ],
};
