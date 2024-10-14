import styled from '@emotion/styled';
import { Switch } from '@mui/material';
import { Box } from '@mui/system';
import * as colors from 'constants/colors';
export const MainContentWrapper = styled(Box)({
  width: '100%',
  height: '100%',
  padding: '16px 32px',
  display: 'flex',
  gap: '16px 0px',
  flexDirection: 'column',
  overflow: 'hidden'
});

export const TableWrapper = styled(Box)({
  width: '100%',
  maxHeight: 'calc(100vh - 225px)',
  overflow: 'scroll',
});


export const IOSSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: colors.primary,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: colors.b7,
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#39393D',
    opacity: 1,
  },
}));

export const BoxHeaderSearch = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  '& .search-left': {
    display: 'flex',
    alignItems: 'center',
    gap: '0px 8px',
    flex: '55%',
    '& > div:nth-of-type(1)': {
      flex: '150%',
    },
  },
  '& .search-right': {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: '45%',
  },
});
export const BodyContentWarp = styled(Box)({
  width: '60%',
  margin: 'auto',
  marginTop: -25,
});
