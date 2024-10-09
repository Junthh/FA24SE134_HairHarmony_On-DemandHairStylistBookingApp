import React, { memo, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import { ICONS } from 'configurations/icons';
import * as colors from 'constants/colors';
export const SelectFilterStyled = styled(Select)({
  height: '50px',
  borderRadius: '100px',
  '& > div:nth-of-type(1)': {
    '& .MuiTypography-body1': {
      fontWeight: 700,
      fontSize: 18,
      lineHeight: 1.8,
    },
  },
  '& .MuiSelect-icon': {
    width: '24px',
    top: 'calc(50% - 15px)',
    color: colors.primary1,
  },
});

interface SelectFilterProps {
  options: any[];
  handleChangeFilter: any;
  receivedValue?: any;
  disabled?: boolean;
  reset?: boolean;
}

function SelectFilter(props: SelectFilterProps) {
  const { options, handleChangeFilter, receivedValue, disabled, reset } = props;
  const [value, setValue] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };
  useEffect(() => {
    handleChangeFilter(value);
  }, [value]);

  useEffect(() => {
    if (receivedValue || (!receivedValue && reset)) {
      setValue(receivedValue);
    }
  }, [receivedValue]);

  return (
    <SelectFilterStyled
      disabled={disabled}
      onChange={handleChange}
      fullWidth
      displayEmpty
      IconComponent={(props) => {
        return <ICONS.IconCaretDown className={props.className} />;
      }}
      endAdornment={
        value ? (
          <InputAdornment position="end" sx={{ paddingRight: '12px' }}>
            <IconButton
              onClick={(e: any) => {
                handleChange(e);
              }}
            >
              <CloseIcon sx={{ fontSize: '15px' }} />
            </IconButton>
          </InputAdornment>
        ) : (
          <></>
        )
      }
      value={value || ''}
    >
      {options.map((option: any, index: any) => (
        <MenuItem key={option.value} value={option.value}>
          <Typography>{option.label}</Typography>
        </MenuItem>
      ))}
    </SelectFilterStyled>
  );
}

export default memo(SelectFilter);
