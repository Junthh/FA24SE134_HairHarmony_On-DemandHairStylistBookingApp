import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
  Path,
  FieldValues,
} from 'react-hook-form';
import { FormControl, TextFieldProps, Typography } from '@mui/material';
import { BaseTextField } from 'components/Base/BaseTextField';
export declare type ParseAbleDate<TDate> = string | number | Date | null | undefined | TDate;

export type DatePickerElementProps<T extends FieldValues, TInputDate, TDate = TInputDate> = Omit<
  DatePickerProps<TDate>,
  'value' | 'onChange'
> & {
  name: Path<T>;
  required?: boolean;
  isDate?: boolean;
  validation?: ControllerProps['rules'];
  parseError?: (error: FieldError) => string;
  onChange?: (value?: TDate, keyboardInputValue?: string) => void;
  parseDate?: (value: TDate, keyboardInputValue?: string) => TDate;
  inputProps?: TextFieldProps;
  helperText?: TextFieldProps['helperText'];
  control?: Control;
  extendStyleDate?: any;
  size?: string;
  views?: string[];
  inputFormat?: string;
  label: string;
};

export default function DatePickerElement<TFieldValues extends FieldValues>({
  isDate,
  parseError,
  name,
  required,
  parseDate,
  validation = {},
  inputProps,
  control,
  extendStyleDate,
  views = ['year', 'month', 'day'],
  inputFormat = 'dd/MM/yyyy',
  readOnly = true,
  size,
  label,
  ...rest
}: DatePickerElementProps<TFieldValues, any, any>): JSX.Element {
  return (
    <FormControl fullWidth variant="outlined" sx={{ position: 'relative' }}>
      {label && (
        <Typography
          sx={{
            marginLeft: 1,
            marginBottom: '6px',
            color: '#666666',
          }}
        >
          {label}
        </Typography>
      )}
      <Controller
        name={name}
        rules={validation}
        control={control}
        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
          return (
            <DatePicker
              views={views}
              format={inputFormat}
              {...rest}
              value={value || ''}
              onChange={onChange}
              slots={{
                textField: BaseTextField,
              }}
              slotProps={{
                textField: {
                  error: !!error,
                  helperText: error ? parseError?.(error) : '',
                  style: extendStyleDate,
                },
              }}
            />
          );
        }}
      />
    </FormControl>
  );
}
