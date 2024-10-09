import styled from '@emotion/styled';
import { Autocomplete, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import * as colors from "constants/colors"
import { isEmpty } from 'lodash';
import { ICONS } from 'configurations/icons';
const AutocompleteFilterStyled = styled(Autocomplete)({
    "& .MuiAutocomplete-inputRoot": {
        height: '50px',
        borderRadius: '100px',
        padding: "4.5px 4px 7.5px 5px",
        fontWeight: 700,
        fontSize: 18,
        lineHeight: 1.8,
        "& .MuiAutocomplete-endAdornment": {
            top: 9
        },
        '& .MuiAutocomplete-popupIndicator': {
            width: 29,
            height: 29,
            top: 'calc(50% - 15px)',
            color: colors.primary1,
        },
    }

});

export default function AutocompleteFilter(props) {
    const { options, handleChangeFilter, receivedValue, disabled, reset } = props;
    const [value, setValue] = React.useState<any>('');
    useEffect(() => {
        handleChangeFilter(value);
    }, [value]);
    useEffect(() => {
        if (!isEmpty(receivedValue) || (!receivedValue && reset)) {
            setValue(receivedValue);
        }
    }, [receivedValue]);
    const getLabel = (value: any) => {
        const findItem = options?.find((e) => e.value === value);
        return findItem?.label || value;
    };
    return (
        <AutocompleteFilterStyled
            disabled={disabled}
            onChange={(event, value: any, reason, details) => {
                setValue(value?.value);
            }}
            value={value}
            options={options}
            getOptionLabel={(option: any) => {
                return `${option.label || getLabel(value)}`;
            }}
            renderInput={(params) => <TextField {...params} fullWidth
            />}
            popupIcon={<ICONS.IconCaretDown />}
        />
    );
}
