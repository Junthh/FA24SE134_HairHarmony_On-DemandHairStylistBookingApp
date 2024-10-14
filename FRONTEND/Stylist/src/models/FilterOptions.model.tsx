import { CountriesEnum } from './Country.model';

export const categoryOptions = [{ label: 'Category All', value: '' }];
export const projectsOptions = [{ label: 'Project All', value: '' }];
export const countriesOptions = [
  { label: 'Country All', value: '' },
  { label: CountriesEnum.Vietnam, value: CountriesEnum.Vietnam },
  { label: CountriesEnum.Laos, value: CountriesEnum.Laos },
  { label: CountriesEnum.Singapore, value: CountriesEnum.Singapore },
  { label: CountriesEnum.Thailand, value: CountriesEnum.Thailand },
  { label: CountriesEnum.Philippines, value: CountriesEnum.Philippines },
  { label: CountriesEnum.Malaysia, value: CountriesEnum.Malaysia },
  { label: CountriesEnum.Myanmar, value: CountriesEnum.Myanmar },
  { label: CountriesEnum.Indonesia, value: CountriesEnum.Indonesia },
  { label: CountriesEnum.Brunei, value: CountriesEnum.Brunei },
  { label: CountriesEnum.Cambodia, value: CountriesEnum.Cambodia },
  { label: CountriesEnum.TimorLeste, value: CountriesEnum.TimorLeste },
];

export enum SortBy {
  MOST_RELAVANT = '',
  NEWEST = 'newest',
  MOST_VIEWED = 'most-viewed',
}

export const sortByOptions = [
  { label: 'Most relavant', value: SortBy.MOST_RELAVANT },
  { label: 'Newest', value: SortBy.NEWEST },
  { label: 'Most viewed', value: SortBy.MOST_VIEWED },
];

export enum FeatureOptionValue {
  ALL = 'undefined',
  FEATURE_LIST = 'true',
  NON_FEATURE = 'false',
}

export const ArticleOptions = [
  { label: 'All articles', value: FeatureOptionValue.ALL },
  { label: 'Feature list', value: FeatureOptionValue.FEATURE_LIST },
  { label: 'Non-feature', value: FeatureOptionValue.NON_FEATURE },
];

export const OurReaderStoryOptions = [
  { label: 'All Stories', value: FeatureOptionValue.ALL },
  { label: 'Feature list', value: FeatureOptionValue.FEATURE_LIST },
  { label: 'Non-feature', value: FeatureOptionValue.NON_FEATURE },
];

export const VideoOptions = [
  { label: 'All videos', value: FeatureOptionValue.ALL },
  { label: 'Feature list', value: FeatureOptionValue.FEATURE_LIST },
  { label: 'Non-feature', value: FeatureOptionValue.NON_FEATURE },
];
