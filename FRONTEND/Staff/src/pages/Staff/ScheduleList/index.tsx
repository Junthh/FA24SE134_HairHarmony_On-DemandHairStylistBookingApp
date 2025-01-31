import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Pagination,
  Paper,
  Select,
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
import { showToast } from 'components/Common/Toast';
import { LoadingButton } from '@mui/lab';
import _ from 'lodash';
import { systemConfigService } from 'services/systemConfigs.service';
import SelectElement from 'components/Form/SelectElement/SelectElement';
import { DetailsOutlined, InfoOutlined, QueryStats } from '@mui/icons-material';
import { formatDate, formatDateTime, formatTime } from 'utils/datetime';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { bookingServices } from 'services/booking.service';
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
  const { search } = useLocation();
  const dispatch = useDispatch();

  const [isOpenModalFinished, setIsOpenModalFinished] = useState(false);

  const schema = Yup.object().shape<any>({
    paymentType: isOpenModalFinished && Yup.string().required('Vui lòng chọn loại thanh toán'),
  });
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
  const [tabValue, setTabValue] = useState('');
  const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);
  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);
  const [isOpenModalChangeStylist, setIsOpenModalChangeStylist] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoadingButtonCompleted, setIsLoadingButtonCompleted] = useState(false);
  const [isLoadingButtonChangeStylist, setIsLoadingButtonChangeStylist] = useState(false);
  const [isReloadData, setIsReloadData] = useState(false);
  const [bookingSelected, setBookingSelected] = useState<any>();
  const [isPointsErrorMessage, setIsPointErrorMessage] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [pointToVnd, setPointToVnd] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [amoutToPaid, setAmoutToPaid] = useState(0);
  const [expertFee, setExpertFee] = useState(0);
  const [paymentType, setPaymentType] = useState('');
  const [stylists, setStylists] = useState([]);
  const [stylistId, setStylistId] = useState('');

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
      status: tabValue,
      bookingDate: getValues('bookingDate')
        ? moment(getValues('bookingDate')).format('YYYY-MM-DD')
        : null,
      customerPhoneNumber: getValues('customerPhoneNumber'),
    });
  }, [paging.size, paging.page, tabValue, isReloadData]);

  const getBookingHistoryList = useCallback((props) => {
    dispatch(setLoading(true));
    const { size, page, bookingDate, customerPhoneNumber, status } = props;
    scheduleListServices
      .list({
        pageSize: size,
        pageIndex: page + 1,
        bookingDate: bookingDate,
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

  useEffect(() => {
    const query = new URLSearchParams(search);
    const paramStatus = query.get('status');
    if (paramStatus === 'Success') {
      showToast('success', 'Thanh toán thành công');
    } else if (paramStatus === 'Failed') {
      showToast('error', 'Thanh toán thất bại');
    }
  }, [search]);

  const getSystemConfig = useCallback(() => {
    systemConfigService
      .getByName({ name: 'POINTS_TO_VND' })
      .then((res) => {
        setPointToVnd(res.data[0].value);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFilters = (value) => {
    console.log(value);
    getBookingHistoryList({
      size: 10,
      page: 0,
      bookingDate: value.bookingDate ? moment(value.bookingDate).format('YYYY-MM-DD') : null,
      customerPhoneNumber: value.customerPhoneNumber,
      status: tabValue,
    });
  };

  const handleUpdateBooking = (booking) => {
    setIsLoadingButton(true);
    setIsLoadingButtonCompleted(true);
    setIsLoadingButtonChangeStylist(true);
    if (booking.paymentMethod === 'BANK_TRANSFER') {
      scheduleListServices
        .payWithVnpay(booking)
        .then((res) => {
          window.location.assign(res.data.url);
        })
        .catch((error) => {
          console.error(error);
          showToast('error', error.msg || error.message);
        })
        .finally(() => {
          setIsLoadingButton(false);
          setIsLoadingButtonCompleted(false);
        });
    } else {
      scheduleListServices
        .update(booking)
        .then(() => {
          showToast('success', 'Cập nhật thành công');
          setIsReloadData(!isReloadData);
          setIsOpenModalCancel(false);
          setIsOpenModalFinished(false);
          setIsOpenModalChangeStylist(false);
        })
        .catch((error) => {
          console.error(error);
          showToast('error', error.msg || error.message);
        })
        .finally(() => {
          setIsLoadingButton(false);
          setIsLoadingButtonCompleted(false);
          setIsLoadingButtonChangeStylist(false);
        });
    }
  };

  const getListStylistFreeTime = useCallback((data) => {
    dispatch(setLoading(true));

    const { timeSlotId, bookingDate, bookingDetails } = data;
    let services = [];
    bookingDetails.map((bookingDetail) => {
      return services.push(bookingDetail.serviceId || bookingDetail.comboId);
    });

    bookingServices
      .listStylistFreeTime({
        timeSlotId,
        bookingDate,
        serviceIds: services,
      })
      .then((res) => {
        setStylists(res.data);

        setIsOpenModalChangeStylist(true);
      })
      .catch((err) => {})
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, []);

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
        <Tabs
          textColor="inherit"
          value={tabValue}
          onChange={(_, value) => {
            // formSearch.reset();
            setTabValue(value);
          }}
        >
          <Tab value="" label="Tất cả" />
          <Tab value="Initialize" label="Đã đặt lịch" />
          <Tab value="Confirmed" label="Đã xác nhận" />
          <Tab value="Processing" label="Bắt đầu thực hiện" />
          <Tab value="Completed" label="Hoàn thành" />
          <Tab value="Finished" label="Kết thúc" />
          <Tab value="Cancel" label="Huỷ" />
        </Tabs>
        <Table sx={{ minWidth: 1800 }} aria-label="customized table">
          <TableHead style={{ background: '#2D3748' }}>
            <TableRow>
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
                Tổng tiền
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Số tiền thanh toán
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
              <StyledTableCell style={{ color: 'white' }} align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, id) => (
              <StyledTableRow key={id}>
                <StyledTableCell component="th" scope="row">
                  {id + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{row.customer?.fullName}</StyledTableCell>
                <StyledTableCell align="center">{formatDate(row.bookingDate)}</StyledTableCell>
                <StyledTableCell align="center">{row.customer?.phoneNumber}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.bookingDetails[0]?.bookingSlotStylists[0]?.stylist?.fullName}
                </StyledTableCell>
                <StyledTableCell align="center">{formatTime(row?.startTime)}</StyledTableCell>
                <StyledTableCell align="center">{currencyFormat(row.totalPrice)}</StyledTableCell>
                <StyledTableCell align="center">{currencyFormat(row.amoutToPaid)}</StyledTableCell>
                <StyledTableCell align="center">
                  <Chip label={STATUS_LABEL[row.status]} color={STATUS_COLOR[row.status]} />
                </StyledTableCell>
                <StyledTableCell align="center">{formatDateTime(row.createdDate)}</StyledTableCell>
                <StyledTableCell align="center">
                  <Box
                    sx={{
                      '& > *': {
                        mr: '8px!important',
                      },
                    }}
                  >
                    {row.status === 'Initialize' && (
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          row.status = 'Confirmed';
                          handleUpdateBooking(row);
                        }}
                      >
                        Đã xác nhận
                      </Button>
                    )}
                    {row.status === 'Confirmed' && (
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => {
                          row.status = 'Processing';
                          handleUpdateBooking(row);
                        }}
                      >
                        Bắt đầu thực hiện
                      </Button>
                    )}
                    {row.status === 'Completed' && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          setBookingSelected(row);
                          setIsOpenModalFinished(true);
                          getSystemConfig();

                          let _totalPrice = 0;
                          row.bookingDetails.forEach((item) => {
                            if (item.service) {
                              _totalPrice += item.service.price;
                            }
                            if (item.combo) {
                              _totalPrice += item.combo.totalPrice;
                            }
                          });
                          const _expertFee = row.expertFee
                            ? (_totalPrice * row.expertFee) / 100
                            : 0;
                          _totalPrice += _expertFee;
                          setExpertFee(_expertFee);
                          setTotalPrice(_totalPrice);
                          setAmoutToPaid(_totalPrice);
                        }}
                      >
                        Kết thúc
                      </Button>
                    )}
                    {(row.status === 'Initialize' || row.status === 'Confirmed') && (
                      <>
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() => {
                            setBookingSelected(row);
                            getListStylistFreeTime(row);
                          }}
                        >
                          Đổi stylist
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            setBookingSelected(row);
                            setIsOpenModalCancel(true);
                          }}
                        >
                          Huỷ
                        </Button>
                      </>
                    )}
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    onClick={() => {
                      setBookingSelected(row);
                      setIsOpenModalDetail(true);
                    }}
                  >
                    <InfoOutlined />
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

      <Dialog open={isOpenModalDetail} onClose={() => setIsOpenModalDetail(false)}>
        <DialogTitle>Chi tiết đặt lịch</DialogTitle>
        <DialogContent>
          {bookingSelected ? (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                Tên khách hàng
              </Grid>
              <Grid item xs={6}>
                {bookingSelected.customer.fullName}
              </Grid>
              <Grid item xs={12}>
                <b>Các dịch vụ</b>
              </Grid>
              {bookingSelected.bookingDetails.map((item, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={1} />
                  <Grid item xs={5}>
                    {item.service ? item.service.name : item.combo ? item.combo.name : ''}
                  </Grid>
                  <Grid item xs={6}>
                    {item.service
                      ? currencyFormat(item.service.price)
                      : item.combo
                      ? currencyFormat(item.combo.totalPrice)
                      : ''}
                  </Grid>
                </React.Fragment>
              ))}
              <Grid item xs={6}>
                Tổng phí dịch vụ
              </Grid>
              <Grid item xs={6}>
                {currencyFormat(
                  bookingSelected.bookingDetails.reduce((sum, item) => sum + item.price, 0),
                )}
              </Grid>
              {bookingSelected.expertFee !== 0 && (
                <>
                  <Grid item xs={6}>
                    Phí chuyên gia
                  </Grid>
                  <Grid item xs={6}>
                    {currencyFormat(
                      (bookingSelected.bookingDetails.reduce((sum, item) => sum + item.price, 0) *
                        bookingSelected.expertFee) /
                        100,
                    )}{' '}
                    ({bookingSelected.expertFee}%)
                  </Grid>
                </>
              )}
              <Grid item xs={6}>
                <b>Tổng tiền</b>
              </Grid>
              <Grid item xs={6}>
                <b>{currencyFormat(bookingSelected.totalPrice)}</b>
              </Grid>
              {bookingSelected.payments.length > 0 &&
                bookingSelected.payments[0].status !== 'Initialize' && (
                  <>
                    <Grid item xs={12}>
                      <b>Thanh toán</b>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={5}>
                      Số tiền:
                    </Grid>
                    <Grid item xs={6}>
                      {currencyFormat(bookingSelected.payments[0].price)} (
                      {bookingSelected.payments[0].status === 'Completed'
                        ? 'Thành công'
                        : 'Thất bại'}
                      )
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={5}>
                      Hình thức thanh toán:
                    </Grid>
                    <Grid item xs={6}>
                      {bookingSelected.payments[0].paymentMethod === 'BANK_TRANSFER'
                        ? 'Chuyển khoản'
                        : 'Tiền mặt'}
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={5}>
                      Ngày thanh toán:
                    </Grid>
                    <Grid item xs={6}>
                      {formatDateTime(bookingSelected.payments[0].createdDate)}
                    </Grid>
                  </>
                )}
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

      <Dialog open={isOpenModalCancel} onClose={() => setIsOpenModalCancel(false)}>
        <DialogTitle>Huỷ đặt lịch</DialogTitle>
        <DialogContent>Bạn có chắc chắn muốn huỷ đặt lịch không?</DialogContent>
        <DialogActions>
          <Box sx={{ '& > *': { mr: '8px!important' } }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                const booking = bookingSelected;
                booking.status = 'Cancel';
                handleUpdateBooking(booking);
              }}
            >
              Xác nhận
            </Button>
            <Button color="error" variant="contained" onClick={() => setIsOpenModalCancel(false)}>
              Huỷ
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="md"
        open={isOpenModalFinished}
        onClose={() => setIsOpenModalFinished(false)}
      >
        <DialogTitle>Thanh toán</DialogTitle>
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
              <Grid item xs={4}>
                Số điểm tích luỹ
              </Grid>
              <Grid item xs={8}>
                {bookingSelected.customer.loyaltyPoints}
              </Grid>
              <Grid item xs={4}>
                Sử dụng điểm tích luỹ *
              </Grid>
              <Grid item xs={8}>
                <TextFieldElement
                  name="loyaltyPoints"
                  control={control}
                  type="number"
                  onBlur={(event) => {
                    if (event.target.value > bookingSelected.customer.loyaltyPoints) {
                      setIsPointErrorMessage(true);
                    } else {
                      if (event.target.value) {
                        const _discount = Number(event.target.value) * pointToVnd;
                        setDiscount(_discount);
                        setAmoutToPaid(totalPrice - _discount);
                      }
                      setIsPointErrorMessage(false);
                    }
                  }}
                />
              </Grid>
              {isPointsErrorMessage && (
                <>
                  <Grid item xs={4}></Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2" gutterBottom color="red">
                      Số điểm sử dụng không được lớn hơn số điểm hiện có
                    </Typography>
                  </Grid>
                </>
              )}
              <Grid item xs={4}>
                Phí chuyên gia
              </Grid>
              <Grid item xs={8}>
                {currencyFormat(expertFee)} ({bookingSelected.expertFee + '%'})
              </Grid>
              <Grid item xs={4}>
                Tổng chi phí
              </Grid>
              <Grid item xs={8}>
                {currencyFormat(totalPrice)}
              </Grid>
              <Grid item xs={4}>
                Giảm giá
              </Grid>
              <Grid item xs={8}>
                {currencyFormat(discount)}
              </Grid>
              <Grid item xs={4}>
                <b>Số tiền thanh toán</b>
              </Grid>
              <Grid item xs={8}>
                {currencyFormat(amoutToPaid)}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  (*) 100 điểm được quy đổi thành 1.000 VND
                </Typography>
              </Grid>
              <Grid item xs={4}>
                Loại thanh toán
              </Grid>
              <Grid item xs={8}>
                <SelectElement
                  control={control}
                  name="paymentType"
                  options={[
                    { label: 'Tiền mặt', value: 'CASH' },
                    { label: 'Chuyển khoản', value: 'BANK_TRANSFER' },
                  ]}
                />
              </Grid>
            </Grid>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Box sx={{ '& > *': { mr: '8px!important' } }}>
            <LoadingButton
              loading={isLoadingButtonCompleted}
              variant="contained"
              color="success"
              onClick={() => {
                const booking = bookingSelected;
                if (formSearch.getValues('loyaltyPoints')) {
                  booking.loyaltyPoints = Number(formSearch.getValues('loyaltyPoints'));
                }
                if (!formSearch.getValues('paymentType')) {
                  formSearch.trigger('paymentType');
                } else {
                  booking.totalPrice = totalPrice;
                  booking.amoutToPaid = amoutToPaid;
                  booking.status = 'Finished';
                  booking.paymentMethod = formSearch.getValues('paymentType');
                  handleUpdateBooking(booking);
                }
              }}
            >
              Thanh toán
            </LoadingButton>
            <Button color="error" variant="contained" onClick={() => setIsOpenModalFinished(false)}>
              Huỷ
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={isOpenModalChangeStylist}
        onClose={() => setIsOpenModalChangeStylist(false)}
      >
        <DialogTitle>Thay đổi stylist</DialogTitle>
        <DialogContent>
          <SelectElement
            name="stylistId"
            label="Stylist"
            control={control}
            options={
              stylists &&
              stylists.map((stylist) => ({
                value: stylist.id,
                label: stylist.fullName,
              }))
            }
            placeholder="Chọn stylist"
            handleChange={(event) => setStylistId(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Box sx={{ '& > *': { mr: '8px!important' } }}>
            <LoadingButton
              loading={isLoadingButtonChangeStylist}
              variant="contained"
              color="success"
              onClick={() => {
                const booking = bookingSelected;
                booking.stylistId = stylistId;
                handleUpdateBooking(booking);
              }}
            >
              Lưu
            </LoadingButton>
            <Button
              color="error"
              variant="contained"
              onClick={() => setIsOpenModalChangeStylist(false)}
            >
              Huỷ
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
function dispatch(arg0: { payload: boolean; type: 'app/setLoading' }) {
  throw new Error('Function not implemented.');
}
