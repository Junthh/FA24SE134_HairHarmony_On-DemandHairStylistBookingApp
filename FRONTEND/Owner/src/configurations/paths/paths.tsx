import { ICONS } from 'configurations/icons';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaidIcon from '@mui/icons-material/Paid';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import CelebrationIcon from '@mui/icons-material/Celebration';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import FeedbackIcon from '@mui/icons-material/Feedback';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PixIcon from '@mui/icons-material/Pix';
import CategoryIcon from '@mui/icons-material/Category';
//
export enum OWNER_PATH {
  EMPLOYEE_WORK_SCHEDULE = '/employee-work-schedule',
  EMPLOYEE_STAFF_LIST = '/employee-staff-list',
  EMPLOYEE_STYLIST_LIST = '/employee-stylist',
  EMPLOYEE_SALARY = '/employee-salary',
  DASHBOARD = '/dashboard',
  CATEGORIES = '/categories',
  SERVICES = '/services',
  COMBO = '/combo',
  PROMOTION = '/promotion',
  ACCOUNT_MANAGEMENT = '/account-management',
  NEWS = '/news',
  APPOINTMENT_MANAGEMENT = '/appointment-management',
  FEEDBACK = '/feed-back',
  TRANSACTION = '/transaction',
}

export const OWNER_PATH_SIDEBAR = [
  // {
  //   title: 'Thống kê doanh thu',
  //   path: OWNER_PATH.DASHBOARD,
  //   icon: <DashboardIcon />,
  // },
  {
    title: 'Danh sách nhân viên',
    path: OWNER_PATH.EMPLOYEE_STAFF_LIST,
    icon: <PeopleAltIcon />,
  },
  {
    title: 'Danh sách stylist',
    path: OWNER_PATH.EMPLOYEE_STYLIST_LIST,
    icon: <PeopleAltIcon />,
  },
  {
    title: 'Lịch nhân viên',
    path: OWNER_PATH.EMPLOYEE_WORK_SCHEDULE,
    icon: <CalendarMonthIcon />,
  },
  {
    title: 'Lương stylist',
    path: OWNER_PATH.EMPLOYEE_SALARY,
    icon: <PaidIcon />,
  },
  {
    title: 'Categories',
    path: OWNER_PATH.CATEGORIES,
    icon: <CategoryIcon />,
  },
  {
    title: 'Dịch vụ',
    path: OWNER_PATH.SERVICES,
    icon: <DesignServicesIcon />,
  },
  {
    title: 'Combo',
    path: OWNER_PATH.COMBO,
    icon: <PixIcon />,
  },
  // {
  //   title: 'Khuyến mãi',
  //   path: OWNER_PATH.PROMOTION,
  //   icon: <CelebrationIcon />,
  // },
  // {
  //   title: 'Quản lý tài khoản',
  //   path: OWNER_PATH.ACCOUNT_MANAGEMENT,
  //   icon: <AccountBoxIcon />,
  // },
  // {
  //   title: 'Tin tức',
  //   path: OWNER_PATH.NEWS,
  //   icon: <NewspaperIcon />,
  // },
  // {
  //   title: 'Đánh giá',
  //   path: OWNER_PATH.FEEDBACK,
  //   icon: <FeedbackIcon />,
  // },
  // {
  //   title: 'Quản lý cuộc hẹn',
  //   path: OWNER_PATH.APPOINTMENT_MANAGEMENT,
  //   icon: <BookOnlineIcon />,
  // },
  // {
  //   title: 'Giao dịch',
  //   path: OWNER_PATH.TRANSACTION,
  //   icon: <CurrencyExchangeIcon />,
  // },
];

export enum AUTH_PATH {
  LOGIN = '/auth/login',
  REGISTER = '/auth/register',
  REFRESH_TOKEN = '/auth/refresh',
}

export enum STATE {
  CREATE = 'create',
  EDIT = 'edit',
  VIEW = 'view',
}
