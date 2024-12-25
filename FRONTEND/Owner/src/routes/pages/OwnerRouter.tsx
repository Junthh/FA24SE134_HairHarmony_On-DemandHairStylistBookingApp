import { LoadingOverlay } from 'components/Common/Spinner';
import { OWNER_PATH } from 'configurations/paths/paths';
import AuthProvider from 'pages/Auth/AuthProvider';
import RegisterWorkSchedule from 'pages/Owner/RegisterWorkSchedule';
import StaffSalary from 'pages/Owner/StaffSalary';
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

//LAZY LOADING COMPONENT
const OwnerPage = lazy(() => import('pages/Owner'));
// const EmployeeWorkSchedulePage = lazy(() => import('pages/Owner/EmployeeWorkSchedule'));
const AccountManagement = lazy(() => import('pages/Owner/AccountManagement'));
const AppointmentManagement = lazy(() => import('pages/Owner/AppointmentManagement'));
const Dashboard = lazy(() => import('pages/Owner/Dashboard'));
const ScheduleList = lazy(() => import('pages/Owner/ScheduleList'));
const EmployeeStaffList = lazy(() => import('pages/Owner/EmployeeStaffList'));
const EmployeeStylistList = lazy(() => import('pages/Owner/EmployeeStylistList'));
const EmployeeSalary = lazy(() => import('pages/Owner/EmployeeSalary'));
const EmployeeWorkSchedulePage = lazy(() => import('pages/Owner/SalaryStylistV2'));

const Feedback = lazy(() => import('pages/Owner/Feedback'));
const News = lazy(() => import('pages/Owner/News'));
const PromotionList = lazy(() => import('pages/Owner/PromotionList'));
const ServicesList = lazy(() => import('pages/Owner/ServicesList'));
const TransactionList = lazy(() => import('pages/Owner/TransactionList'));
const ComboList = lazy(() => import('pages/Owner/ComboList'));
const CategoriesList = lazy(() => import('pages/Owner/CategoriesList'));
const CustomerList = lazy(() => import('pages/Owner/CustomerList'));
const KpiList = lazy(() => import('pages/Owner/KpiList'));

//
//
export const OwnerRouter = {
  path: '/',
  element: (
    <React.Suspense fallback={<LoadingOverlay loading={true} />}>
      <AuthProvider>
        <OwnerPage />
      </AuthProvider>
    </React.Suspense>
  ),
  children: [
    {
      path: '/',
      element: <Navigate to={`${OWNER_PATH.DASHBOARD}`} replace />,
    },

    {
      path: `${OWNER_PATH.DASHBOARD}`,
      element: <Dashboard />,
    },
    {
      path: `${OWNER_PATH.SCHEDULE_LIST}`,
      element: <ScheduleList />,
    },
    {
      path: `${OWNER_PATH.EMPLOYEE_STAFF_LIST}`,
      element: <EmployeeStaffList />,
    },
    {
      path: `${OWNER_PATH.EMPLOYEE_STYLIST_LIST}`,
      element: <EmployeeStylistList />,
    },
    {
      path: `${OWNER_PATH.EMPLOYEE_WORK_SCHEDULE}`,
      element: <EmployeeWorkSchedulePage />,
    },
    {
      path: `${OWNER_PATH.EMPLOYEE_SALARY}`,
      element: <EmployeeSalary />,
    },
    {
      path: `${OWNER_PATH.CATEGORIES}`,
      element: <CategoriesList />,
    },
    {
      path: `${OWNER_PATH.SERVICES}`,
      element: <ServicesList />,
    },
    {
      path: `${OWNER_PATH.COMBO}`,
      element: <ComboList />,
    },
    {
      path: `${OWNER_PATH.PROMOTION}`,
      element: <PromotionList />,
    },
    {
      path: `${OWNER_PATH.ACCOUNT_MANAGEMENT}`,
      element: <AccountManagement />,
    },
    {
      path: `${OWNER_PATH.NEWS}`,
      element: <News />,
    },
    {
      path: `${OWNER_PATH.FEEDBACK}`,
      element: <Feedback />,
    },
    {
      path: `${OWNER_PATH.APPOINTMENT_MANAGEMENT}`,
      element: <AppointmentManagement />,
    },
    {
      path: `${OWNER_PATH.TRANSACTION}`,
      element: <TransactionList />,
    },
    {
      path: `${OWNER_PATH.CUSTOMER_LIST}`,
      element: <CustomerList />,
    },
    {
      path: `${OWNER_PATH.STAFF_SALARY}`,
      element: <StaffSalary />,
    },
    {
      path: `${OWNER_PATH.KPI_LIST}`,
      element: <KpiList />,
    },
    {
      path: `${OWNER_PATH.TIMEKEEPING}`,
      element: <RegisterWorkSchedule />,
    },
  ],
};
