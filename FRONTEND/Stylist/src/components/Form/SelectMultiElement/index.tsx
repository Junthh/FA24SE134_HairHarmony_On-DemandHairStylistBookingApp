import React from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
  FormHelperText,
  Typography,
} from '@mui/material';
import { BaseSelect } from 'components/Base/BaseSelect';

interface ISelectMultiElementProps {
  name: string;
  label: string;
  control: Control<any>;
  options: { value: any; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}

const SelectMultiElement: React.FC<ISelectMultiElementProps> = ({
  name,
  label,
  control,
  options,
  placeholder = 'Select...',
  disabled = false,
}) => {
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
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <BaseSelect
              multiple
              displayEmpty
              value={value || []}
              onChange={(event) => onChange(event.target.value)}
              renderValue={(selected) =>
                (selected as string[])
                  .map((value) => {
                    const selectedOption = options.find((option) => option.value === value);
                    return selectedOption ? selectedOption.label : value;
                  })
                  .join(', ')
              }
              disabled={disabled}
              error={!!error}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Checkbox checked={(value || []).includes(option.value)} />
                  <ListItemText primary={option.label} />
                </MenuItem>
              ))}
            </BaseSelect>
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </>
        )}
      />
    </FormControl>
  );
};

export default SelectMultiElement;
