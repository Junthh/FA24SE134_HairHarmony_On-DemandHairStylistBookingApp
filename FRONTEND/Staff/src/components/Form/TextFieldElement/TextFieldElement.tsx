import { Control, Controller } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { BaseTextField } from '../../Base/BaseTextField';
import { FormControl, TextFieldProps } from '@mui/material';
import { FormLabel } from '@mui/material';
import './styles.css';

export type TextFieldElementProps<T extends FieldValues = FieldValues> = Omit<TextFieldProps, 'name'> & {
  name: string;
  control?: Control;
  placeholder?: string;
  label?: string | React.ReactElement;
};

export default function TextFieldElement<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  placeholder,
  label,
  ...props
}: TextFieldElementProps<TFieldValues>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => {
        return (
          <FormControl fullWidth>
            {label && <FormLabel sx={{ marginLeft: 1, marginBottom: '6px' }}>{label}</FormLabel>}
            <BaseTextField
              variant="outlined"
              fullWidth={true}
              placeholder={placeholder || ''}
              {...props}
              name={name}
              value={value ?? ''}
              onChange={onChange}
              error={!!error}
              helperText={error?.message}
            />
          </FormControl>
        );
      }}
    />
  );
}
