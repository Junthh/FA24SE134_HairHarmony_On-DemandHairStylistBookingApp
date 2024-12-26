import styled from '@emotion/styled';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Divider, Rating, Typography } from '@mui/material';
import { memo } from 'react';
interface CardContentImageProps {
  item?: any;
  onViewDetail?: (p: any) => void;
  type: string;
}
const CardContentImagesSyled = styled(Box)({
  textAlign: 'center',
  '& img': {
    borderRadius: 12,
    width: 280,
    height: 280,
    objectFit: 'cover',
  },
  '& .star': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& .content': {
    cursor: 'pointer',
  },
});
const CardContentAboutImagesSyled = styled(Box)({
  borderRadius: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: 420,
  backgroundColor: 'rgba(27, 77, 74, 0.06)',
  '& img': {
    width: '100%',
    height: 280,
    objectFit: 'cover',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
  },
});
function CardContentImage(props: CardContentImageProps) {
  const { item, onViewDetail, type = '' } = props;

  return type === 'NEWS' ? (
    <CardContentAboutImagesSyled>
      <img src={item.thumbnail} alt="" />
      <Typography padding={2} sx={{ minHeight: '100px' }}>
        {item.title}
      </Typography>
      <Divider variant="fullWidth" style={{ width: '100%' }} />
      <Typography
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        variant="h4"
        padding={2}
        style={{
          cursor: 'pointer',
        }}
        onClick={() => {
          onViewDetail(item.id);
        }}
      >
        Xem chi tiết &nbsp;&nbsp; <ArrowForwardIcon />
      </Typography>
    </CardContentAboutImagesSyled>
  ) : (
    <CardContentImagesSyled>
      <Box
        className="content"
        onClick={() => {
          onViewDetail(item.id);
        }}
      >
        <img src={item?.avatar} alt="" />
        <Typography fontWeight={600} variant="h3" textAlign={'center'}>
          {item?.fullName}
        </Typography>
        <Box className="star">
          <Typography fontFamily={'GFS Didot !important'} component="legend">
            {item?.rating?.toFixed(1)}
          </Typography>
          &nbsp;&nbsp;
          <Rating precision={0.5} name="read-only" value={item.rating} readOnly />
        </Box>
      </Box>
    </CardContentImagesSyled>
  );
}

export default memo(CardContentImage);
