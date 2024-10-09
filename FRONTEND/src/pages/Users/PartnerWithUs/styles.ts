import styled from '@emotion/styled';
import { Box } from '@mui/material';
import * as colors from 'constants/colors';
import { theme } from 'theme';
export const ContainerWrap = styled(Box)({
  margin: '70px 52px',
  display: 'flex',
  flexDirection: 'column',
  gap: '120px 0px',
  [theme.breakpoints.down('md')]: {
    margin: '24px 20px',
  },
  '& .content-item': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: 24,
    },
    '&_left': {
      padding: 24,
      background: colors.primary5,
      borderRadius: 24,
      flex: '55%',
    },
    '&_right': {
      flex: '45%',
      textAlign: 'center',
    },
  },
  '& .content-item-reverse': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: 24,
    },
    '&_left': {
      padding: 24,
      background: colors.primary5,
      borderRadius: 24,
      flex: '55%',
    },
    '&_right': {
      flex: '45%',
      textAlign: 'center',
    },
  },
  '& .text': {
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 1.8,
    color: colors.darkBlue700,
    '& span': {
      color: colors.primary1,
      fontWeight: 700,
    },
  },
});
