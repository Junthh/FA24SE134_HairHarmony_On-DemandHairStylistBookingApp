import styled from '@emotion/styled';
import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ReactComponent as Service1 } from '../mock/services-1.svg';
import { ReactComponent as Service2 } from '../mock/services-2.svg';
import { ReactComponent as Service3 } from '../mock/services-3.svg';
import { ReactComponent as Service4 } from '../mock/services-4.svg';
import { ReactComponent as Service5 } from '../mock/services-5.svg';
import { ReactComponent as Service6 } from '../mock/services-6.svg';
import { useNavigate } from 'react-router-dom';
import { USER_PATH } from 'configurations/paths/paths';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { currencyFormat } from 'utils/helper';
import * as colors from 'constants/colors';
const BoxCard = styled(Box)<{ type? }>(({ type = '' }) => ({
  backgroundColor: 'rgba(27, 77, 74, 0.06)',
  borderRadius: '16px',
  width: 480,
  height: 390,
  overflow: 'hidden', // Ensure the border radius is applied
  '&:hover': {
    cursor: 'pointer',
  },
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
const BoxCardService = styled(Box)<{ type? }>(({ type = '' }) => ({
  backgroundColor: 'rgba(27, 77, 74, 0.06)',
  borderRadius: '16px',
  overflow: 'hidden', // Ensure the border radius is applied
  padding: '12px 0px',
  '&:hover': {
    cursor: 'pointer',
  },
  '& .content-img': {
    textAlign: 'center',
    '& img': {
      padding: 9,
      width: '90% !important',
      height: 220,
      objectFit: 'cover',
      borderRadius: 16,
    },
  },
  '& .content': {
    padding: '5px 28px',
  },
  '& .content-minutes': {
    padding: '0px 28px',
    display: 'flex',
    justifyContent: 'space-between',
    '& .minutes': {
      borderRadius: '15px',
      width: 'fit-content',
      border: '1px solid black',
      padding: '0px 10px',
    },
  },
}));

export default function CardServices({
  type,
  categories,
  services,
}: {
  type: 'categories' | 'services';
  categories?: any[];
  services?: any[];
}) {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2}>
      {type === 'categories' &&
        categories &&
        categories.map((item, index) => (
          <Grid item xs={4} key={index}>
            <BoxCard onClick={() => navigate(`${USER_PATH.SERVICES}/${item.id}`)}>
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
        ))}
      {type === 'services' &&
        services &&
        services.map((item, index) => (
          <Grid item xs={3} key={index}>
            <BoxCardService type="services">
              <Box className="content">
                <Typography fontWeight={'bold'} variant="h4">
                  {item.name}
                </Typography>
              </Box>
              <Box className="content">
                <Typography fontFamily={'none !important'} variant="body2">
                  Giá chỉ từ: {currencyFormat(item.price)}
                </Typography>
              </Box>
              <Box className="content-img">
                <img src={item.image} alt="" />
              </Box>

              <Box className="content-minutes">
                <Typography className="minutes" variant="body2" fontFamily={'none !important'}>
                  {item.duration} Phút
                </Typography>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  sx={{
                    '&:hover': {
                      textDecoration: 'underline',
                      color: colors.blueB300,
                    },
                  }}
                >
                  <Typography variant="body2" fontFamily={'none !important'}>
                    Tìm hiểu thêm
                  </Typography>
                  <ArrowRightIcon />
                </Box>
              </Box>
            </BoxCardService>
          </Grid>
        ))}
    </Grid>
  );
}
