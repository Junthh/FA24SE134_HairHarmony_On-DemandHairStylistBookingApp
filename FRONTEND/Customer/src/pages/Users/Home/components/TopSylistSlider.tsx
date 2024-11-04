import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import * as colors from 'constants/colors';
import { Box, IconButton } from '@mui/material';
import CardContentImage from 'pages/common/CardContentImage';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ICONS } from 'configurations/icons';
import TopStyledList1 from '../mock/top-sylist-1.png';
import TopStyledList2 from '../mock/top-sylist-2.png';
import TopStyledList3 from '../mock/top-sylist-3.png';
import TopStyledList4 from '../mock/top-sylist-4.png';

const BoxCarouselStyled = styled(Box)({
  margin: '4px 0px',
  position: 'relative',
  '& .image-swiper-button-prev': {
    position: 'absolute',
    top: '35%',
    left: '-35px',
    zIndex: 2,
  },
  '& .swiper-button-disabled': {
    display: 'none',
  },
  '& .image-swiper-button-next': {
    position: 'absolute',
    top: '35%',
    right: '-20px',
    zIndex: 2,
  },
  '& .swiper-slide_custom': { padding: '20px' },
  '& .carousel-card': {
    border: '0.5px solid #DFE1E4',
    height: 300,
    width: '100%',
  },
});
export const SwiperStyled = styled(Swiper)({
  '& .swiper-pagination-bullet': {
    width: 10,
    height: 10,
  },
  '& .swiper-pagination-bullet-active': {
    background: colors.dark,
    width: 10,
    height: 10,
  },
});
export default function TopSylistSlider({ stylist }) {
  const [swiperRef, setSwiperRef] = useState(null);

  const handleGetDetail = () => {};

  return (
    <BoxCarouselStyled>
      <IconButton className="swiper-button image-swiper-button-prev">
        <ICONS.IconCaretLeft />
      </IconButton>
      <IconButton className="swiper-button image-swiper-button-next">
        <ICONS.IconCaretRight />
      </IconButton>
      {
        <>
          <SwiperStyled
            onSwiper={setSwiperRef}
            spaceBetween={10}
            slidesPerView={4}
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: '.image-swiper-button-next',
              prevEl: '.image-swiper-button-prev',
              disabledClass: 'swiper-button-disabled',
            }}
          >
            {stylist &&
              stylist.map((item, index) => (
                <SwiperSlide key={index} className="swiper-slide_custom">
                  <CardContentImage type="" item={item} onViewDetail={handleGetDetail} />
                </SwiperSlide>
              ))}
          </SwiperStyled>
        </>
      }
    </BoxCarouselStyled>
  );
}
