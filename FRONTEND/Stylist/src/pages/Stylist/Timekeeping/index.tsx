import styled from '@emotion/styled';
import { Avatar, Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import * as colors from 'constants/colors';
import { ICONS } from 'configurations/icons';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const TimekeepingStyled = styled(Box)({
  padding: '10px 20px',
  '& .card-total': {
    borderRadius: 20,
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    '&_content': {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
    },
  },
  '& .card-analyst': {
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    height: 500,
    width: '100%',
    padding: '20px 40px',
    borderRadius: 20,
  },
});
export default function Timekeeping() {
  return (
    <TimekeepingStyled>
      <Box className="card-total">
        <Box className="card-total_content">
          <Avatar sx={{ background: '#285d9a48', width: 80, height: 80 }}>
            <ICONS.IconStylistUser />
          </Avatar>
          <Box>
            <Typography variant="h1" fontWeight={700} fontFamily={'Lato !important'}>
              1,234
            </Typography>
            <Typography variant="label1" fontWeight={600} color={colors.grey2}>
              Total Booking
            </Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem></Divider>
        <Box className="card-total_content">
          <Avatar sx={{ width: 80, height: 80 }}>
            <ICONS.IconCombo />
          </Avatar>
          <Box>
            <Typography variant="h1" fontWeight={700} fontFamily={'Lato !important'}>
              300
            </Typography>
            <Typography variant="label1" fontWeight={600} color={colors.grey2}>
              Số lượt dùng combo
            </Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem></Divider>
        <Box className="card-total_content">
          <Avatar sx={{ width: 80, height: 80 }}>
            <ICONS.IconCalendar />
          </Avatar>
          <Box>
            <Typography variant="h1" fontWeight={700} fontFamily={'Lato !important'}>
              45
            </Typography>
            <Typography variant="label1" fontWeight={600} color={colors.grey2}>
              Số lượt dùng service
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box height={20}></Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box className="card-analyst">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
            <Typography variant="body1" fontWeight={'700'} fontFamily={'Lato !important'}>
              08:00 &nbsp;&nbsp; <span style={{ fontWeight: 400 }}>Take attendance</span>
            </Typography>
            <Typography variant="body1" fontWeight={'700'} fontFamily={'Lato !important'}>
              08:00 &nbsp;&nbsp; <span style={{ fontWeight: 400 }}>Discuss project with team</span>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box className="card-analyst">
            <Typography variant="h2" fontWeight={'700'}>
              STATISTIC
            </Typography>
            <Divider variant="fullWidth"></Divider>
          </Box>
        </Grid>
      </Grid>
    </TimekeepingStyled>
  );
}
