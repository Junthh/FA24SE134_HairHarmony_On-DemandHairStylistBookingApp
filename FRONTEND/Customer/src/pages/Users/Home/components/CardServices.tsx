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

export default function CardServices() {
  const [data] = useState([
    {
      title: 'Khuyến mãi tháng 9',
      price: '100.000đ',
      more: 'Tìm hiểu thêm >',
      onClickMore: () => {},
      image: <Service1 />,
    },
    {
      title: 'Cắt tóc',
      price: '100.000đ',
      more: 'Tìm hiểu thêm >',
      onClickMore: () => {},
      image: <Service2 />,
    },
    {
      title: 'Nhộm tóc',
      price: '100.000đ',
      more: 'Tìm hiểu thêm >',
      onClickMore: () => {},
      image: <Service3 />,
    },
    {
      title: 'Dưỡng tóc',
      price: '100.000đ',
      more: 'Tìm hiểu thêm >',
      onClickMore: () => {},
      image: <Service4 />,
    },
    {
      title: 'Uốn định hình',
      price: '100.000đ',
      more: 'Tìm hiểu thêm >',
      onClickMore: () => {},
      image: <Service5 />,
    },
    {
      title: 'Dịch vụ khác',
      price: '100.000đ',
      more: 'Tìm hiểu thêm >',
      onClickMore: () => {},
      image: <Service6 />,
    },
  ]);

  return (
    <Grid container spacing={2}>
      {data.length ? (
        data.map((item, index) => (
          <Grid item xs={4} key={index}>
            <BoxCard>
              {item.image}
              <Box className="content">
                <Typography fontWeight={'bold'} variant="h2">
                  {item.title}
                </Typography>
                <Box className="body">
                  <Typography variant="body2">Giá chỉ từ: {item.price}</Typography>
                  <Typography variant="body2">{item.more}</Typography>
                </Box>
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
