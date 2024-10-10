import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import * as colors from 'constants/colors';
import { hexToRgba } from 'utils/helper';

export const TagStyledWrapper = styled(Typography)<{ catesColor?}>(({ catesColor }) => ({
  width: 'fit-content',
  padding: '5px 8px 4px 8px',
  // background: catesColor ? hexToRgba(catesColor, 0.1) : hexToRgba(colors.primary1, 0.1),
  background: colors.primary5,
  borderRadius: 100,
  whiteSpace: 'nowrap',
  // '&:hover': {
  //   cursor: 'pointer',
  // },
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const TagStyled = styled(Typography)<{ catesColor?}>(({ catesColor }) => ({
  color: `${catesColor ? catesColor : colors.primary1} !important`,
  letterSpacing: 0.5,
  fontWeight: 600,
  fontSize: 14,
  lineHeight: 1.4,
  textTransform: 'uppercase',
}));

export const TagTextStyled = styled(Box)<{ tagColor?}>(({ tagColor = colors.tagColor }) => ({
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '140%',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  color: `${tagColor} !important`,
  // width: '100%',
  // whiteSpace: 'pre-wrap',
  // overflow: 'hidden',
  // textOverflow: 'ellipsis',
  // '&:hover': {
  //   cursor: 'pointer',
  // },
}));

export const NationalTagStyled = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0px 8px',
  '& img': {
    borderRadius: '50%',
  },
});