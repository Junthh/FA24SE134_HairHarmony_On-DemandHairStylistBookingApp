import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import LoadingButton from '@mui/lab/LoadingButton';

interface DialogActionsPropsType {
  confirmButtonText?: string;
  cancelButtonText?: string;
  formId?: string; // used to trigger submit form
  loading?: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const DialogActions = ({
  confirmButtonText,
  cancelButtonText,
  formId,
  loading,
  onClose,
  onConfirm,
}: DialogActionsPropsType) => {
  return (
    <Stack direction="row" justifyContent="space-between" width="100%" padding={4}>
      <Button variant="outlined" onClick={onClose}>
        {cancelButtonText || 'Cancel'}
      </Button>
      <LoadingButton
        type="submit"
        form={formId}
        variant="contained"
        onClick={onConfirm}
        loading={loading}
      >
        {confirmButtonText}
      </LoadingButton>
    </Stack>
  );
};

export default DialogActions;
