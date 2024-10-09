import Interceptor from 'configurations/axios/interceptor';
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Root() {
  Interceptor();
  return <Outlet />;
}
