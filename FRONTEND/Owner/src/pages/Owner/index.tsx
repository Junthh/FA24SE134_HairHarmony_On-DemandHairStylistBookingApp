import styled from '@emotion/styled';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import { OWNER_PATH_SIDEBAR } from 'configurations/paths/paths';
import * as colors from 'constants/colors';
import { AuthConsumer } from 'pages/Auth/AuthProvider';
import SettingBoard from 'pages/common/SettingAccount/SettingBoard';
import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { selectCredentialInfo, setCategorys, setRoles } from 'redux/Reducer';
import { categorysServices } from 'services/categorys.service';
import { rolesServices } from 'services/roles.service';
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
  paddingLeft: '20px',
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
  const dispatch = useDispatch();
  const [tabName, setTabName] = useState('');
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

  const fetchAndSetData = async (service, setter, dispatch) => {
    try {
      const res = await service.list();
      const data = res.data.reduce((acc, item) => {
        acc[item.id] = {
          name: item.name,
          createdDate: item.createdDate,
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
      await Promise.all([
        fetchAndSetData(rolesServices, setRoles, dispatch),
        fetchAndSetData(categorysServices, setCategorys, dispatch),
      ]);
    };

    fetchData();
  }, [dispatch]);

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
        <Box className="body-content">
          <Outlet />
        </Box>
      </MainContainerStyled>
    </SideBar>
  );
}

export default memo(Owner);
