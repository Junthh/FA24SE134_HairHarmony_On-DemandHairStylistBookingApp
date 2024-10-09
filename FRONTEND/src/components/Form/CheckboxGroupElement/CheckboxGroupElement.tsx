import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@mui/material';
import React from 'react';
import { Control, Controller, Path, useController, useWatch } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types/fields';
export type CheckboxGroupProps<T extends FieldValues> = Omit<CheckboxProps, 'name'> & {
  valueKey?: string;
  labelKey?: string;
  name: Path<T>;
  control?: Control<T>;
  label?: any;
  row?: boolean;
  options: { value: any; label: any }[];
  disabled?: boolean;
  showLabelOption?: boolean;
};
export default function CheckboxGroupElement<TFieldValues extends FieldValues>({
  valueKey = 'value',
  labelKey = 'label',
  name,
  control,
  label,
  row,
  options,
  disabled,
  showLabelOption = true,
}: CheckboxGroupProps<TFieldValues>): JSX.Element {
  const {
    field: { ref, value, onChange, ...inputProps },
  } = useController({
    name,
    control,
  });
  const checkboxIds = useWatch({ control, name: name }) || [];

  const handleChange = (value: string) => {
    const newArray: any = [...checkboxIds];
    const item: any = value;

    //Ensure array isnt empty
    if (newArray.length > 0) {
      //Attempt to find an item in array with matching id
      const index = newArray.findIndex((x: any) => x === item);

      // If theres no match add item to the array
      if (index === -1) {
        newArray.push(item);
      } else {
        //If there is a match and the value is empty, remove the item from the array
        newArray.splice(index, 1);
      }
    } else {
      //If the array is empty, add the item to the array
      newArray.push(item);
    }

    //Overwrite existing array with newArray}
    onChange(newArray);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => {
        return (
          <FormControl>
            {label && (
              <FormLabel sx={{ marginLeft: 1, marginBottom: '6px', color: '#666666' }}>
                {label}
              </FormLabel>
            )}
            <FormGroup row={row}>
              {options.map((option) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={value?.some((checked: any) => checked === option[valueKey]) || false}
                      {...inputProps}
                      inputRef={ref}
                      onChange={() => handleChange(option[valueKey])}
                      disabled={disabled}
                    />
                  }
                  label={showLabelOption ? <p className="body2">{option[labelKey]}</p> : null}
                  key={option[valueKey]}
                />
              ))}
            </FormGroup>
            {error && <FormHelperText error>{error.message || ' '}</FormHelperText>}
          </FormControl>
        );
      }}
    ></Controller>
  );
}
