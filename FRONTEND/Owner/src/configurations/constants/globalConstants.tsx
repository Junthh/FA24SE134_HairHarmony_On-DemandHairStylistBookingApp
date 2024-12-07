import { env } from '../../env';

// save keys for local storage
export enum LOCAL_STORAGE_KEYS {
  AccessToken = 'token',
  RefreshToken = 'refreshToken',
}

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

export enum STATUS {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}
export enum LEVEL {
  REGULAR = 'Regular',
  EXPERT = 'Expert',
}
export const enum STATUS_BOOKING {
  INITIALIZE = 'initialize',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FINISHED = 'finished',
  CANCEL = 'cancel',
}

export const enum STATUS_BOOKING_LABEL {
  INITIALIZE = 'Đã đặt lịch',
  CONFIRMED = 'Đã xác nhận',
  PROCESSING = 'Bắt đầu thực hiện',
  COMPLETED = 'Hoàn thành',
  FINISHED = 'Kết thúc',
  CANCEL = 'Huỷ',
}

export const enum STATUS_COLOR {
  INITIALIZE= 'success',
  CONFIRMED= 'warning',
  PROCESSING= 'info',
  COMPLETED= 'default',
  FINISHED= 'primary',
  CANCEL= 'error',
};