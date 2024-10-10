import { Tooltip, TooltipProps } from '@mui/material';
import React from 'react';
const CustomTooltip: React.FC<TooltipProps> = ({ children, ...others }) => {
  return (
    <Tooltip disableInteractive {...others}>
      {children}
    </Tooltip>
  );
};
export default CustomTooltip;
