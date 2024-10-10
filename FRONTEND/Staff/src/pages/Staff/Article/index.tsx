import React, { useEffect, useState } from 'react';
import { MainContentWrapper, BoxHeaderSearch, IOSSwitch, TableWrapper } from '../Styles/common';
import { Box, IconButton } from '@mui/material';
import Table from 'components/Common/Table/Table';
import { createColumnHelper } from '@tanstack/react-table';
import useTableQuery from 'hooks/useTableQuery';
import { FormContainer } from 'components/Form/FormContainer';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import { ICONS } from 'configurations/icons';
import SelectElement from 'components/Form/SelectElement/SelectElement';
import { ButtonPrimary } from 'pages/common/style/Button';
import PrevNextElement from 'components/Form/PrevNextDateElement';
import useSearchParamsFilter from 'hooks/useSearchParamsFilter';
import { useNavigate } from 'react-router';
import { STATE } from 'configurations/paths/paths';
import * as colors from 'constants/colors';
import { articleService } from 'services/article.service';
import { categoryService } from 'services/category.service';
import { debounce } from 'lodash';
import { ArticleModelFilterParams, ArticleModelList } from 'models/Article.model';
import {
  DataServiceError,
  DataServiceSuccess,
  ListServiceSuccess,
  OptionServiceSuccess,
} from 'models/ServiceResponse.model';
import PaginationComponent from 'components/Common/Pagination/Pagination';
import { ArticleOptions } from 'models/FilterOptions.model';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import { showToast } from 'components/Common/Toast';

const columnHelper = createColumnHelper<ArticleModelList>();

export default function Article() {
  // use hook
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = Yup.object().shape<any>({});
  const formSearch = useForm<any>({
    defaultValues: {},
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = formSearch;

  const columns = [
    columnHelper.accessor('id', {
      header: () => <span>ID</span>,
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
      enableSorting: false,
    }),
    columnHelper.accessor('title', {
      header: () => <span>Title</span>,
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
      enableSorting: false,
    }),
    columnHelper.accessor('categoryName', {
      header: () => <span>Category</span>,
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
      enableSorting: false,
    }),
    columnHelper.accessor('createdAt', {
      header: () => <span>Created</span>,
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
      enableSorting: false,
    }),
    columnHelper.accessor('createdBy', {
      header: () => <span>Created by</span>,
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
      enableSorting: false,
    }),
    columnHelper.accessor('isFeature', {
      header: () => <span>Feature</span>,
      cell: (info) => (
        <IOSSwitch
          checked={info.getValue()}
          // onChange={handleChange}
        />
      ),
      footer: (info) => info.column.id,
      enableSorting: false,
    }),
    columnHelper.accessor('actions', {
      header: () => <span>Action</span>,
      cell: (info) => (
        <Box>
          <IconButton sx={{ color: colors.primary1 }} onClick={() => navigate(info.renderValue())}>
            <ICONS.IconPencilSimpleLine />
          </IconButton>
          <IconButton
            sx={{ color: colors.negativeN200 }}
            onClick={() => handleDelete(info.renderValue())}
          >
            <ICONS.IconTrash />
          </IconButton>
        </Box>
      ),
      footer: (info) => info.column.id,
      enableSorting: false,
    }),
  ];

  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
    prevPage: null,
    page: 1,
    pagingCounter: 0,
    perPage: 10,
    total: 0,
    totalPages: 0,
  });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [filterParams, setFilterParams] = useState<ArticleModelFilterParams>({});
  // useTableQuery
  const { pagination, onPaginationChange, onSortingChange } = useTableQuery({
    pagination: {
      pageIndex: 1,
      pageSize: 1,
    },
    sorting: [{ id: 'title', desc: true }],
  });
  // useSearchParamsFilter
  const { filter: dateFilter, handleFilterChange: handleDateChange } = useSearchParamsFilter({
    paramName: 'date',
    defaultValue: '',
  });

  //main use
  const paginationInit = {
    page: 1, // dont need set when init
    perPage: 10, // require set
  };

  // handle function
  const handlePageIndex = (pageIndex) => {
    onPaginationChange(null, { pageIndex, pageSize: paginationInit.perPage });
    setFilterParams({ ...filterParams, page: pageIndex });
  };

  const handleChangeFeature = () => {
    const choose = getValues('article');
    if (choose === 'undefined' || choose === undefined) {
      const { isFeature, ...rest }: any = filterParams;
      setFilterParams({ ...rest });
    }
    if (choose === 'true') {
      setFilterParams({ ...filterParams, page: 1, isFeature: true });
    }
    if (choose === 'false') {
      setFilterParams({ ...filterParams, page: 1, isFeature: false });
    }
  };

  const handleChangeCategoryOption = () => {
    const choose = getValues('category');
    if (choose === 'undefined' || choose === undefined) {
      const { categoryId, ...rest }: any = filterParams;
      setFilterParams({ ...rest });
    } else {
      setFilterParams({ ...filterParams, page: 1, categoryId: choose });
    }
  };

  const handleKeyup = debounce(() => {
    const q = getValues('keySearch');
    if (q === '') {
      const { q, ...rest }: any = filterParams;
      setFilterParams({ ...rest });
    } else {
      setFilterParams({ ...filterParams, page: 1, q });
    }
  }, 500);

  const handleChangeDate = () => {
    // console.log('dateFilter', dateFilter);
  };

  const handleDelete = async (id: string) => {
    try {
      dispatch(setLoading(true));
      const resService: DataServiceSuccess | DataServiceError | any = await articleService.delete(
        id,
      );
      if (resService.success) {
        await fetchData();
        showToast('success', 'Delete success.');
      }
    } catch (error) {
      console.error(error);
      showToast('error', 'Delete failed.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchCategoryOption = async () => {
    try {
      const resService: OptionServiceSuccess | DataServiceError | any =
        await categoryService.colorOptions();
      if (resService.success) {
        setCategoryOptions(resService.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchData = async () => {
    try {
      const params: any = { ...filterParams, perPage: paginationInit.perPage };
      // pick date
      if (dateFilter === '') {
        delete params.date;
      } else {
        params.date = dateFilter;
      }
      const resService: ListServiceSuccess | DataServiceError | any = await articleService.list(
        params,
      );
      if (resService.success) {
        setData(resService.data);
        setMeta(resService.meta);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchCategoryOption();
  }, []);

  useEffect(() => {
    fetchData();
  }, [filterParams, dateFilter]);

  useEffect(() => {
    handleChangeFeature();
  }, [watch('article')]);

  useEffect(() => {
    handleChangeCategoryOption();
  }, [watch('category')]);

  /**
   * End
   */
  return (
    <MainContentWrapper>
      <FormContainer formContext={formSearch}>
        <BoxHeaderSearch>
          <Box className="search-left">
            <TextFieldElement
              name="keySearch"
              control={control}
              placeholder="Search"
              InputProps={{
                startAdornment: <ICONS.IconMagnifyingGlass></ICONS.IconMagnifyingGlass>,
              }}
              onKeyUp={handleKeyup}
            />
            <SelectElement
              name="article"
              options={ArticleOptions}
              placeholder="All article"
              control={control}
            />
            <SelectElement
              name="category"
              options={categoryOptions}
              placeholder="All Category"
              control={control}
            />
          </Box>
          <Box className="search-right">
            <PrevNextElement hanldeDateChange={handleDateChange} onChange={handleChangeDate} />
            <ButtonPrimary
              severity="primary"
              padding={'9px 14px'}
              onClick={() => navigate(`${STATE.CREATE}`)}
            >
              New Article
            </ButtonPrimary>
          </Box>
        </BoxHeaderSearch>
      </FormContainer>
      <Box>
        <TableWrapper>
          <Table
            columns={columns}
            data={data}
            onPaginationChange={onPaginationChange}
            onSortingChange={onSortingChange}
            pagination={pagination}
            disablePagination={true}
          ></Table>
        </TableWrapper>
        <PaginationComponent
          page={meta.page}
          pageSize={meta.totalPages}
          onChangePaging={handlePageIndex}
        />
      </Box>
    </MainContentWrapper>
  );
}
