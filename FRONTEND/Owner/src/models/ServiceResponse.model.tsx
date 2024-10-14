interface Meta {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  page: number;
  pagingCounter: number;
  perPage: number;
  prevPage: number | null;
  total: number;
  totalPages: number;
}

export interface ListServiceSuccess {
  success: boolean;
  data: any[];
  meta: Meta;
}

export interface DataServiceSuccess {
  success: boolean;
  data: any;
}

export interface OptionServiceSuccess {
  success: boolean;
  data: any[];
}

export interface DataServiceError {
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
