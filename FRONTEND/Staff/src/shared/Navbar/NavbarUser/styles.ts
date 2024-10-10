import styled from '@emotion/styled';
import { Box, Drawer, List } from '@mui/material';
import * as colors from 'constants/colors';
export const NavbarStyled = styled(Box)<{ typePopover }>(({ typePopover }) => ({
  padding: '16px 52px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#0A0A0A',
  '& .nav-left': {
    display: 'flex',
    alignItems: 'center',
    gap: '0px 12px',
    '& h1': {
      color: colors.white,
    },
    '& img': {
      width: 50,
      height: 50,
      borderRadius: 8,
      marginRight: '4px',
    },
    '& .MuiLink-root': {
      color: colors.darkBlue900,
      '&:hover': {
        color: colors.primary1,
      },
    },
  },
  '& .nav-dropdown': {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      height: 22,
      width: 22,
      transform:
        typePopover?.type === 'ECO' && typePopover?.open === true
          ? 'rotate(180deg)'
          : 'rotate(0deg)',
    },
  },
  '& .nav-dropdown_follow': {
    display: 'flex',
    alignItems: 'center',
    '& .nav-dropdown-waving': {
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        color: colors.primary,
      },
      '& svg': {
        height: 22,
        width: 22,
      },
    },
    '& .icon-dropdown': {
      '& svg': {
        height: 22,
        width: 22,
        transform:
          typePopover?.type === 'FOLLOW' && typePopover?.open === true
            ? 'rotate(180deg)'
            : 'rotate(0deg)',
      },
    },
  },
  '& .nav-right': {
    display: 'flex',
    alignItems: 'center',
    gap: '0px 16px',
    '& .MuiLink-root': {
      color: colors.white,
      '& .MuiTypography-root': {
        fontWeight: 400,
      },
    },
  },
}));
export const NavbarMobileStyled = styled(Box)<{ typePopover }>(({ typePopover }) => ({
  margin: '10px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& .logo': {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: '4px',
  },
  '& .nav-right': {
    display: 'flex',
    gap: 16,
    alignItems: 'center',
    '& .nav-dropdown_follow': {
      display: 'flex',
      alignItems: 'center',
      '& .nav-dropdown-waving': {
        display: 'flex',
        alignItems: 'center',
        '& svg': {
          height: 22,
          width: 22,
        },
      },
      '& .icon-dropdown': {
        '& svg': {
          height: 22,
          width: 22,
          transform:
            typePopover?.type === 'FOLLOW' && typePopover?.open === true
              ? 'rotate(180deg)'
              : 'rotate(0deg)',
        },
      },
    },
  },
}));

export const NavListStyled = styled(Box)<{ openSidebar }>(({ openSidebar }) => ({
  position: 'absolute',
  top: 70,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  zIndex: 5,
  display: openSidebar === 'true' ? 'block' : 'none',
  overflow: 'hidden',
  '& .nav_list-mobile': {},
  '& ul': {
    position: 'fixed',
    zIndex: '999',
    height: 'fit-content',
    width: '100vw',
    padding: '20px',
    listStyle: 'none',
    background: '#f9faff',
    '& li': {
      marginTop: 20,
    },
  },
}));
export const NavSearchStyled = styled(Box)<{ openSearch }>(({ openSearch }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  zIndex: 5,
  display: openSearch === 'true' ? 'block' : 'none',
  overflow: 'hidden',
  background: '#f9faff',
  '& .container': {
    '& .header': {
      padding: '22px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${colors.darkBlue50}`,
    },
    '& .search-box': {
      padding: '24px 20px',
      '& .MuiInputBase-root': {
        height: 48,
      },
    },
  },
}));
export const NavListPopoverEcoStyled = styled(List)({
  '& .MuiButtonBase-root': {
    textAlign: 'start',
    justifyContent: 'flex-start',
    padding: '5px 120px 5px 20px',
    fontSize: 18,
    fontWeight: 400,
    '&:hover': {
      background: '#F2FFE3',
      borderRadius: 12,
    },
  },
});

export const NavListPopoverSocialStyled = styled(List)({
  '& .MuiButtonBase-root': {
    textAlign: 'start',
    justifyContent: 'flex-start',
    padding: '5px 60px 5px 20px',
    fontSize: 18,
    fontWeight: 400,
    '&:hover': {
      background: '#F2FFE3',
      borderRadius: 12,
      color: colors.darkBlue900,
    },
  },
});

export const CustomDrawer = styled(Drawer)({
  '& .MuiPaper-root': {
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    '& svg': {
      width: 45,
      height: 25,
    },
  },
});
