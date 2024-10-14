export interface VideoModelList {
  id: string;
  title: string;
  createdAt: string;
  createdBy: string;
  isFeature: boolean;
  actions?: any;
}

export interface VideoModelFilterParams {
  q?: string;
  isFeature?: boolean | string;
  dateFilter?: any;
  page?: number;
  perPage?: number;
}

export interface VideoForm {
  title: string;
  thumbnail?: any;
  //   video: any;
  isFeature?: boolean;
  isYoutube: boolean;
  detail?: string;
  writerId: string;
  projectId: string;
  tags?: Array<[]>;
}
