/* eslint-disable complexity */
import { Control, Controller, ControllerProps, Path } from 'react-hook-form';
import {
  Autocomplete,
  AutocompleteProps,
  Checkbox,
  FormControl,
  FormLabel,
  TextFieldProps,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { BaseTextField } from '../../Base/BaseTextField';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import * as colors from 'constants/colors';
import { isEmpty } from 'lodash';
export type AutocompleteElementProps<
  F extends FieldValues,
  T,
  M extends boolean | undefined,
  D extends boolean | undefined,
> = {
  name: Path<T>;
  control?: Control<T>;
  options: T[];
  loading?: boolean;
  multiple?: M;
  matchId?: boolean;
  rules?: ControllerProps['rules'];
  required?: boolean;
  label?: TextFieldProps['label'];
  placeholder?: string;
  showCheckbox?: boolean;
  autocompleteProps?: Omit<
    AutocompleteProps<T, M, D, any>,
    'name' | 'options' | 'loading' | 'renderInput'
  >;
  textFieldProps?: Omit<TextFieldProps, 'name' | 'required' | 'label' | 'size'>;
  onHanleChange?: (value: any) => void;
  onHandleKeyUp?: (value: any) => void;
  disabled?: boolean;
  InputProps?: any;
};

type AutoDefault = {
  id: string | number;
  label: string;
};
const AutocompletedStyled = styled(Autocomplete)({
  '& input': {
    padding: '0px 0px 0px 5px!important',
    fontSize: 16,
  },
});
export default function AutocompleteElement<TFieldValues extends FieldValues>({
  textFieldProps,
  autocompleteProps,
  name,
  control,
  placeholder,
  options,
  loading,
  showCheckbox,
  rules,
  required,
  multiple,
  matchId,
  label,
  onHanleChange,
  onHandleKeyUp,
  disabled,
  InputProps
}: AutocompleteElementProps<
  TFieldValues,
  AutoDefault | string | any,
  boolean | undefined,
  boolean | undefined
>) {
  const { t } = useTranslation();
  const validationRules: ControllerProps['rules'] = {
    ...rules,
    ...(required && {
      required: rules?.required || t('error.field_required'),
    }),
  };
  const getLabel = (value: any) => {
    const findItem = options?.find((e) => e.value === value);
    return findItem?.label || value;
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules}
      render={({ field: { onChange, onBlur, value, ...fieldRest }, fieldState: { error } }) => {
        let currentValue = multiple ? value || [] : value || null;
        if (matchId) {
          currentValue = multiple
            ? ((value as any[]) || ([] as any[])).map((i: any) =>
                options.find((j) => (j.id || j) === i),
              )
            : options.find((i) => (i.id || i) === value) || null;
        }
        return (
          <FormControl fullWidth>
            {label && <FormLabel sx={{ marginLeft: 1, marginBottom: '6px' }}>{label}</FormLabel>}
            <AutocompletedStyled
              {...autocompleteProps}
              value={currentValue}
              loading={loading}
              multiple={multiple}
              options={options || []}
              disabled={disabled}
              disableCloseOnSelect={
                typeof autocompleteProps?.disableCloseOnSelect === 'boolean'
                  ? autocompleteProps.disableCloseOnSelect
                  : !!multiple
              }
              isOptionEqualToValue={
                autocompleteProps?.isOptionEqualToValue
                  ? autocompleteProps.isOptionEqualToValue
                  : (option: any, value: any) => {
                      return value ? option.value === (value?.value || value) : false;
                    }
              }
              getOptionLabel={
                autocompleteProps?.getOptionLabel
                  ? autocompleteProps.getOptionLabel
                  : (option: any) => {
                      return `${option?.label || getLabel(value)}`;
                    }
              }
              onChange={(event, value: any, reason, details) => {
                if (reason === 'clear') {
                  onChange('');
                  return;
                }
                let changedVal = value;
                if (matchId) {
                  changedVal = Array.isArray(value)
                    ? value.map((i: any) => i?.id || i)
                    : value?.value || value;
                }
                onChange(changedVal.value);
                if (onHanleChange) {
                  onHanleChange(value);
                }
                if (autocompleteProps?.onChange) {
                  autocompleteProps.onChange(event, value, reason, details);
                }
              }}
              renderOption={
                autocompleteProps?.renderOption ??
                (showCheckbox
                  ? (props, option: any, { selected }) => (
                      <li {...props}>
                        <Checkbox sx={{ marginRight: 1 }} checked={selected} />
                        {autocompleteProps?.getOptionLabel?.(option) || option.label || option}
                      </li>
                    )
                  : undefined)
              }
              onBlur={(event) => {
                onBlur();
                if (typeof autocompleteProps?.onBlur === 'function') {
                  autocompleteProps.onBlur(event);
                }
              }}
              renderInput={(params) => (
                <BaseTextField
                  variant="outlined"
                  name={name}
                  required={rules?.required ? true : required}
                  {...textFieldProps}
                  {...params}
                  onKeyUp={onHandleKeyUp}
                  placeholder={placeholder}
                  error={!!error}
                  disabled={disabled}
                  InputProps={{
                    ...InputProps,
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                    ...textFieldProps?.InputProps,
                  }}
                  helperText={error ? error.message : textFieldProps?.helperText}
                />
              )}
              {...fieldRest}
            />
          </FormControl>
        );
      }}
    />
  );
}
