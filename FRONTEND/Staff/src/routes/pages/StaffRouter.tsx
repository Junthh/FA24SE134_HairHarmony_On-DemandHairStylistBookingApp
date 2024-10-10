import { LoadingOverlay } from 'components/Common/Spinner';
import { STAFF_PATH, STATE } from 'configurations/paths/paths';
import AuthProvider from 'pages/Auth/AuthProvider';
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

//LAZY LOADING COMPONENT
const StaffPage = lazy(() => import('pages/Staff'));
//
// const AdminArticle = lazy(() => import('pages/Staff/Article'));
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
  path: STAFF_PATH.SCHEDULE_LIST,
  element: (
    <React.Suspense fallback={<LoadingOverlay loading={true} />}>
      {/* <AuthProvider> */}
      <StaffPage />
      {/* </AuthProvider> */}
    </React.Suspense>
  ),
  children: [
    // {
    //   path: ADMIN_PATH.ADMIN,
    //   element: <Navigate to={`${ADMIN_PATH.ADMIN}/${ADMIN_PATH.ARTICLE}`} replace />,
    // },
    // // ARTICLE
    // {
    //   path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.ARTICLE}`,
    //   element: <AdminArticle />,
    // },
    // {
    //   path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.ARTICLE}/${STATE.CREATE}`,
    //   element: <AdminArticleDetails />,
    // },
    // {
    //   path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.ARTICLE}/:id`,
    //   element: <AdminArticleDetails />,
    // },
    // // OUR READER STORIES
    // {
    //   path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.OUR_READER_STORIES}`,
    //   element: <AdminOurReaderStories />,
    // },
    // {
    //   path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.OUR_READER_STORIES}/${STATE.CREATE}`,
    //   element: <AdminOurReaderStoriesDetails />,
    // },
    // {
    //   path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.OUR_READER_STORIES}/:id`,
    //   element: <AdminOurReaderStoriesDetails />,
    // },
    // // CATEGORY
    // {
    //   path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.CATEGORY}`,
    //   element: <AdminCategory />,
    // },
    // {
    //   path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.CATEGORY}/${STATE.CREATE}`,
    //   element: <AdminCategoryDetails />,
    // },
    // {
    //   path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.CATEGORY}/:id`,
    //   element: <AdminCategoryDetails />,
    // },
    // //VIDEO
    // {
    //   path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.VIDEO}`,
    //   element: <AdminVideo />,
    // },
    // {
    //   path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.VIDEO}/${STATE.CREATE}`,
    //   element: <AdminVideoDetails />,
    // },
    // {
    //   path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.VIDEO}/:id`,
    //   element: <AdminVideoDetails />,
    // },
    // {
    //   path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.PROJECT}`,
    //   element: <AdminProject />,
    // },
    // // PROJECT
    // {
    //   path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.PROJECT}/${STATE.CREATE}`,
    //   element: <AdminProjectDetails />,
    // },
    // {
    //   path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.PROJECT}/:id`,
    //   element: <AdminProjectDetails />,
    // },
    // {
    //   path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.WRITER}`,
    //   element: <AdminWriter />,
    // },
    // {
    //   path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.WRITER}/${STATE.CREATE}`,
    //   element: <AdminWriterDetails />,
    // },
    // {
    //   path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.WRITER}/:id`,
    //   element: <AdminWriterDetails />,
    // },
    // {
    //   path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.EMAIL}`,
    //   element: <AdminEmail />,
    // },
  ],
};
