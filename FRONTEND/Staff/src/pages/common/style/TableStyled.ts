import styled from '@emotion/styled';
import { TableCell, tableCellClasses, TableRow } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   '&:nth-of-type(odd)': {
  //     backgroundColor: theme.palette.action.hover,
  //   },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
