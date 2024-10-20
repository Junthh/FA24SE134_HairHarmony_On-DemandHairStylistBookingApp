export interface EmployeeModelList {
  id: string;
  title: string;
  categoryName: string;
  createdAt: Date;
  createdBy: string;
  isFeature: boolean;
  actions?: any;
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
  title: string;
  projectId: string;
  writerId: string;
  categoryId: string;
  detail?: string;
  image?: any;
  isFeature?: boolean;
  tags?: Array<string>;
}
