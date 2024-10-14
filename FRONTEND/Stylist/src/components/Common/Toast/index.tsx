// import CheckIcon from '@mui/icons-material/Check';
// import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
// import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';
import { toast } from 'react-toastify';
import './styles.css';
import * as colors from 'constants/colors';
import { styled } from '@mui/material';

type ToastType = 'success' | 'info' | 'warning' | 'error' | undefined;

interface CustomerToastModel {
  type: ToastType;
  title: string;
  message: string;
  color?: string;
}

const CustomToastContainer = styled(`div`)({
  display: 'flex',
  columnGap: '20px',
  border: colors.primary1,
  padding: 10,
});

const ToastContent = styled(`div`)({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '15px',
  color: colors.b9,
});

const ToastContentMessage = styled(`div`)({
  fontSize: '14px',
  fontWeight: '400',
});

export const showToast = (type: ToastType, message: string) => {
  const CustomToast = (props: CustomerToastModel) => {
    const { title, message, color = colors.b9 } = props;

    return (
      <CustomToastContainer>
        <div className="icon">
          <InfoIcon sx={{ color: color }} />
        </div>
        <ToastContent>
          <div
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: color,
            }}
          >
            {title}
          </div>
          <ToastContentMessage>{message}</ToastContentMessage>
        </ToastContent>
      </CustomToastContainer>
    );
  };

  const toastId = new Date().getTime();

  switch (type) {
    case 'warning':
      toast(
        <CustomToast
          type="warning"
          title="Warning"
          message={message}
          color={colors.yellow}
        ></CustomToast>,
        {
          className: 'toast warning',
          toastId,
          autoClose: 5000,
        },
      );
      break;
    case 'error':
      toast(
        <CustomToast
          type="error"
          title="Error"
          message={message}
          color={colors.negativeN500}
        ></CustomToast>,
        {
          className: 'toast error',
          toastId,
          autoClose: 5000,
        },
      );
      break;
    case 'success':
      toast(
        <CustomToast
          type="success"
          title="Success"
          message={message}
          color={colors.primary}
        ></CustomToast>,
        {
          className: 'toast success',
          toastId,
          autoClose: 3000,
        },
      );
      break;
    case 'info':
      toast(
        <CustomToast
          type="info"
          title="Information"
          message={message}
          color={colors.blueB300}
        ></CustomToast>,
        {
          className: 'toast info',
          toastId,
          autoClose: 3000,
        },
      );
      break;
    default:
      toast(message);
      break;
  }
};
