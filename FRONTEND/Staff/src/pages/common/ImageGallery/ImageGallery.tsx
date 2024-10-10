import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import * as colors from 'constants/colors';
import clsx from 'clsx';
import { theme } from 'theme';
const BoxImageStyled = styled(Box)(({}) => ({
  width: '80px',
  height: '80px',
  borderRadius: '4px',
  position: 'relative',
  '& .MuiTypography-body2': {
    position: 'absolute',
    bottom: '50%',
    left: '50%',
    transform: 'translate(-50%, 50%)',
    cursor: 'pointer',
  },
  '& .overplay': {
    width: 'inherit',
    height: 'inherit',
    position: 'absolute',
    bottom: 0,
    '&:hover': {
      backgroundColor: `rgba(0, 0, 0, 0.46)`,
      cursor: 'pointer',
    },
  },
  '& .lastchild-overplay': {
    width: 'inherit',
    height: 'inherit',
    position: 'absolute',
    bottom: 0,
    backgroundColor: `rgba(0, 0, 0, 0.46)`,
  },
}));
const BoxImageContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '0px 10px',
}));
// GRID
const GridBoxImageStyled = styled(Box)(({}) => ({
  display: 'flex',
  gap: '0px 10px',
  flexWrap: 'nowrap',
  '& .image-left': {
    width: '78%',
    height: '100%',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    '&:hover .overplay': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: '16px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: `rgba(0, 0, 0, 0.3)`,
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  '& .image-right': {
    width: '22%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px 0px',
    [theme.breakpoints.down('md')]: {
      width: '0%',
    },
    '&-secondary': {
      position: 'relative',
      borderRadius: '16px',
      '&:hover .overplay': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '16px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: `rgba(0, 0, 0, 0.3)`,
      },
    },
    '&:hover': {
      cursor: 'pointer',
    },
    '&_last-item': {
      position: 'relative',
      borderRadius: '16px',
      '&:hover .overplay': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '16px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: `rgba(0, 0, 0, 0.3)`,
      },
      '&:hover': {
        cursor: 'pointer',
      },
      '&-overplay': {
        position: 'absolute',
        bottom: '12px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.46)',
        padding: '6px 10px',
        borderRadius: '12px',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  },
}));
type ImageGalleryProps = {
  ImageList: string[];
  amountItem: number;
  showMore: boolean;
  display?: 'grid' | 'row';
};
export default function ImageGallery({
  ImageList = [],
  amountItem = 5,
  showMore = true,
  display = 'row',
}: ImageGalleryProps) {
  const [state, setState] = useState({
    isOpen: false,
    photoIndex: 0,
  });
  const hanldeOpenLightbox = (photoIndex?: number) => {
    if (photoIndex) {
      setState({
        photoIndex: photoIndex,
        isOpen: true,
      });
    } else {
      setState((prev) => {
        return {
          ...prev,
          isOpen: true,
        };
      });
    }
  };
  return (
    <>
      {display === 'row' ? (
        <BoxImageContainer>
          {ImageList.slice(0, amountItem).map((image, index) => (
            <BoxImageStyled key={index} onClick={() => hanldeOpenLightbox(index)}>
              <img width={'100%'} height={'100%'} src={image} alt="" />
              <Box
                className={clsx(
                  showMore && amountItem - 1 === index ? `lastchild-overplay` : '',
                  'overplay',
                )}
              ></Box>
              {showMore && amountItem - 1 === index ? (
                <Typography
                  variant="body2"
                  fontWeight={600}
                  lineHeight={'30px'}
                  color={colors.white}
                >
                  +{ImageList.length - index - 1}
                </Typography>
              ) : (
                <></>
              )}
            </BoxImageStyled>
          ))}
        </BoxImageContainer>
      ) : (
        <GridBoxImageStyled>
          <Box className="image-left" onClick={() => hanldeOpenLightbox(0)}>
            <img width={'100%'} height={'100%'} src={ImageList[0]} alt="" />
            <Box className="overplay"></Box>
          </Box>
          <Box className="image-right">
            <Box className="image-right-secondary" onClick={() => hanldeOpenLightbox(1)}>
              <img width={'100%'} height={'100%'} src={ImageList[1]} alt="" />
              <Box className="overplay"></Box>
            </Box>
            <Box className="image-right_last-item" onClick={() => hanldeOpenLightbox(2)}>
              <img width={'100%'} height={'100%'} src={ImageList[2]} alt="" />
              <Box className="overplay"></Box>
              <Box className="image-right_last-item-overplay">
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color={colors.white}
                  lineHeight={'30px'}
                >
                  +{ImageList.length - 3} photos
                </Typography>
              </Box>
            </Box>
          </Box>
        </GridBoxImageStyled>
      )}
      {state.isOpen && (
        <Lightbox
          mainSrc={ImageList[state.photoIndex]}
          nextSrc={ImageList[(state.photoIndex + 1) % ImageList.length]}
          prevSrc={ImageList[(state.photoIndex + ImageList.length - 1) % ImageList.length]}
          onCloseRequest={() =>
            setState({
              photoIndex: 0,
              isOpen: false,
            })
          }
          onMovePrevRequest={() =>
            setState((prev) => {
              return {
                ...prev,
                photoIndex: (prev.photoIndex + ImageList.length - 1) % ImageList.length,
              };
            })
          }
          onMoveNextRequest={() =>
            setState((prev) => {
              return {
                ...prev,
                photoIndex: (prev.photoIndex + 1) % ImageList.length,
              };
            })
          }
        />
      )}
    </>
  );
}
