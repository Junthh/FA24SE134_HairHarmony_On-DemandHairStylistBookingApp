import ErrorPage from 'layouts/ErrorPage';
import Root from 'layouts/Root';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { StaffRouter } from './pages/StaffRouter';
import { AuthRouter } from './pages/AuthRouter';
import { STAFF_PATH } from 'configurations/paths/paths';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={STAFF_PATH.SCHEDULE_LIST} replace />,
  },
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      // ROUTE BUYER
      StaffRouter,
      // ROUTE SELLER
      //
      AuthRouter,
    ],
  },
]);
