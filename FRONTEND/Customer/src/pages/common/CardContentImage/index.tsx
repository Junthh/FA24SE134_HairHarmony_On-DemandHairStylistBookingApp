import { Avatar, Box, Rating, Typography, useMediaQuery } from '@mui/material';
import React, { memo } from 'react';
import Default from 'assets/pics/default.jpeg';
import VN from 'assets/pics/VN.png';
import { TagStyled, TagStyledWrapper, TagTextStyled } from '../style/TagContent';
import * as colors from 'constants/colors';
import { CardBoxImageVideo } from './styles';
import { PostModel, PostTypeEnum } from 'models/Posts.model';
import { calculateTimeCreateAt } from 'utils/datetime';
import YoutubePlayer from '../YoutubeVideo/YoutubeVideo';
import { getYoutubeId } from 'utils/helper';
import PlayerComponent from '../PlayerComponent/PlayerComponent';
import DOMPurify from 'dompurify';
import { theme } from 'theme';
import { CountriesEnum, countriesFlag } from 'models/Country.model';
import { ICONS } from 'configurations/icons';
import styled from '@emotion/styled';
interface CardContentImageProps {
  item?: { image: string; name: string; star: number };
  onViewDetail?: (p: PostModel) => void;
}
const CardContentImagesSyled = styled(Box)({
  '& .star': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
function CardContentImage(props: CardContentImageProps) {
  const { item, onViewDetail } = props;
  return (
    <CardContentImagesSyled>
      <Box className="content">
        <img src={item.image} alt="" />
        <Typography fontWeight={600} variant="h3" textAlign={'center'}>
          {item.name}
        </Typography>
        <Box className="star">
          <Typography fontFamily={'GFS Didot !important'} component="legend">
            {item.star.toFixed(1)}
          </Typography>
          &nbsp;&nbsp;
          <Rating precision={0.5} name="read-only" value={item.star} readOnly />
        </Box>
      </Box>
    </CardContentImagesSyled>
  );
}

export default memo(CardContentImage);
