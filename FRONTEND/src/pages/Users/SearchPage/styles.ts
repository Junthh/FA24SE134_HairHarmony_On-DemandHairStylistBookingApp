import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { theme } from 'theme';

export const BodyContentStyled = styled(Box)({
  padding: '40px 52px',
  [theme.breakpoints.down('md')]: {
    padding: '24px 20px ',
  },
  '& .filter-search': {
    display: 'flex',
    '&-left': {
      display: 'flex',
      // flex: '60%',
      gap: '0px 30px',
    },
    // '&-right': {
    //   display: 'flex',
    //   flex: '35%',
    //   alignItems: 'center',
    //   justifyContent: 'flex-end',
    //   gap: '0px 16px',
    // },
  },
  '& .filter-search_mobile': {
    '& .filter-search-top': {
      marginBottom: 16,
      justifyContent: 'space-between',
    },
    '& .filter-search-bottom': {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 8,
      alignItems: 'center',
      // marginRight: 30,
      marginBottom: 16,
    },
  },
  '& .tag': {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    gap: '0px 12px',
    flexWrap: 'nowrap',
  },
});

