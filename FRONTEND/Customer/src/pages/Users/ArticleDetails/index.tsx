import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';
import * as colors from 'constants/colors';
import { BreadscrumWrap } from 'pages/common/style/BreadscrumbWrap';
import Breadscrumb from 'components/Common/Breadscrumb';
import { USER_PATH } from 'configurations/paths/paths';
import { BoxArticleDetailWrap } from './styles';
import ProjectDocument from 'pages/common/AritcleDocument';
import ReadMoreReadLess from 'pages/common/ReadMoreReadLess/ReadMoreReadLess';
import { ICONS } from 'configurations/icons';
import NationalTag from 'pages/common/NationalTag';
import { TagTextStyled } from 'pages/common/style/TagContent';
import ListEcoFilms from 'pages/common/ListEcoFilms';
import { PostModel, PostTypeEnum } from 'models/Posts.model';
import { calculateTimeCreateAt } from 'utils/datetime';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { postsService } from 'services/posts.service';
import { DataServiceSuccess, ListServiceSuccess } from 'models/ServiceResponse.model';
import DOMPurify from 'dompurify';
import { SortBy } from 'models/FilterOptions.model';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import { theme } from 'theme';
import { TextHeaderUnderlineStyled } from 'pages/common/style/TextHeaderUnderline';
import { CountriesEnum, countriesFlag } from 'models/Country.model';

export default function ArticleDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [article, setArticle] = useState<PostModel>();
  const [relatedPost, setRelatedPost] = useState<ListServiceSuccess>();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { id } = useParams();
  const typeValue = useRef(PostTypeEnum.Post);

  const getDetails = async () => {
    dispatch(setLoading(true));
    let type = PostTypeEnum.Post;
    if (location.pathname.startsWith(`/${USER_PATH.OUR_READER_STORIES}/`)) {
      type = PostTypeEnum.OurReaderStory;
    }
    typeValue.current = type;
    const res = (await postsService.getPostDetail(id, type)) as DataServiceSuccess;
    if (res.success) {
      const detail = res.data as PostModel;
      setArticle(detail);
      await getRelatedPosts(detail.project.id);
    }
    dispatch(setLoading(false));
  };

  const getRelatedPosts = async (projectId: string) => {
    dispatch(setLoading(true));
    const res = (await postsService.getRelatedPosts({ projectId })) as ListServiceSuccess;
    if (res.success) {
      setRelatedPost(res);
    }
    dispatch(setLoading(false));
  };

  // handle view all
  const handleViewAll = (status: SortBy) => {
    let path = `/${USER_PATH.SEARCH}?type=${typeValue.current}`;
    if (status) {
      path += `&sortBy=${status}`;
    }

    if (status === SortBy.MOST_RELAVANT) {
      path += `&isFeature=true`;
    }
    navigate(path);
  };

  useEffect(() => {
    getDetails();

    // scroll top postion
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <BreadscrumWrap>
        <Breadscrumb
          options={[
            {
              label: 'Home',
              url: USER_PATH.HOME,
            },
            {
              label: `${
                typeValue.current === PostTypeEnum.Post ? 'Article Details' : 'Story Details'
              }`,
              url: '',
            },
          ]}
        />
      </BreadscrumWrap>
      <BoxArticleDetailWrap>
        <Box className="content-body1">
          <Box className="content-body1_left">
            <Box className="content-body1_left-title">
              <Typography
                fontSize={isMobile ? 28 : 60}
                fontWeight={isMobile ? 700 : 500}
                lineHeight={isMobile ? '140%' : '124%'}
                color={colors.primary1}
                fontFamily={isMobile ? 'Lato, sans-serif' : 'General Sans'}
              >
                {article?.title}
              </Typography>
            </Box>
            <Box className="content-body1_left-tag">
              <NationalTag
                label={article?.country}
                icon={countriesFlag[article?.country] || CountriesEnum.Vietnam}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                {(article?.tags?.split('&#&') || []).map((a, index) => (
                  <TagTextStyled key={index}>{a}</TagTextStyled>
                ))}
              </Box>
              <Typography color={'#647E9C'} variant="label1">
                {calculateTimeCreateAt(article?.createdAt)}
              </Typography>
            </Box>
            <Box className="content-body1_left-content">
              <Typography
                color={colors.darkBlue600}
                lineHeight={'180%'}
                fontSize={20}
                fontWeight={400}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article?.detail || '') }}
                />
              </Typography>
            </Box>
          </Box>
          <Box className="content-body1_right">
            <Box className="content-body1_right-writer">
              <Avatar sx={{ width: 80, height: 80 }} src={article?.writer?.imageUrl} />
              <Typography variant="h4" fontWeight={700} color={colors.primary1}>
                {article?.writer?.name}
              </Typography>
              <Box display={'flex'} gap="0px 14px">
                {/* <Box display={'flex'} alignItems={'center'} gap={'0px 4px'}>
                  <ICONS.IconLinkedIn width={16} height={16} color={colors.primary1} />
                  <Typography
                    variant="small2"
                    color={colors.darkBlue900}
                    textTransform={'uppercase'}
                  >
                    bryan Young
                  </Typography>
                </Box> */}
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '15px',
                  }}
                >
                  {article?.writer?.email ? (
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '8px',
                      }}
                    >
                      <ICONS.IconEnvelope width={20} height={20} color={colors.primary1} />
                      <Typography
                        variant="small2"
                        color={colors.darkBlue900}
                        textTransform={'uppercase'}
                      >
                        {article.writer.email}
                      </Typography>
                    </Box>
                  ) : (
                    ''
                  )}
                  {article?.writer?.link ? (
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '8px',
                      }}
                    >
                      <ICONS.IconLinkedIn width={20} height={20} color={colors.primary1} />
                      <Typography
                        variant="small2"
                        color={colors.darkBlue900}
                        textTransform={'uppercase'}
                      >
                        {article.writer.link}
                      </Typography>
                    </Box>
                  ) : (
                    ''
                  )}
                </Box>
              </Box>
              {article?.writer?.desc && (
                <ReadMoreReadLess limit={50}>{article?.writer?.desc}</ReadMoreReadLess>
              )}
            </Box>
            <ProjectDocument project={article?.project} type={PostTypeEnum.Post} />
          </Box>
        </Box>
        <Box height={50}></Box>
        <Box className="content-body2">
          {isMobile && (
            <>
              <TextHeaderUnderlineStyled margin={!isMobile ? '' : '0 auto'} color={colors.primary1}>
                Related to
              </TextHeaderUnderlineStyled>
              <TextHeaderUnderlineStyled margin={!isMobile ? '' : '0 auto'} color={colors.primary1}>
                this project
              </TextHeaderUnderlineStyled>
            </>
          )}
          <ListEcoFilms
            title={!isMobile && 'Related to this project'}
            data={relatedPost?.data}
            status={SortBy.MOST_RELAVANT}
            onViewAll={handleViewAll}
          />
        </Box>
        <Box height={120}></Box>
      </BoxArticleDetailWrap>
    </>
  );
}
