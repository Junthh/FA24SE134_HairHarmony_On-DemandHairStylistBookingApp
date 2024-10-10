import React, { useEffect, useState } from 'react';
import { Box, Grid, useMediaQuery } from '@mui/material';
import { BreadscrumWrap } from 'pages/common/style/BreadscrumbWrap';
import Breadscrumb from 'components/Common/Breadscrumb';
import { USER_PATH } from 'configurations/paths/paths';
import { ContainerBodyStyled } from './styles';
import { TextHeaderUnderlineStyled } from 'pages/common/style/TextHeaderUnderline';
import * as colors from 'constants/colors';
import { ButtonPrimary } from 'pages/common/style/Button';
import CardContentImage from 'pages/common/CardContentImage';
import useSearchParamsFilter from 'hooks/useSearchParamsFilter';
import PaginationComponent from 'components/Common/Pagination/Pagination';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import { postsService } from 'services/posts.service';
import { PostModel, PostTypeEnum, PostsParams } from 'models/Posts.model';
import { ListServiceSuccess } from 'models/ServiceResponse.model';
import { SortBy } from 'models/FilterOptions.model';
import { PaginationConfig } from 'configurations/constants/globalConstants';
import { useNavigate } from 'react-router-dom';
import { theme } from 'theme';

export default function OurReaderStories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [posts, setPosts] = useState<ListServiceSuccess>();
  const { filter: pageIndex, handleFilterChange: handleChangePageIndex } = useSearchParamsFilter({
    defaultValue: '',
    paramName: 'pageIndex',
  });

  const getPosts = async (params?: PostsParams) => {
    dispatch(setLoading(true));
    const resService = (await postsService.list(params)) as any as ListServiceSuccess;
    if (resService.success) {
      setPosts(resService);
    } else {
      // error
    }
    dispatch(setLoading(false));
  };

  const handleViewDetail = (p: PostModel) => {
    navigate(`/${USER_PATH.OUR_READER_STORIES}/${p.id}`);
  };
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  useEffect(() => {
    // Change title
    document.title = `Our Reader’s Stories - EcoCupid`;
  });

  useEffect(() => {
    getPosts({
      page: pageIndex || PaginationConfig.PageIndex,
      perPage: 16,
      type: PostTypeEnum.OurReaderStory,
      sort: SortBy.NEWEST,
    });
  }, [pageIndex]);

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
              label: 'Our Reader’s Stories',
              url: '',
            },
          ]}
        />
      </BreadscrumWrap>
      <ContainerBodyStyled>
        {!isMobile ? (
          <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
            Our Reader’s Stories
          </TextHeaderUnderlineStyled>
        ) : (
          <Box margin={'0 auto'}>
            <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
              Our Reader’s
            </TextHeaderUnderlineStyled>
            <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
              Stories
            </TextHeaderUnderlineStyled>
          </Box>
        )}

        <Box height={40}></Box>
        <Box height={30}></Box>
        <ButtonPrimary
          margin={'0px auto'}
          padding={'10px 28px'}
          severity="primary"
          borderradius={40}
          texttransform={'uppercase'}
          fontWeight={700}
          onClick={() => openInNewTab('https://forms.gle/w1wFXfVuc8Gnnjbq7')}
        >
          Pitch us your story
        </ButtonPrimary>
        <Box className="item-list">
          {/* <Grid container spacing={4}>
            {((posts?.data as PostModel[]) || []).map((p) => (
              <Grid item xs={!isMobile ? 3 : 12} key={p.id}>
                <CardContentImage
                  size={!isMobile ? 'small' : 'medium'}
                  showCategory={false}
                  item={p}
                  onViewDetail={handleViewDetail}
                ></CardContentImage>
              </Grid>
            ))}
          </Grid> */}
        </Box>
        <PaginationComponent
          page={pageIndex || PaginationConfig.PageIndex}
          pageSize={posts?.meta?.totalPages || PaginationConfig.TotalPages}
          onChangePaging={(value: any) => {
            handleChangePageIndex(value);
          }}
        />
      </ContainerBodyStyled>
    </Box>
  );
}
