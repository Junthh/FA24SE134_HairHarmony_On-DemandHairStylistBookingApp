import { Box, PopperPlacementType, Typography, useMediaQuery } from '@mui/material';
import { USER_PATH } from 'configurations/paths/paths';
import { SortBy } from 'models/FilterOptions.model';
import { PostModel, PostTypeEnum, PostsParams } from 'models/Posts.model';
import { DataServiceSuccess, ListServiceSuccess } from 'models/ServiceResponse.model';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading } from 'redux/Reducer';
import { postsService } from 'services/posts.service';
import { HomeStyled } from './styles';
// import { ECO_HEROES_DATA } from './mock';
import { ReactComponent as HairHarmonyHome } from 'assets/pics/home/hair-hamony-home.svg';
import { showToast } from 'components/Common/Toast';
import { CountriesEnum } from 'models/Country.model';
import { ProjectModel } from 'models/ProjectModel';
import { theme } from 'theme';
import { handleError } from 'utils/helper';
import CardServices from './components/CardServices';
import TopSylistSlider from './components/TopSylistSlider';
import NewsAboutHairHamony from './components/NewsAboutHairHamony';
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
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();
  const [ecoHeroes, setEcoHeros] = useState<any[]>([]);
  const [featuredCategories, setFeaturedCategories] = useState<any[]>([]);
  const [currentCountry, setCurrentCountry] = useState({ country: null, imageUrls: [], qty: 0 });
  const containerList1Ref = useRef(null);
  const contentList1Ref = useRef(null);
  const containerList2Ref = useRef(null);
  const contentList2Ref = useRef(null);
  const [posts, setPosts] = useState<EcoPostsHome>(initEcoPostsHome);
  const [countries, setCountries] = useState<any>(null);
  const [totalProject, setTotalProject] = useState<number>(0);
  // const [introVideo, setIntroVideo] = useState<any>(null);
  const [isWatching, setIsWatching] = useState(false);
  /*
   ***
   ** Get info from calling api get country
   ***
   */
  // const handleClick =
  //   (newPlacement: PopperPlacementType, country: CountriesEnum) =>
  //   async (event: React.MouseEvent<HTMLButtonElement>) => {
  //     // set placement to show
  //     setAnchorEl(event.currentTarget);
  //     setPlacement(newPlacement);

  //     // check for ignore case call api not needed
  //     if (country === currentCountry.country && open) {
  //       setOpen(false);
  //       return;
  //     }

  //     dispatch(setLoading(true));

  //     // call
  //     const res = (await postsService.getCountry({ country })) as unknown as DataServiceSuccess;
  //     if (res.success) {
  //       setCurrentCountry({ ...currentCountry, ...res.data });
  //     } else {
  //       setCurrentCountry({ country, imageUrls: [] });
  //     }

  //     // show UI
  //     if (country !== currentCountry?.country) {
  //       setOpen(true);
  //     } else {
  //       setOpen((prev) => !prev);
  //     }

  //     dispatch(setLoading(false));
  //   };

  /*
   ***
   ** Get info from countries list
   ***
   */
  const handleClick =
    (newPlacement: PopperPlacementType, country: CountriesEnum) =>
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      // set placement to show
      setAnchorEl(event.currentTarget);
      setPlacement(newPlacement);

      // check for ignore case call api not needed
      if (country === currentCountry.country && open) {
        setOpen(false);
        return;
      }

      Object.keys(countries).some((key) => {
        if (key === country) {
          setCurrentCountry({ ...currentCountry, ...countries[key] });
          return true;
        }
        return false;
      });

      // show UI
      if (country !== currentCountry?.country) {
        setOpen(true);
      } else {
        setOpen((prev) => !prev);
      }
    };

  // handle get list countries
  const handleGetListCountries = async () => {
    const res = (await postsService.getListCountriesHomePage()) as any as DataServiceSuccess;
    if (res.success) {
      setCountries(res.data.countries);
      setTotalProject(res.data.totalProject);
    }
  };

  // handle get posts
  const getPosts = async (params?: PostsParams) => {
    let result: PostModel[] = [];
    dispatch(setLoading(true));
    const resService = (await postsService.list(params)) as any as ListServiceSuccess;
    if (resService.success) {
      result = resService.data;
    } else {
      // error
    }
    dispatch(setLoading(false));
    return result;
  };

  const handleData = async () => {
    // ecofilm posts
    const ecoFilms = await getPosts({
      type: PostTypeEnum.Video,
      sort: SortBy.NEWEST,
      page: 1,
      perPage: 9,
    });
    setPosts((prev) => ({ ...prev, ecoFilms: ecoFilms }));

    // newest stories posts
    const newestStories = await getPosts({
      type: PostTypeEnum.Post,
      sort: SortBy.NEWEST,
      page: 1,
      perPage: 5,
    });
    setPosts((prev) => ({ ...prev, newest: newestStories }));

    // our stories
    const ourStories = await getPosts({
      type: PostTypeEnum.OurReaderStory,
      sort: SortBy.NEWEST,
      page: 1,
      perPage: 8,
    });
    setPosts((prev) => ({ ...prev, ourStories: ourStories }));
  };

  useEffect(() => {
    // Change title
    document.title = 'Home';

    // getIntroVideo();
  }, []);

  return (
    <HomeStyled>
      <Box className="home_watching">
        <HairHarmonyHome />
      </Box>
      <Box className="home-services">
        <Typography variant="h2" className="header">
          Dịch vụ
        </Typography>
        <Box className="list-card-container">
          <CardServices />
        </Box>
      </Box>
      <Box className="top-stylist-in-month">
        <Typography variant="h2" className="header">
          TOP SYLIST TRONG THÁNG
        </Typography>
        <TopSylistSlider />
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
