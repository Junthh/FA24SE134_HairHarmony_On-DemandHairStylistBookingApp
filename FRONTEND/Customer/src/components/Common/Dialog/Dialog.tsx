import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Breakpoint, IconButton, Stack, Typography } from '@mui/material';
import { ICONS } from 'configurations/icons';

interface DialogPropsType {
  open: boolean;
  title: string | React.ReactNode;
  titleContent?: React.ReactElement;
  content: React.ReactElement;
  footerActions?: React.ReactElement;
  confirmButtonText?: string;
  cancelButtonText?: string;
  width?: number | string;
  maxWidth?: Breakpoint | false;
  onClose: () => void;
  onConfirm?: () => void;
}

function CustomDialog({
  open,
  title,
  titleContent,
  content,
  footerActions,
  width,
  maxWidth,
  onClose,
}: DialogPropsType) {
  return (
    <Dialog
      open={open}
      maxWidth={maxWidth || 'lg'}
      fullWidth
      onClose={onClose}
      scroll="body"
      sx={{ zIndex: 1299, height: '100vh' }}
      PaperProps={{
        sx: { borderRadius: 4 },
      }}
    >
      {typeof title === 'string' ? (
        <DialogTitle style={{ marginBottom: 12 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography>{title}</Typography>
            <IconButton onClick={onClose}>
              <ICONS.IconX />
            </IconButton>
          </Stack>
        </DialogTitle>
      ) : (
        title
      )}
      <DialogContent sx={{ width: width, padding: '0px' }}>{content}</DialogContent>
      {footerActions}
    </Dialog>
  );
}

export default CustomDialog;
