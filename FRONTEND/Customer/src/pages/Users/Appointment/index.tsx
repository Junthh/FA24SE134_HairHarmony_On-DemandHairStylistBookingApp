import styled from '@emotion/styled';
import {
  Box,
  Typography,
  Stack,
  Pagination,
  Divider,
  Rating,
  TablePagination,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import * as colors from 'constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { selectCredentialInfo, setLoading } from 'redux/Reducer';
import { useCallback } from 'react';
import { bookingServices } from 'services/booking.service';
import { formatDate } from 'utils/datetime';
import { currencyFormat } from 'utils/helper';
import { MAP_STATUS_LABEL, STATUS_LABEL } from 'configurations/constants/globalConstants';
import { ButtonPrimary } from 'pages/common/style/Button';
import { Dialog } from 'components/Common/Dialog';
import useModal from 'hooks/useModal';
import { FormContainer } from 'components/Form/FormContainer';
import RatingElement from 'components/Form/RatingElement/RatingElement';
import TextAreaElement from 'components/Form/TextAreaElement/TextAreaElement';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { feedbackService } from 'services/feedback.service';
import { showToast } from 'components/Common/Toast';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
const AppointmentStyled = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  padding: '40px 60px',
});
//
const AppointmentCard = styled(Box)({
  border: '1px solid black',
  borderRadius: 12,
  width: 550,
  padding: '12px 24px',
  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
  marginBottom: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
export default function Appointment() {
  const [paging, setPaging] = useState({
    size: 10,
    page: 0,
    total: 0,
  });
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isOpenConfirmCancel,
    openModal: openModalConfirmCancel,
    closeModal: closeModalConfirmCancel,
  } = useModal();
  const {
    isOpen: isOpenDetails,
    openModal: openModalDetails,
    closeModal: closeModalDetails,
  } = useModal();
  const [rows, setRows] = useState([]);
  const credentialInfo = useSelector(selectCredentialInfo);
  const [selectedRow, setSelectedRow] = useState(null);
  const [bookingDetail, setBookingDetail] = useState([]);
  const dispatch = useDispatch();

  const schemaFeedback = Yup.object().shape<any>({});
  const defaultValues = {
    rating: 0,
    description: '',
    bookingId: '',
    stylistId: '',
  };
  const formFeedback = useForm<any>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schemaFeedback),
  });
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
  } = formFeedback;
  const getListBookingHistory = useCallback(
    ({ size, page }) => {
      if (credentialInfo?.Id) {
        dispatch(setLoading(true));
        bookingServices
          .listBookingHistory({
            pageSize: size,
            pageIndex: page + 1,
            customerId: credentialInfo?.Id,
          })
          .then((res: any) => {
            setRows(res.data);
            setPaging((prev) => ({
              ...prev,
              total: res.paging.total,
            }));
          })
          .catch((err) => {})
          .finally(() => {
            dispatch(setLoading(false));
          });
      }
    },
    [paging.size, paging.page, credentialInfo],
  );
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
    getListBookingHistory({ size: paging.size, page: paging.page });
  }, [getListBookingHistory]);
  const handleOpenFeedback = (row) => {
    setSelectedRow(row);
    openModal();
  };
  const handleSave = useCallback(
    handleSubmit((data: any) => {
      data = {
        ...data,
        bookingId: selectedRow.id,
        stylistId: selectedRow.bookingDetails[0].bookingSlotStylists[0].stylist.id,
      };
      console.log(data);
      dispatch(setLoading(true));
      feedbackService
        .create(data)
        .then((res) => {
          showToast('success', 'Đánh giá stylist thành công!');
          closeModal();
          formFeedback.reset();
          getListBookingHistory({ size: paging.size, page: paging.page });
        })
        .catch((err) => {
          showToast('error', err.msg);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }),
    [selectedRow, paging],
  );
  const renderDialog = useMemo(() => {
    return (
      <Dialog
        open={isOpen}
        onClose={() => {
          closeModal();
        }}
        width="100%"
        title={'Đánh giá'}
        content={
          <FormContainer formContext={formFeedback}>
            <Box
              display={'flex'}
              justifyContent={'center'}
              flexDirection={'column'}
              gap={2}
              padding={'0 20px 20px 20px'}
              width={'550px'}
            >
              <RatingElement
                name="rating"
                control={control}
                label={'Đánh giá'}
                //   onKeyUp={handleKeyup}
              />
              <TextAreaElement
                name="description"
                control={control}
                placeholder="Nhập đánh giá"
                label={'Đánh giá'}

                //   onKeyUp={handleKeyup}
              />
              <Box display={'flex'} justifyContent={'flex-end'}>
                <ButtonPrimary severity="primary" padding={'9px 20px'} onClick={() => handleSave()}>
                  Lưu
                </ButtonPrimary>
              </Box>
            </Box>
          </FormContainer>
        }
      ></Dialog>
    );
  }, [isOpen]);
  const renderDialogConfirmCancel = useMemo(() => {
    return (
      <Dialog
        open={isOpenConfirmCancel}
        onClose={() => {
          closeModalConfirmCancel();
        }}
        width="100%"
        title={'Bạn có chắc muốn hủy đặt lịch ?'}
        content={
          <Box display={'flex'} justifyContent={'flex-end'} padding={'9px 20px'}>
            <ButtonPrimary
              severity="primary"
              padding={'9px 20px'}
              onClick={() => handleCancelBooking()}
            >
              Hủy
            </ButtonPrimary>
          </Box>
        }
      ></Dialog>
    );
  }, [isOpenConfirmCancel]);
  const handleCancelBooking = useCallback(() => {
    dispatch(setLoading(true));
    bookingServices
      .update(selectedRow.id, {
        ...selectedRow,
        status: STATUS_LABEL.Cancel,
      })
      .then((res) => {
        getListBookingHistory({ size: paging.size, page: paging.page });
        selectedRow(null);
        closeModalConfirmCancel();
        showToast('success', 'Hủy đặt lịch thành công!');
      })
      .catch((err) => {
        showToast('error', 'Hủy đặt lịch thất bại!');
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [selectedRow, isOpenConfirmCancel, paging.size, paging.page]);

  const handleOpenDetails = useCallback((item: any) => {
    dispatch(setLoading(true));
    bookingServices
      .findById(item.id)
      .then((res) => {
        const result = res.data.sort((a, b) => {
          const dateA = new Date(a.createdDate);
          const dateB = new Date(b.createdDate);
          return dateB.getTime() - dateA.getTime();
        });

        setBookingDetail(result);
        openModalDetails();
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, []);
  const renderDialogDetails = useMemo(() => {
    return (
      <Dialog
        open={isOpenDetails}
        onClose={() => {
          closeModalDetails();
        }}
        width="100%"
        title={'Chi tiết đặt lịch'}
        content={
          <>
            <Timeline>
              {bookingDetail &&
                bookingDetail.length > 0 &&
                bookingDetail.map((item) => {
                  return (
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent display={'flex'} justifyContent={'space-between'} gap={10}>
                        <Typography width={150} variant="h5">
                          {formatDate(item.createdDate, 'dd/MM/yyyy HH:mm')}{' '}
                        </Typography>{' '}
                        <Typography
                          variant="h5"
                          fontWeight={600}
                          color={MAP_STATUS_LABEL[item?.status]?.color}
                          width={150}
                          display={'flex'}
                        >
                          <Typography variant="h5" fontWeight={400} color={colors.grey2}>
                            Trạng thái: &nbsp;&nbsp;
                          </Typography>
                          {MAP_STATUS_LABEL[item?.status]?.label}{' '}
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                  );
                })}
            </Timeline>
          </>
        }
      ></Dialog>
    );
  }, [isOpenDetails, bookingDetail]);
  return (
    <>
      {renderDialogDetails}
      {renderDialogConfirmCancel}
      {renderDialog}
      <AppointmentStyled>
        <Typography variant="h1" fontWeight={700}>
          Cuộc hẹn
        </Typography>
        <Box className="current-appointment">
          <Typography variant="h2" fontWeight={600}>
            Sắp tới
          </Typography>
          <Box height={20}></Box>
          {rows.map((item) => {
            return item.status === 'Initialize' ? (
              <AppointmentCard>
                <Box>
                  <Typography variant="h5" fontWeight={600}>
                    Dịch vụ:{' '}
                    {item?.bookingDetails[0]?.combo?.name || item?.bookingDetails[0]?.service?.name}
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    Stylist: {item?.bookingDetails[0]?.bookingSlotStylists[0].stylist?.fullName}
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    Thời gian:{'  '}
                    <span
                      style={{
                        color: colors.grey2,
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      {item?.bookingDetails[0]?.bookingSlotStylists[0]?.timeSlot?.startTime
                        .split(':')
                        .slice(0, 2)
                        .join(':')}
                      ,{' '}
                      {formatDate(
                        item?.bookingDetails[0]?.bookingSlotStylists[0]?.bookingDate,
                        'dd/MM/yyyy',
                      )}
                    </span>
                    <br />
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    Tổng tiền:{' '}
                    <span style={{ fontWeight: 700 }}>{currencyFormat(item?.totalPrice)}</span>
                  </Typography>
                </Box>

                <Box display={'flex'} gap={2} alignItems={'center'} marginBottom={2}>
                  <ButtonPrimary
                    severity="cancel"
                    sx={{
                      color: 'red !important',
                      border: '1px solid red !important',
                    }}
                    padding={'2px 10px'}
                    onClick={() => {
                      openModalConfirmCancel();
                      setSelectedRow(item);
                    }}
                  >
                    Hủy
                  </ButtonPrimary>
                  <ButtonPrimary
                    padding={'2px 10px'}
                    severity="cancel"
                    variant="outlined"
                    onClick={() => handleOpenDetails(item)}
                  >
                    Chi tiết
                  </ButtonPrimary>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    color={MAP_STATUS_LABEL[item?.status]?.color}
                  >
                    {MAP_STATUS_LABEL[item?.status]?.label}{' '}
                  </Typography>
                </Box>
              </AppointmentCard>
            ) : (
              <></>
            );
          })}
        </Box>
        <Box className="history-appointment">
          <Typography variant="h2" fontWeight={600}>
            Lịch sử cuộc hẹn
          </Typography>
          <Box height={20}></Box>
          {rows.map((item) => {
            return item.status !== 'Initialize' ? (
              <AppointmentCard>
                <Box>
                  <Typography variant="h5" fontWeight={600}>
                    Dịch vụ:{' '}
                    {item?.bookingDetails[0]?.combo?.name || item?.bookingDetails[0]?.service?.name}
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    Stylist: {item?.bookingDetails[0]?.bookingSlotStylists[0].stylist?.fullName}
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    Thời gian:{'  '}
                    <span
                      style={{
                        color: colors.grey2,
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      {item?.bookingDetails[0]?.bookingSlotStylists[0]?.timeSlot?.startTime
                        .split(':')
                        .slice(0, 2)
                        .join(':')}
                      ,{' '}
                      {formatDate(
                        item?.bookingDetails[0]?.bookingSlotStylists[0]?.bookingDate,
                        'dd/MM/yyyy',
                      )}
                    </span>
                    <br />
                  </Typography>
                  {/* <Typography variant="h5" color={colors.grey2} fontSize={14}>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                &nbsp;&nbsp; &nbsp;
                <span>13:00 -16:45 (3 giờ, 45 phút)</span>
              </Typography> */}
                  <Typography variant="h5" fontWeight={600}>
                    Tổng tiền:{' '}
                    <span style={{ fontWeight: 700 }}>{currencyFormat(item?.totalPrice)}</span>
                  </Typography>
                </Box>
                <Box textAlign={'center'}>
                  {item?.status === STATUS_LABEL.Finished && item.isFeedback ? (
                    <Rating precision={0.5} value={item.feedbacks[0].rating} readOnly></Rating>
                  ) : (
                    <></>
                  )}
                  <Box display={'flex'} gap={2} alignItems={'center'} marginBottom={2}>
                    {item?.status === STATUS_LABEL.Initialize ||
                    item?.status === STATUS_LABEL.Confirmed ? (
                      <ButtonPrimary
                        severity="cancel"
                        sx={{
                          color: 'red !important',
                          border: '1px solid red !important',
                        }}
                        padding={'2px 10px'}
                        onClick={() => {
                          openModalConfirmCancel();
                          setSelectedRow(item);
                        }}
                      >
                        Hủy
                      </ButtonPrimary>
                    ) : (
                      <></>
                    )}
                    <ButtonPrimary
                      padding={'2px 10px'}
                      severity="cancel"
                      variant="outlined"
                      onClick={() => handleOpenDetails(item)}
                    >
                      Chi tiết
                    </ButtonPrimary>
                    <Typography
                      variant="h5"
                      fontWeight={600}
                      color={MAP_STATUS_LABEL[item?.status]?.color}
                    >
                      {MAP_STATUS_LABEL[item?.status]?.label}{' '}
                    </Typography>
                  </Box>

                  {item?.status === STATUS_LABEL.Finished && !item.isFeedback ? (
                    <ButtonPrimary
                      padding={'5px 10px'}
                      severity="cancel"
                      variant="outlined"
                      onClick={() => handleOpenFeedback(item)}
                    >
                      Feedback
                    </ButtonPrimary>
                  ) : (
                    <></>
                  )}
                </Box>
              </AppointmentCard>
            ) : (
              <></>
            );
          })}
        </Box>
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
      </AppointmentStyled>
    </>
  );
}
