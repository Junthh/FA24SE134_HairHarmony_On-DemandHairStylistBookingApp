import { Box, SxProps, Theme, Typography } from '@mui/material';
import * as colors from 'constants/colors';
interface BaseColumnHeaderProps {
  text: string;
  canSort?: boolean;
  align?: 'left' | 'right' | 'center';
  sx?: SxProps<Theme>;
}

function BaseColumnHeader({ text, canSort, align, sx }: BaseColumnHeaderProps) {
  return (
    <Box
      sx={{
        width: align ? '100%' : 'unset',
        textAlign: align,
      }}
    >
      <Typography
        sx={{ cursor: canSort ? 'pointer' : 'auto' }}
        variant="label2"
        component="p"
        fontWeight={500}
        fontSize={12}
        lineHeight={1.4}
        textTransform={'uppercase'}
        color={colors.b7}
      >
        {text}
      </Typography>
    </Box>
  );
}

export default BaseColumnHeader;
