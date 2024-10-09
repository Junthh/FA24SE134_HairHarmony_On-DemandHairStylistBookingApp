import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { theme } from 'theme';
export const ContainerBodyStyled = styled(Box)({
  padding: '24px 52px',
  [theme.breakpoints.down('md')]: {
    padding: '24px 20px',
  },
  '& .item-list': {
    marginTop: 70,
    marginBottom: 60,
  },
});
