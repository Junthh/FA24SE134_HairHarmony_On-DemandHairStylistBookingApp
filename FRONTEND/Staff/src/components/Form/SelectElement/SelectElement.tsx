import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  InputAdornment,
  IconButton,
  FormLabel,
  Box,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import clsx from 'clsx';
import CloseIcon from '@mui/icons-material/Close';
import { BaseSelect } from 'components/Base/BaseSelect';
import * as colors from 'constants/colors';
import { isEmpty } from 'lodash';
import styled from '@emotion/styled';
export interface ISelectElementProps {
  name: string;
  label?: any;
  placeholder?: string;
  control: Control;
  options: any;
  handleChange?: (e: any) => void;
}

interface options {
  value: any;
  label: any;
}
const PlaceholderStyled = styled(`div`)<{ isLabel }>(({ isLabel }) => ({
  color: colors.placeholder,
  position: 'absolute',
  top: isLabel === 'false' ? '62%' : '25%',
  left: '15px',
  fontWeight: 100,
}));

const Placeholder = ({ children, isLabel }) => {
  return <PlaceholderStyled isLabel={isLabel}>{children}</PlaceholderStyled>;
};
const SelectElement: React.FunctionComponent<ISelectElementProps> = ({
  label,
  placeholder = '',
  options,
  props,
  disabled = false,
  name,
  control,
  handleChange,
}: any) => {
  const [reSize, setReSize] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const selectRef: any = useRef();
  useEffect(() => {
    const listener = () => {
      setTimeout(() => {
        setReSize(window.innerWidth);
      }, 1000);
    };

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);
  useEffect(() => {
    setWidth(selectRef && selectRef.current?.offsetWidth - 38);
  }, [reSize]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ...fieldRest }, fieldState: { error } }) => {
        // set margin paper when have value
        const getMenuProps = (selectRef: any) => {
          return {
            PaperProps: {
              style: {
                width: selectRef.current?.offsetWidth,
              },
            },
          };
        };
        return (
          <FormControl fullWidth sx={{ position: 'relative' }}>
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
            {placeholder && isEmpty(value) && (
              <Placeholder isLabel={isEmpty(label) ? 'true' : 'false'}>{placeholder}</Placeholder>
            )}
            <BaseSelect
              onChange={(e) => {
                onChange(e);
                handleChange && handleChange(e);
              }}
              displayEmpty
              onBlur={onBlur}
              value={value || ''}
              disabled={disabled}
              error={!!error}
              ref={selectRef}
              endAdornment={
                value && !disabled ? (
                  <InputAdornment position="end" sx={{ paddingRight: '12px' }}>
                    <IconButton onClick={onChange}>
                      <CloseIcon sx={{ fontSize: '15px' }} />
                    </IconButton>
                  </InputAdornment>
                ) : null
              }
              // set style for paper
              MenuProps={getMenuProps(selectRef)}
              {...props}
            >
              {options &&
                options.map((option: options, index: any) => (
                  <MenuItem key={index} value={option.value}>
                    <Typography
                      sx={{
                        width: width,
                        whiteSpace: 'initial',
                      }}
                    >
                      {option.label}
                    </Typography>
                  </MenuItem>
                ))}
            </BaseSelect>
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
};

export default SelectElement;
