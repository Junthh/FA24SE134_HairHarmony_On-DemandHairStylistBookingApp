export interface OurReaderStoryModelList {
  id: string;
  title: string;
  createdAt: Date;
  createdBy: string;
  isFeature: boolean;
  actions?: any;
}

export interface OurReaderStoryModelFilterParams {
  isFeature?: string | boolean;
  q?: string;
  dateFilter?: any;
  page?: number;
  perPage?: number;
}

export interface OurReaderStoryForm {
  title: string;
  projectId: string;
  writerId: string;
  detail?: string;
  image?: any;
  isFeature?: boolean;
  tags?: Array<string>;
}
