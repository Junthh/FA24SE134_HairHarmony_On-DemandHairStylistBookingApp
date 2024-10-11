import React from 'react';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { FormContainer } from 'components/Form/FormContainer';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { BoxHeaderSearch } from '../Styles/common';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import { ICONS } from 'configurations/icons';
import { ButtonPrimary } from 'pages/common/style/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { IconButton } from '@mui/material';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   '&:nth-of-type(odd)': {
  //     backgroundColor: theme.palette.action.hover,
  //   },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const rows = [
  createData('Ánh Nguyên Nghị', 'Busy'),
  createData('Trần Thị An', 'Available'),
  createData('Đỗ Xuân Minh', 'Available'),
  createData('Hồ Xuân Xuân', 'Busy'),
  createData('Jhon Alex', 'Available'),
  createData('Trần Hưu Nghị', 'Available'),
];
function createData(name: string, status: string) {
  return { name, status };
}
export default function StylistStatus() {
  const schema = Yup.object().shape<any>({});
  const formSearch = useForm<any>({
    defaultValues: {},
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = formSearch;
  return (
    <Box marginRight={'20px'} marginTop={'40px'}>
      <FormContainer formContext={formSearch}>
        <BoxHeaderSearch>
          <Box className="search-left">
            <TextFieldElement
              name="keySearch"
              control={control}
              placeholder="Search"
              InputProps={{
                startAdornment: <ICONS.IconMagnifyingGlass></ICONS.IconMagnifyingGlass>,
              }}
              //   onKeyUp={handleKeyup}
            />
            <ButtonPrimary
              severity="primary"
              padding={'7px 14px'}
              //   onClick={() => navigate(`${STATE.CREATE}`)}
            >
              <ICONS.IconFilter width={24} height={24}></ICONS.IconFilter>
            </ButtonPrimary>
            <Box width={'50%'}></Box>
          </Box>
          <Box className="search-right"></Box>
        </BoxHeaderSearch>
      </FormContainer>
      <Box height={40}></Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ background: '#2D3748' }}>
            <TableRow>
              <StyledTableCell style={{ color: 'white' }} align="left">
                Họ và tên
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Trạng thái
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.status}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton>
                    <ICONS.IconThreeDot />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box height={20}></Box>
      <Stack spacing={2} alignItems={'center'}>
        <Pagination count={10} showFirstButton showLastButton />
      </Stack>
    </Box>
  );
}
