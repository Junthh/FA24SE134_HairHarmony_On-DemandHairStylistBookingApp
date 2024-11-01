import { Label } from '@mui/icons-material';
import { LEVEL, STATUS } from 'configurations/constants/globalConstants';

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