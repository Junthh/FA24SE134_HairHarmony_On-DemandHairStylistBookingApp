import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
  Path,
  FieldValues,
} from 'react-hook-form';
import { TextFieldProps } from '@mui/material';
export declare type ParseAbleDate<TDate> = string | number | Date | null | undefined | TDate;

export type DatePickerElementProps<T extends FieldValues, TInputDate, TDate = TInputDate> = Omit<
  DatePickerProps<TDate>,
  'value' | 'onChange' | 'renderInput'
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
  ...rest
}: DatePickerElementProps<TFieldValues, any, any>): JSX.Element {
  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
        return (
          <DatePicker
            views={views}
            {...rest}
            value={value || ''}
            onChange={onChange}
            // @ts-ignore
            dayOfWeekFormatter={(d: any) => {
              return d;
            }}
          />
        );
      }}
    />
  );
}
