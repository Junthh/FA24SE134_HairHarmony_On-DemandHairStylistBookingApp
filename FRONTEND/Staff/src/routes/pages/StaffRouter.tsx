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

// const StaffArticleDetails = lazy(() => import('pages/Staff/Article/ArticleDetails'));
// const StaffOurReaderStories = lazy(() => import('pages/Staff/OurReaderStories'));
// const StaffOurReaderStoriesDetails = lazy(
//   () => import('pages/Staff/OurReaderStories/OurReaderStoriesDetails'),
// );
// const StaffCategory = lazy(() => import('pages/Staff/Category'));
// const StaffCategoryDetails = lazy(() => import('pages/Staff/Category/CategoryDetails'));
// const StaffVideo = lazy(() => import('pages/Staff/Video'));
// const StaffVideoDetails = lazy(() => import('pages/Staff/Video/VideoDetails'));
// const StaffProject = lazy(() => import('pages/Staff/Project'));
// const StaffProjectDetails = lazy(() => import('pages/Staff/Project/ProjectDetails'));
// const StaffWriter = lazy(() => import('pages/Staff/Writer'));
// const StaffWriterDetails = lazy(() => import('pages/Staff/Writer/WriterDetails'));
// const StaffEmail = lazy(() => import('pages/Staff/Email'));
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
      element: <Navigate to={`${STAFF_PATH.SCHEDULE_LIST}`} replace />,
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
  ],
};
