import { Label } from '@mui/icons-material';
import { STATUS } from 'configurations/constants/globalConstants';

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
