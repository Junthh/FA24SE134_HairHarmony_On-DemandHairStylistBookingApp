import { forwardRef, memo, useCallback, useMemo, useState } from 'react';

import { styled } from '@mui/material/styles';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import * as colors from 'constants/colors';

const TextFieldStyled = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    height: '38px',
    // '& fieldset': { borderColor: colors.primary },
    // '&:hover fieldset': { borderColor: colors.primary },
    // '&.Mui-focused fieldset': {
    //   borderColor: colors.primary,
    // },
  },
});

// @ts-ignore
export const BaseTextField = memo<TextFieldProps>(
  forwardRef((props: any, ref) => {
    const { type } = props;
    const [state, setState] = useState({
      showPassword: false,
    });
    const handleClickShowPassword = useCallback(() => {
      setState({
        ...state,
        showPassword: !state.showPassword,
      });
    }, [state]);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    const getType = useCallback(() => {
      if (type === 'password') {
        if (state.showPassword) {
          return 'text';
        }
      }
      return type;
    }, [type, state.showPassword]);
    const defaultEndAdornment = useMemo(() => {
      const isPasswordType = type === 'password';
      if (isPasswordType) {
        return (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {state.showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
            </IconButton>
          </InputAdornment>
        );
      }
    }, [handleClickShowPassword, state.showPassword, type]);
    return (
      <TextFieldStyled
        ref={ref}
        variant="outlined"
        {...props}
        InputProps={{
          endAdornment: defaultEndAdornment,
          ...props.InputProps,
        }}
        type={getType()}
      />
    );
  }),
);
