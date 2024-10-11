import ErrorPage from 'layouts/ErrorPage';
import Root from 'layouts/Root';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AdminRouter } from './pages/AdminRouter';
import { UsersRouter } from './pages/UsersRouter';
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
      AdminRouter,
      // ROUTE SELLER
      UsersRouter,
      //

      AuthRouter,
    ],
  },
]);
