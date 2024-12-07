import { ApexOptions } from 'apexcharts';
import { currencyFormat } from 'utils/helper';

export const OptionsBarConfig: ApexOptions = {
  series: [
    {
      name: 'Tổng doanh thu',
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
  ],
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
      text: 'đ (vnd)',
    },
    labels: {
      formatter: function (value) {
        return `${currencyFormat(value)}`; // Custom formatting
      },
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return '$ ' + currencyFormat(val) + ' vnd';
      },
    },
  },
};
export const OptionsPieConfig: ApexOptions = {
  series: [44, 55, 13, 43, 22],
  chart: {
    width: 370,
    type: 'pie',
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  colors: ['#D87EB1', '#22c55e', '#45a6ff', '#ef4444', '#FFC733', '#656B7F'], // Custom slice colors
  legend: {
    position: 'bottom',
    labels: {
      colors: ['#D87EB1', '#22c55e', '#45a6ff', '#ef4444', '#FFC733', '#656B7F'], // Custom label colors
      useSeriesColors: false, // Ensures that these custom colors are applied
    },
    fontSize: '14px', // Optional customization for legend font size
  },
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
export const OptionsLineColumnsConfig: ApexOptions = {
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
export const OptionsAreaConfig: ApexOptions = {
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
