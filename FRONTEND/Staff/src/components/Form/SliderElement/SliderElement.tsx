import { FormControl, FormHelperText, FormLabel, Slider, SliderProps } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

type SliderEelementProps = {
  control: Control;
  name: string;
  label?: string;
  disabled?: boolean;
};
export default function SliderElement({
  control,
  name,
  label,
  ...props
}: SliderEelementProps & SliderProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, name, value }, fieldState: { error } }) => {
        return (
          <FormControl fullWidth>
            {label && <FormLabel sx={{ marginLeft: 1, marginBottom: '6px' }}>{label}</FormLabel>}
            <Slider name={name} value={value} onChange={onChange} {...props}></Slider>
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}
