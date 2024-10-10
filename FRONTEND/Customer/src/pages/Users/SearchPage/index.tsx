import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import HeaderSearch from './components/HeaderSearch';
import { BodyContentStyled } from './styles';
import DatePickerRange from 'pages/common/DatePickerRange';
import useSearchParamsFilter from 'hooks/useSearchParamsFilter';
import SelectFilter from './components/SelectFilter';
import CardContentImage from 'pages/common/CardContentImage';
import PaginationComponent from 'components/Common/Pagination/Pagination';
import {
  SortBy,
  categoryOptions,
  countriesOptions,
  projectsOptions,
  sortByOptions,
} from 'models/FilterOptions.model';
import { ResponseSuccessApi } from 'models/Response.model';
import { CategoryModel } from 'models/Category.model';
import { ListServiceSuccess } from 'models/ServiceResponse.model';
import { postsService } from 'services/posts.service';
import { PostModel, PostTypeEnum, PostsParams } from 'models/Posts.model';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import { PaginationConfig } from 'configurations/constants/globalConstants';
import { useLocation, useNavigate } from 'react-router-dom';
import { USER_PATH } from 'configurations/paths/paths';
import { theme } from 'theme';
import { ProjectModel } from 'models/ProjectModel';
import AutocompleteFilter from './components/AutocompleteFilter';

enum FilterParamsName {
  date = 'date',
  category = 'category',
  sort = 'sortBy',
  page = 'page',
  searchText = 'qs',
  type = 'type',
  isFeature = 'isFeature',
  country = 'country',
  project = 'project',
}

const currentValueOptionsInit = {
  category: '',
  country: '',
  project: '',
  sortBy: SortBy.MOST_RELAVANT as any,
  isFeature: '',
};

export default function SearchPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchQRef = useRef('');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [queryUrl, setQueryUrl] = useState({
    date: '',
    category: '',
    sort: '',
    page: PaginationConfig.PageIndex as number,
    qs: '',
    type: '',
    isFeature: '',
    country: '',
    project: '',
  });
  const [catesOpts, setCatesOpts] = useState(() => {
    return [...categoryOptions];
  });
  const [countriesOpts, setCountriesOpts] = useState(() => {
    return [...countriesOptions];
  });
  const [projectsOpts, setProjectsOpts] = useState(() => {
    return [...projectsOptions];
  });
  const [posts, setPosts] = useState<ListServiceSuccess>();
  const [filter, setFilter] = useState<PostsParams>({
    page: PaginationConfig.PageIndex as number,
    perPage: PaginationConfig.PerPage as number,
  });
  const currentValueOptions = useRef(currentValueOptionsInit);
  const onInit = useRef(false);

  // add filter
  const { filter: dateRangeFilter, handleFilterChange: handleChangeDate } = useSearchParamsFilter({
    defaultValue: '',
    paramName: FilterParamsName.date,
  });

  const { filter: categoryFilter, handleFilterChange: handleChangeCategory } =
    useSearchParamsFilter({
      defaultValue: '',
      paramName: FilterParamsName.category,
    });

  const { filter: countryFilter, handleFilterChange: handleChangeCountry } = useSearchParamsFilter({
    defaultValue: '',
    paramName: FilterParamsName.country,
  });

  const { filter: projectFilter, handleFilterChange: handleChangeProject } = useSearchParamsFilter({
    defaultValue: '',
    paramName: FilterParamsName.project,
  });

  const { filter: sortByFilter, handleFilterChange: handleChangeSortBy } = useSearchParamsFilter({
    defaultValue: '',
    paramName: FilterParamsName.sort,
  });

  const { filter: pageIndexFilter, handleFilterChange: handleChangePageIndex } =
    useSearchParamsFilter({
      defaultValue: '',
      paramName: FilterParamsName.page,
    });

  const { filter: qs, handleFilterChange: handleInputValue } = useSearchParamsFilter({
    defaultValue: '',
    paramName: FilterParamsName.searchText,
  });

  const { filter: type, handleFilterChange: handleSelectedType } = useSearchParamsFilter({
    defaultValue: '',
    paramName: FilterParamsName.type,
  });

  const { filter: isFeatureFilter, handleFilterChange: handleFeatureTag } = useSearchParamsFilter({
    defaultValue: '',
    paramName: FilterParamsName.isFeature,
  });

  // get categories options
  const getCategoriesOpts = async () => {
    dispatch(setLoading(true));
    const response = (await postsService.getCategoriesOptions()) as unknown as ResponseSuccessApi;
    if (response.success) {
      const data = response.data as CategoryModel[];
      const cates = data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setCatesOpts([...categoryOptions, ...cates]);
    }
    dispatch(setLoading(false));
  };

  // get categories options
  const getProjectsOpts = async () => {
    dispatch(setLoading(true));
    const response = (await postsService.getProjectOptions({
      country: countryFilter,
    })) as unknown as ResponseSuccessApi;
    if (response.success) {
      const data = response.data.projects as ProjectModel[];
      const projs = data.map((item) => {
        return {
          label: item.title,
          value: item.id,
        };
      });
      setProjectsOpts([...projectsOptions, ...projs]);
    }
    dispatch(setLoading(false));
  };

  const getPosts = async (params?: PostsParams) => {
    dispatch(setLoading(true));
    const resService = (await postsService.list(params)) as any as ListServiceSuccess;
    if (resService.success) {
      setPosts(resService);
    } else {
      // error
    }
    dispatch(setLoading(false));
  };

  const getPostByFilter = (dataFilter: PostsParams) => {
    Object.keys(dataFilter).forEach((key) => {
      if (!dataFilter[key]) {
        delete dataFilter[key];
      }
    });
    getPosts({ ...dataFilter });
  };

  const handleGetCurrentPageIndex = () => {
    if (posts?.meta?.totalPages < +filter.page) {
      handleChangePageIndex(PaginationConfig.PageIndex as any);
      setFilter({ ...filter, page: PaginationConfig.PageIndex });
      setQueryUrl({ ...queryUrl, page: PaginationConfig.PageIndex });
      return PaginationConfig.PageIndex as number;
    }

    if (posts?.meta?.page) {
      return posts.meta.page as number;
    }

    return filter.page;
  };

  const handleViewDetail = (p: PostModel) => {
    let path = USER_PATH.ECO_STORIES as any;
    switch (p.type) {
      case PostTypeEnum.Video:
        path = USER_PATH.ECOFILMS;
        break;

      case PostTypeEnum.OurReaderStory:
        path = USER_PATH.OUR_READER_STORIES;
        break;

      default:
        break;
    }
    if (p.type === PostTypeEnum.Video) {
      path = USER_PATH.ECOFILMS;
    }
    navigate(`/${path}/${p.id}`);
  };

  const handleSearchProcess = () => {
    if (!pageIndexFilter) {
      handleChangePageIndex(PaginationConfig.PageIndex as any);
      return;
    }

    // check country and project for clearing on url
    if (
      currentValueOptions.current.country &&
      countryFilter !== currentValueOptions.current.country &&
      projectFilter
    ) {
      currentValueOptions.current.country = '';
      handleChangeProject('');
      return;
    }

    // check isFeature tag for clearing on url
    // only query by isFeature tag one time <-> pageIndex = 1
    if (
      (currentValueOptions.current.isFeature as any) === 'true' &&
      location.search.includes('isFeature=true') &&
      filter.page === PaginationConfig.PageIndex &&
      onInit.current === true
    ) {
      currentValueOptions.current.isFeature = '';
      handleFeatureTag('');
      return;
    }

    const url = window.location.search;

    if (!url || searchQRef.current !== url) {
      searchQRef.current = url;
      const urlParams = new URLSearchParams(url);
      const qs = urlParams.get(FilterParamsName.searchText);
      const date = urlParams.get(FilterParamsName.date);
      const sort = urlParams.get(FilterParamsName.sort);
      const type = urlParams.get(FilterParamsName.type);
      const cates = urlParams.get(`${FilterParamsName.category}`);
      const page = urlParams.get(FilterParamsName.page);
      const feature = urlParams.get(FilterParamsName.isFeature);
      const country = urlParams.get(FilterParamsName.country);
      const project = urlParams.get(FilterParamsName.project);
      let currentPageIndex = PaginationConfig.PageIndex as number;
      const tempFilter = {};

      if (date || (queryUrl.date && queryUrl.date !== date)) {
        setQueryUrl((prev) => ({ ...prev, date: date }));
        // add params for filter query to call api
        const result = (dateRangeFilter || date) as any;
        const dates = result?.split('to');
        tempFilter['fromDate'] = dates[0];
        tempFilter['toDate'] = dates[1];
      }

      if (cates || (queryUrl.category && queryUrl.category !== cates)) {
        setQueryUrl((prev) => ({ ...prev, category: cates }));
        // add params for filter query to call api
        const result = (categoryFilter || cates) as any;
        if (result !== (currentValueOptions.current.category as any)) {
          tempFilter['categoryId'] = result;
          currentValueOptions.current.category = result;
        }
      }

      if (sort || (queryUrl.sort && queryUrl.sort !== sort)) {
        setQueryUrl((prev) => ({ ...prev, sort: sort }));
        const result = (sortByFilter || sort) as any;
        if (result !== (currentValueOptions.current.sortBy as any)) {
          tempFilter['sort'] = result;
          currentValueOptions.current.sortBy = result;
        }
      }

      if (page || (queryUrl.page && queryUrl.page !== +page)) {
        setQueryUrl((prev) => ({ ...prev, page: +page }));
        currentPageIndex = +page;
      }

      if (qs || (queryUrl.qs && queryUrl.qs !== qs)) {
        setQueryUrl((prev) => ({ ...prev, qs: qs }));
        tempFilter['q'] = qs;
      }

      if (type || (queryUrl.type && queryUrl.type !== type)) {
        setQueryUrl((prev) => ({ ...prev, type: type }));
        tempFilter['type'] = type;
      }

      if (feature || (queryUrl.isFeature && queryUrl.isFeature !== feature)) {
        setQueryUrl((prev) => ({ ...prev, isFeature: feature }));
        const result = (isFeatureFilter || feature) as any;
        if (result !== (currentValueOptions.current.isFeature as any)) {
          tempFilter['isFeature'] = result;
          currentValueOptions.current.isFeature = result;
        }
      }

      if (country || (queryUrl.country && queryUrl.country !== country)) {
        // reset project
        tempFilter['projectId'] = '';
        currentValueOptions.current.project = '';
        setQueryUrl((prev) => ({ ...prev, country: country, project: '' }));
        // add params for filter query to call api
        const result = (countryFilter || country) as any;
        if (result !== (currentValueOptions.current.country as any)) {
          tempFilter['country'] = result;
          currentValueOptions.current.country = result;
        }
      }

      if (country && (project || (queryUrl.project && queryUrl.project !== project))) {
        setQueryUrl((prev) => ({ ...prev, project: project }));
        // add params for filter query to call api
        const result = (projectFilter || project) as any;
        if (result !== (currentValueOptions.current.project as any)) {
          tempFilter['projectId'] = result;
          currentValueOptions.current.project = result;
        }
      }

      const result = { ...filter, page: currentPageIndex, ...tempFilter };
      getPostByFilter(result);
      setFilter(result);
    }

    // scroll top postion
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getCategoriesOpts();

    dispatch(setLoading(true));
    setTimeout(() => {
      onInit.current = true;
      dispatch(setLoading(false));
    }, 3000);
  }, []);

  useEffect(() => {
    // Change title
    document.title = 'Search - EcoCupid';

    // handle button back, the reason when using useSearchParamsFilter that canot back history when click on back button one time.
    const handleBackButton = () => {
      window.history.back();
    };
    window.addEventListener('popstate', handleBackButton);

    return () => {
      onInit.current = false;
      searchQRef.current = '';
      currentValueOptions.current = currentValueOptionsInit;
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  useEffect(() => {
    if (countryFilter) {
      getProjectsOpts();
    }
  }, [countryFilter]);

  useEffect(() => {
    handleSearchProcess();
  }, [location]);

  return (
    <Box>
      <HeaderSearch
        onInput={handleInputValue}
        onSelectType={handleSelectedType}
        searchText={queryUrl.qs}
        type={queryUrl.type}
      />
      <BodyContentStyled>
        {!isMobile ? (
          <Box className="filter-search">
            <Box className="filter-search-left">
              <Box width={'510px'}>
                <DatePickerRange
                  receivedValue={queryUrl.date}
                  handleDateChange={handleChangeDate}
                />
              </Box>
              {filter.type !== `${PostTypeEnum.OurReaderStory}` ? (
                <Box width={'165px'}>
                  <SelectFilter
                    receivedValue={queryUrl.category}
                    options={catesOpts}
                    handleChangeFilter={handleChangeCategory}
                  ></SelectFilter>
                </Box>
              ) : (
                <></>
              )}
              <Box width={'165px'}>
                <SelectFilter
                  receivedValue={queryUrl.country}
                  options={countriesOpts}
                  handleChangeFilter={handleChangeCountry}
                ></SelectFilter>
              </Box>
              {countryFilter && (
                <Box width={'165px'}>
                  <AutocompleteFilter
                    reset={true}
                    receivedValue={queryUrl.project}
                    options={projectsOpts}
                    handleChangeFilter={handleChangeProject}
                  ></AutocompleteFilter>
                </Box>
              )}
              <Box
                width={'250px'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '5px',
                }}
              >
                <Typography variant="h5">Sort by</Typography>
                <Box display={'flex'} alignItems={'center'}>
                  <SelectFilter
                    receivedValue={queryUrl.sort}
                    options={sortByOptions}
                    handleChangeFilter={handleChangeSortBy}
                  ></SelectFilter>
                </Box>
              </Box>
            </Box>
            {/* <Box className="filter-search-right">
              <Typography variant="h5">Sort by</Typography>
              <Box display={'flex'} alignItems={'center'} width={'30%'}>
                <SelectFilter
                  receivedValue={queryUrl.sort}
                  options={sortByOptions}
                  handleChangeFilter={handleChangeSortBy}
                ></SelectFilter>
              </Box>
            </Box> */}
          </Box>
        ) : (
          <Box className="filter-search_mobile">
            <Box className="filter-search-top">
              <DatePickerRange receivedValue={queryUrl.date} handleDateChange={handleChangeDate} />
            </Box>

            <Box className="filter-search-bottom">
              {filter.type !== `${PostTypeEnum.OurReaderStory}` ? (
                <Box width={'240px'} minWidth={'165px'}>
                  <SelectFilter
                    receivedValue={queryUrl.category}
                    options={catesOpts}
                    handleChangeFilter={handleChangeCategory}
                  ></SelectFilter>
                </Box>
              ) : (
                <></>
              )}
              <Box width={'240px'} minWidth={'165px'}>
                <SelectFilter
                  receivedValue={queryUrl.sort}
                  options={sortByOptions}
                  handleChangeFilter={handleChangeSortBy}
                ></SelectFilter>
              </Box>
            </Box>

            <Box className="filter-search-bottom">
              <Box width={'240px'} minWidth={'165px'}>
                <SelectFilter
                  receivedValue={queryUrl.country}
                  options={countriesOpts}
                  handleChangeFilter={handleChangeCountry}
                ></SelectFilter>
              </Box>
              {countryFilter && (
                <Box width={'240px'} minWidth={'165px'}>
                  <AutocompleteFilter
                    reset={true}
                    receivedValue={queryUrl.project}
                    options={projectsOpts}
                    handleChangeFilter={handleChangeProject}
                  ></AutocompleteFilter>
                </Box>
              )}
            </Box>
          </Box>
        )}
        <Box height={40}></Box>
        <Grid container spacing={4}>
          {((posts?.data as PostModel[]) || []).map((p) => (
            <Grid item xs={!isMobile ? 4 : 12} key={p.id}>
              {/* <CardContentImage
                item={p}
                onViewDetail={handleViewDetail}
                showCategory={p.type === PostTypeEnum.Post ? true : false}
              ></CardContentImage> */}
            </Grid>
          ))}
        </Grid>

        <Box height={60}></Box>

        <PaginationComponent
          page={handleGetCurrentPageIndex()}
          pageSize={posts?.meta?.totalPages || PaginationConfig.TotalPages}
          onChangePaging={(value: any) => {
            handleChangePageIndex(value);
          }}
        />
      </BodyContentStyled>
    </Box>
  );
}
