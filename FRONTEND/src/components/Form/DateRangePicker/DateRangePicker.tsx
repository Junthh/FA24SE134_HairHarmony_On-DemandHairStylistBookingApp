import React, { CSSProperties, useState } from 'react';
import { DatePicker } from 'antd';
import './styles.css';
import { Dayjs } from 'dayjs';
import { Control, Controller, ControllerProps, FieldError, FieldValues, Path } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';
import { RangePickerProps } from 'antd/es/date-picker';


const { RangePicker } = DatePicker;

type RangeValue = [Dayjs | null, Dayjs | null] | null;

export type DateRangePickerElementProps<T extends FieldValues, TInputDate, TDate = TInputDate> = Omit<
  RangePickerProps,
  'name'
> & {
  name: Path<T>;
  validation?: ControllerProps['rules'];
  parseError?: (error: FieldError) => string;
  onChange?: (value?: TDate, keyboardInputValue?: string) => void;
  parseDate?: (value: TDate, keyboardInputValue?: string) => TDate;
  helperText?: TextFieldProps['helperText'];
  control?: Control;
  size?: 'large' | 'middle' | 'small'
  format?: string[];
  open?: boolean;
  disabled?: boolean,
  bordered?: boolean,
  inputReadOnly?: boolean,
  style?: CSSProperties,
  onHandleCancel?: React.MouseEventHandler<HTMLButtonElement>
};

export default function DateRangePickerElement<TFieldValues extends FieldValues>({
  name,
  disabled = false,
  style = {},
  validation = {},
  control,
  size = 'large',
  parseError,
  parseDate,
  onHandleCancel,
}: DateRangePickerElementProps<TFieldValues, any, any>): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [dates, setDates] = useState<RangeValue>(null);

  // handle on open calendar
  const handleOnOpenChange = () => { };

  // handle on calendar change
  const handleOnCalendarChange = (val) => {
    setDates(val);
  };

  // handle on click calendar
  const handleOnClick = () => {
    setOpen(true);
    handleClear();
  };

  // handle on click cancel button
  const handleCancel = (e) => {
    setOpen(false);
    handleClear();
    onHandleCancel && onHandleCancel(e);
  };

  // handle on click done button
  const handleDone = () => {
    setOpen(false);
  };

  // clear data
  const handleClear = () => {
    setDates(null);
  };

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({ field: { onChange, value, name }, fieldState: { error } }) => {
        return (
          <RangePicker
            className="custom-default"
            placeholder={['Select date', 'Select date']}
            style={style}
            name={name}
            disabled={disabled}
            size={size}
            inputReadOnly
            open={open}
            value={value || dates}
            onChange={onChange}
            onOpenChange={handleOnOpenChange}
            onCalendarChange={handleOnCalendarChange}
            onClick={handleOnClick}
            renderExtraFooter={() => (
              <div className="footer">
                <button className="p-btn p-custom-btn p-b9-trans-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="p-btn p-custom-btn p-primary-btn" onClick={handleDone}>
                  Done
                </button>
              </div>
            )}
          />
        );
      }}
    />
  );
}
