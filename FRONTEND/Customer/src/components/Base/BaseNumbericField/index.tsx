import { forwardRef, memo, useCallback, useMemo, useState } from 'react';

import { styled } from '@mui/material/styles';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import * as colors from 'constants/colors';
import { NumericFormat } from 'react-number-format';

const NumbericFieldStyled = styled(NumericFormat)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    height: '48px',
    // '& fieldset': { borderColor: colors.primary },
    // '&:hover fieldset': { borderColor: colors.primary },
    // '&.Mui-focused fieldset': {
    //   borderColor: colors.primary,
    // },
  },
});

// @ts-ignore
export const BaseNumbericField = memo<TextFieldProps>(
  forwardRef((props: any, ref) => {
    return <NumbericFieldStyled ref={ref} variant="outlined" {...props} />;
  }),
);
