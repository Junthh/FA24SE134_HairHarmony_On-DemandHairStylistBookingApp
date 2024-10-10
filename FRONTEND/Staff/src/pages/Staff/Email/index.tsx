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
import { ButtonPrimary } from 'pages/common/style/Button';
import useSearchParamsFilter from 'hooks/useSearchParamsFilter';
import { useNavigate } from 'react-router';
import { STATE } from 'configurations/paths/paths';
import * as colors from 'constants/colors';
import PaginationComponent from 'components/Common/Pagination/Pagination';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import { CategoryModelFilterParams, CategoryModel } from 'models/Category.model';
import {
  DataServiceError,
  DataServiceSuccess,
  ListServiceSuccess,
} from 'models/ServiceResponse.model';
import { categoryService } from 'services/category.service';
import { debounce } from 'lodash';
import { showToast } from 'components/Common/Toast';
import { EmailModel } from 'models/Email.model';
import { emailService } from 'services/email.service';

const columnHelper = createColumnHelper<EmailModel>();

export default function Email() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pagination, onPaginationChange } = useTableQuery({
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  });
  const { filter: dateFilter, handleFilterChange: handleDateChange } = useSearchParamsFilter({
    paramName: 'date',
    defaultValue: '',
  });
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

  /**
   * Begin
   */
  const columns = [
    columnHelper.accessor('email', {
      header: () => <span>Email</span>,
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
      enableSorting: false,
    }),
    columnHelper.accessor('createdAt', {
      header: () => <span>Created At</span>,
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
      enableSorting: false,
    }),
    columnHelper.accessor('actions', {
      header: () => <span>Action</span>,
      cell: (info) => (
        <Box>
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
  const [filterParams, setFilterParams] = useState<CategoryModelFilterParams>({});

  const fetchData = async () => {
    try {
      dispatch(setLoading(true));
      const params: any = { ...filterParams, perPage: paginationInit.perPage };
      const resService: ListServiceSuccess | DataServiceError | any = await emailService.list(
        params,
      );
      if (resService.success) {
        setData(resService.data);
        setMeta(resService.meta);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination.pageIndex, filterParams]);

  const handleKeyup = debounce(() => {
    const q = getValues('keySearch');
    if (q === '') {
      const { q, ...rest }: any = filterParams;
      setFilterParams({ ...rest });
    } else {
      setFilterParams({ ...filterParams, page: 1, q });
    }
  }, 500);

  const handleDelete = async (id: string) => {
    try {
      dispatch(setLoading(true));
      const resService: DataServiceSuccess | DataServiceError | any = await emailService.delete(id);
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
            <Box width={'100%'}></Box>
          </Box>
          <Box className="search-right"></Box>
        </BoxHeaderSearch>
      </FormContainer>
      <Box>
        <TableWrapper>
          <Table
            columns={columns}
            data={data}
            onPaginationChange={onPaginationChange}
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
