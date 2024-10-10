// export interface code: String;

export interface ErrorMessage {
  field: String;
  message: String;
  payload_at: String;
}

export interface ResponseErrorApi {
  code: String;
  errors: ErrorMessage[];
  success: Boolean;
}

export interface ResponseSuccessApi {
  code: string;
  data: any;
  message: string;
  success: boolean;
}

export interface Meta {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
  page: number;
  pagingCounter: number;
  perPage: number;
  total: number;
  totalPages: number;
}
export interface ResponseSuccessApiList {
  code: string;
  data: any;
  meta: Meta;
  message: string;
  success: boolean;
}
