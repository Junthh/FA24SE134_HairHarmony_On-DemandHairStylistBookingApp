import React, { useEffect } from 'react';
import { AboutUsStyled } from './styled';
import * as colors from 'constants/colors';
import ImageAboutUs1 from './mock/frame1.png';
import ImageAboutUs2 from './mock/frame2.png';
import ImageAboutUs3 from './mock/frame3.png';
import { Box, Grid, Typography } from '@mui/material';
import { ButtonPrimary } from 'pages/common/style/Button';

export default function AboutUs() {
  useEffect(() => {
    // Change title
    document.title = `About Us`;
  }, []);

  return (
    <AboutUsStyled>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <img className="frame1" src={ImageAboutUs1} alt="" />
        </Grid>
        <Grid item xs={6}>
          <Box
            marginTop={20}
            display={'flex'}
            justifyContent={'flex-end'}
            flexDirection={'column'}
            gap={2}
            alignItems={'flex-end'}
          >
            <Typography
              variant="h1"
              fontWeight={500}
              textTransform={'uppercase'}
              fontFamily={'GFS Didot !important'}
              fontSize={'3rem'}
            >
              Về chúng tôi
            </Typography>
            <Typography textAlign={'end'} variant="body1">
              Đội ngũ nhân viên được tuyển chọn kỹ lưỡng và đào tạo bài bản của chúng tôi luôn sẵn
              sàng vượt qua mọi mong đợi của bạn. Không gian thẩm mỹ viện sang trọng của chúng tôi –
              dành riêng cho sự thoải mái của khách hàng – và sự tận tâm của chúng tôi đối với sự
              đổi mới và nghệ thuật. Chúng tôi tập trung vào việc làm cho ngày của bạn trở nên tuyệt
              vời và liên tục nâng cao tiêu chuẩn..
            </Typography>
          </Box>
          <Box height={40}></Box>
          <ButtonPrimary
            borderradius={40}
            margin={'0 auto'}
            severity="cancel"
            padding={'20px 60px'}
          >
            Đặt lịch ngay
          </ButtonPrimary>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box
            marginTop={10}
            display={'flex'}
            justifyContent={'flex-start'}
            flexDirection={'column'}
            gap={2}
            alignItems={'flex-start'}
          >
            <Typography
              variant="h1"
              fontWeight={500}
              textTransform={'uppercase'}
              fontFamily={'GFS Didot !important'}
              fontSize={'3rem'}
            >
              LỰA CHỌN CỦA BẠN{' '}
            </Typography>
            <Typography textAlign={'start'} variant="body1">
              Đội ngũ của chúng tôi cực kỳ tài năng và nhiệt huyết. Họ cũng là một trong những kỹ
              thuật viên được đào tạo và có trình độ cao nhất trong ngành. Điều này đảm bảo rằng mỗi
              khách hàng của chúng tôi đều nhận được dịch vụ đẳng cấp thế giới – mọi lúc. Chúng tôi
              muốn trải nghiệm của bạn không giống bất kỳ ai khác.
            </Typography>
          </Box>
          <Box height={85}></Box>
          <img
            style={{
              width: '100%',
            }}
            className=""
            src={ImageAboutUs3}
            alt=""
          />
        </Grid>
        <Grid item xs={6} textAlign={'end'}>
          <img className="frame1" src={ImageAboutUs2} alt="" />
        </Grid>
      </Grid>
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
    </AboutUsStyled>
  );
}
