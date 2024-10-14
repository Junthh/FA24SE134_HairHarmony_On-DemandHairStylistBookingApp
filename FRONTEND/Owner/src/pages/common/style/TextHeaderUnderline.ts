import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import * as colors from 'constants/colors';
export const TextHeaderUnderlineStyled = styled(Typography)<{ background?, fontSize?}>(({ background, fontSize }) => ({
  fontFamily: 'General Sans',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: fontSize ? `${fontSize} !important` : '40px',
  lineHeight: '140%',
  position: 'relative',
  zIndex: 3,
  width: 'fit-content',
  whiteSpace: 'nowrap',
  '&::after': {
    position: 'absolute',
    content: "''",
    background: background ? background : colors.primary4,
    height: 20,
    left: '-3%',
    paddingRight: '20px',
    bottom: '14px',
    width: '100%',
    transform: 'rotate(-0.61deg)',
    zIndex: -1,
  },
}));
