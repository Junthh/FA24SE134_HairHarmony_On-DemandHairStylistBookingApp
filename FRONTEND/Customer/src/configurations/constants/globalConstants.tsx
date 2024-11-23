import { env } from '../../env';
import * as colors from 'constants/colors';

// save keys for local storage
export enum LOCAL_STORAGE_KEYS {
  AccessToken = 'token',
  RefreshToken = 'refreshToken',
  CurrentPath = 'currentPath',
}

// save endpoint using in Ecocupid app
export const ENDPOINTS = {
  ApiBaseUrl: env.apiUrl,
  ApiPrefix: env.prefixApi,
};

// save common constants
export enum COMMON_CONSTANTS {
  PrefixServerError = '5',
}

// ShareRight role
export enum ECO_CUPID_ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum ECO_CUPID_THEME {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export enum PaginationConfig {
  PageIndex = 1,
  PerPage = 12,
  TotalPages = 10,
}

export const STATUS_LABEL = {
  Initialize: 'Initialize',
  Confirmed: 'Confirmed',
  Processing: 'Processing',
  Completed: 'Completed',
  Cancel: 'Cancel',
};
export const MAP_STATUS_LABEL = {
  [STATUS_LABEL.Initialize]: {
    label: 'Đã tạo',
    color: colors.tagColor,
  },
  [STATUS_LABEL.Confirmed]: {
    label: 'Đã xác nhận',
    color: colors.blueB400,
  },
  [STATUS_LABEL.Processing]: {
    label: 'Bắt đầu thực hiện',
    color: colors.positiveP400,
  },
  [STATUS_LABEL.Completed]: {
    label: 'Hoàn thành',
    color: colors.primary1,
  },
  [STATUS_LABEL.Cancel]: {
    label: 'Huỷ',
    color: colors.negativeN100,
  },
};