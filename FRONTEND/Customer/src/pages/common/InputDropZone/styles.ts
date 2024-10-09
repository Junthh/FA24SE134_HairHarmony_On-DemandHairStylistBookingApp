import styled from '@emotion/styled';
import { Box } from '@mui/material';
import * as colors from 'constants/colors';
import { theme } from 'theme';

export const InputDropZoneStyled = styled(Box)({
  height: '100%',
  position: 'relative',
  '& .container-drag_active': {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    border: `2px dashed ${colors.primary}`,
    justifyContent: 'center',
    backgroundColor: '#F2FFE3',
    borderRadius: '12px',
  },
  '& .container-drag': {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    border: `2px dashed ${colors.primary}`,
    borderRadius: '12px',
    padding: '0px 20px',
    '&:hover': {
      border: `2px dashed ${colors.primary}`,
      cursor: 'pointer',
    },
    justifyContent: 'center',
    backgroundColor: '#fcfaf9',
  },
});
