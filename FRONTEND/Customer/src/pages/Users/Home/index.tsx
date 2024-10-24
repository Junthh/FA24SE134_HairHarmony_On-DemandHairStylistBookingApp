import { Box, PopperPlacementType, Typography, useMediaQuery } from '@mui/material';
import { USER_PATH } from 'configurations/paths/paths';
import { SortBy } from 'models/FilterOptions.model';
import { PostModel, PostTypeEnum, PostsParams } from 'models/Posts.model';
import { DataServiceSuccess, ListServiceSuccess } from 'models/ServiceResponse.model';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading } from 'redux/Reducer';
import { HomeStyled } from './styles';
// import { ECO_HEROES_DATA } from './mock';
import { ReactComponent as HairHarmonyHome } from 'assets/pics/home/hair-hamony-home.svg';
import HairHarmonyHome1 from 'assets/pics/home1.jpg';
import HairHarmonyHome2 from 'assets/pics/home2.jpg';

import { showToast } from 'components/Common/Toast';
import { CountriesEnum } from 'models/Country.model';
import { ProjectModel } from 'models/ProjectModel';
import { theme } from 'theme';
import { handleError } from 'utils/helper';
import CardServices from './components/CardServices';
import TopSylistSlider from './components/TopSylistSlider';
import NewsAboutHairHamony from './components/NewsAboutHairHamony';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Autoplay } from 'swiper';
import { categoryService } from 'services/category.service';
import { error } from 'console';
import { stylistServices } from 'services/stylist.service';

export interface EcoPostsHome {
  ecoFilms: PostModel[];
  newest: PostModel[];
  featuredCategories: PostModel[];
  ourStories: PostModel[];
}

export const initEcoPostsHome: EcoPostsHome = {
  ecoFilms: [],
  newest: [],
  featuredCategories: [],
  ourStories: [],
};

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [stylist, setStylist] = useState([]);

  /*
   ***
   ** Get info from calling api get categories
   ***
   */
  const handleGetListCategories = async () => {
    dispatch(setLoading(true));
    try {
      const res = await categoryService.list();
      setCategories(res.data);
    } catch (error) {
      showToast('error', error.msg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  /*
   ***
   ** Get info from stylist
   ***
   */
  const handleGetStylist = async () => {
    dispatch(setLoading(true));
    try {
      const res = await stylistServices.list();
      setStylist(res.data);
    } catch (error) {
      showToast('error', error.msg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // handle get list countries

  useEffect(() => {
    // Change title
    document.title = 'Home';
    handleGetListCategories();
    handleGetStylist();
    // getIntroVideo();
  }, []);

  return (
    <HomeStyled>
      <Box className="home_watching">
        <Swiper
          className="mySwiper"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <HairHarmonyHome />
          </SwiperSlide>
          <SwiperSlide>
            <img src={HairHarmonyHome1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={HairHarmonyHome2} alt="" />
          </SwiperSlide>
        </Swiper>
      </Box>
      <Box className="home-services">
        <Typography variant="h2" className="header">
          Danh mục
        </Typography>
        <Box className="list-card-container">
          <CardServices type="categories" categories={categories} />
        </Box>
      </Box>
      <Box className="top-stylist-in-month">
        <Typography variant="h2" className="header">
          TOP SYLIST TRONG THÁNG
        </Typography>
        <TopSylistSlider stylist={stylist} />
      </Box>
      <Box className="news-about-hairhamony">
        <Typography variant="h2" className="header">
          TIN TỨC MỚI NHẤT VỀ HAIRHAMONY
        </Typography>
        <NewsAboutHairHamony />
      </Box>
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
    </HomeStyled>
  );
}
