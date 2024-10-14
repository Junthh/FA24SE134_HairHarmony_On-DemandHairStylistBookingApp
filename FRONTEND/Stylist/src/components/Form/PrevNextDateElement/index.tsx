import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import React, { useState } from 'react';
import moment from 'moment';
import styled from '@emotion/styled';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { ICONS } from 'configurations/icons';
const PrevNextDateWrap = styled(Box)({
  display: 'flex',
  '& .box-caret-left': {
    height: 38,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    border: '1px solid #D6D9DF',
    display: 'flex',
    alignItems: 'center',
    padding: 8,
  },
  '& .box-caret-right': {
    height: 38,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: '1px solid #D6D9DF',
    display: 'flex',
    alignItems: 'center',
    padding: 8,
  },
  '& .btn-today': {
    height: 38,
    border: '1px solid #D6D9DF',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 8,
    padding: '9px 16px',
  },
});
const DatePickerStyled = styled(DatePicker)({
  width: '40%',
  '& .MuiInputBase-root': {
    height: 38,
    borderRadius: '0px',
    '& >input': {
      textAlign: 'center',
    },
  },
});
export type PrevNextElementProps = {
  hanldeDateChange?: (date: any) => void;
};
export default function PrevNextElement({
  hanldeDateChange,
  ...props
}: PrevNextElementProps & DatePickerProps<Date>) {
  const [value, setValue] = useState<Date>(new Date());
  return (
    <PrevNextDateWrap>
      <Button
        className="btn-today"
        onClick={() => {
          setValue(new Date());
          hanldeDateChange(moment(new Date()).format('YYYY-MM-DD'));
        }}
      >
        <Typography variant="label2" color={'#575F6D'}>
          Today
        </Typography>
      </Button>
      <Box width={4}></Box>
      <IconButton
        className="box-caret-left"
        onClick={() => {
          var date = new Date(value);
          date.setDate(date.getDate() - 1);
          setValue(date);
          hanldeDateChange(moment(date).format('YYYY-MM-DD'));
        }}
      >
        <ICONS.IconCaretLeft />
      </IconButton>
      <DatePickerStyled
        format="dd MMM yyyy"
        disableOpenPicker={true}
        value={value}
        onChange={(newValue: Date) => {
          setValue(newValue);
          hanldeDateChange(moment(newValue).format('YYYY-MM-DD'));
        }}
        {...props}
      />
      <IconButton
        className="box-caret-right"
        onClick={() => {
          var date = new Date(value);
          date.setDate(date.getDate() + 1);
          setValue(date);
          hanldeDateChange(moment(date).format('YYYY-MM-DD'));
        }}
      >
        <ICONS.IconCaretRight />
      </IconButton>
    </PrevNextDateWrap>
  );
}
