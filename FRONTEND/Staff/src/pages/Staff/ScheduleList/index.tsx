import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Chip,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
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
import { setLoading } from 'redux/Reducer';
import { scheduleListServices } from 'services/scheduleLists.service';
import { useDispatch } from 'react-redux';
import { currencyFormat } from 'utils/helper';
import DatePickerElement from 'components/Form/DatepickerElement';
import moment from 'moment';
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

export default function ScheduleList() {
  const dispatch = useDispatch();
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

  const [rows, setRows] = useState([]);
  const [paging, setPaging] = useState({
    size: 10,
    page: 0,
    total: 0,
  });

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPaging((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPaging((prev) => ({ ...prev, size: parseInt(event.target.value, 10), page: 0 }));
  };

  useEffect(() => {
    getBookingHistoryList({
      size: paging.size,
      page: paging.page,
    });
  }, [paging.size, paging.page]);

  const getBookingHistoryList = useCallback((props) => {
    console.log(props);
    dispatch(setLoading(true));
    const { size, page, bookingDate, customerPhoneNumber } = props;
    scheduleListServices
      .list({
        pageSize: size,
        pageIndex: page + 1,
        bookingDate: bookingDate,
        customerPhoneNumber: customerPhoneNumber,
      })
      .then((resultList: any) => {
        setPaging((prev) => ({
          ...prev,
          total: resultList.paging.total,
        }));
        setRows(resultList.data);
        dispatch(setLoading(false));
      });
  }, []);

  const handleFilters = (value) => {
    getBookingHistoryList({
      size: 10,
      page: 0,
      bookingDate: value.bookingDate
        ? moment(value.bookingDate).format('YYYY-MM-DD')
        : value.bookingDate,
      customerPhoneNumber: value.customerPhoneNumber,
    });
  };

  return (
    <Box marginRight={'20px'} marginTop={'40px'}>
      <BoxHeaderSearch>
        <Box className="search-left">
          <FormContainer formContext={formSearch} onSuccess={handleFilters}>
            <Box width={'100%'} display={'flex'} gap={2}>
              <TextFieldElement
                name="customerPhoneNumber"
                control={control}
                placeholder="Số điện thoại"
                InputProps={{
                  startAdornment: <ICONS.IconMagnifyingGlass></ICONS.IconMagnifyingGlass>,
                }}
              />
              <DatePickerElement name="bookingDate" label="" control={control} />
              <ButtonPrimary type="submit" severity="primary" padding={'7px 14px'}>
                <ICONS.IconFilter width={24} height={24}></ICONS.IconFilter>
              </ButtonPrimary>
            </Box>
          </FormContainer>
        </Box>
        <Box className="search-right"></Box>
      </BoxHeaderSearch>
      <Box height={40}></Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ background: '#2D3748' }}>
            <TableRow>
              <StyledTableCell style={{ color: 'white' }} align="left">
                STT
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Họ và tên
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Ngày đặt lịch
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Số điện thoại
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Stylist
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Tổng tiền
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Trạng thái
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, id) => (
              <StyledTableRow key={id}>
                <StyledTableCell component="th" scope="row">
                  {id + 1}
                </StyledTableCell>
                <StyledTableCell align="right">{row.customer?.fullName}</StyledTableCell>
                <StyledTableCell align="right">{row.bookingDate}</StyledTableCell>
                <StyledTableCell align="right">{row.customer?.phoneNumber}</StyledTableCell>
                <StyledTableCell align="right">{row.stylist?.name}</StyledTableCell>
                <StyledTableCell align="right">{currencyFormat(row.totalPrice)}</StyledTableCell>
                <StyledTableCell align="right">
                  <Chip
                    label={row.status === 'Initialize' ? 'Đã tạo' : row.status}
                    color={row.status === 'Initialize' ? 'success' : 'default'}
                  />
                </StyledTableCell>
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
        <TablePagination
          component="div"
          count={paging.total}
          page={paging.page}
          rowsPerPage={paging.size}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          showFirstButton
          showLastButton
        />
      </Stack>
    </Box>
  );
}
function dispatch(arg0: { payload: boolean; type: 'app/setLoading' }) {
  throw new Error('Function not implemented.');
}
