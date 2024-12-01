import { format, isDate, lastDayOfMonth } from 'date-fns';
import { toInteger } from 'lodash';

function calculateAge(dob: string | Date) {
  const today = new Date();
  const birthDate = new Date(dob);

  const yearsDifference = today.getFullYear() - birthDate.getFullYear();

  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
  ) {
    return yearsDifference - 1;
  }

  return yearsDifference;
}

function formatDate(date: string | Date, pattern = 'dd/MM/yyyy') {
  if (isDate(date)) {
    return format(date as Date, pattern);
  }
  return format(new Date(date), pattern);
}

function formatDateTime(date: string | Date, pattern = 'dd/MM/yyyy HH:mm') {
  if (isDate(date)) {
    return format(date as Date, pattern);
  }
  return format(new Date(date), pattern);
}

function formatTime(time: string | Date, pattern = 'HH:mm') {
  var nowDateTime = new Date().toISOString();
  var nowDate = nowDateTime.split('T')[0];

  return format(new Date(nowDate + 'T' + time), pattern);
}

// Days order should always be from Sunday(0) to Saturday(6)
export const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function getWeekDay(date: Date) {
  return weekDays[date.getDay()];
}

const getMonthNames = () => {
  const monthNames: Array<{ monthName: string; monthNumber: number }> = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const m = new Date(now.getFullYear(), i);
    monthNames.push({ monthName: format(m, 'LLLL').toString(), monthNumber: i });
  }

  return monthNames;
};

const getFirstDateInMonth = (year: number, month: number, date: number) => {
  const first = new Date(year, month, 1, 15, 0, 0, 0); // first of the month

  for (let i = 1; i < 7; i++) {
    if (first.getDay() === date) break;
    first.setDate(first.getDate() + 1);
  }
  return first;
};

const getLastDateInMonth = (year: number, month: number, date: number) => {
  const lastDateOfMonth = lastDayOfMonth(new Date(year, month));

  for (let i = 1; i < 7; i++) {
    if (lastDateOfMonth.getDay() === date) break;
    lastDateOfMonth.setDate(lastDateOfMonth.getDate() - 1);
  }

  return lastDateOfMonth;
};

const getTimelineSlot = (start: string) => {
  const timeSplit = start.split(':');
  if (timeSplit.length !== 3) return 0;
  if (toInteger(timeSplit[0]) < 13) return 1;
  return 2;
};

// time regex: 00:00:00
const getTimeDetail = (time: string) => {
  let result = {
    hour: 0,
    minute: 0,
    millisecond: 0,
  };

  const timeSplit = time.split(':');

  if (timeSplit.length !== 3) return result;

  result.hour = toInteger(timeSplit[0]);
  result.minute = toInteger(timeSplit[1]);
  result.millisecond = toInteger(timeSplit[2]);

  return result;
};

const calculateTimeCreateAt = (timeProcess: string) => {
  if (!timeProcess) {
    return '';
  }

  const createdAtDate = new Date(timeProcess).getTime();
  const timeElapsed = new Date().getTime() - createdAtDate;
  let seconds = Math.floor(timeElapsed / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let months = Math.floor(days / 30);
  let years = Math.floor(months / 12);

  if (years >= 1) {
    return `${years} year${years > 1 ? 's' : ''} ago`;
  } else if (months >= 1) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (days >= 1) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours >= 1) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes >= 1) {
    return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  }
  return `${seconds} senconds ago`;
};

export {
  calculateAge,
  formatDate,
  formatTime,
  getWeekDay,
  getMonthNames,
  getFirstDateInMonth,
  getLastDateInMonth,
  getTimelineSlot,
  getTimeDetail,
  calculateTimeCreateAt,
  formatDateTime,
};
