import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';
import * as colors from 'constants/colors';
import { TextHeaderUnderlineStyled } from '../style/TextHeaderUnderline';
import { ButtonPrimary } from '../style/Button';
import { ICONS } from 'configurations/icons';
import { TagStyled, TagStyledWrapper, TagTextStyled } from '../style/TagContent';
import { IMAGES } from 'configurations/images';
import IMAGE_ECO_STORIES1 from 'assets/pics/eco-stories/eco-stories1.svg';
import moment from 'moment';
import { SortBy } from 'models/FilterOptions.model';
import { PostModel } from 'models/Posts.model';
import { theme } from 'theme';
import { countriesFlag } from 'models/Country.model';

export const NewestEcoStoriesStyled = styled(Box)<{ color?; background? }>(
  ({ color, background }) => ({
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    '& .title': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      '& .MuiTypography-body1': {
        fontSize: 40,
      },
      [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
      },
    },
    '& .MuiTypography-h4': {
      marginBottom: 40,
      [theme.breakpoints.down('md')]: {
        textAlign: 'center',
      },
    },
    '& .content_body': {
      display: 'flex',
      gap: 20,
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
      '&-left': {
        borderRadius: '20px 20px 20px 20px',
        overflow: 'hidden',
        position: 'relative',
        flex: '50%',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
          flex: '100%',
        },
        '& .img-header': {
          borderRadius: '20px 20px 0px 0px',
          height: 500,
          width: '100%',
          [theme.breakpoints.down('md')]: {
            height: 300,
          },
          [theme.breakpoints.down('sm')]: {
            height: 200,
          },
        },
        '& .image-national': {
          height: 40,
          width: 40,
          padding: 8,
          borderRadius: '50%',
          background: `rgba(255, 255, 255, 0.6)`,
          position: 'absolute',
          top: 8,
          left: 8,
          '& img': {
            width: 24,
            height: 24,
          },
        },
        '&_footer': {
          padding: 20,
          background: background ? background : colors.primary1,
          borderBottomLeftRadius: '24px',
          borderBottomRightRadius: '24px',
          '& .MuiTypography-body1': {
            color: color ? color : '#F2FFE3',
          },
          '& .MuiTypography-h2': {
            color: color ? color : '#F2FFE3',
          },
          '& .avatar': {
            display: 'flex',
            alignItems: 'center',
            gap: '0px 10px',
            '& .MuiTypography-label1': {
              color: color ? color : '#F2FFE3',
            },
            '& .MuiTypography-label2': {
              color: color ? color : '#F2FFE3',
            },
          },
          // '& .tag': {
          //   display: 'flex',
          //   columnGap: 10,
          //   alignItems: 'center',
          // },
          '& .tag-container': {
            display: 'flex',
            position: 'relative',
            [theme.breakpoints.down('md')]: {
              // maxHeight: '42px',
              // maxWidth: '280px',
              flexWrap: 'wrap',
              // overflow: 'hidden',
            },
            '& .tag': {
              display: 'flex',
              columnGap: 10,
              alignItems: 'center',
              flexWrap: 'wrap',
              rowGap: 10,
              flex: 1,
              // [theme.breakpoints.down('md')]: {
              //   flexWrap: 'nowrap',
              //   maxWidth: '251px',
              //   overflow: 'hidden',
              // },
            },
            // '& .dots': {
            //   position: 'absolute',
            //   top: '10%',
            //   right: 0,
            //   color: colors.tagColor,
            //   fontSize: '20px',
            // },
          },
        },
      },
      '&-right': {
        flex: '50%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
          flex: '100%',
          gap: 20,
        },
        // '& .tag': {
        //   display: 'flex',
        //   columnGap: 10,
        //   alignItems: 'center',
        // },
        '& .tag-container': {
          display: 'flex',
          position: 'relative',

          [theme.breakpoints.up('md')]: {
            width: '90%',
            height: 'auto',
            alignItems: 'flex-start',
          },

          [theme.breakpoints.down('md')]: {
            // maxHeight: '42px',
            // maxWidth: '280px',
            flexWrap: 'wrap',
            // overflow: 'hidden',
          },

          '& .tag': {
            display: 'flex',
            columnGap: 10,
            alignItems: 'center',
            flexWrap: 'wrap',
            rowGap: 10,
            flex: 1,
            // [theme.breakpoints.down('md')]: {
            //   flexWrap: 'nowrap',
            //   maxWidth: '251px',
            //   overflow: 'hidden',
            // },
          },
          // '& .dots': {
          //   position: 'absolute',
          //   top: '10%',
          //   right: 0,
          //   color: colors.tagColor,
          //   fontSize: '20px',
          // },
        },
      },
    },
    '& .item': {
      position: 'relative',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        rowGap: 20,
      },
    },
  }),
);
type NewestEcoStoriesProps = {
  posts: any;
  color?: string;
  background?: string;
  textColor?: string;
  tagColor?: string;
  handleViewAll: (status: SortBy) => void;
  handleGetDetail: (p: PostModel) => void;
};
export default function NewestEcoStories({
  posts = [],
  color,
  background,
  textColor = colors.darkBlue900,
  tagColor,
  handleViewAll,
  handleGetDetail,
}: NewestEcoStoriesProps) {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isMobileSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <NewestEcoStoriesStyled color={color} background={background}>
      <Box className="title" display={'flex'}>
        {!isMobile ? (
          <TextHeaderUnderlineStyled color={colors.primary1} fontSize={'60px'}>
            Newest Eco-Stories
          </TextHeaderUnderlineStyled>
        ) : (
          <Box textAlign={'center'}>
            <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
              Newest
            </TextHeaderUnderlineStyled>
            <TextHeaderUnderlineStyled margin={'0 auto'} color={colors.primary1}>
              Eco-Stories
            </TextHeaderUnderlineStyled>
          </Box>
        )}
        {!isMobile ? (
          <ButtonPrimary
            padding={'10px 28px'}
            margin={'0px 20px 0px 0px'}
            severity="primary"
            borderradius={40}
            texttransform={'uppercase'}
            fontWeight={700}
            onClick={() => handleViewAll(SortBy.NEWEST)}
          >
            View all &nbsp; <ICONS.IconArrowRight />
          </ButtonPrimary>
        ) : (
          <></>
        )}
      </Box>
      <Typography variant="h4" color={colors.darkBlue400} fontWeight={700}>
        Be inspired by the amazing people saving the environment today!
      </Typography>
      <Box className="content_body">
        <Box
          className="content_body-left"
          onClick={() => handleGetDetail(posts.newest[0])}
          sx={{ cursor: 'pointer' }}
        >
          <img
            className="img-header image-fit-center"
            src={posts?.newest[0]?.mediaUrl || IMAGE_ECO_STORIES1}
            alt=""
          />
          <Box className="image-national">
            <img
              className="image-fit-center"
              src={countriesFlag[posts?.newest[0]?.country]}
              alt=""
            />
          </Box>
          <Box className="content_body-left_footer">
            <Box className="tag-container">
              <Box className="tag">
                {posts?.newest[0]?.category?.name && (
                  <TagStyledWrapper catesColor={posts?.newest[0]?.category?.color}>
                    <TagStyled catesColor={posts?.newest[0]?.category?.color}>
                      {posts?.newest[0]?.category?.name}
                    </TagStyled>
                  </TagStyledWrapper>
                )}
                {(posts?.newest[0]?.tags?.split('&#&') || []).map((a, index) => (
                  <TagTextStyled tagColor={tagColor} key={index}>
                    {a}
                  </TagTextStyled>
                ))}
              </Box>
              {/* {isMobile && (posts?.newest[0]?.tags?.split('&#&')?.length || 0) > 1 ? (
                <span className="dots">...</span>
              ) : (
                <></>
              )} */}
            </Box>
            <Box height={12}></Box>
            <Typography
              fontSize={28}
              fontWeight={700}
              lineHeight={'140%'}
              color={textColor}
              className={isMobileSm ? 'multiline-ellipsis-5' : 'multiline-ellipsis'}
            >
              {posts?.newest[0]?.title}
            </Typography>
            <Box height={12}></Box>
            <Box className="avatar">
              {posts?.newest[0]?.writer?.imageUrl ? (
                <Avatar src={posts?.newest[0]?.writer?.imageUrl}></Avatar>
              ) : (
                <Avatar></Avatar>
              )}
              <Box className="name">
                <Typography variant="label2" color={colors.white}>
                  {posts?.newest[0]?.writer.name}
                </Typography>
                <br />
                <Typography variant="label1" color={colors.white}>
                  {moment(posts?.newest[0]?.createdAt).format('MM/DD/YYYY')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="content_body-right"></Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '40px',
          }}
        >
          {isMobile ? (
            <ButtonPrimary
              padding={'10px 28px'}
              severity="primary"
              borderradius={40}
              texttransform={'uppercase'}
              fontWeight={700}
              onClick={() => handleViewAll(SortBy.NEWEST)}
            >
              View all &nbsp; <ICONS.IconArrowRight />
            </ButtonPrimary>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </NewestEcoStoriesStyled>
  );
}
