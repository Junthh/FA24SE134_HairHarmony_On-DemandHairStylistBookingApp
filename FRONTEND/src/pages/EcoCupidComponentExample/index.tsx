import { Grid, Typography } from '@mui/material';
import React from 'react';
import ShowCaseComponent from './base/ShowCaseComponent';
import showcaseList from './showCaseList';

export default function EcoCupidComponentExample() {
  return (
    <Grid container style={{ marginTop: '15px' }}>
      <Grid
        item
        style={{ width: '100%', background: '#fff', borderRadius: 12 }}
        px={5}
        pb={5}
        mt={3}
        xs={12}
      >
        <Typography
          typography="h1"
          justifyContent="center"
          alignItems="center"
          fontSize={32}
          color="#A8A8A8"
          my={5}
        >
          SHARE-RIGHT UI GUIDE
        </Typography>
        {showcaseList.map((e, index) => (
          <ShowCaseComponent order={index + 1} feature={e} key={`k_${index + 1}`} />
        ))}
      </Grid>
    </Grid>
  );
}
