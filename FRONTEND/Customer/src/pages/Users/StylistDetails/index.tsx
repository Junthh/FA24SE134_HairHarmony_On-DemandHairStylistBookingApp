import { Box, Grid, Typography, Divider, Avatar, Rating, Stack, Pagination } from '@mui/material';
import React from 'react';
import StylistImage from '../StylistDetails/mock/stylist-image.png';
import styled from '@emotion/styled';
import { ButtonPrimary } from 'pages/common/style/Button';
import StylistImage1 from '../StylistDetails/mock/stylist-image-1.png';
import StylistImage2 from '../StylistDetails/mock/stylist-image-2.png';

const BoxImageLeft = styled(Box)({
  marginTop: '40px',
  width: 350,
  height: 380,
  '& img': {
    width: '100%',
    height: '100%',
  },
});
const BoxInfoStyled = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  '& .content-header': {
    fontSize: '18px',
    color: '#969696',
    fontWeight: 600,
  },
  '& .content-body': {
    fontSize: '16px',
    color: '#FF0000',
  },
});
const BoxImageList = styled(Box)({
  display: 'flex',
  gap: '10px',
  '& img': {
    width: '260px',
    height: '220px',
  },
});
const BoxEvaluate = styled(Box)({
  padding: '20px 0px',
  borderBottom: '1px solid #969696',
  '& .user-comment': { display: 'flex', alignItems: 'flex-start', gap: 20 },
  '& .comment-content': {
    display: 'flex',
    gap: 20,
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
      <Grid item xs={9}>
        <Typography variant="h3" fontWeight={700}>
          Cailee Erica &nbsp;
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#5C4ACE' }}>(Expert)</span>
        </Typography>
        <Box height={10}></Box>
        <Box display={'flex'} justifyContent={'space-around'} alignItems={'center'}>
          <BoxInfoStyled>
            <Typography className="content-header" variant="body2">
              Đã được đặt
            </Typography>
            <Typography className="content-body" variant="body1">
              1032
            </Typography>
          </BoxInfoStyled>
          <BoxInfoStyled>
            <Typography className="content-header" variant="body2">
              Đã hoàn thành
            </Typography>
            <Typography className="content-body" variant="body1">
              99%
            </Typography>
          </BoxInfoStyled>
          <BoxInfoStyled>
            <Typography className="content-header" variant="body2">
              Kinh nghiệm
            </Typography>
            <Typography className="content-body" variant="body1">
              6 năm
            </Typography>
          </BoxInfoStyled>
          <BoxInfoStyled>
            <Typography className="content-header" variant="body2">
              Rating
            </Typography>
            <Typography className="content-body" variant="body1">
              5.0
            </Typography>
          </BoxInfoStyled>
          <ButtonPrimary
            padding={'16px 28px'}
            severity="cancel"
            borderradius={9}
            border={'1px solid #969696'}
            // color={'#969696'}
            fontWeight={700}
            onClick={() => {}}
          >
            Đặt lịch ngay
          </ButtonPrimary>
        </Box>
        <Box height={20}></Box>
        <Divider variant="fullWidth"></Divider>
        <Box height={20}></Box>
        <Typography variant="h3" fontWeight={700}>
          Thông tin
        </Typography>
        <Box height={10}></Box>
        <BoxImageList>
          <img src={StylistImage1} alt="" />
          <img src={StylistImage2} alt="" />
        </BoxImageList>
        <Box height={20}></Box>
        <Typography variant="h4" fontWeight={600}>
          Mô tả
        </Typography>
        <Box width={'60%'}>
          <Typography variant="body1">
            Bằng cấp: Cử nhân Nghệ thuật - Đại học Mỹ thuật TP.HCMGiải thưởng: Giải nhất cuộc thi
            thiết kế thời trang thành phố năm 2019Kinh nghiệm: 6 năm trong lĩnh vực tạo mẫu tóc và
            thời trangPhong cách: Tôi chuyên về phong cách tối giản nhưng tinh tế, luôn tập trung
            vào việc tôn vinh vẻ đẹp tự nhiên của khách hàng. Bằng việc kết hợp kỹ thuật hiện đại và
            xu hướng mới nhất, tôi cam kết mang đến trải nghiệm làm đẹp cao cấp và độc đáo cho mỗi
            người.Thành tựu: Ngoài các giải thưởng về thiết kế, tôi còn có cơ hội hợp tác với nhiều
            thương hiệu lớn trong các dự án thời trang và làm đẹp. Tôi tự hào là người định hình
            phong cách cá nhân cho hàng loạt nghệ sĩ nổi tiếng.
          </Typography>
        </Box>
        {/*  */}
        <Box height={20}></Box>
        <Typography variant="h4" fontWeight={600}>
          Đánh giá
        </Typography>
        <Box width={'60%'}>
          <BoxEvaluate>
            <Box className="user-comment">
              <Avatar sx={{ width: 80, height: 80 }}></Avatar>
              <Box>
                <Typography variant="h2">Junth</Typography>
                <Typography variant="caption">14:29:35 14/9/2024</Typography>
              </Box>
              <Box width={40}></Box>
              <Box display={'flex'} alignItems={'center'} gap={2}>
                <span style={{ fontWeight: 600 }}>5.0</span>{' '}
                <Rating precision={0.5} name="read-only" value={5} readOnly />
              </Box>
            </Box>

            <Box className="comment-content">
              <Box width={80}></Box>
              <Typography variant="body1">Cắt tóc đẹp quá!!</Typography>
            </Box>
          </BoxEvaluate>
          <BoxEvaluate>
            <Box className="user-comment">
              <Avatar sx={{ width: 80, height: 80 }}></Avatar>
              <Box>
                <Typography variant="h2">Junth</Typography>
                <Typography variant="caption">14:29:35 14/9/2024</Typography>
              </Box>
              <Box width={40}></Box>
              <Box display={'flex'} alignItems={'center'} gap={2}>
                <span style={{ fontWeight: 600 }}>5.0</span>{' '}
                <Rating precision={0.5} name="read-only" value={5} readOnly />
              </Box>
            </Box>

            <Box className="comment-content">
              <Box width={80}></Box>
              <Typography variant="body1">Cắt tóc đẹp quá!!</Typography>
            </Box>
          </BoxEvaluate>
          <BoxEvaluate>
            <Box className="user-comment">
              <Avatar sx={{ width: 80, height: 80 }}></Avatar>
              <Box>
                <Typography variant="h2">Junth</Typography>
                <Typography variant="caption">14:29:35 14/9/2024</Typography>
              </Box>
              <Box width={40}></Box>
              <Box display={'flex'} alignItems={'center'} gap={2}>
                <span style={{ fontWeight: 600 }}>5.0</span>{' '}
                <Rating precision={0.5} name="read-only" value={5} readOnly />
              </Box>
            </Box>

            <Box className="comment-content">
              <Box width={80}></Box>
              <Typography variant="body1">Cắt tóc đẹp quá!!</Typography>
            </Box>
          </BoxEvaluate>
          <Box height={40}></Box>
          <Stack spacing={2} alignItems={'center'}>
            <Pagination count={10} showFirstButton showLastButton />
          </Stack>
        </Box>
        <Box height={20}></Box>
      </Grid>
    </Grid>
  );
}
