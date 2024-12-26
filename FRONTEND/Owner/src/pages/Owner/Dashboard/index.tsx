import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Avatar, Box, Divider, Grid, Typography } from '@mui/material';
import * as colors from 'constants/colors';
import { ICONS } from 'configurations/icons';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import moment from 'moment';
import { dashboardServices } from 'services/dashboard.service';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import {
  OptionsAreaConfig,
  OptionsBarConfig,
  OptionsBarConfigSalaryStaff,
  OptionsBarConfigSalaryStylist,
  OptionsLineColumnsConfig,
  OptionsPieConfig,
} from './OptionsChart';
import { currencyFormat } from 'utils/helper';
import { MAP_STATUS_BOOKING } from 'constants/status';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
const TimekeepingStyled = styled(Box)({
  padding: '10px 20px',
  '& .card-total': {
    borderRadius: 20,
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 9px',
    '&_content': {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
    },
  },
  '& .card-analyst': {
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    height: 400,
    width: '100%',
    padding: '20px 40px',
    borderRadius: 20,
    '& .apexcharts-canvas': {
      margin: '0 auto',
    },
  },
});
export default function Dashboard() {
  const dispatch = useDispatch();
  const [boxSummary, setBoxSummary] = useState({
    totalRevenue: 0,
    totalNumberBooking: 0,
    totalCustomer: 0,
    totalSalaryStylist: 0,
    totalSalaryStaff: 0,
  });
  const [optionsBar, setOptionsBar] = useState(OptionsBarConfig);
  const [optionsPie, setOptionsPie] = useState(OptionsPieConfig);
  const [optionsBarSalaryStylist, setOptionsBarSalaryStylist] = useState(
    OptionsBarConfigSalaryStylist,
  );
  const [optionsBarSalaryStaff, setOptionsBarSalaryStaff] = useState(OptionsBarConfigSalaryStaff);

  const [optionsLineColumns, setOptionsLineColumns] = useState(OptionsLineColumnsConfig);
  const [optionsArea, setOptionsArea] = useState(OptionsAreaConfig);
  const handleGetDashboardData = async () => {
    const params = {
      month: String(Number(moment().get('M').toString()) + 1),
      year: moment().get('years').toString(),
    };

    try {
      dispatch(setLoading(true));

      // Fetch data in parallel
      const [revenueRes, countRes, countCusRes, salaryStaff, salaryStylist] = await Promise.all([
        dashboardServices.listTotalRevenueByMonth(params),
        dashboardServices.listCountByStatus(params),
        dashboardServices.listCountCustomer(),
        dashboardServices.listTotalSalaryStaffByMonth(params),
        dashboardServices.listTotalSalaryStylistByMonth(params),
      ]);

      // Handle Total Revenue Data
      if (revenueRes?.data) {
        const xAxisCategories = revenueRes.data.totalRevenueByDay.map((item) => item.day);
        const seriesData = revenueRes.data.totalRevenueByDay.map((item) => item.totalRevenue);
        setBoxSummary((prev) => ({ ...prev, totalRevenue: revenueRes.data.totalRevenue }));
        setOptionsBar((prev) => ({
          ...prev,
          series: [
            {
              name: 'Tổng doanh thu',
              data: seriesData,
            },
          ],
          xaxis: {
            ...prev.xaxis,
            categories: xAxisCategories,
          },
        }));
      }

      // Handle Booking Count Data
      if (countRes?.data) {
        const totalBooking: number = Object.values(countRes.data).reduce(
          (sum: number, value: number) => sum + value,
          0,
        ) as number;
        const seriesData = Object.values(countRes.data).map((item) => item) as [];
        const labelData = Object.keys(countRes.data).map(
          (item: string) => MAP_STATUS_BOOKING[item].label,
        ) as [];
        setBoxSummary((prev) => ({ ...prev, totalNumberBooking: totalBooking }));
        setOptionsPie((prev) => ({
          ...prev,
          series: seriesData,
          labels: labelData,
        }));
      }
      if (countCusRes?.data) {
        setBoxSummary((prev) => ({ ...prev, totalCustomer: (countCusRes as any)?.paging.total }));
      }
      if (salaryStylist.data) {
        const totalSalaryStylist = salaryStylist.data.reduce(
          (sum: number, value: any) => sum + value.totalSalary,
          0,
        ) as number;
        setBoxSummary((prev) => ({ ...prev, totalSalaryStylist }));
        const xAxisCategories = salaryStylist.data.map((item) => item.stylist.fullName);
        const seriesData = salaryStylist.data.map((item) => item.totalSalary);
        setOptionsBarSalaryStylist((prev) => ({
          ...prev,
          series: [
            {
              name: 'Tổng lương stylist',
              data: seriesData,
            },
          ],
          xaxis: {
            ...prev.xaxis,
            categories: xAxisCategories,
          },
        }));
      }
      if (salaryStaff.data) {
        const totalSalaryStaff = salaryStaff.data.reduce(
          (sum: number, value: any) => sum + value.totalSalary,
          0,
        ) as number;
        setBoxSummary((prev) => ({ ...prev, totalSalaryStaff }));
        const xAxisCategories = salaryStaff.data.map((item) => item.staff.fullName);
        const seriesData = salaryStaff.data.map((item) => item.totalSalary);
        setOptionsBarSalaryStaff((prev) => ({
          ...prev,
          series: [
            {
              name: 'Tổng lương nhân viên',
              data: seriesData,
            },
          ],
          xaxis: {
            ...prev.xaxis,
            categories: xAxisCategories,
          },
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    handleGetDashboardData();
  }, []);

  return (
    <TimekeepingStyled>
      <Box className="card-total">
        <Box className="card-total_content">
          <Avatar sx={{ background: '#FFC733', width: 60, height: 60 }}>
            <AttachMoneyIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={700} fontFamily={'Lato !important'}>
              {currencyFormat(boxSummary.totalRevenue)}
            </Typography>
            <Typography variant="label1" fontWeight={600} color={colors.grey2}>
              Tổng doanh thu
            </Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem></Divider>
        <Box className="card-total_content">
          <Avatar sx={{ background: '#FFC733', width: 60, height: 60 }}>
            {' '}
            <AttachMoneyIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={700} fontFamily={'Lato !important'}>
              {currencyFormat(boxSummary.totalSalaryStylist)}
            </Typography>
            <Typography variant="label1" fontWeight={600} color={colors.grey2}>
              Tổng lương Stylist
            </Typography>
          </Box>
        </Box>
        {/* <Divider orientation="vertical" variant="middle" flexItem></Divider>
        <Box className="card-total_content">
          <Avatar sx={{ background: '#FFC733', width: 60, height: 60 }}>
            {' '}
            <AttachMoneyIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={700} fontFamily={'Lato !important'}>
              {currencyFormat(boxSummary.totalSalaryStaff)}
            </Typography>
            <Typography variant="label1" fontWeight={600} color={colors.grey2}>
              Tổng lương nhân viên
            </Typography>
          </Box>
        </Box> */}
        <Divider orientation="vertical" variant="middle" flexItem></Divider>
        <Box className="card-total_content">
          <Avatar sx={{ background: '#285d9a48', width: 60, height: 60 }}>
            <CollectionsBookmarkIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={700} fontFamily={'Lato !important'}>
              {boxSummary.totalNumberBooking}
            </Typography>
            <Typography variant="label1" fontWeight={600} color={colors.grey2}>
              Tổng lượt booking
            </Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem></Divider>
        <Box className="card-total_content">
          <Avatar sx={{ background: '#285d9a48', width: 60, height: 60 }}>
            {/* <ICONS.IconCalendar /> */}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={700} fontFamily={'Lato !important'}>
              {boxSummary.totalCustomer}
            </Typography>
            <Typography variant="label1" fontWeight={600} color={colors.grey2}>
              Số lượt khách hàng
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box height={20}></Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box className="card-analyst">
            <Typography variant="h4" fontWeight={700} fontFamily={'Lato !important'}>
              Tổng doanh thu
            </Typography>
            <ReactApexChart
              options={optionsBar}
              series={optionsBar.series}
              type="bar"
              height={350}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className="card-analyst">
            <Typography variant="h4" fontWeight={700} fontFamily={'Lato !important'}>
              Tổng trạng thái
            </Typography>
            <ReactApexChart
              options={optionsPie}
              series={optionsPie.series} // Series data
              type="pie"
              width={optionsPie.chart.width}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className="card-analyst">
            <Typography variant="h4" fontWeight={700} fontFamily={'Lato !important'}>
              Tổng lương stylist
            </Typography>
            <ReactApexChart
              options={optionsBarSalaryStylist}
              series={optionsBarSalaryStylist.series}
              type="bar"
              height={350}
            />
            {/* <ReactApexChart
              options={optionsLineColumns}
              series={optionsLineColumns.series}
              type="line"
              height={350}
            /> */}
          </Box>
        </Grid>
        {/* <Grid item xs={6}>
          <Box className="card-analyst">
            <Typography variant="h4" fontWeight={700} fontFamily={'Lato !important'}>
              Tổng lương nhân viên
            </Typography>
            <ReactApexChart
              options={optionsBarSalaryStaff}
              series={optionsBarSalaryStaff.series}
              type="bar"
              height={350}
            />
            <ReactApexChart
              options={optionsArea}
              series={optionsArea.series} // Series data
              type="area"
              height={optionsArea.chart.height}
            />
          </Box>
        </Grid> */}
      </Grid>
    </TimekeepingStyled>
  );
}
