import styled from '@emotion/styled';
import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ReactComponent as Service1 } from '../mock/services-1.svg';
import { ReactComponent as Service2 } from '../mock/services-2.svg';
import { ReactComponent as Service3 } from '../mock/services-3.svg';
import { ReactComponent as Service4 } from '../mock/services-4.svg';
import { ReactComponent as Service5 } from '../mock/services-5.svg';
import { ReactComponent as Service6 } from '../mock/services-6.svg';

const BoxCard = styled(Box)(() => ({
  backgroundColor: 'rgba(27, 77, 74, 0.06)',
  borderRadius: '16px',
  width: 480,
  height: 390,
  overflow: 'hidden', // Ensure the border radius is applied
  '& img': {
    width: '480px !important',
    height: 280,
    objectFit: 'cover',
  },
  '& svg': {
    width: '100%', // Set SVG width to 100% of the parent
    height: 'auto', // Maintain aspect ratio
    borderRadius: '16px',
  },
  '& .content': {
    padding: '26px 32px',
    '& .body': {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
}));

export default function CardServices({ categories }) {
  return (
    <Grid container spacing={2}>
      {categories.length ? (
        categories.map((item, index) => (
          <Grid item xs={4} key={index}>
            <BoxCard>
              <img src={item.image} alt="" />
              <Box className="content">
                <Typography fontWeight={'bold'} variant="h2">
                  {item.name}
                </Typography>
                {/* <Box className="body">
                  <Typography variant="body2">Giá chỉ từ: {item.price}</Typography>
                  <Typography variant="body2">{item.more}</Typography>
                </Box> */}
              </Box>
            </BoxCard>
          </Grid>
        ))
      ) : (
        <></>
      )}
    </Grid>
  );
}
