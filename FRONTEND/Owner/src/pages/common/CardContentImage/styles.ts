import * as colors from "constants/colors"
import styled from '@emotion/styled';
import { Box, } from '@mui/material';
import { PostTypeEnum, PostsType } from "models/Posts.model";
import { theme } from 'theme';

export const CardBoxImageVideo = styled(Box)<{ type?: PostsType; size?: 'small' | 'medium' | 'large' }>(
  ({ type, size }) => ({
    width: '100%',
    [theme.breakpoints.up('md')]: {
      transition: 'all 0.5s ease-out',
      '&:hover': {
        transform: 'scale(1.08)',
        transition: 'all 0.5s ease-out',
      },
    },
    '& .image-header': {
      width: '100%',
      // height: 240,
      position: 'relative',
      '&-item': {
        width: '100%',
        height: size === 'small' ? 220 : size === 'medium' ? 260 : 450,
        borderRadius: 24,
        border: type === PostTypeEnum.Video ? `8px solid ${colors.primary1}` : 'none',
        // '&:hover': {
        //   cursor: 'pointer',
        // },
        [theme.breakpoints.down(1580)]: {
          height: size === 'small' ? 220 : size === 'medium' ? 260 : 420,
        },
        [theme.breakpoints.down(1480)]: {
          height: size === 'small' ? 200 : size === 'medium' ? 220 : 350,
        },
        [theme.breakpoints.down(1320)]: {
          height: size === 'small' ? 180 : size === 'medium' ? 200 : 350,
        },
        [theme.breakpoints.down(1200)]: {
          height: size === 'small' ? 160 : size === 'medium' ? 200 : 320,
        },
        [theme.breakpoints.down(1020)]: {
          height: size === 'small' ? 140 : size === 'medium' ? 180 : 250,
        },
        [theme.breakpoints.down('md')]: {
          height: 420,
        },
        [theme.breakpoints.down(700)]: {
          height: 360,
        },
        [theme.breakpoints.down('sm')]: {
          height: 200,
          '&:hover': {
            height: 200,
          },
        },
      },
      '&-video': {
        width: '100%',
        height: size === 'small' ? 220 : size === 'medium' ? 320 : 450,
      },
      '&-national': {
        position: 'absolute',
        top: 8,
        left: 8,
        width: 40,
        height: 40,
        borderRadius: 100,
        background: 'rgba(255, 255, 255, 0.6)',
        '& img': {
          width: 24,
          height: 24,
          position: 'absolute',
          left: 8,
          top: 8,
        },
      },
      '&-btnplay': {
        position: 'absolute',
        bottom: 24,
        right: 28,
        width: 40,
        height: 40,
        background: 'rgba(10, 16, 35, 0.7)',
        borderRadius: 100,
        '& svg': {
          width: 24,
          height: 24,
          color: colors.white,
          position: 'absolute',
          left: 8,
          top: 8,
        },
        '& :hover': {
          cursor: 'pointer',
        },
      },
    },
    '& .content': {
      '&-title': {
        // maxHeight: '4em',
        display: 'flex',
      },
      '&-detail': {
        // maxHeight: '3em',
        display: 'flex',
      },
    },
    '& .writer': {
      display: 'flex',
      alignItems: 'center',
      gap: '0px 10px',
      marginTop: '10px',
      '&-name': {
        display: 'flex',
        flexDirection: 'column',
      },
    },
    // '& .tag': {
    //   display: 'flex',
    //   alignItems: 'center',
    //   flexWrap: 'wrap',
    //   rowGap: 10,
    //   columnGap: 10,
    //   marginTop: 18,
    //   marginBottom: 10,
    // },

    '& .tag-container': {
      display: 'flex',
      position: 'relative',
      marginTop: 10,
      marginBottom: 10,
      [theme.breakpoints.down('md')]: {
        // maxHeight: '42px',
        // maxWidth: '280px',
        flexWrap: 'wrap',
        // overflow: 'hidden',
      },
      '& .tag': {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        columnGap: 10,
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
  }),
);