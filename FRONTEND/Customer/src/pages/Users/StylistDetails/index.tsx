import { Box, Grid } from '@mui/material';
import React from 'react';
import StylistImage from '../StylistDetails/mock/stylist-image.png';
import styled from '@emotion/styled';

const BoxImageLeft = styled(Box)({
  width: 350,
  height: 380,
  '& img': {
    width: '100%',
    height: '100%',
  },
});
export default function StylistDetails() {
  return (
    <Grid container spacing={2} paddingLeft={10} marginTop={15} marginBottom={10}>
      <Grid item xs={3}>
        <BoxImageLeft>
          <img src={StylistImage} alt="" />
        </BoxImageLeft>
      </Grid>
      <Grid item xs={9}></Grid>
    </Grid>
  );
}
