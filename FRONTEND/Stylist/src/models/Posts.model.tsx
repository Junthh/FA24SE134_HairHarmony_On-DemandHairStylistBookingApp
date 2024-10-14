import { CategoryModel } from './Category.model';
import { CountriesEnum } from './Country.model';
import { SortBy } from './FilterOptions.model';
import { ProjectModel } from './ProjectModel';
import { WriterModel } from './Writer.model';

export enum PostTypeEnum {
  All = 'all',
  Video = 'video',
  Post = 'post',
  OurReaderStory = 'story',
}

export type PostsType = PostTypeEnum;

export interface PostsParams {
  type?: PostsType;
  isFeature?: boolean;
  sort?: SortBy.MOST_RELAVANT | SortBy.NEWEST | SortBy.MOST_VIEWED | '';
  fromDate?: string;
  toDate?: string;
  categoryId?: string;
  q?: string;
  perPage?: number;
  page?: number;
  country?: CountriesEnum | '';
  projectId?: string;
}

export interface PostModel {
  id?: string;
  type?: PostsType;
  isYoutube?: boolean;
  isFeature?: boolean;
  title?: string;
  detail?: string;
  shortDesc?: string;
  mediaUrl?: string;
  createdBy?: string;
  createdAt?: string;
  views?: number;
  project?: ProjectModel;
  category?: CategoryModel;
  writer?: WriterModel;
  tags?: any;
  country?: string;
  thumbnailUrl?: string;
}
