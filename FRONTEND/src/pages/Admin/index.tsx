import styled from '@emotion/styled';
import { Avatar, Box, Typography } from '@mui/material';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SideBar from 'shared/Sidebar';
import * as colors from 'constants/colors';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useSelector } from 'react-redux';
import { selectCredentialInfo } from 'redux/Reducer';
import SettingBoard from 'pages/common/SettingAccount/SettingBoard';
import { AuthConsumer } from 'pages/Auth/AuthProvider';

const HeaderStyled = styled(Box)({
  height: 80,
  background: colors.white,
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
});

const InfoAccountStyled = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '0px 16px',
  padding: '6px 12px',
  borderRadius: 8,
  background: colors.primary1,
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

function Admin() {
  const location = useLocation();
  const credentialInfo = useSelector(selectCredentialInfo);
  const [tabName, setTabName] = useState('Administrator');
  const [email, setEmail] = useState('admin@gmail.com');
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
    const name = arrUrl[2] ? arrUrl[2].toUpperCase() : '';
    setTabName(name);
  }, [location]);

  useEffect(() => {
    if (credentialInfo?.email) {
      setEmail(credentialInfo.email);
    }
  }, [credentialInfo]);

  return (
    <SideBar>
      <HeaderStyled>
        <Typography variant="h3" fontWeight={700}>
          {tabName}
        </Typography>
        <InfoAccountStyled onClick={() => setToggle(!toggle)} ref={buttonRef}>
          <Avatar src="" />
          <EmailWrapper>
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
          </EmailWrapper>
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
      <Box height={8}></Box>
      <MainContainerStyled>
        <Outlet />
      </MainContainerStyled>
    </SideBar>
  );
}

export default memo(Admin);
