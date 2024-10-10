import { FormControl, FormHelperText, FormLabel, Rating, RatingProps } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
type RatingElementProps = {
  name: string;
  control: Control;
  label?: string | React.ReactElement;
  disabled?: boolean;
};
export default function RatingElement({
  name,
  control,
  label,
  disabled,
  ...props
}: RatingElementProps & RatingProps): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, name }, fieldState: { error } }) => {
        return (
          <FormControl fullWidth>
            {label && <FormLabel sx={{ marginLeft: 1, marginBottom: '6px' }}>{label}</FormLabel>}
            <Rating
              name={name}
              value={value}
              onChange={onChange}
              disabled={disabled}
              {...props}
            ></Rating>
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </FormControl>
        );
      }}
    ></Controller>
  );
}
