import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const AboutUsStyled = styled(Box)({
  padding: '40px 10rem',
  '& .frame1': {
    width: '32rem',
    height: '36rem',
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
