import styled from '@emotion/styled';
import { Box } from '@mui/material';
import * as colors from 'constants/colors';
import { theme } from 'theme';
export const BodyAboutUsWrap1 = styled(Box)({
  display: 'flex',
  gap: '0px 75px',
  background: colors.primary5,
  padding: '40px 52px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
    gap: 24,
    padding: '40px 24px',
  },
  '& .left': {
    flex: '40%',
    textAlign: 'center',

    '& img': {
      width: 380,
      height: 374,
      marginBottom: '-80px',
    },
  },
  '& .right': {
    flex: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '12px 0px',
    '&-item': {
      padding: '32px',
      borderRadius: 24,
      background: colors.primary4,
    },
  },
});

export const MainConcept = styled(Box)({
  margin: '120px 0px',
  padding: '52px',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: 44,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
  },
  '& .left': {
    flex: '40%',
    [theme.breakpoints.down('md')]: {
      '& .MuiTypography-body1': {
        margin: '0 auto',
      },
    },
  },
  '& .right': {
    flex: '40%',
    textAlign: 'center',
  },
});

export const PastAndFutureStyled = styled(Box)({
  margin: '52px',
  background: colors.primary5,
  padding: '120px 112px',
  borderRadius: 24,
  [theme.breakpoints.down('md')]: {
    padding: '80px 20px',
    margin: '0px 0px',
  },
  '& .content': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '120px 0px',
    [theme.breakpoints.down('md')]: {
      gap: '44px 0px',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    '&-vision': {
      display: 'flex',
      alignItems: 'center',
      gap: '0px 100px',
      paddingLeft: 120,
      paddingRight: 120,
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '24px 0px',
        paddingLeft: 0,
        paddingRight: 0,
      },
      '&_item': {},
    },
    '&-mission': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      padding: '120px 0px',
      borderTop: `1px solid ${colors.primary}`,
      borderBottom: `1px solid ${colors.primary}`,
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlign: 'start',
        gap: '24px 0px',
        padding: '44px 0px',
      },
    },
    '&-future': {
      display: 'flex',
      alignItems: 'center',
      gap: '0px 100px',
      paddingRight: 120,
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column-reverse',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlign: 'start',
        gap: '24px 0px',
        padding: '44px 0px',
      },
      '&_item': {},
    },
  },
});

export const GuidingPrinciplesStyled = styled(Box)({
  margin: '120px 0',
  background: colors.primary1,
  padding: '120px 52px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    margin: 0,
  },
  '& .content-wrap': {
    marginTop: 45,
    display: 'flex',
    gap: '0px 20px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      textAlign: 'start',
      gap: '44px 0px',
      padding: '44px 0px',
    },
    '& .content': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      gap: '24px 0px',
      '&-item': {},
    },
  },
});

export const TheNameEcoStyled = styled(Box)({
  margin: '0px 0px 120px 0px',
  padding: '0px 52px',
  display: 'flex',
  gap: '0px 140px',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'start',
    gap: '44px 0px',
    padding: '44px 20px',
  },
  '& .content': {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px 0px',
    flex: '40%',
  },
  '& span': {
    color: '#D87EB1',
    fontWeight: 700,
    fontSize: 28,
  },
  '& .content-left': {
    left: '60%',
  },
  '& img': {
    // width: 658,
    // height: 750,
    // [theme.breakpoints.down('lg')]: {
    //   width: 458,
    //   height: 550,
    // },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '100%',
    },
  },
});

export const OurTeamStyled = styled(Box)({
  background: colors.primary1,
  padding: '120px 52px',
  [theme.breakpoints.down('md')]: {
    padding: '120px 0px',
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  gap: '24px 0px',
  '& .MuiTypography-h4': {
    width: '80%',
  },
});

export const EcoCupidDoStyled = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  gap: '24px 0px',
  margin: '120px 0px',
  [theme.breakpoints.down('md')]: {
    padding: '0px 20px',
  },
  '& .content-item': {
    background: colors.primary5,
    borderRadius: 24,
    padding: '44px 24px',
    width: '54rem',
    '& .image-bg': {
      width: 120,
      height: 120,
      margin: '0 auto',
      '& img': {
        borderRadius: '50%',
        objectFit: 'cover',
      },
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
});