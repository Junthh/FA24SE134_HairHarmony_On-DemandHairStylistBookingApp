import { Box, Link, Typography, useMediaQuery } from '@mui/material';
import { ICONS } from 'configurations/icons';
import { AUTH_PATH, USER_PATH } from 'configurations/paths/paths';
import * as colors from 'constants/colors';
import { useDimensions } from 'hooks/useDimensions';
import { CategoryModel } from 'models/Category.model';
import { ResponseSuccessApi } from 'models/Response.model';
import { ButtonPrimary } from 'pages/common/style/Button';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading } from 'redux/Reducer';
import { postsService } from 'services/posts.service';
import { theme } from 'theme';
import { NavbarStyled } from './styles';

interface NavBarUserProps {
  onSidebarChange?: any;
}

export default function NavBarUser({ onSidebarChange }: NavBarUserProps) {
  const navigate = useNavigate();
  // popover
  const [typePopover, setTypePopover] = useState<{
    type: string;
    open: boolean;
  }>();

  // get categories options

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
        <Link
          onClick={() => navigate(`/${USER_PATH.HOME}`)}
          underline="none"
          sx={{ cursor: 'pointer' }}
        >
          <Typography variant="body2" fontWeight={700}>
            Trang chủ
          </Typography>
          <hr />
        </Link>
        <Link
          onClick={() => navigate(`${USER_PATH.ABOUTUS}`)}
          underline="none"
          sx={{ cursor: 'pointer' }}
        >
          <Typography variant="body2" fontWeight={700}>
            Về HairHamony
          </Typography>
        </Link>
        <Link
          // onClick={() => navigate(`/${USER_PATH.ECO_STORIES}`)}
          sx={{ cursor: 'pointer' }}
          underline="none"
        >
          <Typography variant="body2" fontWeight={700}>
            Đội Ngũ Chúng Tôi
          </Typography>
        </Link>
        <Link
          // onClick={() => navigate(`/${USER_PATH.VOLUNTEERS}`)}
          underline="none"
          sx={{ cursor: 'pointer' }}
        >
          <Typography variant="body2" fontWeight={700}>
            Liên hệ
          </Typography>
        </Link>
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
