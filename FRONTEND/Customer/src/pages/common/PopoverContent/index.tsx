import styled from '@emotion/styled';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

const PopoverContentStyled = styled(Box)({
  padding: 15,
  '& .content': {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: 10,
    padding: '3px 10px',
    borderRadius: '12px',
    '&:hover': {
      background: 'black',
      color: 'white',
      cursor: 'pointer',
    },
  },
});
export default function PopoverContent({ children }) {
  return (
    <PopoverContentStyled>
      <Typography variant="body2" fontWeight={600}>
        Tài khoản
      </Typography>
      <Divider variant="fullWidth"></Divider>
      <Box height={5}></Box>
      <Box>{children}</Box>
    </PopoverContentStyled>
  );
}
