import { LoadingOverlay } from 'components/Common/Spinner';
import { AUTH_PATH } from 'configurations/paths/paths';
import ErrorPage from 'layouts/ErrorPage';
import AuthProvider from 'pages/Auth/AuthProvider';
import React, { lazy } from 'react';
import { Outlet } from 'react-router';
import { Navigate } from 'react-router-dom';
import styled from '@emotion/styled';
import * as colors from 'constants/colors';

//LAZY LOADING COMPONENT
const LoginPage = lazy(() => import('pages/Auth/Login'));
const RegisterPage = lazy(() => import('pages/Auth/Register'));

const AuthContainer = styled(`div`)({
  height: '100vh',
  background: colors.dark,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const AuthRouter = {
  path: '/auth',
  element: (
    <React.Suspense fallback={<LoadingOverlay loading={true} />}>
      <AuthProvider>
        <AuthContainer>
          <Outlet />
        </AuthContainer>
      </AuthProvider>
    </React.Suspense>
  ),
  errorElement: <ErrorPage />,
  children: [
    {
      path: '/auth',
      element: <Navigate to={AUTH_PATH.LOGIN} replace />,
    },
    {
      path: `${AUTH_PATH.LOGIN}`,
      element: <LoginPage />,
    },
    {
      path: `${AUTH_PATH.REGISTER}`,
      element: <RegisterPage />,
    },
  ],
};
