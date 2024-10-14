import React from 'react';
import styled from '@emotion/styled';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image1 from './mock/image1.png';
import * as colors from 'constants/colors';
import { ButtonPrimary } from 'pages/common/style/Button';
const OurTeammatesStyled = styled(Box)({
  '& .header': {
    position: 'relative',
    textAlign: 'center',
    '& img': {
      width: '100%',
      height: '600px',
    },
    '& .content': {
      width: 500,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
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
  '& .stylist-list': {
    padding: '20px 80px',
  },
});
//
export default function OurTeammates() {
  return (
    <OurTeammatesStyled>
      <Box className="header">
        <img src={Image1} alt="" />
        <Box className="content">
          <Typography
            variant="h1"
            fontWeight={500}
            textTransform={'uppercase'}
            fontFamily={'GFS Didot !important'}
            fontSize={'3rem'}
            color={colors.white}
          >
            ĐỘI NGŨ CHÚNG TÔI
          </Typography>
          <Box height={20}></Box>
          <Typography color={colors.white}>
            Giúp bạn trông đẹp nhất là điều dễ dàng, nhưng điều hành tiệm làm tóc tốt nhất tại đội
            ngũ chuyên gia trong ngành. Từ việc đặt lịch hẹn cho đến giúp bạn chọn sản phẩm tạo kiểu
            phù hợp, đội ngũ của chúng tôi luôn sẵn sàng làm cho ngày của bạn trở nên hoàn hảo.
          </Typography>
          <Box height={50}></Box>
          <Button
            sx={{
              background: 'none !important',
              color: 'white',
              border: '1px solid white',
              borderRadius: 40,
              padding: '20px 80px',
            }}
          >
            Đặt lịch ngay
          </Button>
        </Box>
      </Box>
      <Box className="stylist-list">
        <Typography variant="h5" fontFamily={'GFS Didot !important'} fontSize={'1.5rem'}>
          Stylist Expert
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}></Grid>
        </Grid>
        <Typography variant="h5" fontFamily={'GFS Didot !important'} fontSize={'1.5rem'}>
          Stylist Regular
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}></Grid>
        </Grid>
      </Box>
      <Box className="contact">
        <Typography variant="h1" className="header">
          LIÊN HỆ
        </Typography>
        <Typography variant="body2" className="body">
          Luôn chào đón khách không hẹn trước!
        </Typography>
        <Typography variant="body2" className="body">
          Hãy gọi điện hoặc ghé qua để đặt lịch hẹn.
        </Typography>
      </Box>
    </OurTeammatesStyled>
  );
}
