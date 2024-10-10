import { theme } from 'theme';
import styled from '@emotion/styled';
import { Box, Popper } from '@mui/material';
import * as colors from 'constants/colors';
export const HomeStyled = styled(Box)({
  overflow: 'hidden',
  '& .home_watching': {
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      padding: 0,
      marginBottom: 80,
    },
  },
  '& .home-services': {
    padding: '40px 40px',
    '& .header': {
      textTransform: 'uppercase',
      paddingLeft: '20px',
      fontWeight: 700,
      borderLeft: `9px solid ${colors.dark}`,
      marginBottom: '59px',
    },
  },

  '& .top-stylist-in-month': {
    padding: '40px 40px',
    '& .header': {
      textTransform: 'uppercase',
      paddingLeft: '20px',
      fontWeight: 700,
      borderLeft: `9px solid ${colors.dark}`,
      marginBottom: '59px',
    },
  },
  '& .news-about-hairhamony': {
    padding: '40px 40px',
    '& .header': {
      textTransform: 'uppercase',
      paddingLeft: '20px',
      fontWeight: 700,
      borderLeft: `9px solid ${colors.dark}`,
      marginBottom: '59px',
    },
  },
  '& .contact': {
    width: '100%',
    padding: '100px 25px',
    '& .header': {
      textAlign: 'center',
      fontFamily: 'GFS Didot !important',
      fontSize: 50,
    },
    '& .body': {
      textAlign: 'center',
      fontFamily: 'GFS Didot  !important',
      fontSize: 25,
    },
  },
});
export const FeatureCategoryStyled = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',

  marginBottom: 180,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    rowGap: '60px',
  },

  '& .image-header-item': {
    width: '100%',
    height: 320,
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

    // [theme.breakpoints.down(1480)]: {
    //   height: 150,
    // },
    [theme.breakpoints.down(1200)]: {
      height: 290,
    },
    [theme.breakpoints.down(1080)]: {
      height: 260,
    },
    [theme.breakpoints.down(980)]: {
      height: 240,
    },
    [theme.breakpoints.down('md')]: {
      height: 420,
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
    // maxWidth: '582px'
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },

  '& .feature-special': {
    width: '45%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
});

export const BoxEcoHeroes = styled(Box)({
  border: `2px solid ${colors.primary1}`,
  borderRadius: 24,
  minHeight: '520px',
  position: 'relative',
  width: '330px',
  zIndex: 2,

  [theme.breakpoints.down('lg')]: {
    minHeight: '480px',
  },

  '& .image-eco': {
    // padding: '29px 14px',
    borderRadius: '24px',
    height: '330px',
    width: '330px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&:hover': {
      cursor: 'pointer',
    },

    '& img': {
      width: '96%',
      height: '96%',
      borderTopLeftRadius: '22px',
      borderTopRightRadius: '22px',
      objectFit: 'cover',
      objectPosition: 'center',

      // [theme.breakpoints.down('sm')]: {
      //   width: '100%',
      // },
    },

    [theme.breakpoints.down('lg')]: {
      width: '285px',
      height: '340px',
    },
  },
  '& .eco-text': {
    minHeight: 260,
    background: colors.primary4,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: '20px 10px 10px 10px',
    position: 'absolute',
    // bottom: '0px',
    width: '100%',
    // textAlign: 'center',
    '& .MuiTypography-body1': {
      margin: '0 auto',
    },

    [theme.breakpoints.down('lg')]: {
      textAlign: 'center',
      minHeight: '135px',
    },
  },
});

export const CustomPopper = styled(Popper)({
  zIndex: 3,
  '& .MuiPaper-root': {
    borderRadius: 24,
    padding: 24,
    '& .image-list': {
      display: 'flex',
      gap: '12px',
      margin: '16px 0px',
    },
  },
});
