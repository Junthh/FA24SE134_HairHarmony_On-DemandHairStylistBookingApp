import React, { useEffect, useRef, useState } from 'react';
import { BoxEcoHeroes, CustomPopper, FeatureCategoryStyled, HomeStyled } from './styles';
import { Box, Fade, Paper, PopperPlacementType, Typography, useMediaQuery } from '@mui/material';
import Home1 from 'assets/pics/home/home1.svg';
import { ButtonPrimary } from 'pages/common/style/Button';
import { ICONS } from 'configurations/icons';
import * as colors from 'constants/colors';
import CardSlider from './components/CardSlider';
import CardContentImage from 'pages/common/CardContentImage';
import { TextHeaderUnderlineStyled } from 'pages/common/style/TextHeaderUnderline';
import ButtonSwitch from './components/ButtonSwitch';
import PlayerComponent from 'pages/common/PlayerComponent/PlayerComponent';
import { USER_PATH } from 'configurations/paths/paths';
import { SortBy } from 'models/FilterOptions.model';
import { setLoading } from 'redux/Reducer';
import { PostModel, PostTypeEnum, PostsParams } from 'models/Posts.model';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postsService } from 'services/posts.service';
import { DataServiceSuccess, ListServiceSuccess } from 'models/ServiceResponse.model';
import NewestEcoStories from 'pages/common/NewestEcoStories';
// import { ECO_HEROES_DATA } from './mock';
import { TagTextStyled } from 'pages/common/style/TagContent';
import ImageEcoMap from 'assets/pics/home/asian-map.svg';
import CountUp from 'react-countup';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { IMAGES } from 'configurations/images';
import { showToast } from 'components/Common/Toast';
import { handleError } from 'utils/helper';
import { theme } from 'theme';
import { CountriesEnum } from 'models/Country.model';
import ReadMoreReadLess from 'pages/common/ReadMoreReadLess/ReadMoreReadLess';
import Default from 'assets/pics/default.jpeg';
import { ProjectModel } from 'models/ProjectModel';
import { isEmpty } from 'lodash';
import { MAIN_VIDEO } from 'configurations/intro-video';
import { ReactComponent as HairHarmonyHome } from 'assets/pics/home/hair-hamony-home.svg';
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
        <Typography variant="h3" className="header">
          Dịch vụ
        </Typography>
      </Box>
    </HomeStyled>
  );
}
