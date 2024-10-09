import { Control, Controller, ControllerProps, FieldError, Path } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { FormControl, FormHelperText, FormLabel, TextField } from '@mui/material';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import React from 'react';
import { BaseNumbericField } from 'components/Base/BaseNumbericField';

export type TextFieldElementProps<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  label: any;
  control?: Control<T>;
  value?: number;
  thousandSeparator?: string;
  decimalScale?: number;
};

export default function CurrencyFieldElement<TFieldValues extends FieldValues>({
  label,
  name,
  control,
  disabled,
  value,
  thousandSeparator = ',',
  decimalScale = 2,
  ...rest
}: NumericFormatProps<TFieldValues>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => {
        return (
          <FormControl fullWidth>
            {label && <FormLabel sx={{ marginLeft: 1, marginBottom: '6px' }}>{label}</FormLabel>}
            <BaseNumbericField
              name={name}
              value={value ?? ''}
              error={!!error}
              disabled={disabled}
              onChange={onChange}
              onBlur={onBlur}
              thousandSeparator={thousandSeparator}
              decimalScale={decimalScale}
              fullWidth
              customInput={TextField}
              {...rest}
            />
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}
