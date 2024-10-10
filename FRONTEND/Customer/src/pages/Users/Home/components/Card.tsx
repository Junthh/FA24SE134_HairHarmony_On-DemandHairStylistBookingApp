import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { theme } from 'theme';
const BoxCard = styled(Box)({
  width: 210,
  height: 910,
  backgroundColor: '#1B4D4A',
});
export default function Card() {
  const [data] = useState([]);
  return (
    <BoxCard>
      <img src="" alt="" />
      <Typography>Khuyến mãi tháng </Typography>
    </BoxCard>
  );
}
