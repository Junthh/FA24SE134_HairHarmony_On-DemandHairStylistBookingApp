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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isOtherScreen = useMediaQuery(theme.breakpoints.down('lg'));
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

  // handle view all
  const handleViewAll = (
    status: SortBy,
    type: PostTypeEnum = PostTypeEnum.Post,
    isFeatured: boolean = false,
  ) => {
    let path = `/${USER_PATH.SEARCH}?type=${type}`;
    if (status) {
      path += `&sortBy=${status}`;
    }
    if (isFeatured) {
      path += '&isFeature=true';
    }
    navigate(path);
  };

  // handle get detail
  const handleGetDetail = (p: PostModel) => {
    let path = `${USER_PATH.ECO_STORIES}`;
    if (p.type === PostTypeEnum.Video) {
      path = `${USER_PATH.ECOFILMS}`;
    }
    navigate(`/${path}/${p.id}`);
  };

  const getFeaturedCategories = async (id: any = '') => {
    dispatch(setLoading(true));
    if (!id) {
      const res = (await postsService.getFeaturedCategories()) as any;
      if (res.success) {
        setFeaturedCategories(res.data);
        id = res.data[0].id;
      }
    }

    // featured categories posts
    const featuredP = await getPosts({ isFeature: true, categoryId: id, page: 1, perPage: 3 });
    setPosts((prev) => ({ ...prev, featuredCategories: featuredP }));

    dispatch(setLoading(false));
  };

  const getFeaturedProjects = async () => {
    dispatch(setLoading(true));
    const res = (await postsService.getFeaturedProjects({ perPage: 4 })) as any;
    if (res.success) {
      setEcoHeros(res.data);
    } else {
      showToast('error', handleError(res.errors));
    }
    dispatch(setLoading(false));
  };

  // redirect to search page with params "country" for filtering all project belongs to it
  const handleViewAllProject = () => {
    navigate(`/${USER_PATH.SEARCH}?country=${currentCountry.country}`);
  };

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleClickEcoHeros = (item: ProjectModel) => {
    navigate(`/${USER_PATH.SEARCH}?country=${item.country}&project=${item.id}`);
  };

  // const getIntroVideo = async () => {
  //   dispatch(setLoading(true));
  //   const res = (await postsService.getIntroVideo()) as unknown as DataServiceSuccess;
  //   if (res.success) {
  //     setIntroVideo(res.data);
  //   }
  //   dispatch(setLoading(false));
  // };

  const handleWatch = () => {
    setIsWatching(!isWatching);
  };

  useEffect(() => {
    // Change title
    document.title = 'Home - EcoCupid';

    // getIntroVideo();
    getFeaturedCategories();
    handleData();
    getFeaturedProjects();
    handleGetListCountries();
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
