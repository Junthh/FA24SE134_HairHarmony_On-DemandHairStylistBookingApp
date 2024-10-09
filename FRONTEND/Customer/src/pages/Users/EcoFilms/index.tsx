import React, { useEffect, useState } from 'react';
import HeaderEcoFilms from './components/HeaderEcoFilms';
import { Box } from '@mui/material';
import { BreadscrumWrap } from 'pages/common/style/BreadscrumbWrap';
import Breadscrumb from 'components/Common/Breadscrumb';
import { USER_PATH } from 'configurations/paths/paths';
import { EcoFilmsStyled } from './styles';
import ListEcoFilms from '../../common/ListEcoFilms';
import { useNavigate } from 'react-router-dom';
import { SortBy } from 'models/FilterOptions.model';
import { useDispatch } from 'react-redux';
import { PostModel, PostTypeEnum, PostsParams } from 'models/Posts.model';
import { ListServiceSuccess } from 'models/ServiceResponse.model';
import { setLoading } from 'redux/Reducer';
import { postsService } from 'services/posts.service';

interface EcoFilmsPosts {
  newest: PostModel[];
  mostViewed: PostModel[];
  featured: PostModel[];
}

const initEcoFilmsPosts: EcoFilmsPosts = {
  newest: [],
  featured: [],
  mostViewed: [],
};

export default function EcoFilms() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<EcoFilmsPosts>(initEcoFilmsPosts);

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
    // newest posts
    const newestP = await getPosts({
      type: PostTypeEnum.Video,
      sort: SortBy.NEWEST,
      page: 1,
      perPage: 3,
    });
    setPosts((prev) => ({ ...prev, newest: newestP }));

    // most-viewed
    const mostViewedP = await getPosts({
      type: PostTypeEnum.Video,
      sort: SortBy.MOST_VIEWED,
      page: 1,
      perPage: 4,
    });
    setPosts((prev) => ({ ...prev, mostViewed: mostViewedP }));

    // featured
    const featuredP = await getPosts({
      type: PostTypeEnum.Video,
      isFeature: true,
      page: 1,
      perPage: 3,
    });
    setPosts((prev) => ({ ...prev, featured: featuredP }));
  };

  const handleViewAll = (status: SortBy) => {
    let path = `/${USER_PATH.SEARCH}?type=${PostTypeEnum.Video}`;
    if (status) {
      path += `&sortBy=${status}`;
    }

    if (status === SortBy.MOST_RELAVANT) {
      path += `&isFeature=true`;
    }
    navigate(path);
  };

  useEffect(() => {
    // Change title
    document.title = `EcoFilms - EcoCupid`;

    handleData();
  }, []);

  return (
    <Box>
      <BreadscrumWrap>
        <Breadscrumb
          options={[
            {
              label: 'Home',
              url: USER_PATH.HOME,
            },
            {
              label: 'Eco-Films',
              url: '',
            },
          ]}
        />
      </BreadscrumWrap>
      <EcoFilmsStyled>
        <HeaderEcoFilms data={posts.mostViewed} />
        <Box height={80}></Box>
        <ListEcoFilms
          title="Latest Eco-Films"
          onViewAll={handleViewAll}
          status={SortBy.NEWEST}
          data={posts.newest}
        />
        <Box height={80}></Box>
        <ListEcoFilms
          title="Featured Eco-Films"
          isFeatureTitle={false}
          onViewAll={handleViewAll}
          status={SortBy.MOST_RELAVANT}
          data={posts.featured}
        />
      </EcoFilmsStyled>
    </Box>
  );
}
