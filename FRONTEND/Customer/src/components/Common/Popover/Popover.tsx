import { PopoverProps } from '@mui/material';
import React from 'react';
import { PopoverContainer } from './PopoverStyle';

export const Popover: React.FC<PopoverProps> = (props) => {
  return <PopoverContainer {...props}>{props.children}</PopoverContainer>;
};
