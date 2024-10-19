import ErrorPage from 'layouts/ErrorPage';
import Root from 'layouts/Root';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { StylistRouter } from './pages/StylistRouter';
import { AuthRouter } from './pages/AuthRouter';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="auth/login" replace />,
  },
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      // ROUTE BUYER
      StylistRouter,
      // ROUTE SELLER
      //
      AuthRouter,
    ],
  },
]);
