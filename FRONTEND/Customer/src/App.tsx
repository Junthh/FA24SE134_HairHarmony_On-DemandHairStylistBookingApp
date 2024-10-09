import './App.css';
import { RouterProvider } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18n/i18n';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { SnackbarProvider } from 'notistack';
import { router } from 'routes/RenderRouter';
import { ToastContainer } from 'components/Common/ToastContainer';
import { LoadingOverlay } from 'components/Common/Spinner';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoadingOverlay />
      <I18nextProvider i18n={i18n}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <LocalizationProvider dateAdapter={AdapterDateFns} localeText={{}}>
          <SnackbarProvider maxSnack={5} />
          {/* RENDER ROUTER HERE */}
          {/* ADD AUTH RPOVIDER */}
          <RouterProvider router={router} />
        </LocalizationProvider>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;
