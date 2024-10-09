import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { theme } from 'theme';
export const ContainerBodyWrap = styled(Box)({
  padding: '0px 52px',
  '& .video-responsive': {
    height: 700,
  },
  [theme.breakpoints.down('lg')]: {
    padding: '0px 0px',
    '& .video-responsive': {
      height: 500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: '96%',
      '& video': {
        border: 'none',
        borderRadius: '0px',
      },
    },
  },
  '& .content-body': {
    marginTop: 40,
    marginBottom: 162,
    display: 'flex',
    '& img': {
      maxWidth: '100%',
      height: 'auto',
    },
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
    },
    '&_left': {
      flex: '75%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      gap: '50px 0px',
      [theme.breakpoints.down('lg')]: {
        padding: '0px 20px',
        gap: '16px 0px',
        flex: '100%',
        '& .MuiTypography-h1': {
          fontWeight: 700,
          fontSize: 28,
        },
      },
      '& .content-tag': {
        display: 'flex',
        alignItems: 'center',
        gap: '0px 28px',
        [theme.breakpoints.down('lg')]: {
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          rowGap: '15px',
        },
      },
      '& .content-description': {
        width: '80%',
        [theme.breakpoints.down('lg')]: {
          width: '100%',
          '& img': {
            width: '100%',
            height: 'auto',
          },
        },
      },
    },
    '&_right': {
      flex: '25%',
      [theme.breakpoints.down('lg')]: {
        padding: '80px 20px 0px 20px',
        flex: '100%',
        '& img': {
          width: '100%',
          height: 'auto',
        },
      },
    },
  },
});
