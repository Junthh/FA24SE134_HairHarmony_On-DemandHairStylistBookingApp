import React from 'react';
import { Box, IconButton, useMediaQuery } from '@mui/material';
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
import { SortBy } from 'models/FilterOptions.model';
import { useNavigate } from 'react-router-dom';
import { USER_PATH } from 'configurations/paths/paths';
import { theme } from 'theme';

const BoxCarouselStyled = styled(Box)({
  margin: '4px 0px',
  position: 'relative',
  '& .image-swiper-button-prev': {
    position: 'absolute',
    top: '-15%',
    right: '50px',
    zIndex: 2,
    [theme.breakpoints.down('md')]: {
      top: '90%',
      right: '50%',
    },
  },
  '& .swiper-button-disabled': {
    display: 'none',
  },
  '& .image-swiper-button-next': {
    position: 'absolute',
    top: '-15%',
    right: '10px',
    zIndex: 2,
    [theme.breakpoints.down('md')]: {
      top: '90%',
      right: '40%',
    },
  },
  '& .swiper-slide_custom': {
    padding: '20px',
    [theme.breakpoints.down('md')]: {
      paddingBottom: '70px',
    },
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
export const SwiperStyled = styled(Swiper)({
  paddingBottom: '40px !important',
  marginBottom: '10px !important',
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
type ListEcoFilmsProps = {
  title?: string;
  data: PostModel[];
  status: SortBy;
  isFeatureTitle?: boolean;
  onViewAll: (status: SortBy) => void;
};
export default function ListEcoFilms({
  title = '',
  data = [],
  status,
  isFeatureTitle = false,
  onViewAll,
}: ListEcoFilmsProps) {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleClick = (status: SortBy) => {
    onViewAll(status);
  };

  const handleViewDetail = (p: PostModel) => {
    let path = USER_PATH.ECO_STORIES as any;
    if (p.type === PostTypeEnum.Video) {
      path = USER_PATH.ECOFILMS;
    }
    navigate(`/${path}/${p.id}`);
  };

  return (
    <Box>
      {title && !isFeatureTitle && (
        <TextHeaderUnderlineStyled margin={!isMobile ? '' : '0 auto'} color={colors.primary1}>
          {title}
        </TextHeaderUnderlineStyled>
      )}

      {isMobile && isFeatureTitle && (
        <Box margin={'0 auto'}>
          <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
            Featured
          </TextHeaderUnderlineStyled>
          <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
            Eco-Stories
          </TextHeaderUnderlineStyled>
        </Box>
      )}

      <Box height={24}></Box>
      {!isMobile ? (
        <BoxCarouselStyled>
          <IconButtonStyled className="swiper-button image-swiper-button-prev">
            <ICONS.IconCaretLeft />
          </IconButtonStyled>
          <IconButtonStyled className="swiper-button image-swiper-button-next">
            <ICONS.IconCaretRight />
          </IconButtonStyled>
          <Swiper
            modules={[Navigation]}
            slidesPerView={!isMobile ? 3 : 1}
            navigation={{
              nextEl: '.image-swiper-button-next',
              prevEl: '.image-swiper-button-prev',
              disabledClass: 'swiper-button-disabled',
            }}
          >
            {/* {data.map((p) => (
              <SwiperSlide key={p.id} className="swiper-slide_custom">
                <CardContentImage item={p} onViewDetail={handleViewDetail} />
              </SwiperSlide>
            ))} */}
          </Swiper>
        </BoxCarouselStyled>
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
            {/* {data.map((p) => (
              <SwiperSlide key={p.id} className="swiper-slide_custom">
                <CardContentImage item={p} onViewDetail={handleViewDetail} />
              </SwiperSlide>
            ))} */}
          </SwiperStyled>
        </>
      )}

      <ButtonPrimary
        onClick={() => handleClick(status)}
        borderradius={40}
        margin={'auto'}
        padding={'10px 28px'}
        severity="primary"
      >
        View all <ICONS.IconArrowRight />
      </ButtonPrimary>
    </Box>
  );
}
