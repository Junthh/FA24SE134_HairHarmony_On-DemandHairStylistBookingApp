import styled from '@emotion/styled';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { ICONS } from 'configurations/icons';
import React, { useEffect, useState } from 'react';
import * as colors from 'constants/colors';
import moment from 'moment';
import { theme } from 'theme';

const DatePickerStyled = styled(DatePicker)({
  '& .MuiInputBase-root': {
    height: 50,
    borderRadius: '100px',
    '& >input': {
      textAlign: 'center',
    },
  },
  '& .MuiInputAdornment-positionEnd': {
    display: 'none',
  },
});
export const DatePickerRangeStyled = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0px 12px',
});
export const DatePickerWrapStyled = styled(Box)<{ isopen }>(({ isopen }) => ({
  position: 'relative',
  '& button': {
    color: colors.primary2,
    position: 'absolute',
    right: '6px',
    top: '6px',
    width: '38px',
    height: '38px',
    transform: isopen === 'true' ? 'rotate(-90deg)' : 'rotate(0deg)',
  },
}));

interface DatePickerRangeProps {
  receivedValue?: string;
  handleDateChange: any;
}

export default function DatePickerRange(props: DatePickerRangeProps) {
  const isMobileSM = useMediaQuery(theme.breakpoints.down('md'));
  const { receivedValue = '', handleDateChange } = props;
  const [valueFrom, setValueFrom] = useState<Date | string>();
  const [openDateFrom, setOpenDateFrom] = useState<boolean>(false);
  const [valueTo, setValueTo] = useState<Date | string>();
  const [openDateTo, setOpenDateTo] = useState<boolean>(false);

  const toggleOpen = (event: React.PointerEvent) => {
    // allows toggle behavior
    event.stopPropagation();
    setOpenDateFrom((currentOpen) => !currentOpen);
  };

  const toggleOpenDateTo = (event: React.PointerEvent) => {
    // allows toggle behavior
    event.stopPropagation();
    setOpenDateTo((currentOpen) => !currentOpen);
  };

  useEffect(() => {
    if (valueFrom && valueTo) {
      handleDateChange(
        moment(valueFrom).format('YYYY-MM-DD') + 'to' + moment(valueTo).format('YYYY-MM-DD'),
      );
    }
  }, [valueFrom, valueTo]);

  useEffect(() => {
    if (receivedValue) {
      setValueFrom(new Date(receivedValue.split('to')[0]));
      setValueTo(new Date(receivedValue.split('to')[1]));
    }
  }, [receivedValue]);

  return (
    <DatePickerRangeStyled>
      <DatePickerWrapStyled isopen={openDateFrom.toString()}>
        <DatePickerStyled
          format="dd/MM/yyyy"
          value={valueFrom}
          onChange={(newValue: Date) => {
            setValueFrom(newValue);
          }}
          maxDate={valueTo}
          open={openDateFrom}
          onOpen={() => setOpenDateFrom(true)}
          onClose={() => setOpenDateFrom(false)}
          slotProps={{
            field: { onClick: toggleOpen } as any,
            textField: {
              InputProps: {
                startAdornment: !isMobileSM ? (
                  <Box color={colors.primary1} height={22} display={'flex'} alignItems={'center'}>
                    <ICONS.IconCalendarBlank width={18} height={20} />
                    <Typography variant="h5" color={colors.b9}>
                      &nbsp;&nbsp;From
                    </Typography>
                  </Box>
                ) : (
                  <></>
                ),
              },
            },
          }}
        />
        {!isMobileSM ? (
          <IconButton onClick={(event: any) => toggleOpen(event)}>
            <ICONS.IconCaretDown />
          </IconButton>
        ) : (
          <></>
        )}
      </DatePickerWrapStyled>

      <ICONS.IconUnion />
      <DatePickerWrapStyled isopen={openDateTo.toString()}>
        <DatePickerStyled
          format="dd/MM/yyyy"
          value={valueTo}
          onChange={(newValue: Date) => {
            setValueTo(newValue);
          }}
          minDate={valueFrom}
          maxDate={new Date()}
          open={openDateTo}
          onOpen={() => setOpenDateTo(true)}
          onClose={() => setOpenDateTo(false)}
          slotProps={{
            field: { onClick: toggleOpenDateTo } as any,
            textField: {
              InputProps: {
                startAdornment: !isMobileSM ? (
                  <Box color={colors.primary1} height={22} display={'flex'} alignItems={'center'}>
                    <Typography variant="h5" color={colors.b9}>
                      &nbsp;&nbsp;To
                    </Typography>
                  </Box>
                ) : (
                  <></>
                ),
              },
            },
          }}
        />
        {!isMobileSM ? (
          <IconButton onClick={(event: any) => toggleOpenDateTo(event)}>
            <ICONS.IconCaretDown />
          </IconButton>
        ) : (
          <></>
        )}
      </DatePickerWrapStyled>
    </DatePickerRangeStyled>
  );
}
