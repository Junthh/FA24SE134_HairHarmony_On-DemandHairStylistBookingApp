export interface WriterModelList {
  name: string;
  actions?: any;
}

export interface WriterForm {
  image?: any;
  name: string;
  email?: string;
  desc?: string;
  link?: string;
}

export interface WriterModel {
  id?: string;
  name?: string;
  email?: string;
  link?: string;
  desc?: string;
  imageUrl?: string;
  createdAt?: string;
  qtyArticle?: number;
  qtyVideo?: number;
}

export interface WriterModelFilterParams {
  q?: string;
  page?: number;
  perPage?: number;
}
