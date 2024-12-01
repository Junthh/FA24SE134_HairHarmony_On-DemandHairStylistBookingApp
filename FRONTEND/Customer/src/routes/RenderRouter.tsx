import ErrorPage from 'layouts/ErrorPage';
import Root from 'layouts/Root';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { UsersRouter } from './pages/UsersRouter';
import { AuthRouter } from './pages/AuthRouter';
import { PreviousPathProvider } from 'hooks/usePreviousPath';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="home" replace />,
  },
  {
    path: '/',
    element: (
      <PreviousPathProvider>
        <Root />
      </PreviousPathProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      // ROUTE SELLER
      UsersRouter,
      //
      AuthRouter,
    ],
  },
]);
