import { FormControl, FormLabel, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { TextAreaStyled } from './styles';

const TextAreaElement = ({
  defaultValue,
  disabled,
  label,
  name,
  required,
  type,
  rows,
  InputProps,
  control,
  maxLengthValue,
  ...props
}: any) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={required}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
          return (
            <FormControl fullWidth>
              {label && <FormLabel sx={{ marginLeft: 1, marginBottom: '6px' }}>{label}</FormLabel>}
              <TextAreaStyled
                {...props}
                fullWidth
                size="small"
                variant="filled"
                id="filled-helperText"
                spellCheck={false}
                disabled={disabled}
                defaultValue={defaultValue}
                value={value ? value : value ?? ''}
                onChange={(ev) => {
                  onChange(ev);
                  if (typeof onChange === 'function') {
                    onChange(ev);
                  }
                }}
                multiline
                rows={rows}
                minRows={3}
                error={error}
                helperText={error ? <p style={{ color: 'red' }}>{error.message}</p> : ''}
              />
            </FormControl>
          );
        }}
      />
    </>
  );
};
export default TextAreaElement;
