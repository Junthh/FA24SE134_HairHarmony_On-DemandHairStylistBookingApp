import styled from '@emotion/styled';
import { Box } from '@mui/system';
import * as colors from 'constants/colors';
export const SidebarStyled = styled(Box)<{ isopen: number }>(({ isopen }) => ({
  display: 'flex',
  '& main': {
    // padding: '10px',
    width: isopen === 1 ? 'calc(100% - 240px)' : 'calc(100% - 50px)',
    background: colors.darkBlue50,
    overflow: 'hidden',
    height: '100vh',
  },
  '& .sidebar': {
    background: colors.white,
    color: 'white',
    height: '100vh',
    overflowY: 'auto',
    '& .top_section': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '17.5px 10px',
      background: '#2D3748',
      '& .logo': {
        width: '80%',
        textAlign: 'center',
        '& img': {
          width: 58,
          height: 58,
          borderRadius: 8,
        },
      },
      '& .bars': {
        width: '30px',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    '& .routes': {
      marginTop: '15px',
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      '& .link': {
        display: 'flex',
        alignItems: 'center',
        color: '#285D9A',
        gap: '10px',
        padding: isopen === 1 ? '16px 28px' : '5px 7px',
        borderRight: '4px solid transparent',
        transition: '0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045)',
        textDecoration: 'none',
        '&:hover': {
          // borderRight: '4px solid white',
          // background: colors.primary2,
          transition: '0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045)',
        },
        '& .link_text': {
          whiteSpace: 'nowrap',
          fontSize: '16px',
          lineHeight: 1.8,
          fontWeight: 700,
          color: '#285D9A',
        },
      },
      '& .active': {
        // borderRight: '4px solid white',
        // background: colors.primary2,
        // border: '1px solid #2D3748',
      },
    },
  },
}));

export const MenuSidebarStyled = styled(Box)({
  display: 'flex',
  color: 'white',
  padding: '5px 10px',
  borderRight: '4px solid transparent',
  transition: '0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  justifyContent: 'space-between',
  '& .menu_item': {
    display: 'flex',
    gap: '10px',
    '& .icon': {
      '& .MuiSvgIcon-root': {
        color: '#285D9A',
        background: '#285D9A !important',
      },
    },
  },
  '& .menu_container': {
    display: 'flex',
    flexDirection: 'column',
    '& .link': {
      paddingLeft: '20px',
      borderBottom: '#fff 0.5px solid',
      '& .icon': {
        background: '#285D9A !important',
        '& .MuiSvgIcon-root': {
          color: '#285D9A',
        },
      },
    },
  },
});
