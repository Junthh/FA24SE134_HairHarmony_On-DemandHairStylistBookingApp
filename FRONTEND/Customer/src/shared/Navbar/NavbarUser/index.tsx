import { Box, Link, Typography } from '@mui/material';
import { AUTH_PATH, USER_PATH } from 'configurations/paths/paths';
import * as colors from 'constants/colors';
import { ButtonPrimary } from 'pages/common/style/Button';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavbarStyled } from './styles';

interface NavBarUserProps {
  onSidebarChange?: any;
}

export default function NavBarUser({ onSidebarChange }: NavBarUserProps) {
  const navigate = useNavigate();
  const location = useLocation();
  // popover
  const [typePopover, setTypePopover] = useState<{
    type: string;
    open: boolean;
  }>();
  const [navOptions] = useState([
    {
      link: USER_PATH.HOME,
      name: 'Trang chủ',
    },
    {
      link: USER_PATH.BOOKING,
      name: 'Đặt lịch',
    },
    {
      link: USER_PATH.ABOUTUS,
      name: 'Về HairHamony',
    },
    {
      link: USER_PATH.OUR_TEAMMATES,
      name: 'Đội Ngũ Chúng Tôi',
    },
    {
      link: '',
      name: 'Liên hệ',
    },
  ]);
  // get categories options
  const renderNav = useMemo(() => {
    const arrUrl = location.pathname.split('/');
    const name = arrUrl[1] ? arrUrl[1] : '';
    return navOptions.map((item) => {
      if (name === item.link.split('/')[1]) {
        return (
          <Link
            onClick={() => navigate(`${item.link}`)}
            underline="none"
            sx={{ cursor: 'pointer' }}
          >
            <Typography variant="body2" fontWeight={700}>
              {item.name}
            </Typography>
            <hr />
          </Link>
        );
      }
      return (
        <Link onClick={() => navigate(`${item.link}`)} underline="none" sx={{ cursor: 'pointer' }}>
          <Typography variant="body2" fontWeight={700}>
            {item.name}
          </Typography>
        </Link>
      );
    });
  }, [location]);

  return (
    <NavbarStyled typePopover={typePopover}>
      <Box className="nav-left">
        <h1
          className="mea-culpa-regular"
          onClick={() => navigate(`${USER_PATH.HOME}`)}
          style={{ cursor: 'pointer' }}
        >
          Hair Hamorny
        </h1>
      </Box>
      <Box className="nav-right">
        {renderNav}
        <ButtonPrimary
          severity="primary"
          padding={'4px 12px'}
          borderradius={'8px'}
          fontWeight={400}
          border={`1px solid ${colors.white}`}
          onClick={() => navigate(`${AUTH_PATH.LOGIN}`)}
        >
          Đăng nhập
        </ButtonPrimary>
      </Box>
    </NavbarStyled>
  );
}
