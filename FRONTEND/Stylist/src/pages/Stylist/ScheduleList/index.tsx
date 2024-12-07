import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { InfoOutlined, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import { showToast } from 'components/Common/Toast';
import DatePickerElement from 'components/Form/DatepickerElement';
import { FormContainer } from 'components/Form/FormContainer';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import { ICONS } from 'configurations/icons';
import moment from 'moment';
import { ButtonPrimary } from 'pages/common/style/Button';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectCredentialInfo, setLoading } from 'redux/Reducer';
import { scheduleListServices } from 'services/scheduleLists.service';
import { formatDate, formatDateTime, formatTime } from 'utils/datetime';
import { currencyFormat } from 'utils/helper';
import * as Yup from 'yup';
import { BoxHeaderSearch } from '../Styles/common';
import { LoadingButton } from '@mui/lab';
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

const STATUS_LABEL = {
  Initialize: 'Đã đặt lịch',
  Confirmed: 'Đã xác nhận',
  Processing: 'Bắt đầu thực hiện',
  Completed: 'Hoàn thành',
  Finished: 'Kết thúc',
  Cancel: 'Huỷ',
};

const STATUS_COLOR = {
  Initialize: 'success',
  Confirmed: 'warning',
  Processing: 'info',
  Completed: 'default',
  Finished: 'primary',
  Cancel: 'error',
};

export default function ScheduleList() {
  const credentialInfo = useSelector(selectCredentialInfo);
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
  const [tabValue, setTabValue] = useState('Processing');
  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);
  const [isReloadData, setIsReloadData] = useState(false);
  const [bookingSelected, setBookingSelected] = useState<any>();
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isOpenCollapse, setIsOpenCollapse] = useState(false);

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
    formSearch.setValue('startDate', Date.now());
    formSearch.setValue('endDate', Date.now());
  }, []);

  useEffect(() => {
    if (credentialInfo.Id) {
      getBookingHistoryList({
        size: paging.size,
        page: paging.page,
        status: tabValue,
        stylistId: credentialInfo.Id,
        startDate:
          moment(formSearch.getValues('startDate')).format('YYYY-MM-DD') ??
          moment(Date.now()).format('YYYY-MM-DD'),
        endDate:
          moment(formSearch.getValues('endDate')).format('YYYY-MM-DD') ??
          moment(Date.now()).format('YYYY-MM-DD'),
      });
    }
  }, [paging.size, paging.page, tabValue, isReloadData, credentialInfo.Id]);

  const getBookingHistoryList = useCallback((props) => {
    dispatch(setLoading(true));
    const { size, page, startDate, endDate, customerPhoneNumber, status, stylistId } = props;
    scheduleListServices
      .list({
        pageSize: size,
        pageIndex: page + 1,
        stylistId,
        startDate,
        endDate,
        customerPhoneNumber: customerPhoneNumber,
        status,
        sortKey: 'CreatedDate',
        sortOrder: 'DESC',
      })
      .then((resultList: any) => {
        setPaging((prev) => ({
          ...prev,
          total: resultList.paging.total,
        }));
        setRows(resultList.data);
        dispatch(setLoading(false));
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFilters = (value) => {
    getBookingHistoryList({
      size: 10,
      page: 0,
      startDate:
        moment(formSearch.getValues('startDate')).format('YYYY-MM-DD') ??
        moment(Date.now()).format('YYYY-MM-DD'),
      endDate:
        moment(formSearch.getValues('endDate')).format('YYYY-MM-DD') ??
        moment(Date.now()).format('YYYY-MM-DD'),
      customerPhoneNumber: value.customerPhoneNumber,
      status: tabValue,
      stylistId: credentialInfo.Id,
    });
  };

  const handleUpdateBooking = (booking) => {
    setIsLoadingButton(true);
    scheduleListServices
      .update(booking)
      .then(() => {
        showToast('success', 'Cập nhật thành công');
        setIsReloadData(!isReloadData);
      })
      .catch((error) => {
        console.error(error);
        showToast('error', error.msg || error.message);
      })
      .finally(() => {
        setIsLoadingButton(false);
      });
  };

  return (
    <Box marginRight={'20px'} marginTop={'40px'}>
      <BoxHeaderSearch>
        <Box className="search-left">
          <FormContainer formContext={formSearch} onSuccess={handleFilters}>
            <Box width={'100%'} display={'flex'} gap={2} alignItems={'flex-end'}>
              <TextFieldElement
                name="customerPhoneNumber"
                label="Số điện thoại"
                control={control}
                placeholder="Số điện thoại"
                InputProps={{
                  startAdornment: <ICONS.IconMagnifyingGlass></ICONS.IconMagnifyingGlass>,
                }}
              />
              <DatePickerElement name="startDate" label="Ngày bắt đầu" control={control} />
              <DatePickerElement name="endDate" label="Ngày kết thúc" control={control} />
              <ButtonPrimary
                sx={{ height: 40 }}
                type="submit"
                severity="primary"
                padding={'7px 14px'}
              >
                <ICONS.IconFilter width={24} height={24}></ICONS.IconFilter>
              </ButtonPrimary>
            </Box>
          </FormContainer>
        </Box>
        <Box className="search-right"></Box>
      </BoxHeaderSearch>
      <Box height={40}></Box>
      <TableContainer component={Paper}>
        <Tabs textColor="inherit" value={tabValue} onChange={(_, value) => setTabValue(value)}>
          <Tab value="" label="Tất cả" />
          <Tab value="Initialize" label="Đã đặt lịch" />
          <Tab value="Confirmed" label="Đã xác nhận" />
          <Tab value="Processing" label="Bắt đầu thực hiện" />
          <Tab value="Completed" label="Hoàn thành" />
          <Tab value="Finished" label="Kết thúc" />
          <Tab value="Cancel" label="Huỷ" />
        </Tabs>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ background: '#2D3748' }}>
            <TableRow>
              <StyledTableCell />
              <StyledTableCell style={{ color: 'white' }} align="left">
                STT
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Họ và tên
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Ngày đặt lịch
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Số điện thoại
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Stylist
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Thời gian bắt đầu
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Trạng thái
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Ngày tạo
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Hành động
              </StyledTableCell>
              {/* <StyledTableCell style={{ color: 'white' }} align="center" /> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <Row key={index} index={index} row={row} handleUpdateBooking={handleUpdateBooking} />
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

      <Dialog open={isOpenModalDetail} onClose={() => setIsOpenModalDetail(false)}>
        <DialogTitle>Chi tiết đặt lịch</DialogTitle>
        <DialogContent>
          {bookingSelected ? (
            <Grid container spacing={2}>
              <Grid item xs={4}>
                Tên khách hàng
              </Grid>
              <Grid item xs={8}>
                {bookingSelected.customer.fullName}
              </Grid>
              <Grid item xs={12}>
                <b>Các dịch vụ</b>
              </Grid>
              {bookingSelected.bookingDetails.map((item, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={4}>
                    {item.service ? item.service.name : item.combo ? item.combo.name : ''}
                  </Grid>
                  <Grid item xs={8}>
                    {item.service
                      ? currencyFormat(item.service.price)
                      : item.combo
                      ? currencyFormat(item.combo.totalPrice)
                      : ''}
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Box>
            <Button color="error" variant="contained" onClick={() => setIsOpenModalDetail(false)}>
              Huỷ
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function Row(props) {
  const [isOpenCollapse, setIsOpenCollapse] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  return (
    <React.Fragment key={props.index}>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <StyledTableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setIsOpenCollapse(!isOpenCollapse)}
            key={props.index}
          >
            {isOpenCollapse ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {props.index + 1}
        </StyledTableCell>
        <StyledTableCell align="center">{props.row.customer?.fullName}</StyledTableCell>
        <StyledTableCell align="center">{formatDate(props.row?.bookingDate)}</StyledTableCell>
        <StyledTableCell align="center">{props.row.customer?.phoneNumber}</StyledTableCell>
        <StyledTableCell align="center">
          {props.row.bookingDetails[0]?.bookingSlotStylists[0]?.stylist?.fullName}
        </StyledTableCell>
        <StyledTableCell align="center">{formatTime(props.row?.startTime)}</StyledTableCell>
        <StyledTableCell align="center">
          <Chip label={STATUS_LABEL[props.row.status]} color={STATUS_COLOR[props.row.status]} />
        </StyledTableCell>
        <StyledTableCell align="center">{formatDateTime(props.row?.createdDate)}</StyledTableCell>
        <StyledTableCell align="center">
          <Box
            sx={{
              '& > *': {
                mr: '8px!important',
              },
            }}
          >
            {props.row.status === 'Processing' && (
              <LoadingButton
                loading={isLoadingButton}
                variant="contained"
                color="success"
                onClick={() => {
                  props.row.status = 'Completed';
                  props.handleUpdateBooking(props.row);
                }}
              >
                Hoàn thành
              </LoadingButton>
            )}
          </Box>
        </StyledTableCell>
      </StyledTableRow>

      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={isOpenCollapse} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Dịch vụ
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Dịch vụ</TableCell>
                    <TableCell align="center">Thời gian (phút)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.row.bookingDetails.map((bookingDetail, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        {bookingDetail.service
                          ? bookingDetail.service.name
                          : bookingDetail.combo.totalPrice}
                      </TableCell>
                      <TableCell align="center">{bookingDetail.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}
