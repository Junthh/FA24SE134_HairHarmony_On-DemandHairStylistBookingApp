import { LoadingOverlay } from 'components/Common/Spinner';
import { ADMIN_PATH, STATE } from 'configurations/paths/paths';
import AuthProvider from 'pages/Auth/AuthProvider';
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

//LAZY LOADING COMPONENT
const AdminPage = lazy(() => import('pages/Admin'));
//
const AdminArticle = lazy(() => import('pages/Admin/Article'));
const AdminArticleDetails = lazy(() => import('pages/Admin/Article/ArticleDetails'));
const AdminOurReaderStories = lazy(() => import('pages/Admin/OurReaderStories'));
const AdminOurReaderStoriesDetails = lazy(() => import('pages/Admin/OurReaderStories/OurReaderStoriesDetails'));
const AdminCategory = lazy(() => import('pages/Admin/Category'));
const AdminCategoryDetails = lazy(() => import('pages/Admin/Category/CategoryDetails'));
const AdminVideo = lazy(() => import('pages/Admin/Video'));
const AdminVideoDetails = lazy(() => import('pages/Admin/Video/VideoDetails'));
const AdminProject = lazy(() => import('pages/Admin/Project'));
const AdminProjectDetails = lazy(() => import('pages/Admin/Project/ProjectDetails'));
const AdminWriter = lazy(() => import('pages/Admin/Writer'));
const AdminWriterDetails = lazy(() => import('pages/Admin/Writer/WriterDetails'));
const AdminEmail = lazy(() => import("pages/Admin/Email"))
export const AdminRouter = {
  path: ADMIN_PATH.ADMIN,
  element: (
    <React.Suspense fallback={<LoadingOverlay loading={true} />}>
      <AuthProvider>
        <AdminPage />
      </AuthProvider>
    </React.Suspense>
  ),
  children: [
    {
      path: ADMIN_PATH.ADMIN,
      element: <Navigate to={`${ADMIN_PATH.ADMIN}/${ADMIN_PATH.ARTICLE}`} replace />,
    },
    // ARTICLE
    {
      path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.ARTICLE}`,
      element: <AdminArticle />,
    },
    {
      path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.ARTICLE}/${STATE.CREATE}`,
      element: <AdminArticleDetails />,
    },
    {
      path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.ARTICLE}/:id`,
      element: <AdminArticleDetails />,
    },
    // OUR READER STORIES
    {
      path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.OUR_READER_STORIES}`,
      element: <AdminOurReaderStories />,
    },
    {
      path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.OUR_READER_STORIES}/${STATE.CREATE}`,
      element: <AdminOurReaderStoriesDetails />,
    },
    {
      path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.OUR_READER_STORIES}/:id`,
      element: <AdminOurReaderStoriesDetails />,
    },
    // CATEGORY
    {
      path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.CATEGORY}`,
      element: <AdminCategory />,
    },
    {
      path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.CATEGORY}/${STATE.CREATE}`,
      element: <AdminCategoryDetails />,
    },
    {
      path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.CATEGORY}/:id`,
      element: <AdminCategoryDetails />,
    },
    //VIDEO
    {
      path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.VIDEO}`,
      element: <AdminVideo />,
    },
    {
      path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.VIDEO}/${STATE.CREATE}`,
      element: <AdminVideoDetails />,
    },
    {
      path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.VIDEO}/:id`,
      element: <AdminVideoDetails />,
    },
    {
      path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.PROJECT}`,
      element: <AdminProject />,
    },
    // PROJECT
    {
      path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.PROJECT}/${STATE.CREATE}`,
      element: <AdminProjectDetails />,
    },
    {
      path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.PROJECT}/:id`,
      element: <AdminProjectDetails />,
    },
    {
      path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.WRITER}`,
      element: <AdminWriter />,
    },
    {
      path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.WRITER}/${STATE.CREATE}`,
      element: <AdminWriterDetails />,
    },
    {
      path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.WRITER}/:id`,
      element: <AdminWriterDetails />,
    },
    {
      path: `${ADMIN_PATH.ADMIN}/${ADMIN_PATH.EMAIL}`,
      element: <AdminEmail />,
    },
  ],
};
