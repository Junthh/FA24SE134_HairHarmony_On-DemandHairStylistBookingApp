import styled from '@emotion/styled';
import { Box } from '@mui/material';
import * as colors from 'constants/colors';
import { theme } from 'theme';
export const BoxArticleDetailWrap = styled(Box)({
  padding: '0px 52px',
  width: '100%',
  [theme.breakpoints.down('lg')]: {
    padding: '0px 20px',
  },
  '& .content-body1': {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 136,
    '& img': {
      maxWidth: '100%',
      height: 'auto',
    },
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      gap: 44,
    },
    '&_left': {
      flex: '75%',
      display: 'flex',
      gap: '50px 0px',
      [theme.breakpoints.down('lg')]: {
        gap: '20px 0px',
        '& img': {
          width: '100%',
          height: 'auto',
        },
      },
      flexDirection: 'column',
      '&-tag': {
        display: 'flex',
        gap: '0px 28px',
        alignItems: 'center',
        [theme.breakpoints.down('lg')]: {
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          rowGap: '15px',
        },
      },
    },
    '&_right': {
      flex: '25%',
      [theme.breakpoints.down('md')]: {
        padding: '80px 0px 0px 0px',
      },
      '&-writer': {
        padding: 24,
        marginBottom: 30,
        display: 'flex',
        gap: '16px 0px',
        flexDirection: 'column',
        background: colors.primary5,
        borderRadius: 24,
        '& .text': {
          color: colors.darkBlue900,
          lineHeight: 1.8,
          fontSize: 18,
          fontWeight: 400,
          '& span': {
            color: colors.primary1,
            fontWeight: 700,
          },
        },
      },
    },
  },
});
