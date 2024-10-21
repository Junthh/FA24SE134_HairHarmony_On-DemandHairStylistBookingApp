export interface EmployeeModelList {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  roleId: string;
}

export interface EmployeeModelFilterParams {
  categoryId?: string;
  isFeature?: string | boolean;
  q?: string;
  dateFilter?: any;
  page?: number;
  perPage?: number;
}

export interface EmployeeForm {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  roleId: string;
}
