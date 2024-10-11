export interface EmailModel {
  id: string;
  email: string;
  createdAt: string;
  actions?: any;
}

export interface EmailModelFilterParams {
  q?: string;
  page?: number;
  perPage?: number;
}

export interface EmailForm {
  email: string;
  desc?: string;
}
