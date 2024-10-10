import { Box, ListItemIcon, Theme } from '@mui/material';
import styled from '@emotion/styled';

export const WrapperMenuParent = styled(Box)<{ disabled: true | false }>(({ disabled }) => ({
  position: 'relative',
  backgroundColor: disabled ? '#f7f7f7' : '',
  '& input, .MuiInputBase-root': {
    cursor: 'pointer !important',
  },
  '& .MuiOutlinedInput-root': {
    paddingRight: '8px !important',
  },
}));

export const BoxMenuParent = styled(Box)({
  position: 'absolute',
  zIndex: 1000,
  backgroundColor: '#fff',
  width: '100%',
  boxShadow: '0 5px 15px 0 rgb(0 0 0 / 10%)!important',
  '& >ul': {
    marginTop: '12px',
    marginBottom: '12px',
  },
});

export const ListMenuItemIcon = styled(ListItemIcon)({
  color: '#000000 !important',
  minWidth: '20px !important',
});
