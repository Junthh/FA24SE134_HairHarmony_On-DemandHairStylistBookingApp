import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { theme } from 'theme';

export const BreadscrumWrap = styled(Box)({
  padding: '24px 0px 24px 52px',
  [theme.breakpoints.down('lg')]: {
    padding: '24px 0px 24px 24px',
  },
});
