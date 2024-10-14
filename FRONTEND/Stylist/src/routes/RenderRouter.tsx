import ErrorPage from 'layouts/ErrorPage';
import Root from 'layouts/Root';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { StaffRouter } from './pages/StaffRouter';
import { AuthRouter } from './pages/AuthRouter';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="home" replace />,
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
