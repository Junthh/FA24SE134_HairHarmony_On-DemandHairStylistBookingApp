import React, { useEffect, useState } from 'react';
import { ContainerBodyWrap } from './styles';
import { BreadscrumWrap } from 'pages/common/style/BreadscrumbWrap';
import Breadscrumb from 'components/Common/Breadscrumb';
import { USER_PATH } from 'configurations/paths/paths';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { TagTextStyled } from 'pages/common/style/TagContent';
import NationalTag from 'pages/common/NationalTag';
import * as colors from 'constants/colors';
import ProjectDocument from 'pages/common/AritcleDocument';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import { postsService } from 'services/posts.service';
import { PostModel, PostTypeEnum } from 'models/Posts.model';
import { DataServiceSuccess } from 'models/ServiceResponse.model';
import { useNavigate, useParams } from 'react-router-dom';
import { calculateTimeCreateAt } from 'utils/datetime';
import DOMPurify from 'dompurify';
import YoutubePlayer from 'pages/common/YoutubeVideo/YoutubeVideo';
import PlayerComponent from 'pages/common/PlayerComponent/PlayerComponent';
import { getYoutubeId } from 'utils/helper';
import { theme } from 'theme';
import { CountriesEnum, countriesFlag } from 'models/Country.model';

export default function EcoFilmDetails() {
  const dispatch = useDispatch();
  const [article, setArticle] = useState<PostModel>();
  const { id } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate()
  const getDetails = async () => {
    dispatch(setLoading(true));
    const res = (await postsService.getPostDetail(id, PostTypeEnum.Video)) as DataServiceSuccess;
    if (res.success) {
      setArticle(res.data as PostModel);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    getDetails();

    // scroll top postion
    window.scrollTo(0, 0);
  }, []);
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
              label: 'Eco-film Details',
              url: '',
            },
          ]}
        />
      </BreadscrumWrap>
      <ContainerBodyWrap>
        <Box className="video-responsive">
          {article?.isYoutube && (
            <YoutubePlayer youtubeId={getYoutubeId(article?.mediaUrl)} style={{ height: '100%' }} />
          )}

          {!article?.isYoutube && <PlayerComponent url={article?.mediaUrl} />}
        </Box>
        <Box className="content-body">
          <Box className="content-body_left">
            <Typography
              fontSize={isMobile ? 28 : 60}
              fontWeight={isMobile ? 700 : 500}
              lineHeight={isMobile ? '140%' : '124%'}
              color={colors.primary1}
              fontFamily={isMobile ? 'Lato, sans-serif' : 'General Sans'}
            >
              {article?.title}
            </Typography>
            <Box className="content-tag">
              <NationalTag label={article?.country} icon={countriesFlag[article?.country] || CountriesEnum.Vietnam} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                {(article?.tags?.split('&#&') || []).map((a, index) => (
                  <TagTextStyled key={index}>{a}</TagTextStyled>
                ))}
              </Box>
              <Typography color={'#647E9C'} variant="label1">
                {calculateTimeCreateAt(article?.createdAt)}
              </Typography>
            </Box>
            <Box className="content-description">
              <Typography variant="h2" fontWeight={700} color={colors.primary1}>
                Description
              </Typography>
              <Box height={24}></Box>
              <Typography
                lineHeight={'180%'}
                color={colors.darkBlue600}
                fontSize={20}
                fontWeight={400}
                marginBottom={'15px'}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article?.detail || '') }}
                />
              </Typography>
            </Box>
          </Box>
          <Box className="content-body_right" >
            <ProjectDocument project={article?.project} type={PostTypeEnum.Video} />
          </Box>
        </Box>
      </ContainerBodyWrap>
    </>
  );
}
