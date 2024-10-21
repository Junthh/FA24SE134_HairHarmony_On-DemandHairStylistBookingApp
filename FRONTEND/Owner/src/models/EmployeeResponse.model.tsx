interface Paging {
  size: number;
  page: number;
  total: number;
}

export interface ListEmployeeSuccess {
  statusCode: 200;
  success: boolean;
  msg: string;
  data: any[];
  paging: Paging;
}

export interface DataEmployeeSuccess {
  statusCode: 200;
  success: boolean;
  msg: string;
  data: any;
}

export interface OptionsEmployeeSuccess {
  success: boolean;
  data: any[];
}

export interface DataEmployeeError {
  success: boolean;
  errors: any[];
}

export const errorDefault = [
  {
    field: null,
    message: 'Something went wrong',
    payload_at: 'client',
  },
];

export function CustomException(error) {
  return error;
}
