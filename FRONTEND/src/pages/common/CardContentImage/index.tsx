import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';
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

interface CardContentImageProps {
  item?: PostModel;
  titleTextColor?: string;
  onViewDetail?: (p: PostModel) => void;
  showCategory?: boolean;
  size?: 'small' | 'medium' | 'large';
  isOurReaderStories?: boolean;
}

function CardContentImage(props: CardContentImageProps) {
  const {
    item,
    titleTextColor = colors.darkBlue900,
    onViewDetail,
    showCategory = true,
    size = 'medium',
    isOurReaderStories = false,
  } = props;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleViewDetail = (p: PostModel) => {
    onViewDetail(p);
  };

  const handleClickPlay = () => {
    onViewDetail(item);
  };

  return (
    <CardBoxImageVideo type={item?.type} size={size}>
      <Box className="image-header">
        {/* {item.type === PostTypeEnum.Video && item.isYoutube && (
          <Box className="image-header-video">
            <YoutubePlayer youtubeId={getYoutubeId(item.mediaUrl)} />
          </Box>
        )} */}

        {/* {item.type === PostTypeEnum.Video && !item.isYoutube && (
          <Box className="image-header-video">
            <PlayerComponent url={item?.mediaUrl} />
          </Box>
        )} */}

        {item.type === PostTypeEnum.Video && (
          <img
            src={item?.thumbnailUrl ? item?.thumbnailUrl : Default}
            alt=""
            className="image-header-item image-fit-center"
          />
        )}

        {(item.type === PostTypeEnum.Post || item.type === PostTypeEnum.OurReaderStory) && (
          <img
            src={item?.mediaUrl ? item?.mediaUrl : Default}
            alt=""
            className="image-header-item image-fit-center"
          />
        )}

        <Box className="image-header-national">
          <img src={countriesFlag[item.country] || CountriesEnum.Vietnam} alt="" />
        </Box>
        {item?.type === PostTypeEnum.Video ? (
          <Box className="image-header-btnplay" onClick={handleClickPlay}>
            <ICONS.IconPlayFill />
          </Box>
        ) : (
          <></>
        )}
      </Box>
      <Box className="tag-container">
        <Box className="tag">
          {showCategory && item?.category?.name && (
            <TagStyledWrapper catesColor={item?.category?.color}>
              <TagStyled catesColor={item?.category?.color}>{item?.category?.name}</TagStyled>
            </TagStyledWrapper>
          )}
          {(item?.tags?.split('&#&') || []).map((a, index) => (
            <TagTextStyled key={index}>{a}</TagTextStyled>
          ))}
          {/* {isMobile && (item?.tags?.split('&#&')?.length || 0) > 1 ? (
            <span className="dots">...</span>
          ) : (
            <></>
          )} */}
        </Box>
      </Box>

      <Box className="content">
        <div className="content-title">
          <Typography
            variant="h3"
            fontWeight={700}
            color={titleTextColor}
            className="multiline-ellipsis"
            onClick={() => handleViewDetail(item)}
            sx={{
              '&:hover': {
                textDecorationLine: 'underline',
                cursor: 'pointer',
              },
            }}
          >
            {item?.title}
          </Typography>
        </div>

        {item?.shortDesc && (
          <Typography
            className="content-detail multiline-ellipsis"
            variant="subtitle1"
            color={titleTextColor}
            sx={{ marginTop: '4px' }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.shortDesc || '') }}
              className="multiline-ellipsis"
            />
          </Typography>
        )}
      </Box>

      <Box className="writer">
        {item?.type !== PostTypeEnum.Video ? (
          item?.writer?.imageUrl ? (
            <Avatar src={item?.writer?.imageUrl}></Avatar>
          ) : (
            <Avatar></Avatar>
          )
        ) : (
          <></>
        )}
        <Box className="writer-name">
          {item?.type !== PostTypeEnum.Video && (
            <Typography variant="label2" color={titleTextColor}>
              {item?.writer?.name || 'Author'}
            </Typography>
          )}
          <Typography variant="label1" color={'#647E9C'}>
            {calculateTimeCreateAt(item?.createdAt)}
          </Typography>
        </Box>
      </Box>
    </CardBoxImageVideo>
  );
}

export default memo(CardContentImage);
