import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Avatar, Box, Divider, Grid, Typography } from '@mui/material';
import * as colors from 'constants/colors';
import { ICONS } from 'configurations/icons';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

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
  const [series, setSeries] = useState([
    {
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    // {
    //   name: 'Revenue',
    //   data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    // },
    // {
    //   name: 'Free Cash Flow',
    //   data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    // },
  ]);

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 400,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
      title: {
        text: '$ (thousands)',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return '$ ' + val + ' thousands';
        },
      },
    },
  };
  const optionsPie: ApexOptions = {
    series: [44, 55, 13, 43, 22],
    chart: {
      width: 480,
      type: 'pie',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };
  const optionsLineColumns: ApexOptions = {
    series: [
      {
        name: 'Website Blog',
        type: 'column',
        data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
      },
      {
        name: 'Social Media',
        type: 'line',
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
      },
    ],
    chart: {
      height: 400,
      type: 'line',
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: 'Traffic Sources',
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: [
      '01 Jan 2001',
      '02 Jan 2001',
      '03 Jan 2001',
      '04 Jan 2001',
      '05 Jan 2001',
      '06 Jan 2001',
      '07 Jan 2001',
      '08 Jan 2001',
      '09 Jan 2001',
      '10 Jan 2001',
      '11 Jan 2001',
      '12 Jan 2001',
    ],
    yaxis: [
      {
        title: {
          text: 'Website Blog',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Social Media',
        },
      },
    ],
  };
  const optionsArea: ApexOptions = {
    series: [
      {
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    chart: {
      height: 350,
      type: 'area',
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:30:00.000Z',
        '2018-09-19T02:30:00.000Z',
        '2018-09-19T03:30:00.000Z',
        '2018-09-19T04:30:00.000Z',
        '2018-09-19T05:30:00.000Z',
        '2018-09-19T06:30:00.000Z',
      ],
    },
    legend: {
      position: 'bottom', // Moves the legend to the bottom
      horizontalAlign: 'center', // Aligns the legend in the center horizontally
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  };
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
          <Avatar sx={{ width: 80, height: 80 }}>{/* <ICONS.IconCombo /> */}</Avatar>
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
          <Avatar sx={{ width: 80, height: 80 }}>{/* <ICONS.IconCalendar /> */}</Avatar>
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
        <Grid item xs={6}>
          <Box className="card-analyst">
            <ReactApexChart options={options} series={series} type="bar" height={350} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className="card-analyst">
            <ReactApexChart
              options={optionsPie}
              series={optionsPie.series} // Series data
              type="pie"
              width={optionsPie.chart.width}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className="card-analyst">
            <ReactApexChart
              options={optionsLineColumns}
              series={optionsLineColumns.series}
              type="line"
              height={350}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className="card-analyst">
            <ReactApexChart
              options={optionsArea}
              series={optionsArea.series} // Series data
              type="area"
              height={optionsArea.chart.height}
            />
          </Box>
        </Grid>
      </Grid>
    </TimekeepingStyled>
  );
}
