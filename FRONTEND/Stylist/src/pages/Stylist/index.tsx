import styled from '@emotion/styled';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SideBar from 'shared/Sidebar';
import * as colors from 'constants/colors';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { selectCredentialInfo, setWorkShip } from 'redux/Reducer';
import SettingBoard from 'pages/common/SettingAccount/SettingBoard';
import { AuthConsumer } from 'pages/Auth/AuthProvider';
import { STAFF_PATH, STYLIST_PATH } from 'configurations/paths/paths';
import { workshipService } from 'services/workship.service';

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

function Staff() {
  const location = useLocation();
  const credentialInfo = useSelector(selectCredentialInfo);
  const [tabName, setTabName] = useState('Danh sách đặt lịch');
  // const [email, setEmail] = useState('admin@gmail.com');
  const [toggle, setToggle] = useState(false);
  const buttonRef = useRef(null);
  const authContext = AuthConsumer();
  const dispatch = useDispatch();

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
    if (name === STYLIST_PATH.SCHEDULE_LIST.split('/')[1]) {
      setTabName('Danh sách đặt lịch');
    } else if (name === STYLIST_PATH.FEEDBACK.split('/')[1]) {
      setTabName('Feedback');
    } else if (name === STYLIST_PATH.TIMEKEEPING.split('/')[1]) {
      setTabName('Đăng kí lịch làm');
    } else if (name === STYLIST_PATH.PROFILE.split('/')[1]) {
      setTabName('Cập nhật thông tin');
    } else if (name === STYLIST_PATH.CHANGE_PASSWORD.split('/')[1]) {
      setTabName('Thay đổi mật khẩu');
    }
  }, [location]);

  const fetchAndSetData = async (service, setter, dispatch) => {
    try {
      const res = await service.list();
      const data = res.data.reduce((acc, item) => {
        acc[item.id] = {
          startTime: item.startTime,
          endTime: item.endTime,
          id: item.id,
        };
        return acc;
      }, {});
      dispatch(setter(data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchAndSetData(workshipService, setWorkShip, dispatch)]);
    };

    fetchData();
  }, [dispatch]);
  return (
    <SideBar>
      <HeaderStyled>
        <Typography variant="h3" fontWeight={700}></Typography>
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
              {credentialInfo?.FullName}
            </Typography>
          </EmailWrapper>
          <ArrowDropDownIcon sx={{ color: '#F2FFE3' }} />
          {toggle && (
            <Box
              sx={{
                position: 'absolute',
                top: 60,
                width: '200px',
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

export default memo(Staff);
