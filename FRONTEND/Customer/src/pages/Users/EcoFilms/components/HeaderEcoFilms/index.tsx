import React from 'react';
import { Box, styled, useMediaQuery } from '@mui/material';
import { TextHeaderUnderlineStyled } from 'pages/common/style/TextHeaderUnderline';
import * as colors from 'constants/colors';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CardSlider from '../CardSlider';
import { PostModel } from 'models/Posts.model';
import { theme } from 'theme';
export const SwiperStyled = styled(Swiper)({
  '& iframe': {
    height: 'inherit !important',
  },
  [theme.breakpoints.down('md')]: {
    '& .video-responsive': {
      height: '500px !important',
    },
  },
  '& .swiper-pagination': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .swiper-pagination-bullet': {
    width: 12,
    height: 12,
  },
  '& .swiper-pagination-bullet-active': {
    background: colors.primary1,
    width: 15,
    height: 15,
  },
});

interface HeaderEcoFilmsProps {
  data: PostModel[];
}

export default function HeaderEcoFilms({ data }: HeaderEcoFilmsProps) {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box>
      {!isMobile ? (
        <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
          Impactful Eco-Films
        </TextHeaderUnderlineStyled>
      ) : (
        <>
          <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
            Impactful
          </TextHeaderUnderlineStyled>
          <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
            Eco-Films
          </TextHeaderUnderlineStyled>
        </>
      )}
      <Box height={40}></Box>
      <SwiperStyled
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        slidesPerView={1}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <CardSlider item={item} />
          </SwiperSlide>
        ))}
      </SwiperStyled>
    </Box>
  );
}
