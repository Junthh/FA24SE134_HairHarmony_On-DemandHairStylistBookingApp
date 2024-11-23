import styled from '@emotion/styled';
import { Box, Typography, Stack, Pagination, Divider, Rating } from '@mui/material';
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
  const [rows, setRows] = useState([]);
  const credentialInfo = useSelector(selectCredentialInfo);
  const [selectedRow, setSelectedRow] = useState(null);
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
  const getListBookingHistory = useCallback(() => {
    if (credentialInfo?.Id) {
      dispatch(setLoading(true));
      bookingServices
        .listBookingHistory({ customerId: credentialInfo?.Id })
        .then((res: any) => {
          console.log(res);
          setRows(res.data);
          setPaging((prev) => ({
            page: res.paging.page,
            size: res.paging.size,
            total: res.paging.total,
          }));
        })
        .catch((err) => {})
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [credentialInfo]);
  const handlePageChange = (event, page) => {
    console.log(page);
  };
  useEffect(() => {
    getListBookingHistory();
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
          getListBookingHistory();
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
  return (
    <>
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
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    color={MAP_STATUS_LABEL[item?.status]?.color}
                  >
                    {MAP_STATUS_LABEL[item?.status]?.label}
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
                  {item?.status === STATUS_LABEL.Completed && item.isFeedback ? (
                    <Rating precision={0.5} value={item.feedbacks[0].rating} readOnly></Rating>
                  ) : (
                    <></>
                  )}
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    color={MAP_STATUS_LABEL[item?.status]?.color}
                  >
                    {MAP_STATUS_LABEL[item?.status]?.label}
                  </Typography>
                  {item?.status === STATUS_LABEL.Completed && !item.isFeedback ? (
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
          <Pagination
            count={paging?.total / paging?.size}
            page={paging?.page}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </Stack>
      </AppointmentStyled>
    </>
  );
}
