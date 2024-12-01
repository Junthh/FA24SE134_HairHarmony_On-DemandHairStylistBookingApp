import styled from '@emotion/styled';
import { Box, IconButton } from '@mui/material';
import { ICONS } from 'configurations/icons';
import * as colors from 'constants/colors';
import CardContentImage from 'pages/common/CardContentImage';
import { useState } from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import NewsAbou1 from '../mock/news-about-1.png';
import NewsAbou2 from '../mock/news-about-2.png';
import NewsAbou3 from '../mock/news-about-3.png';
import { newsServices } from 'services/news.service';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_PATH } from 'configurations/paths/paths';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const handleGetListNews = () => {
    dispatch(setLoading(true));
    try {
      newsServices
        .list()
        .then((res) => {
          setDatas(res.data);
        })
        .finally(() => dispatch(setLoading(false)));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetListNews();
  }, []);
  const handleGetDetail = (id) => {
    navigate(`${USER_PATH.NEWS}/${id}`);
  };
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
