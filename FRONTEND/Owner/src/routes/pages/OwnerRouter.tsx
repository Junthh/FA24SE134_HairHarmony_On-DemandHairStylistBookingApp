import { LoadingOverlay } from 'components/Common/Spinner';
import { OWNER_PATH, STAFF_PATH, STATE } from 'configurations/paths/paths';
import AuthProvider from 'pages/Auth/AuthProvider';
import ScheduleList from 'pages/Owner/ScheduleList';
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

//LAZY LOADING COMPONENT
const OwnerPage = lazy(() => import('pages/Owner'));
const EmployeeWorkSchedulePage = lazy(() => import('pages/Owner/EmployeeWorkSchedule'));

//
//
export const OwnerRouter = {
  path: '/',
  element: (
    <React.Suspense fallback={<LoadingOverlay loading={true} />}>
      {/* <AuthProvider> */}
      <OwnerPage />
      {/* </AuthProvider> */}
    </React.Suspense>
  ),
  children: [
    {
      path: '/',
      element: <Navigate to={`${OWNER_PATH.EMPLOYEE_WORK_SCHEDULE}`} replace />,
    },

    {
      path: `${OWNER_PATH.EMPLOYEE_WORK_SCHEDULE}`,
      element: <EmployeeWorkSchedulePage />,
    },
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
