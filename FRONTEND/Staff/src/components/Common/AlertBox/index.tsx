import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ClearIcon from '@mui/icons-material/Clear';
import InfoIcon from '@mui/icons-material/Info';
import React, { MouseEventHandler, PropsWithChildren } from 'react';
import { SCAlertAction, SCAlertIcon, SCAlertBody, SCAlertRoot } from './styles';
import { Typography } from '@mui/material';
import { ICONS } from 'configurations/icons';

const iconMapping = {
  success: <CheckCircleIcon />,
  warning: <WarningAmberIcon />,
  error: <ClearIcon />,
  info: <InfoIcon />,
};

interface AlertBoxProps {
  // success, warning implemented according to figma design, no design yet for error and info
  severity?: 'error' | 'info' | 'success' | 'warning';
  title?: string;
  closable?: boolean;
  onClose?: MouseEventHandler;
  className?: string;
}

const AlertBox = (props: PropsWithChildren<AlertBoxProps>) => {
  const { children, title, className, severity, closable, onClose } = props;

  return (
    <SCAlertRoot severity={severity} className={className}>
      {severity && <SCAlertIcon>{iconMapping[severity]}</SCAlertIcon>}
      <div>
        {title && <Typography>{title}</Typography>}
        <SCAlertBody>{children}</SCAlertBody>
      </div>
      {closable && onClose ? (
        <SCAlertAction>
          <Typography onClick={onClose}>
            <ICONS.IconX />
          </Typography>
        </SCAlertAction>
      ) : null}
    </SCAlertRoot>
  );
};

export default AlertBox;
