import { Box, SxProps, Theme, Typography } from '@mui/material';
import * as colors from 'constants/colors';
interface BaseCellValueProps {
  text: string | number | React.ReactElement;
  hyperLink?: boolean;
  align?: 'left' | 'right' | 'center';
  sx?: SxProps<Theme>;
}

function BaseCellValue({ text, hyperLink, align, sx }: BaseCellValueProps) {
  return (
    <Box
      sx={{
        width: align ? '100%' : 'unset',
        textAlign: align,
      }}
    >
      <Typography
        sx={{ cursor: hyperLink ? 'pointer' : 'auto' }}
        variant="label2"
        component="p"
        fontWeight={400}
        fontSize={16}
        lineHeight={1.8}
        color={colors.b9}
      >
        {text}
      </Typography>
    </Box>
  );
}

export default BaseCellValue;
