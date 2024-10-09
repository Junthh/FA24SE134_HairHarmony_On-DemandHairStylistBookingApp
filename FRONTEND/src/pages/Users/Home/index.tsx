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

  // Hook change for list 1
  useEffect(() => {
    const containerWidth = containerList1Ref.current.clientWidth;
    const contentWidth = contentList1Ref.current.clientWidth;
    // Only show scroll in mode phone
    if (contentWidth > containerWidth) {
      containerList1Ref.current.scrollLeft = (contentWidth - containerWidth) / 2 - 50;
    }
  }, [contentList1Ref.current?.clientWidth, containerList2Ref.current?.clientWidth]);

  // Hook change for list 2
  useEffect(() => {
    const containerWidth = containerList2Ref.current.clientWidth;
    const contentWidth = contentList2Ref.current.clientWidth;
    let gap = 0;
    if (contentWidth > containerWidth) {
      if (isMobile) {
        gap = 50;
      }
      containerList2Ref.current.scrollLeft = (contentWidth - containerWidth) / 2 - gap;
    }
  }, [contentList2Ref.current?.clientWidth, containerList2Ref.current?.clientWidth]);

  return (
    <HomeStyled>
      <Box className="home_watching">
        {isWatching && (
          <Box className="home_watching-player">
            <PlayerComponent
              url={''}
              height={isMobile ? '500px' : '80vh'}
              controls={true}
              playing={isWatching}
            />
          </Box>
        )}
        {!isWatching && (
          <Box>
            <Box className="home_watching-player">
              <img
                src={MAIN_VIDEO.INTRO_THUMBNAIL}
                alt=""
                className="image-fit-center"
                style={{
                  width: '100%',
                  height: isMobile ? '500px' : '80vh',
                  borderRadius: '24px',
                }}
              />
            </Box>
            {!isMobile ? (
              <Box className="home_watching-content">
                <Typography className="home_watching-content-title">We Are EcoCupid</Typography>
                {/* <Typography className="home_watching-content-title">Thant Myanmar's</Typography> */}
                {/* <Typography className="home_watching-content-title">Myanmar's</Typography>
                <Typography className="home_watching-content-title">Guide to Setting</Typography>
                <Typography className="home_watching-content-title">Up Sustainable</Typography> */}
                <Box className="home_watching-button" onClick={handleWatch}>
                  WATCH NOW &nbsp; <ICONS.IconArrowRight />
                </Box>
              </Box>
            ) : (
              <Box className="home_watching-content">
                <Typography className="home_watching-content-title">We Are EcoCupid</Typography>
                {/* <Typography className="home_watching-content-title">Thant Myanmar's</Typography>
                <Typography className="home_watching-content-title">Guide to Setting</Typography>
                <Typography className="home_watching-content-title">Up Sustainable</Typography> */}
                <Box className="home_watching-button" onClick={handleWatch}>
                  WATCH NOW &nbsp; <ICONS.IconArrowRight />
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Box className="home_eco-films">
        <Box color={colors.primary1}>
          <ICONS.IconFilmSlate />
        </Box>
        <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
          Our Eco-Films
        </TextHeaderUnderlineStyled>
        <Box className="home_eco-films-wrap">
          <Box className="container-list1" ref={containerList1Ref}>
            <Box className="list1" ref={contentList1Ref}>
              {posts?.ecoFilms.slice(0, 4).map((p) => (
                <Box className="item" key={p.id}>
                  <img
                    src={p?.thumbnailUrl ? p?.thumbnailUrl : Default}
                    alt=""
                    className="image-item"
                  />
                  <Box className="image-btnplay" onClick={() => handleGetDetail(p)}>
                    <ICONS.IconPlayFill />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Box className="container-list2" ref={containerList2Ref}>
            <Box className="list2" ref={contentList2Ref}>
              {posts?.ecoFilms.slice(4, 9).map((p) => (
                <Box className="item" key={p.id}>
                  <img
                    src={p?.thumbnailUrl ? p?.thumbnailUrl : Default}
                    alt=""
                    className="image-item"
                  />
                  <Box className="image-btnplay" onClick={() => handleGetDetail(p)}>
                    <ICONS.IconPlayFill />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <ButtonPrimary
          padding={'10px 28px'}
          margin={'0 auto'}
          onClick={() => navigate(`/${USER_PATH.ECOFILMS}`)}
          severity="primary"
          borderradius={40}
          texttransform={'uppercase'}
        >
          View All &nbsp; <ICONS.IconArrowRight />
        </ButtonPrimary>
      </Box>
      <Box className="home_newest-eco-stories">
        <NewestEcoStories
          // color={colors.primary1}
          // background={colors.primary4}
          textColor={colors.a1}
          tagColor={colors.a1}
          posts={posts}
          handleGetDetail={handleGetDetail}
          handleViewAll={() => navigate(`/${USER_PATH.ECO_STORIES}`)}
        />
      </Box>
      <Box>
        <Box className="home_eco-heroes">
          <Box className="title">
            {
              <TextHeaderUnderlineStyled color={colors.primary1} fontSize={'60px'}>
                Eco-Heroes
              </TextHeaderUnderlineStyled>
            }
          </Box>
          <Box height={8}></Box>
          <Typography
            fontWeight={700}
            variant="h4"
            textAlign={!isMobile ? 'start' : 'center'}
            color={colors.darkBlue400}
          >
            Be inspired by the amazing people saving the environment today!
          </Typography>
          <Box height={40}></Box>
          <Box className="home_eco-heroes-list">
            {ecoHeroes.map((item) => {
              return (
                <BoxEcoHeroes key={item.id}>
                  <Box className="image-eco" onClick={() => handleClickEcoHeros(item)}>
                    <img src={item.imageUrl} alt="" />
                  </Box>
                  <Box className="eco-text">
                    <TagTextStyled>
                      {item.qtyArticle + item.qtyVideo} Articles and documentaries
                    </TagTextStyled>
                    <Typography
                      color={colors.darkBlue600}
                      fontWeight={700}
                      fontSize={!isMobile ? 24 : 20}
                      variant="h4"
                      className="multiline-ellipsis"
                      sx={{
                        marginTop: !isMobile ? '16px' : '0px',
                        cursor: 'pointer',
                        '&:hover': {
                          textDecorationLine: 'underline',
                        },
                      }}
                      onClick={() => handleClickEcoHeros(item)}
                    >
                      {item.title}
                    </Typography>
                    {item?.detail && !isOtherScreen && (
                      <Box>
                        <Typography color={colors.darkBlue500} fontWeight={700} fontSize={18}>
                          Description
                        </Typography>
                        <ReadMoreReadLess limit={80}>{item?.detail}</ReadMoreReadLess>
                      </Box>
                    )}
                  </Box>
                </BoxEcoHeroes>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Box>
        <Box className="home_eco-map">
          <img width={1110} src={ImageEcoMap} alt="" />
          <Box className="title">
            <Typography color={'#FEFBEB'} fontSize={60} fontWeight={500} lineHeight={'78px'}>
              Discover Eco-Projects in Southeast Asia
            </Typography>
            <CountUp
              start={0}
              end={totalProject}
              duration={1.5}
              separator=","
              // suffix={'+'}
              enableScrollSpy
            >
              {({ countUpRef }) => (
                <div>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 700, fontSize: '38px', lineHeight: '53.2px' }}
                    color={colors.primary4}
                    ref={countUpRef}
                  />
                </div>
              )}
            </CountUp>
            <Typography color={colors.white} variant="h5">
              Projects that EcoCupid featured
            </Typography>
          </Box>
          <Box className="map-after" width={1110}></Box>
          <Box className="map" width={1110}>
            <Box className="icon-wrap">
              <CustomPopper open={open} anchorEl={anchorEl} placement={placement} transition>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                      <Typography variant="h3" fontWeight={700} color={colors.darkBlue900}>
                        {currentCountry?.country}
                      </Typography>
                      {currentCountry?.imageUrls?.length ? (
                        <TagTextStyled>{currentCountry?.qty + ' project(s)'}</TagTextStyled>
                      ) : (
                        <TagTextStyled>No project</TagTextStyled>
                      )}

                      <Box className="image-list">
                        {currentCountry.imageUrls.map((item, index) => (
                          <img key={index} width={79} height={62} src={item} alt="" />
                        ))}
                      </Box>

                      {currentCountry?.imageUrls?.length ? (
                        <ButtonPrimary
                          padding={'10px 28px'}
                          margin={'0 auto'}
                          severity="primary"
                          borderradius={40}
                          texttransform={'uppercase'}
                          onClick={handleViewAllProject}
                        >
                          View all &nbsp; <ICONS.IconArrowRight />
                        </ButtonPrimary>
                      ) : (
                        ''
                      )}
                    </Paper>
                  </Fade>
                )}
              </CustomPopper>
              <img src={ImageEcoMap} alt="" />
              <Box className="icon-vn">
                <Badge
                  overlap="circular"
                  badgeContent={(countries && countries[CountriesEnum.Vietnam].qty) || 0}
                  color="primary"
                >
                  <IconButton
                    onClick={handleClick(!isMobile ? 'right' : 'top', CountriesEnum.Vietnam)}
                  >
                    <img src={IMAGES.VN} alt="" />
                  </IconButton>
                </Badge>
              </Box>
              <Box className="icon-my">
                <Badge
                  overlap="circular"
                  badgeContent={(countries && countries[CountriesEnum.Malaysia].qty) || 0}
                  color="primary"
                >
                  <IconButton
                    onClick={handleClick(!isMobile ? 'right' : 'top', CountriesEnum.Malaysia)}
                  >
                    <img src={IMAGES.MY} alt="" />
                  </IconButton>
                </Badge>
              </Box>
              <Box className="icon-mm">
                <Badge
                  overlap="circular"
                  badgeContent={(countries && countries[CountriesEnum.Myanmar].qty) || 0}
                  color="primary"
                >
                  <IconButton
                    onClick={handleClick(!isMobile ? 'right' : 'top', CountriesEnum.Myanmar)}
                  >
                    <img src={IMAGES.MM} alt="" />
                  </IconButton>
                </Badge>
              </Box>
              <Box className="icon-la">
                <Badge
                  overlap="circular"
                  badgeContent={(countries && countries[CountriesEnum.Laos].qty) || 0}
                  color="primary"
                >
                  <IconButton
                    onClick={handleClick(!isMobile ? 'right' : 'top', CountriesEnum.Laos)}
                  >
                    <img src={IMAGES.LA} alt="" />
                  </IconButton>
                </Badge>
              </Box>
              <Box className="icon-th">
                <Badge
                  overlap="circular"
                  badgeContent={(countries && countries[CountriesEnum.Thailand].qty) || 0}
                  color="primary"
                >
                  <IconButton
                    onClick={handleClick(!isMobile ? 'right' : 'top', CountriesEnum.Thailand)}
                  >
                    <img src={IMAGES.TH} alt="" />
                  </IconButton>
                </Badge>
              </Box>
              <Box className="icon-kh">
                <Badge
                  overlap="circular"
                  badgeContent={(countries && countries[CountriesEnum.Cambodia].qty) || 0}
                  color="primary"
                >
                  <IconButton
                    onClick={handleClick(!isMobile ? 'right' : 'top', CountriesEnum.Cambodia)}
                  >
                    <img src={IMAGES.KH} alt="" />
                  </IconButton>
                </Badge>
              </Box>
              <Box className="icon-sg">
                <Badge
                  overlap="circular"
                  badgeContent={(countries && countries[CountriesEnum.Singapore].qty) || 0}
                  color="primary"
                >
                  <IconButton
                    onClick={handleClick(!isMobile ? 'right' : 'top', CountriesEnum.Singapore)}
                  >
                    <img src={IMAGES.SG} alt="" />
                  </IconButton>
                </Badge>
              </Box>
              <Box className="icon-ph">
                <Badge
                  overlap="circular"
                  badgeContent={(countries && countries[CountriesEnum.Philippines].qty) || 0}
                  color="primary"
                >
                  <IconButton
                    onClick={handleClick(!isMobile ? 'right' : 'top', CountriesEnum.Philippines)}
                  >
                    <img src={IMAGES.PH} alt="" />
                  </IconButton>
                </Badge>
              </Box>
              <Box className="icon-bn">
                <Badge
                  overlap="circular"
                  badgeContent={(countries && countries[CountriesEnum.Brunei].qty) || 0}
                  color="primary"
                >
                  <IconButton
                    onClick={handleClick(!isMobile ? 'right' : 'top', CountriesEnum.Brunei)}
                  >
                    <img src={IMAGES.BN} alt="" />
                  </IconButton>
                </Badge>
              </Box>
              <Box className="icon-id">
                <Badge
                  overlap="circular"
                  badgeContent={(countries && countries[CountriesEnum.Indonesia].qty) || 0}
                  color="primary"
                >
                  <IconButton
                    onClick={handleClick(!isMobile ? 'right' : 'top', CountriesEnum.Indonesia)}
                  >
                    <img src={IMAGES.ID} alt="" />
                  </IconButton>
                </Badge>
              </Box>
              <Box className="icon-tl">
                <Badge
                  overlap="circular"
                  badgeContent={(countries && countries[CountriesEnum.TimorLeste].qty) || 0}
                  color="primary"
                >
                  <IconButton
                    onClick={handleClick(!isMobile ? 'right' : 'top', CountriesEnum.TimorLeste)}
                  >
                    <img src={IMAGES.TL} alt="" />
                  </IconButton>
                </Badge>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="feature-category">
        {!isMobile ? (
          <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1} fontSize={'60px'}>
            Featured categories
          </TextHeaderUnderlineStyled>
        ) : (
          <Box>
            <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
              Featured
            </TextHeaderUnderlineStyled>
            <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
              categories
            </TextHeaderUnderlineStyled>
          </Box>
        )}

        <Box className="button-switch">
          <ButtonSwitch data={featuredCategories} onSelectedValue={getFeaturedCategories} />
        </Box>
        <FeatureCategoryStyled>
          {posts.featuredCategories.map((p, index) => (
            <Box
              key={p.id}
              className={`${
                !isMobile && (index === 1 || posts.featuredCategories.length < 3)
                  ? 'feature-special'
                  : 'feature'
              }`}
            >
              <CardContentImage
                item={p}
                onViewDetail={() => handleGetDetail(p)}
                size={`${
                  !isMobile && index === 1 && posts.featuredCategories.length >= 3
                    ? 'large'
                    : 'medium'
                }`}
              />
            </Box>
          ))}
        </FeatureCategoryStyled>
        <ButtonPrimary
          padding={'10px 28px'}
          margin={'0 auto'}
          severity="primary"
          borderradius={40}
          texttransform={'uppercase'}
          onClick={() => handleViewAll(SortBy.MOST_RELAVANT, PostTypeEnum.All, true)}
        >
          View All &nbsp; <ICONS.IconArrowRight />
        </ButtonPrimary>
      </Box>

      <Box className="card-reader_stories">
        {!isMobile ? (
          <TextHeaderUnderlineStyled color={colors.primary1} fontSize={'60px'} paddingLeft={'20px'}>
            Ours Readers’ stories
          </TextHeaderUnderlineStyled>
        ) : (
          <Box>
            <TextHeaderUnderlineStyled color={colors.primary1} paddingLeft={'20px'}>
              Ours Readers’
            </TextHeaderUnderlineStyled>
            <TextHeaderUnderlineStyled color={colors.primary1} paddingLeft={'20px'}>
              stories
            </TextHeaderUnderlineStyled>
          </Box>
        )}
        <CardSlider
          onClickViewAll={() => navigate(`/${USER_PATH.OUR_READER_STORIES}`)}
          datas={posts.ourStories}
        />
      </Box>
      <Box className="footer_home-content">
        <img src={Home1} alt="" />
        <Typography variant="h1" fontSize={60} color={colors.primary4} fontWeight={500}>
          What is EcoCupid?
        </Typography>
        <Typography variant="h3" fontWeight={700} color={'#FEFBEB'}>
          An environmentalist-focused social network platform that curates inspirational projects
          and educational content through multilingual media.
        </Typography>
        <ButtonPrimary
          onClick={() => {
            openInNewTab('https://forms.gle/9wdWaL6p7hbRWHaa6');
          }}
          padding={'10px 28px'}
          margin={'0 auto'}
          severity="primary"
          borderradius={40}
        >
          Partner with us now &nbsp; <ICONS.IconArrowRight />
        </ButtonPrimary>
      </Box>
    </HomeStyled>
  );
}
