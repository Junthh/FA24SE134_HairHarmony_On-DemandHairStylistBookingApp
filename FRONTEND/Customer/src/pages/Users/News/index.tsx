import styled from '@emotion/styled';
import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import * as colors from '../../../constants/colors';
import { formatDate } from 'utils/datetime';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import { newsServices } from 'services/news.service';
import { useParams } from 'react-router-dom';
const NewStyled = styled(Box)({
  '& .thumbnail': {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
    position: 'relative',
    display: 'block',
  },
  '& .thumbnail-container': {
    position: 'relative',
    width: '100%',
    height: '500px',
    overflow: 'hidden',
  },
  '& .thumbnail-overlay': {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%', // Điều chỉnh chiều cao của vùng mờ
    background:
      'linear-gradient(to bottom, rgb(255 255 255 / 0%) 0%, rgb(249 250 255 / 100%) 100%)',
    pointerEvents: 'none',
  },
  '& .description': {
    margin: '0 auto',
    // textAlign: 'center',
    padding: '20px 10rem',
  },
  '& .author': {
    textAlign: 'end',
    marginRight: 50,
    marginBottom: 20,
  },
});
export default function News() {
  const params = useParams();
  const [news, setNews] = useState<any>({});
  const dispatch = useDispatch();
  const handleGetNews = () => {
    dispatch(setLoading(true));
    try {
      newsServices
        .findById(params.id)
        .then((res) => {
          setNews(res.data);
        })
        .finally(() => dispatch(setLoading(false)));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetNews();
  }, []);
  return (
    <NewStyled>
      {' '}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="thumbnail-container">
            <img className="thumbnail" src={news.thumbnail} alt="" />
            <div className="thumbnail-overlay"></div>
          </div>
          <Typography textAlign={'center'} variant="h1" fontWeight={700} color={colors.primary1}>
            {news?.title}
          </Typography>
          <Box className="description">
            <div
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(news?.description || '') }}
            />
          </Box>
          <Box className="author">
            <Typography variant="body2" fontWeight={400} color={colors.primary1}>
              {formatDate(news?.createdDate || new Date())}
            </Typography>
            <Typography variant="h4" fontWeight={700} color={colors.primary1}>
              {news?.author}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </NewStyled>
  );
}
