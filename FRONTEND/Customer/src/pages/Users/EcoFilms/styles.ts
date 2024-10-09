import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { theme } from 'theme';

export const EcoFilmsStyled = styled(Box)({
  padding: '24px 52px',
  [theme.breakpoints.down('md')]: {
    padding: '24px 20px',
  },
});
