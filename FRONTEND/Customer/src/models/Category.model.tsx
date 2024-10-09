export interface CategoryModel {
  id: string;
  name: string;
  color: string;
  qtyArticle: number;
  createdAt: string;
  createdBy: string;
  actions?: any;
}

export interface CategoryModelFilterParams {
  q?: string;
  page?: number;
  perPage?: number;
}

export interface CategoryForm {
  name: string;
  color?: string;
  desc?: string;
}
