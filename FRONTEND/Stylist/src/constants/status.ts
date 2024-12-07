import { Label } from '@mui/icons-material';
import {
  LEVEL,
  STATUS,
  STATUS_BOOKING,
  STATUS_BOOKING_LABEL,
  STATUS_COLOR,
} from 'configurations/constants/globalConstants';

export const STATUS_USER = [
  {
    value: STATUS.ACTIVE,
    label: STATUS.ACTIVE,
  },
  {
    value: STATUS.INACTIVE,
    label: STATUS.INACTIVE,
  },
];

export const MAP_STATUS_USER = {
  [STATUS.ACTIVE]: {
    label: STATUS.ACTIVE,
    color: '',
  },
  [STATUS.INACTIVE]: {
    label: STATUS.INACTIVE,
    color: '',
  },
};

export const LEVEL_USER = [
  {
    value: LEVEL.REGULAR,
    label: LEVEL.REGULAR,
  },
  {
    value: LEVEL.EXPERT,
    label: LEVEL.EXPERT,
  },
];

export const MAP_LEVEL_USER = {
  [LEVEL.REGULAR]: {
    label: LEVEL.REGULAR,
    color: '',
  },
  [LEVEL.EXPERT]: {
    label: LEVEL.EXPERT,
    color: '',
  },
};

export const STATUS_BOOKINGS = [
  {
    value: STATUS_BOOKING.INITIALIZE,
    label: STATUS_BOOKING_LABEL.INITIALIZE,
  },
  {
    value: STATUS_BOOKING.CANCEL,
    label: STATUS_BOOKING_LABEL.CANCEL,
  },
  {
    value: STATUS_BOOKING.FINISHED,
    label: STATUS_BOOKING_LABEL.FINISHED,
  },
  {
    value: STATUS_BOOKING.COMPLETED,
    label: STATUS_BOOKING_LABEL.COMPLETED,
  },
  {
    value: STATUS_BOOKING.PROCESSING,
    label: STATUS_BOOKING_LABEL.PROCESSING,
  },
  {
    value: STATUS_BOOKING.CONFIRMED,
    label: STATUS_BOOKING_LABEL.CONFIRMED,
  },
];

export const MAP_STATUS_BOOKING = {
  [STATUS_BOOKING.CONFIRMED]: {
    label: STATUS_BOOKING_LABEL.CONFIRMED,
    color: STATUS_COLOR.CONFIRMED,
  },
  [STATUS_BOOKING.PROCESSING]: {
    label: STATUS_BOOKING_LABEL.PROCESSING,
    color: STATUS_COLOR.PROCESSING,
  },
  [STATUS_BOOKING.COMPLETED]: {
    label: STATUS_BOOKING_LABEL.COMPLETED,
    color: STATUS_COLOR.COMPLETED,
  },
  [STATUS_BOOKING.FINISHED]: {
    label: STATUS_BOOKING_LABEL.FINISHED,
    color: STATUS_COLOR.FINISHED,
  },
  [STATUS_BOOKING.CANCEL]: {
    label: STATUS_BOOKING_LABEL.CANCEL,
    color: STATUS_COLOR.CANCEL,
  },
  [STATUS_BOOKING.INITIALIZE]: {
    label: STATUS_BOOKING_LABEL.INITIALIZE,
    color: STATUS_COLOR.INITIALIZE,
  },
};
