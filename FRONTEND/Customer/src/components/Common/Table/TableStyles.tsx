import { TableCell, TableHead } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as colors from 'constants/colors';
export const CellWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 15,
});

export const SCTableWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.common.white,
  overflowX: 'auto',
  overflowY: 'hidden',
}));

export const SCTableHeadContainer = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#F2F3F5',
  position: 'relative',
  opacity: 1,
  zIndex: theme.zIndex.appBar,
  borderTop: `1px solid ${colors.boderline}`,
  borderBottom: `1px solid ${colors.boderline}`,
}));

export const SCTableCellContainer = styled(TableCell)(({ theme }) => ({
  borderBottom: `2px solid ${colors.boderline}`,
}));
export const SCTableCellHeaderContainer = styled(TableCell)(({ theme }) => ({
  borderBottom: `2px solid ${colors.boderline}`,
  padding: '8px 8px 8px 15px',
}));
export const TableHeaderColumnWrapper = styled('div')({
  display: 'flex',
  gap: 5,
  alignItems: 'center',
  width: '100%',
  '& span > svg': {
    marginBottom: '4px',
  },
});
