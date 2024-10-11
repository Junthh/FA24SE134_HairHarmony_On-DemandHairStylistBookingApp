import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import * as colors from 'constants/colors';
export const TextAreaStyled = styled(TextField)({
  '& .MuiInputBase-root': {
    backgroundColor: colors.white,
    border: '1px solid #C2C7D0',
    borderRadius: 8,
    '&::focus': {
      backgroundColor: colors.white,
      borderBottom: 'none',
    },
  },
  '& .MuiFilledInput-root': {
    backgroundColor: `${colors.white} !important`,
    '&::after': {
      borderBottom: 'none',
    },
    '&::before': {
      borderBottom: 'none !important',
    },
    '&::focus': {
      borderBottom: 'none',
    },
    '&::hover': {
      borderBottom: 'none',
    },
  },
});
