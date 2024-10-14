import { Control, Controller, ControllerProps, FieldError, Path } from 'react-hook-form';
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormGroup,
  FormHelperText,
} from '@mui/material';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { ECO_CUPID_THEME } from 'configurations/constants/globalConstants';

export type CheckboxElementProps<T extends FieldValues> = Omit<CheckboxProps, 'name'> & {
  validation?: ControllerProps['rules'];
  name: Path<T>;
  parseError?: (error: FieldError) => string;
  label?: FormControlLabelProps['label'];
  helperText?: string;
  control?: Control;
  handleOnChange?: (value: any) => void;
};

export default function CheckboxElement<TFieldValues extends FieldValues>({
  name,
  validation = {},
  required,
  parseError,
  label,
  control,
  helperText,
  handleOnChange,
  ...rest
}: CheckboxElementProps<TFieldValues>): JSX.Element {
  if (required && !validation.required) {
    validation.required = 'This field is required';
  }

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const invalid = !!error;
        let parsedHelperText = helperText;
        if (error) {
          if (typeof parseError === 'function') {
            parsedHelperText = parseError(error);
          } else {
            parsedHelperText = error.message;
          }
        }
        return (
          <FormControl required={required} error={invalid} sx={{ width: '100%' }}>
            <FormGroup row>
              <FormControlLabel
                label={label || ''}
                control={
                  <Checkbox
                    {...rest}
                    color={rest.color || ECO_CUPID_THEME.PRIMARY}
                    sx={{
                      ...rest.sx,
                      color: invalid ? 'error.main' : undefined,
                    }}
                    value={value}
                    checked={!!value}
                    onChange={() => {
                      onChange(!value);
                      handleOnChange && handleOnChange(value);
                    }}
                  />
                }
              />
            </FormGroup>
            {parsedHelperText && (
              <FormHelperText error={invalid}>{parsedHelperText}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
