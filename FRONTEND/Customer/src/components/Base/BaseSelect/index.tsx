import { forwardRef, memo } from 'react';
import { styled } from '@mui/material/styles';
import { Select, SelectProps } from '@mui/material';

const SelectStyled = styled(Select)`
  height: 38px;
  border-radius: 8px;
`;


const BaseSelectComponent = forwardRef((props: SelectProps, ref) => {
  return <SelectStyled {...props} ref={ref} />;
});

export const BaseSelect = memo<SelectProps>(BaseSelectComponent) as typeof BaseSelectComponent;
