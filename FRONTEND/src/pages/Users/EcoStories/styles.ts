import styled from '@emotion/styled';
import { Box } from '@mui/material';
import * as colors from 'constants/colors';
import { theme } from 'theme';
export const EcoStoriesContainerStyled = styled(Box)({
  padding: '0px 52px',
  [theme.breakpoints.down('md')]: {
    padding: '0px 20px',
  },
});

export const EcoStoriesCardStyled = styled(Box)<{ color?; background?}>(
  ({ color, background }) => ({
    width: '100%',
    padding: '20px',
    position: 'relative',
    background: background ? background : colors.primary1,
    borderRadius: 24,
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    rowGap: 12,

    [theme.breakpoints.down('md')]: {
      height: 'auto',
      justifyContent: 'center'
    },

    '&:hover': {
      cursor: 'pointer',
    },
    '& .MuiTypography-body1': {
      color: color ? color : '#F2FFE3',
    },
    '& .item': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      },
      '& .MuiTypography-h2': {
        color: color ? color : '#F2FFE3',
      },
    },
    '& img': {
      width: 93,
      height: 60,
      borderRadius: 12,
    },
    '& .image-national': {
      position: 'absolute',
      height: 40,
      width: 40,
      padding: 8,
      borderRadius: '50%',
      background: `rgba(255, 255, 255, 0.6)`,
      top: 8,
      right: 8,
      '& img': {
        width: 24,
        height: 24,
      },

      [theme.breakpoints.down('sm')]: {
        top: 83,
      },
    },
  }),
);

export const FeatureEcoStyled = styled(Box)({
  display: 'flex',
  width: '100%',
  marginBottom: 150,
  justifyContent: 'space-between',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    rowGap: '60px',
  },
  '& .image-header-item': {
    width: '100%',
    // height: '100%',
    transition: 'width 0.8s, height 0.8s',
    borderRadius: 24,
    '&:hover': {
      // [theme.breakpoints.down('md')]: {
      //   width: '100%',
      //   height: 320,
      // },
      cursor: 'pointer',
      // height: 400,
      // transform: 'scale(1.1)',
      // transition: 'width 0.8s, height 0.8s',
    },

    [theme.breakpoints.down('sm')]: {
      height: 200,
      '&:hover': {
        height: 200,
      },
    },
  },

  '& .feature': {
    width: '25%',
    // maxWidth: '582px',

    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
  },

  '& .feature-special': {
    width: '45%',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
  },
});
