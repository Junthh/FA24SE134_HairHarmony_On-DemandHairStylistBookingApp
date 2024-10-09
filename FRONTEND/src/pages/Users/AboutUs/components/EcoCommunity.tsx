import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import * as colors from 'constants/colors';
import { ICONS } from 'configurations/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { TextHeaderUnderlineStyled } from 'pages/common/style/TextHeaderUnderline';
import { theme } from 'theme';
import { IMAGES } from 'configurations/images';
const BoxEcoComunityStyled = styled(Box)({
  position: 'relative',
  width: '70%',
  margin: '44px auto',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  '& .image-swiper-button-prev': {
    position: 'absolute',
    top: '50%',
    left: '30px',
    zIndex: 2,
    [theme.breakpoints.down('md')]: {
      top: '5%',
      left: '40%',
      color: colors.primary1
    },
  },
  '& .swiper-button-disabled': {
    display: 'none',
  },
  '& .image-swiper-button-next': {
    position: 'absolute',
    top: '50%',
    right: '30px',
    zIndex: 2,
    [theme.breakpoints.down('md')]: {
      top: '5%',
      right: '40%',
      color: colors.primary1
    },
  },
  '& .swiper-slide_custom': {
    padding: '20px',
  },
  '& .carousel-card': {
    border: '0.5px solid #DFE1E4',
    height: 300,
    width: '100%',
  },
});
const IconButtonStyled = styled(IconButton)({
  color: colors.primary1,
});
const BoxContentStyled = styled(Box)({
  background: colors.primary4,
  borderRadius: 24,
  padding: '40px 100px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 24,
  [theme.breakpoints.down('md')]: {
    padding: '24px 20px',
  },
  '& .content-avatar': {
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      textAlign: 'start',
      gap: 16,
      marginBottom: 24,
      '& .MuiTypography-h2': {
        fontSize: 20,
      },
      '& .MuiTypography-h5': {
        fontSize: 14,
      },
    },
  },
  '& .main-avatar': {
    margin: '24px auto',
    height: 200,
    width: 200,
    borderRadius: '50%',
    border: `6px solid ${colors.primary1}`,
    "& img": {
      borderRadius: '50%',
      objectFit: "cover",
    },
    [theme.breakpoints.down('md')]: {
      height: 44,
      width: 44,
    },
  },
});
const EcoCommunityContainer = styled(Box)({
  position: 'relative',
  background: colors.primary1,
  padding: '120px 75px',
  [theme.breakpoints.down('md')]: {
    padding: '80px 20px',
  },
  '& .avatar-extra_prev': {
    position: 'absolute',
    height: 120,
    width: 120,
    borderRadius: '50%',
    border: `4px solid ${colors.primary4}`,
    bottom: '38%',
    left: '80px',
    "& img": {
      borderRadius: '50%',
      objectFit: "cover",
    },
  },
  '& .avatar-extra_next': {
    position: 'absolute',
    height: 120,
    width: 120,
    borderRadius: '50%',
    border: `4px solid ${colors.primary4}`,
    bottom: '38%',
    right: '80px',
    "& img": {
      borderRadius: '50%',
      objectFit: "cover",
    },
  },
});
export default function EcoCommunity() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [data] = useState([
    {
      quote: "We’re eyeing to provide another upcycling machine for one of the communities in the east coast, where we will run our upcycling center. We look forward to collaborating with other brands to promote the upcycling initiative and reach more people.",
      profilePic: IMAGES.ElvianVolunteer,
      name: "Elvian Masli",
      projectName: "SOAMyOceanHope, Malaysia"
    },
    {
      quote: "We realize that, as [humans], we cannot live alone. We need people, we need the environment, we need anything to help us to be strong to continue our lives in this world. So, I want to say to you to believe in yourself and to believe in your potential. To become an inspiration and to work and save this planet through your actions.",
      profilePic: IMAGES.KerusakanVolunteer,
      name: "Jhonatan Yuditya Pratama",
      projectName: "Sakolah Budaya Patamuan Talino, Indonesia"
    },
    {
      quote: "If a disabled child can protect the environment, why can’t you?",
      profilePic: IMAGES.MsNgaVolunteer,
      name: "Ms Nga",
      projectName: "NNC - Recycle Garden, Vietnam"
    },
    {
      quote: "I strongly believe that small actions every day, consistently over a long period of time, especially when we start together, will definitely make an impact.",
      profilePic: IMAGES.RudoVolunteer,
      name: "Sakurako Masuda",
      projectName: "Forest Fire Fighters, Thailand"
    },
    {
      quote: "I can see that there are some youths who are interested in the environmental issue or environmental impact but they are still not touching the ground yet. So, if you want to understand what is really happening in reality, they need to also touch the ground.",
      profilePic: IMAGES.ThaeSuVolunteer,
      name: "Thae Su Aye",
      projectName: "Thant Myanmar, Myanmar"
    }
  ])
  const [count, setCount] = useState<number>(1)
  return (
    <EcoCommunityContainer>
      {!isMobile ? (
        <TextHeaderUnderlineStyled margin={'0 auto'} color={'#F2FFE3'} background={colors.primary2}>
          EcoCupid community
        </TextHeaderUnderlineStyled>
      ) : (
        <>
          <TextHeaderUnderlineStyled
            margin={'0 auto'}
            color={'#F2FFE3'}
            background={colors.primary2}
          >
            EcoCupid{' '}
          </TextHeaderUnderlineStyled>
          <TextHeaderUnderlineStyled
            margin={'0 auto'}
            color={'#F2FFE3'}
            background={colors.primary2}
          >
            {' '}
            community
          </TextHeaderUnderlineStyled>
        </>
      )}

      <BoxEcoComunityStyled>
        <IconButtonStyled className="swiper-button image-swiper-button-prev">
          <ICONS.IconCaretLeft />
        </IconButtonStyled>
        <IconButtonStyled className="swiper-button image-swiper-button-next">
          <ICONS.IconCaretRight />
        </IconButtonStyled>
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          initialSlide={1}
          simulateTouch={!isMobile ? false : true}
          onNavigationNext={() => {
            setCount((prev) => {
              return prev + 1
            })
          }}
          onNavigationPrev={() => {
            setCount((prev) => {
              return prev - 1
            })
          }}
          navigation={{
            nextEl: '.image-swiper-button-next',
            prevEl: '.image-swiper-button-prev',
            disabledClass: 'swiper-button-disabled',
          }}
        >
          {
            data.map((volunteer) => {
              return <SwiperSlide className="swiper-slide_custom">
                <BoxContentStyled>
                  {!isMobile &&
                    <ICONS.IconQuote />}
                  <Box height={20}></Box>
                  <Typography color={colors.darkBlue900} variant="h2" textAlign={'center'}>
                    {volunteer.quote}
                  </Typography>
                  <Box className="content-avatar">
                    <Box className="main-avatar">
                      <img width={'100%'} height={'100%'} src={volunteer.profilePic} alt="" />
                    </Box>
                    <Box className="name-avatar">
                      <Typography color={colors.darkBlue900} variant="h2" fontWeight={700}>
                        {volunteer.name}
                      </Typography>
                      <Typography color={colors.darkBlue900} variant="h5">
                        {volunteer.projectName}
                      </Typography>
                    </Box>
                  </Box>
                </BoxContentStyled>
              </SwiperSlide>
            })
          }
        </Swiper>
      </BoxEcoComunityStyled>
      {!isMobile && (
        <>
          {
            data[count - 1]?.profilePic && <Box className="avatar-extra_prev">
              <img width={'100%'} height={'100%'} src={data[count - 1]?.profilePic} alt="" />
            </Box>
          }
          {
            data[count + 1]?.profilePic && <Box className="avatar-extra_next">
              <img width={'100%'} height={'100%'} src={data[count + 1]?.profilePic} alt="" />
            </Box>
          }
        </>
      )}
    </EcoCommunityContainer>
  );
}
