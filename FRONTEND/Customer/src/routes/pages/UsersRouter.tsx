import ErrorPage from 'layouts/ErrorPage';
import React, { lazy } from 'react';
import { LoadingOverlay } from 'components/Common/Spinner';
import { USER_PATH } from 'configurations/paths/paths';
import { Navigate } from 'react-router-dom';

//LAZY LOADING COMPONENT
const UsersPage = lazy(() => import('pages/Users'));
//
const UserHome = lazy(() => import('pages/Users/Home'));
const StylistDetails = lazy(() => import('pages/Users/StylistDetails'));

// const UserSearch = lazy(() => import('pages/Users/SearchPage'));
// const UserAboutUs = lazy(() => import('pages/Users/AboutUs'));
// const UserVolunteers = lazy(() => import('pages/Users/Volunteers'));
// const UserPartnerWithUs = lazy(() => import('pages/Users/PartnerWithUs'));
// const UserEcoFims = lazy(() => import('pages/Users/EcoFilms'));
// const UserEcoFimDetails = lazy(() => import('pages/Users/EcoFilms/EcoFilmDetails'));
// const UserOurReaderStories = lazy(() => import('pages/Users/OurReaderStories'));
// const UserEcoStories = lazy(() => import('pages/Users/EcoStories'));
// const UserArticleDetails = lazy(() => import('pages/Users/ArticleDetails'));

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
    // {
    //   path: USER_PATH.SEARCH,
    //   element: <UserSearch />,
    // },
    // {
    //   path: USER_PATH.ABOUTUS,
    //   element: <UserAboutUs />,
    // },
    // {
    //   path: USER_PATH.VOLUNTEERS,
    //   element: <UserVolunteers />,
    // },
    // {
    //   path: USER_PATH.PARTNER_WITH_US,
    //   element: <UserPartnerWithUs />,
    // },
    // {
    //   path: USER_PATH.ECOFILMS,
    //   element: <UserEcoFims />,
    // },
    // {
    //   path: `${USER_PATH.ECOFILMS}/:id`,
    //   element: <UserEcoFimDetails />,
    // },
    // {
    //   path: USER_PATH.OUR_READER_STORIES,
    //   element: <UserOurReaderStories />,
    // },
    // {
    //   path: `${USER_PATH.OUR_READER_STORIES}/:id`,
    //   element: <UserArticleDetails />,
    // },
    // {
    //   path: USER_PATH.ECO_STORIES,
    //   element: <UserEcoStories />,
    // },
    // {
    //   path: `${USER_PATH.ECO_STORIES}/:id`,
    //   element: <UserArticleDetails />,
    // },
  ],
};
