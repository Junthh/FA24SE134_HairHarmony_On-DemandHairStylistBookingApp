import styled from '@emotion/styled';
import { Box, IconButton } from '@mui/material';
import { ICONS } from 'configurations/icons';
import CardContentImage from 'pages/common/CardContentImage';
import React, { useState } from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import * as colors from 'constants/colors';
import NewsAbou1 from '../mock/news-about-1.png';
import NewsAbou2 from '../mock/news-about-2.png';
import NewsAbou3 from '../mock/news-about-3.png';
const BoxCarouselStyled = styled(Box)({
  margin: '4px 0px',
  position: 'relative',
  '& .image-news-about-swiper-button-prev': {
    position: 'absolute',
    top: '35%',
    left: '-35px',
    zIndex: 2,
  },
  '& .swiper-button-disabled': {
    display: 'none',
  },
  '& .image-news-about-swiper-button-next': {
    position: 'absolute',
    top: '35%',
    right: '-20px',
    zIndex: 2,
  },
  '& .swiper-about-slide_custom': { padding: '20px' },
  '& .carousel-card': {
    border: '0.5px solid #DFE1E4',
    height: 300,
    width: '100%',
  },
});
const SwiperStyled = styled(Swiper)({
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
export default function NewsAboutHairHamony() {
  const [swiperRef, setSwiperAboutRef] = useState(null);
  const [datas] = useState([
    {
      image: NewsAbou1,
      description:
        'HairHamony tham gia khóa đào tạo kỹ thuật salon chuyên nghiệp cao cấp toàn Châu Á',
      onClick: () => {},
    },
    {
      image: NewsAbou2,
      description: 'HairHamony đầu tư lớn vào công nghệ làm đẹp sau cú hích 15 triệu USD',
      onClick: () => {},
    },
    {
      image: NewsAbou3,
      description: 'Doanh nghiệp đào tạo nhân viên thành TikToker để tiết kiệm phí marketing',
      onClick: () => {},
    },
  ]);
  const handleGetDetail = () => {};
  return (
    <BoxCarouselStyled>
      <IconButton className="swiper-button image-news-about-swiper-button-prev">
        <ICONS.IconCaretLeft />
      </IconButton>
      <IconButton className="swiper-button image-news-about-swiper-button-next">
        <ICONS.IconCaretRight />
      </IconButton>
      {
        <>
          <SwiperStyled
            onSwiper={setSwiperAboutRef}
            spaceBetween={10}
            slidesPerView={3}
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: '.image-news-about-swiper-button-next',
              prevEl: '.image-news-about-swiper-button-prev',
              disabledClass: 'swiper-button-disabled',
            }}
          >
            {datas.map((item, index) => (
              <SwiperSlide key={index} className="swiper-about-slide_custom">
                <CardContentImage type={'NEWS'} item={item} onViewDetail={handleGetDetail} />
              </SwiperSlide>
            ))}
          </SwiperStyled>
        </>
      }
    </BoxCarouselStyled>
  );
}
