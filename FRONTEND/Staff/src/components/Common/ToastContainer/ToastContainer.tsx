import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer as ReactToastContainer, ToastContainerProps } from 'react-toastify';
import styled from '@emotion/styled';

const CustomToastContainer = styled(ReactToastContainer)(() => ({
  '& .Toastify__toast': {
    minHeight: 'auto',
    borderRadius: 16,
    minWidth: 350,
  },

  '& .toast': {
    right: 60,
  },

  '& .Toastify__toast--success': {},

  '& .Toastify__toast--error': {},

  '& .Toastify__close-button--light': {
    opacity: 1,
    position: 'relative',
    top: 15,
    right: 20,
  },
}));

const ToastContainer = (props: ToastContainerProps) => {
  return <CustomToastContainer {...props} />;
};

export default ToastContainer;
