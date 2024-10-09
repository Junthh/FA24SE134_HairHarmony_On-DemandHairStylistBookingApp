import { forwardRef, memo } from 'react';

import { styled } from '@mui/material/styles';
import { Button, ButtonProps } from '@mui/material';

const ButtonStyled = styled(Button)({
  borderRadius: '8px',
});

// @ts-ignore
export const BaseButton = memo<ButtonProps>(
  forwardRef((props: ButtonProps, ref) => {
    return <ButtonStyled {...props} />;
  }),
);
