import { styled } from '@mui/material/styles';

export const SCAlertRoot = styled('div')<{ severity: 'error' | 'info' | 'success' | 'warning' | undefined }>(
  ({ severity }) => ({
    display: 'flex',
    backgroundColor: severity === 'warning' ? '#EFEDFD' : '#f7f7f7',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '32px',
  })
);

export const SCAlertBody = styled('div')(() => ({
  marginTop: '4px',
}));

export const SCAlertIcon = styled('div')(() => ({
  marginTop: '5px',
  marginRight: '16px',
  padding: 0,
}));

export const SCAlertAction = styled('div')(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginLeft: 'auto',
  marginTop: '-8px',
  marginRight: '-8px',
}));
