export interface ProjectModel {
  id: string;
  qtyVideo: number;
  qtyArticle: number;
  title: string;
  country: string;
  detail: string;
  imageUrl: string;
  createdBy: string;
  createdAt: string;
}

export interface ProjectModelList {
  id: string;
  title: string;
  qtyArticle: number;
  qtyVideo: number;
  createdBy: string;
  actions?: any;
}

export interface ProjectModelFilterParams {
  q?: string;
  page?: number;
  perPage?: number;
}

export interface ProjectForm {
  title: string;
  image?: any;
  country?: string;
  detail?: string;
}
