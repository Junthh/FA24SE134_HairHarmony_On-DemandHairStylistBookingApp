import styled from '@emotion/styled';
import { Box, Typography, Stack, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as colors from 'constants/colors';
import { useSelector } from 'react-redux';
import { selectCredentialInfo } from 'redux/Reducer';
import { useCallback } from 'react';
import { bookingServices } from 'services/booking.service';

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
});
export default function Appointment() {
  const [paging, setPaging] = useState({
    size: 10,
    page: 0,
    total: 0,
  });
  const [rows, setRows] = useState([]);
  const credentialInfo = useSelector(selectCredentialInfo);
  const getListBookingHistory = useCallback(() => {
    if (credentialInfo?.Id) {
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
        .finally(() => {});
    }
  }, [credentialInfo]);
  const handlePageChange = (event, page) => {
    console.log(page);
  };
  useEffect(() => {
    getListBookingHistory();
  }, [getListBookingHistory]);

  return (
    <AppointmentStyled>
      <Typography variant="h1" fontWeight={700}>
        Cuộc hẹn
      </Typography>
      <Box className="current-appointment">
        <Typography variant="h2" fontWeight={600}>
          Sắp tới
        </Typography>
        <Box height={20}></Box>
        <AppointmentCard>
          <Typography variant="h5" fontWeight={600}>
            Dịch vụ: Gói Nhộm & Duỗi
          </Typography>
          <Typography variant="h5" fontWeight={600}>
            Stylist: John Alex
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
              Chủ nhật, 15 tháng 9
            </span>
            <br />
          </Typography>
          <Typography variant="h5" color={colors.grey2} fontSize={14}>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            &nbsp;
            <span>13:00 -16:45 (3 giờ, 45 phút)</span>
          </Typography>
          <Typography variant="h5" fontWeight={600}>
            Tổng tiền: <span style={{ fontWeight: 700 }}>1.004.400 VND</span>
          </Typography>
        </AppointmentCard>
      </Box>
      <Box className="history-appointment">
        <Typography variant="h2" fontWeight={600}>
          Lịch sử cuộc hẹn
        </Typography>
        <Box height={20}></Box>
        {rows.map((item) => {
          return (
            <AppointmentCard>
              <Typography variant="h5" fontWeight={600}>
                Dịch vụ: Gói Nhộm & Duỗi
              </Typography>
              <Typography variant="h5" fontWeight={600}>
                Stylist: John Alex
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
                  Chủ nhật, 15 tháng 9
                </span>
                <br />
              </Typography>
              <Typography variant="h5" color={colors.grey2} fontSize={14}>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                &nbsp;&nbsp; &nbsp;
                <span>13:00 -16:45 (3 giờ, 45 phút)</span>
              </Typography>
              <Typography variant="h5" fontWeight={600}>
                Tổng tiền: <span style={{ fontWeight: 700 }}>1.004.400 VND</span>
              </Typography>
            </AppointmentCard>
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
  );
}
