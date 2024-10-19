import ErrorPage from 'layouts/ErrorPage';
import Root from 'layouts/Root';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { OwnerRouter } from './pages/OwnerRouter';
import { AuthRouter } from './pages/AuthRouter';
import { OWNER_PATH } from 'configurations/paths/paths';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={OWNER_PATH.EMPLOYEE_WORK_SCHEDULE} replace />,
  },
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      // ROUTE BUYER
      OwnerRouter,
      // ROUTE SELLER
      //
      AuthRouter,
    ],
  },
]);
