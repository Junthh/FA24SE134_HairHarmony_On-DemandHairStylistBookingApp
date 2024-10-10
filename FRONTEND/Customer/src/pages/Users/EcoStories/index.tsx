import { Box, useMediaQuery } from '@mui/material';
import Breadscrumb from 'components/Common/Breadscrumb';
import { USER_PATH } from 'configurations/paths/paths';
import { BreadscrumWrap } from 'pages/common/style/BreadscrumbWrap';
import React, { useEffect, useState } from 'react';
import { EcoStoriesContainerStyled, FeatureEcoStyled } from './styles';
import { ButtonPrimary } from 'pages/common/style/Button';
import { ICONS } from 'configurations/icons';
import { TextHeaderUnderlineStyled } from 'pages/common/style/TextHeaderUnderline';
import * as colors from 'constants/colors';
import Grid from '@mui/material/Grid';
import CardContentImage from 'pages/common/CardContentImage';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import { SortBy } from 'models/FilterOptions.model';
import { PostModel, PostTypeEnum, PostsParams } from 'models/Posts.model';
import { postsService } from 'services/posts.service';
import { ListServiceSuccess } from 'models/ServiceResponse.model';
import { useNavigate } from 'react-router-dom';
import NewestEcoStories from 'pages/common/NewestEcoStories';
import { theme } from 'theme';

export interface EcoStoriesPosts {
  newest: PostModel[];
  mostViewed: PostModel[];
  featured: PostModel[];
}

export const initEcoStoriesPosts: EcoStoriesPosts = {
  newest: [],
  mostViewed: [],
  featured: [],
};

export default function EcoStories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [posts, setPosts] = useState<EcoStoriesPosts>(initEcoStoriesPosts);

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
      type: PostTypeEnum.Post,
      sort: SortBy.NEWEST,
      page: 1,
      perPage: 5,
    });
    setPosts((prev) => ({ ...prev, newest: newestP }));

    // most-viewed
    const mostViewedP = await getPosts({
      type: PostTypeEnum.Post,
      sort: SortBy.MOST_VIEWED,
      page: 1,
      perPage: 3,
    });
    setPosts((prev) => ({ ...prev, mostViewed: mostViewedP }));

    // featured
    const featuredP = await getPosts({
      type: PostTypeEnum.Post,
      isFeature: true,
      page: 1,
      perPage: 3,
    });
    setPosts((prev) => ({ ...prev, featured: featuredP }));
  };

  // handle view all
  const handleViewAll = (status: SortBy) => {
    let path = `/${USER_PATH.SEARCH}?type=${PostTypeEnum.Post}`;
    if (status) {
      path += `&sortBy=${status}`;
    }

    if (status === SortBy.MOST_RELAVANT) {
      path += `&isFeature=true`;
    }
    navigate(path);
  };

  // handle get detail
  const handleGetDetail = (p: PostModel) => {
    navigate(`/${USER_PATH.ECO_STORIES}/${p.id}`);
  };

  useEffect(() => {
    // Change title
    document.title = `EcoStories - EcoCupid`;

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
              label: 'Eco-Stories',
              url: '',
            },
          ]}
        />
      </BreadscrumWrap>
      <EcoStoriesContainerStyled>
        <NewestEcoStories
          posts={posts}
          handleGetDetail={handleGetDetail}
          handleViewAll={handleViewAll}
          textColor={colors.a1}
          tagColor={colors.a1}
        />

        <Box height={120}></Box>

        {/* Impactful Eco-Stories */}
        <Box
          className="title"
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          {!isMobile ? (
            <TextHeaderUnderlineStyled color={colors.primary1}>
              Impactful Eco-Stories
            </TextHeaderUnderlineStyled>
          ) : (
            <Box margin={'0 auto'}>
              <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
                Impactful
              </TextHeaderUnderlineStyled>
              <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
                Eco-Stories
              </TextHeaderUnderlineStyled>
            </Box>
          )}
          {!isMobile && (
            <ButtonPrimary
              padding={'10px 28px'}
              severity="primary"
              borderradius={40}
              texttransform={'uppercase'}
              fontWeight={700}
              onClick={() => handleViewAll(SortBy.MOST_VIEWED)}
            >
              View all &nbsp; <ICONS.IconArrowRight />
            </ButtonPrimary>
          )}
        </Box>
        <Box height={24}></Box>
        <Grid container spacing={4}>
          {posts.mostViewed.map((p) => (
            <Grid key={p.id} item xs={!isMobile ? 4 : 12}>
              <CardContentImage item={p} onViewDetail={handleGetDetail} />
            </Grid>
          ))}
        </Grid>
        {isMobile && (
          <>
            <Box height={44}></Box>
            <ButtonPrimary
              padding={'10px 28px'}
              margin={'0 auto'}
              severity="primary"
              borderradius={40}
              texttransform={'uppercase'}
              fontWeight={700}
              onClick={() => handleViewAll(SortBy.MOST_VIEWED)}
            >
              View all &nbsp; <ICONS.IconArrowRight />
            </ButtonPrimary>
          </>
        )}
        <Box height={120}></Box>

        {/* Featured Eco-Stories */}
        <Box className="title">
          {!isMobile ? (
            <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
              Featured Eco-Stories
            </TextHeaderUnderlineStyled>
          ) : (
            <Box margin={'0 auto'}>
              <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
                Featured
              </TextHeaderUnderlineStyled>
              <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
                Eco-Stories
              </TextHeaderUnderlineStyled>
            </Box>
          )}
        </Box>
        <Box height={60}></Box>
        <FeatureEcoStyled>
          {posts.featured.map((p, index) => (
            <Box
              key={p.id}
              className={`${
                !isMobile && (index === 1 || posts.featured.length < 3)
                  ? 'feature-special'
                  : 'feature'
              }`}
            >
              <CardContentImage
                item={p}
                onViewDetail={handleGetDetail}
                size={`${
                  !isMobile && index === 1 && posts.featured.length >= 3 ? 'large' : 'medium'
                }`}
              />
            </Box>
          ))}
        </FeatureEcoStyled>
        <ButtonPrimary
          padding={'10px 28px'}
          severity="primary"
          borderradius={40}
          texttransform={'uppercase'}
          margin={'0 auto'}
          fontWeight={700}
          onClick={() => handleViewAll(SortBy.MOST_RELAVANT)}
        >
          View all &nbsp; <ICONS.IconArrowRight />
        </ButtonPrimary>

        <Box height={120}></Box>
      </EcoStoriesContainerStyled>
    </Box>
  );
}
