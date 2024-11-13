import { createTheme } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';
import { enUS, viVN } from '@mui/material/locale';
import * as colors from 'constants/colors';
declare module '@mui/material/styles' {
  interface TypographyVariantsOptions {
    label1?: React.CSSProperties;
    label2?: React.CSSProperties;
    small1?: React.CSSProperties;
    small2?: React.CSSProperties;
    smaller1?: React.CSSProperties;
    smaller2?: React.CSSProperties;
  }

  interface CheckboxPropsColorOverrides {
    system: React.CSSProperties;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    label1: true;
    label2: true;
    small1: true;
    small2: true;
    smaller1: true;
    smaller2: true;
  }
}
export const theme = createTheme(
  {
    palette: {
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: green[500],
      },
      common: {
        white: colors.white,
      },
    },
    typography: {
      fontFamily: ['Roboto, sans-serif'].join(','),
      h1: {
        fontFamily: 'Roboto, sans-serif',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '38px',
        lineHeight: 1.4,
      },
      h2: {
        fontFamily: 'Roboto, sans-serif',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '28px',
        lineHeight: 1.4,
      },
      h3: {
        fontFamily: 'Roboto, sans-serif',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '24px',
        lineHeight: 1.4,
      },
      h4: {
        fontFamily: 'Roboto, sans-serif',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '20px',
        lineHeight: 1.4,
      },
      h5: {
        fontFamily: 'Roboto, sans-serif',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '18px',
        lineHeight: 1.4,
      },
      // bold body
      body1: {
        fontFamily: 'Roboto, sans-serif',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '18px',
        lineHeight: 1.8,
      },
      body2: {
        fontFamily: 'Roboto, sans-serif',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: 1.8,
      },
      // bold label
      label1: {
        fontFamily: 'Roboto, sans-serif',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: 1.6,
      },
      // regular label
      label2: {
        fontFamily: 'Roboto, sans-serif',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: 1.6,
      },
      // bold small
      small1: {
        fontFamily: 'Roboto, sans-serif',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: 1.4,
      },
      // regular small
      small2: {
        fontFamily: 'Roboto, sans-serif',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '12px',
        lineHeight: 1.4,
      },
      // bold smaller
      smaller1: {
        fontFamily: 'Roboto, sans-serif',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '10px',
        lineHeight: 1.4,
      },
      // regular smaller
      smaller2: {
        fontFamily: 'Roboto, sans-serif',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '8px',
        lineHeight: 1.4,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 480,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  },
  viVN,
  enUS,
);
