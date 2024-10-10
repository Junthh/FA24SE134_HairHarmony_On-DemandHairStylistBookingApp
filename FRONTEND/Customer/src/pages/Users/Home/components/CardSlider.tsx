import React, { useEffect, useRef } from 'react';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import * as colors from 'constants/colors';
import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ICONS } from 'configurations/icons';
import { TextHeaderUnderlineStyled } from 'pages/common/style/TextHeaderUnderline';
import CardContentImage from 'pages/common/CardContentImage';
import { ButtonPrimary } from 'pages/common/style/Button';
import { PostModel, PostTypeEnum } from 'models/Posts.model';
import { theme } from 'theme';
import { USER_PATH } from 'configurations/paths/paths';
import { useNavigate } from 'react-router-dom';
const BoxCarouselStyled = styled(Box)({
  margin: '4px 0px',
  position: 'relative',
  // '& .image-swiper-button-prev': {
  //   position: 'absolute',
  //   top: '-45%',
  //   right: '50px',
  //   zIndex: 2,
  //   [theme.breakpoints.down('md')]: {
  //     top: '-30%',
  //   },
  // },
  // // '& .swiper-button-disabled': {
  // //   display: 'none',
  // // },
  // '& .image-swiper-button-next': {
  //   position: 'absolute',
  //   top: '-45%',
  //   right: '10px',
  //   zIndex: 2,
  //   [theme.breakpoints.down('md')]: {
  //     top: '-30%',
  //   },
  // },
  '& .swiper-slide_custom': { padding: '20px' },
  '& .carousel-card': {
    border: '0.5px solid #DFE1E4',
    height: 300,
    width: '100%',
  },
});

const ButtonWrapper = styled(Box)({
  marginTop: '30px',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    rowGap: '30px',
  },
});

const IconButtonStyled = styled(IconButton)({
  color: colors.primary1,
});

const IconMovedActionWrapper = styled(Box)({
  position: 'absolute',
  top: '-40%',
  right: '50px',
  zIndex: 2,

  [theme.breakpoints.down('md')]: {
    position: 'unset',
  },
});
export const SwiperStyled = styled(Swiper)({
  '& .swiper-pagination-bullet': {
    width: 10,
    height: 10,
  },
  '& .swiper-pagination-bullet-active': {
    background: colors.primary1,
    width: 10,
    height: 10,
  },
});
type CardSliderProps = {
  title?: string;
  datas?: PostModel[];
  onClickViewAll?: () => void;
};
export default function CardSlider({ title = '', datas = [], onClickViewAll }: CardSliderProps) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const swiperRef = useRef(null);

  // handle get detail
  const handleGetDetail = (p: PostModel) => {
    let path;
    switch (p.type) {
      case PostTypeEnum.Post:
        path = USER_PATH.ECO_STORIES;
        break;

      case PostTypeEnum.OurReaderStory:
        path = USER_PATH.OUR_READER_STORIES;
        break;
    }

    navigate(`/${path}/${p.id}`);
  };

  useEffect(() => {
    if (swiperRef.current && isMobile) {
      swiperRef.current.allowTouchMove = true; // Enable touch events on mobile devices
    }
  }, [isMobile]);

  return (
    <Box>
      {title && (
        <TextHeaderUnderlineStyled color={colors.primary1}>{title}</TextHeaderUnderlineStyled>
      )}
      <Box height={24}></Box>
      <Typography variant="h4" fontWeight={700} color={colors.darkBlue400} paddingLeft={'20px'}>
        See what our eco-community says
      </Typography>
      <Box height={!isMobile ? 80 : 20}></Box>
      <BoxCarouselStyled>
        {!isMobile ? (
          <>
            <IconMovedActionWrapper>
              <IconButtonStyled
                className="swiper-button image-swiper-button-prev"
                onClick={() => swiperRef.current?.swiper?.slidePrev()}
              >
                <ICONS.IconCaretLeft />
              </IconButtonStyled>
              <IconButtonStyled
                className="swiper-button image-swiper-button-next"
                onClick={() => swiperRef.current?.swiper?.slideNext()}
              >
                <ICONS.IconCaretRight />
              </IconButtonStyled>
            </IconMovedActionWrapper>
            <Swiper
              modules={[Navigation]}
              slidesPerView={isMobile ? 1 : 4}
              navigation={{
                nextEl: '.image-swiper-button-next',
                prevEl: '.image-swiper-button-prev',
                disabledClass: 'swiper-button-disabled',
              }}
              ref={swiperRef}
            >
              {datas.map((item, index) => (
                <SwiperSlide key={index} className="swiper-slide_custom">
                  <CardContentImage
                    item={item}
                    onViewDetail={handleGetDetail}
                    showCategory={false}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <>
            <SwiperStyled
              slidesPerView={isMobile ? 1 : 4}
              modules={[Pagination]}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
            >
              {datas.map((item, index) => (
                <SwiperSlide key={index} className="swiper-slide_custom">
                  <CardContentImage item={item} onViewDetail={handleGetDetail} />
                </SwiperSlide>
              ))}
            </SwiperStyled>
          </>
        )}
      </BoxCarouselStyled>

      <ButtonWrapper>
        {/* {isMobile ? (
          <IconMovedActionWrapper>
            <IconButtonStyled
              className="swiper-button image-swiper-button-prev"
              onClick={() => swiperRef.current?.swiper?.slidePrev()}
            >
              <ICONS.IconCaretLeft />
            </IconButtonStyled>
            <IconButtonStyled
              className="swiper-button image-swiper-button-next"
              onClick={() => swiperRef.current?.swiper?.slideNext()}
            >
              <ICONS.IconCaretRight />
            </IconButtonStyled>
          </IconMovedActionWrapper>
        ) : (
          <></>
        )} */}
        <ButtonPrimary
          margin={'20px'}
          onClick={onClickViewAll}
          borderradius={40}
          padding={'10px 28px'}
          severity="primary"
          texttransform={'uppercase'}
        >
          View all <ICONS.IconArrowRight />
        </ButtonPrimary>
      </ButtonWrapper>
    </Box>
  );
}
