import { Box, Grid, Typography, Divider, Avatar, Rating, Stack, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import StylistImage from '../StylistDetails/mock/stylist-image.png';
import styled from '@emotion/styled';
import { ButtonPrimary } from 'pages/common/style/Button';
import StylistImage1 from '../StylistDetails/mock/stylist-image-1.png';
import StylistImage2 from '../StylistDetails/mock/stylist-image-2.png';
import { useNavigate, useParams } from 'react-router-dom';
import { USER_PATH } from 'configurations/paths/paths';
import { stylistServices } from 'services/stylist.service';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import { showToast } from 'components/Common/Toast';
import DOMPurify from 'dompurify';
import { formatDate, formatDateTime } from 'utils/datetime';

const BoxImageLeft = styled(Box)({
  marginTop: '0px',
  width: 350,
  height: 380,
  '& img': {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    objectFit: 'cover',
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
  // borderBottom: '1px solid #969696',
  '& .user-comment': { display: 'flex', alignItems: 'flex-start', gap: 20 },
  '& .comment-content': {
    display: 'flex',
    gap: 20,
  },
});
export default function StylistDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [stylist, setStylist] = useState<any>({});
  useEffect(() => {
    getListStylists();
  }, []);

  const getListStylists = async () => {
    try {
      dispatch(setLoading(true)); // Start loading
      const res = await stylistServices.findById(params.id);
      setStylist(res.data); // Set services after receiving the data
    } catch (error) {
      showToast('error', error.msg); // Show toast on error
    } finally {
      dispatch(setLoading(false)); // Stop loading when done (whether success or error)
    }
  };
  return (
    stylist && (
      <Grid container spacing={2} paddingLeft={10} marginTop={15} marginBottom={10}>
        <Grid item xs={4}>
          <BoxImageLeft>
            <img src={stylist.avatar} alt="" />
          </BoxImageLeft>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h3" fontWeight={700}>
            {stylist.fullName} &nbsp;
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#5C4ACE' }}>
              ({stylist.level})
            </span>
          </Typography>
          <Box height={10}></Box>
          <Box display={'flex'} justifyContent={'space-around'} alignItems={'center'}>
            <BoxInfoStyled>
              <Typography className="content-header" variant="body2">
                Đã được đặt
              </Typography>
              <Typography className="content-body" variant="body1">
                {stylist.bookingSlotStylists?.filter((x) => x.status === 'Booked').length}
              </Typography>
            </BoxInfoStyled>
            <BoxInfoStyled>
              <Typography className="content-header" variant="body2">
                Đã hoàn thành
              </Typography>
              <Typography className="content-body" variant="body1">
                {stylist.bookingSlotStylists?.length > 0
                  ? (
                      (stylist.bookingSlotStylists?.filter((x) => x.status === 'Booked').length /
                        stylist.bookingSlotStylists?.length) *
                      100
                    ).toFixed(2)
                  : 0}
                %
              </Typography>
            </BoxInfoStyled>
            <BoxInfoStyled>
              <Typography className="content-header" variant="body2">
                Kinh nghiệm
              </Typography>
              <Typography className="content-body" variant="body1">
                {stylist.experience} năm
              </Typography>
            </BoxInfoStyled>
            <BoxInfoStyled>
              <Typography className="content-header" variant="body2">
                Rating
              </Typography>
              <Typography className="content-body" variant="body1">
                {stylist?.rating?.toFixed(1)}
              </Typography>
            </BoxInfoStyled>
            <ButtonPrimary
              padding={'16px 28px'}
              severity="cancel"
              borderradius={9}
              border={'1px solid #969696'}
              // color={'#969696'}
              fontWeight={700}
              onClick={() => {
                navigate(USER_PATH.BOOKING);
              }}
            >
              Đặt lịch ngay
            </ButtonPrimary>
          </Box>
          <Box height={20}></Box>
          <Divider variant="fullWidth"></Divider>
          <Box height={20}></Box>
          {/* <Typography variant="h3" fontWeight={700}>
        Thông tin
      </Typography>
      <Box height={10}></Box>
      <BoxImageList>
        <img src={StylistImage1} alt="" />
        <img src={StylistImage2} alt="" />
      </BoxImageList>
      <Box height={20}></Box> */}
          <Typography variant="h4" fontWeight={600}>
            Mô tả
          </Typography>
          <Box width={'60%'}>
            <Box className="description">
              <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(stylist?.description || '') }}
              />
            </Box>
          </Box>
          {/*  */}
          <Box height={20}></Box>
          <Typography variant="h4" fontWeight={600}>
            Đánh giá
          </Typography>
          <Box width={'60%'}>
            <BoxEvaluate>
              {stylist.feedbacks?.map((feedback, index) => (
                <React.Fragment key={index}>
                  <Box className="user-comment">
                    <Avatar
                      sx={{ width: 80, height: 80 }}
                      src={feedback?.booking.customer?.avatar}
                    />
                    <Box>
                      <Typography variant="h6">{feedback?.booking.customer?.fullName}</Typography>
                      <Typography variant="caption">
                        {formatDateTime(feedback.createdDate)}
                      </Typography>
                      <Typography variant="body1">{feedback.description}</Typography>
                    </Box>
                    <Box display={'flex'} alignItems={'center'} gap={2}>
                      <Rating precision={0.5} name="read-only" value={5} readOnly />
                    </Box>
                  </Box>
                  <hr />
                </React.Fragment>
              ))}
            </BoxEvaluate>

            <Box height={40}></Box>
            {/* <Stack spacing={2} alignItems={'center'}>
              <Pagination count={10} showFirstButton showLastButton />
            </Stack> */}
          </Box>
          <Box height={20}></Box>
        </Grid>
      </Grid>
    )
  );
}
