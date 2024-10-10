import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { FormContainer } from 'components/Form/FormContainer';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { BoxHeaderSearch } from '../Styles/common';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import { ICONS } from 'configurations/icons';
import { ButtonPrimary } from 'pages/common/style/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
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
  createData(
    'Ánh Nguyên Nghị',
    '19/06/2024',
    '0392748419',
    'Jhon Alex',
    '14:00',
    '-',
    'Cắt Nhộm',
    '600,000 VND',
  ),
  createData(
    'Ánh Nguyên Nghị',
    '19/06/2024',
    '0392748419',
    'Jhon Alex',
    '14:00',
    '-',
    'Cắt Nhộm',
    '600,000 VND',
  ),
  createData(
    'Ánh Nguyên Nghị',
    '19/06/2024',
    '0392748419',
    'Jhon Alex',
    '14:00',
    '-',
    'Cắt Nhộm',
    '600,000 VND',
  ),
  createData(
    'Ánh Nguyên Nghị',
    '19/06/2024',
    '0392748419',
    'Jhon Alex',
    '14:00',
    '-',
    'Cắt Nhộm',
    '600,000 VND',
  ),
];
function createData(
  name: string,
  date: string,
  phone: string,
  nameStylist: string,
  time: string,
  service: string,
  combo: string,
  price: string,
) {
  return { name, date, phone, nameStylist, time, service, combo, price };
}

export default function ScheduleList() {
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
              padding={'9px 14px'}
              //   onClick={() => navigate(`${STATE.CREATE}`)}
            >
              <ICONS.IconFilter width={24} height={24}></ICONS.IconFilter>
            </ButtonPrimary>
            <Box width={'50%'}></Box>
          </Box>
          <Box className="search-right">
            <ButtonPrimary
              severity="primary"
              padding={'9px 14px'}
              //   onClick={() => navigate(`${STATE.CREATE}`)}
            >
              <ControlPointIcon />
              &nbsp; Thêm mới
            </ButtonPrimary>
          </Box>
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
                Ngày làm
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Số điện thoại
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Stylist
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Thời gian
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Dịch vụ
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Combo
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Tổng tiền
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.date}</StyledTableCell>
                <StyledTableCell align="right">{row.phone}</StyledTableCell>
                <StyledTableCell align="right">{row.nameStylist}</StyledTableCell>
                <StyledTableCell align="right">{row.time}</StyledTableCell>
                <StyledTableCell align="right">{row.service}</StyledTableCell>
                <StyledTableCell align="right">{row.combo}</StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
