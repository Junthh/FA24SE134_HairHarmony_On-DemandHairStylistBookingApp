import styled from '@emotion/styled';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import { OWNER_PATH_SIDEBAR } from 'configurations/paths/paths';
import * as colors from 'constants/colors';
import { AuthConsumer } from 'pages/Auth/AuthProvider';
import SettingBoard from 'pages/common/SettingAccount/SettingBoard';
import { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { selectCredentialInfo } from 'redux/Reducer';
import SideBar from 'shared/Sidebar';

const HeaderStyled = styled(Box)({
  height: 80,
  background: '#2D3748',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 32px',
});

const MainContainerStyled = styled(Box)({
  position: 'relative',
  zIndex: 1,
  background: colors.white,
  height: '100%',
  overflow: 'scroll',
  maxHeight: 'calc(100% - 80px)',
});

const InfoAccountStyled = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '0px 16px',
  padding: '6px 12px',
  borderRadius: 8,
  // background: colors.primary1,
  '& .MuiTypography-body2': {
    marginRight: '10px',
  },
  '&:hover': {
    cursor: 'pointer',
  },
});

const EmailWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  maxWidth: '200px',
});

function Owner() {
  const location = useLocation();
  const credentialInfo = useSelector(selectCredentialInfo);
  const [tabName, setTabName] = useState('Danh sách đặt lịch');
  // const [email, setEmail] = useState('admin@gmail.com');
  const [toggle, setToggle] = useState(false);
  const buttonRef = useRef(null);
  const authContext = AuthConsumer();

  const handleLogout = () => {
    authContext.logout();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setToggle(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [buttonRef]);

  useEffect(() => {
    const arrUrl = location.pathname.split('/');
    const name = arrUrl[1] ? arrUrl[1] : '';
    OWNER_PATH_SIDEBAR.forEach((item) => {
      if (name === item.path.split('/')[1]) {
        setTabName(item.title);
      }
    });
  }, [location]);

  useEffect(() => {
    if (credentialInfo?.email) {
      // setEmail(credentialInfo.email);
    }
  }, [credentialInfo]);

  return (
    <SideBar>
      <HeaderStyled>
        <Typography variant="h3" fontWeight={700}></Typography>
        <InfoAccountStyled onClick={() => setToggle(!toggle)} ref={buttonRef}>
          <Avatar src="" />
          {/* <EmailWrapper>
            <Typography
              variant="body2"
              fontWeight={700}
              color={'#F2FFE3'}
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {email}
            </Typography>
          </EmailWrapper> */}
          <ArrowDropDownIcon sx={{ color: '#F2FFE3' }} />
          {toggle && (
            <Box
              sx={{
                position: 'absolute',
                top: 60,
                width: '100%',
                zIndex: 200,
                right: 0,
                boxShadow: colors.boxShadowCard,
              }}
            >
              <SettingBoard onLogout={handleLogout} />
            </Box>
          )}
        </InfoAccountStyled>
      </HeaderStyled>
      <MainContainerStyled>
        <Typography paddingTop={3} paddingBottom={3} paddingLeft={5} variant="h4" fontWeight={400}>
          {tabName}
        </Typography>
        <Divider variant="fullWidth"></Divider>
        <Outlet />
      </MainContainerStyled>
    </SideBar>
  );
}

export default memo(Owner);
