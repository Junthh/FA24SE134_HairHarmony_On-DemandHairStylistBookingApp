import React from 'react';
import styled from '@emotion/styled';
import { Box, Typography, useMediaQuery } from '@mui/material';
import * as colors from 'constants/colors';
import { TagTextStyled } from 'pages/common/style/TagContent';
import NationalTag from 'pages/common/NationalTag';
import YoutubePlayer from 'pages/common/YoutubeVideo/YoutubeVideo';
import { PostModel } from 'models/Posts.model';
import { getYoutubeId } from 'utils/helper';
import PlayerComponent from 'pages/common/PlayerComponent/PlayerComponent';
import { USER_PATH } from 'configurations/paths/paths';
import { useNavigate } from 'react-router-dom';
import { theme } from 'theme';
import { CountriesEnum, countriesFlag } from 'models/Country.model';

export const CardSliderStyled = styled(Box)({
  width: '100%',
  '& .video-responsive': {
    height: '700px',
  },
  '& .content': {
    marginTop: 16,
    marginBottom: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
    gap: '16px 0px',
  },
});

interface CardSliderProps {
  item: PostModel;
}

export default function CardSlider({ item }: CardSliderProps) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleViewDetail = () => {
    navigate(`/${USER_PATH.ECOFILMS}/${item.id}`);
  };

  return (
    <CardSliderStyled>
      <Box className="video-responsive">
        {item.isYoutube && <YoutubePlayer youtubeId={getYoutubeId(item.mediaUrl)} />}

        {!item.isYoutube && <PlayerComponent url={item?.mediaUrl} />}
      </Box>
      <Box className="content">
        <Typography
          color={colors.darkBlue900}
          fontSize={isMobile ? 28 : 60}
          fontWeight={isMobile ? 700 : 500}
          lineHeight={isMobile ? '140%' : '124%'}
          fontFamily={isMobile ? 'Lato, sans-serif' : 'General Sans'}
          textAlign={'center'}
          className="multiline-ellipsis"
          sx={{
            '&:hover': {
              textDecorationLine: 'underline',
              cursor: 'pointer',
            },
          }}
          onClick={handleViewDetail}
        >
          {item?.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {(item?.tags?.split('&#&') || []).map((a, index) => (
            <TagTextStyled key={index}>{a}</TagTextStyled>
          ))}
        </Box>
        <NationalTag label={item?.country} icon={countriesFlag[item?.country] || CountriesEnum.Vietnam} />
      </Box>
    </CardSliderStyled>
  );
}
