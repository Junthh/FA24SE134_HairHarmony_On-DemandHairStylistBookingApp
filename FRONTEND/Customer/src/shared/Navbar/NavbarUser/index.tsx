import { Box, Link, Popover, Typography } from '@mui/material';
import { AUTH_PATH, USER_PATH } from 'configurations/paths/paths';
import * as colors from 'constants/colors';
import { ButtonPrimary } from 'pages/common/style/Button';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavbarStyled } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectCredentialInfo, setCredentialInfo } from 'redux/Reducer';
import PopoverContent from 'pages/common/PopoverContent';
import { AuthConsumer } from 'pages/Auth/AuthProvider';
import { CredentialInfo, Token } from 'models/CredentialInfo.model';
import { LOCAL_STORAGE_KEYS } from 'configurations/constants/globalConstants';
import jwtDecode from 'jwt-decode';
import { authService } from 'services/auth.service';

interface NavBarUserProps {
  onSidebarChange?: any;
}

export default function NavBarUser({ onSidebarChange }: NavBarUserProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const credentialInfo = useSelector(selectCredentialInfo);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [token, setToken] = useState<Token>(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AccessToken);
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.RefreshToken);

    return (accessToken && refreshToken && { token: accessToken, refreshToken }) || null;
  });
  // popover
  const [typePopover, setTypePopover] = useState<{
    type: string;
    open: boolean;
  }>();
  const handleClose = () => {
    setAnchorEl(null);
  };
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
    // {
    //   link: '',
    //   name: 'Liên hệ',
    // },
  ]);
  useEffect(() => {
    if (token) {
      const { exp, email, role, id } = jwtDecode(token.token) as any;

      if (Date.now() >= exp * 1000) {
        if (!token.refreshToken) {
          localStorage.clear();
          navigate(AUTH_PATH.LOGIN);
          dispatch(setCredentialInfo<CredentialInfo>({}));
          return;
        }
        authService
          .refreshAccessToken({ refreshToken: token.refreshToken })
          .then((res) => {
            if (res) {
              localStorage.setItem(LOCAL_STORAGE_KEYS.AccessToken, res.data.accessToken);
              localStorage.setItem(LOCAL_STORAGE_KEYS.RefreshToken, res.data.refreshToken);
              setToken({
                token: res.data.accessToken,
                refreshToken: res.data.refreshToken,
              });
            }
          })
          .catch((error) => {
            localStorage.clear();
            navigate(AUTH_PATH.LOGIN);
            dispatch(setCredentialInfo<CredentialInfo>({}));
          });
      } else {
        const info: CredentialInfo = {
          accessToken: token.token,
          refreshToken: token.refreshToken,
          ...jwtDecode(token.token),
        };
        dispatch(setCredentialInfo<CredentialInfo>(info));
      }
    } else {
      localStorage.clear();
      dispatch(setCredentialInfo<CredentialInfo>({}));
    }
  }, [token?.token, token?.refreshToken]);
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
        {credentialInfo?.PhoneNumber ? (
          <>
            <ButtonPrimary
              severity="primary"
              padding={'4px 12px'}
              borderradius={'8px'}
              fontWeight={400}
              border={`1px solid ${colors.white}`}
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
            >
              {'Wellcome ' + credentialInfo.FullName}
            </ButtonPrimary>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <PopoverContent>
                <Box
                  padding={'10px 20px'}
                  className="content"
                  onClick={() => {
                    handleClose();
                    navigate(`${USER_PATH.PROFILE}/${credentialInfo.Id}`);
                  }}
                >
                  <Typography variant="body2" fontWeight={500}>
                    Hồ sơ người dùng
                  </Typography>
                </Box>
                <Box
                  padding={'10px 20px'}
                  className="content"
                  onClick={() => {
                    handleClose();
                    navigate(USER_PATH.APPOINTMENT);
                  }}
                >
                  <Typography variant="body2" fontWeight={500}>
                    Lịch sử đặt lịch
                  </Typography>
                </Box>
                <Box
                  padding={'10px 20px'}
                  className="content"
                  onClick={() => {
                    localStorage.clear();
                    navigate(AUTH_PATH.LOGIN);
                    dispatch(setCredentialInfo<CredentialInfo>({}));
                  }}
                >
                  <Typography variant="body2" fontWeight={500}>
                    Đăng xuất
                  </Typography>
                </Box>
              </PopoverContent>
            </Popover>
          </>
        ) : (
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
        )}
      </Box>
    </NavbarStyled>
  );
}
