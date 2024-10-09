import { ChangeEvent } from 'react';
import { Control, Controller, FieldError, Path, useController } from 'react-hook-form';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  useTheme,
} from '@mui/material';
import { FieldValues } from 'react-hook-form/dist/types/fields';

export type RadioGroupProps<T extends FieldValues> = {
  options: { label: string; id: string | number }[] | any[];
  label?: any;
  name: Path<T>;
  control?: Control<T>;
  labelKey?: string;
  valueKey?: string;
  disabled?: boolean;
  //
  emptyOptionLabel?: 'string';
  returnObject?: boolean;
  row?: boolean;
  checked?: any;
  onChange?: (value: any) => void;
};

export default function RadioGroupElement<TFieldValues extends FieldValues>({
  options,
  label,
  name,
  control,
  labelKey = 'label',
  valueKey = 'value',
  disabled,
  //
  emptyOptionLabel,
  returnObject,
  row,
  checked,
  ...rest
}: RadioGroupProps<TFieldValues>): JSX.Element {
  const theme = useTheme();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const invalid = Boolean(error);

  const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const radioValue = (event.target as HTMLInputElement).value;

    const returnValue = returnObject
      ? options.find((items) => items[valueKey] === radioValue)
      : radioValue;
    // setValue(name, returnValue, { shouldValidate: true })
    onChange(returnValue);
    if (typeof rest.onChange === 'function') {
      rest.onChange(returnValue);
    }
  };

  return (
    <Controller
      rules={{ required: true }}
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <FormControl disabled={disabled}>
            {label && (
              <FormLabel sx={{ marginLeft: 1, marginBottom: '6px', color: '#666666' }}>
                {label}
              </FormLabel>
            )}
            <RadioGroup onChange={onRadioChange} name={name} row={row} value={value || ''}>
              {emptyOptionLabel && (
                <FormControlLabel
                  control={<Radio checked={!value} />}
                  label={emptyOptionLabel}
                  value=""
                />
              )}
              {options.map((option: any, index: number) => {
                const optionKey = option[valueKey];
                if (!optionKey) {
                  // console.error(
                  //   `CheckboxButtonGroup: valueKey ${valueKey} does not exist on option`,
                  //   option,
                  // );
                }
                const isChecked = !!(
                  value && (returnObject ? value[valueKey] === optionKey : value === optionKey)
                );
                return (
                  <FormControlLabel
                    control={<Radio checked={isChecked} />}
                    value={optionKey}
                    label={option[labelKey]}
                    key={optionKey}
                  />
                );
              })}
            </RadioGroup>
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}
