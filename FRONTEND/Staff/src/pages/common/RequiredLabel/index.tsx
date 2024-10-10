import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';

const RequiredLabelStyled = styled(Box)({
  '& span': {
    color: 'red !important',
    fontSize: '15px !important',
  },
});
export default function RequiredLabel({ label = '' }) {
  return (
    <RequiredLabelStyled>
      {label}
      <span>*</span>
    </RequiredLabelStyled>
  );
}
