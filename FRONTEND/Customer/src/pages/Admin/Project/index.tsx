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
import { ProjectModelFilterParams, ProjectModelList } from 'models/ProjectModel';
import { Meta } from 'models/Response.model';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import { showToast } from 'components/Common/Toast';
import {
  DataServiceError,
  DataServiceSuccess,
  ListServiceSuccess,
} from 'models/ServiceResponse.model';
import { projectService } from 'services/project.service';
import PaginationComponent from 'components/Common/Pagination/Pagination';
import { debounce } from 'lodash';

const columnHelper = createColumnHelper<ProjectModelList>();

export default function Project() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pagination, onPaginationChange } = useTableQuery({
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
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
    columnHelper.accessor('title', {
      header: () => <span>Name of project</span>,
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
      enableSorting: false,
    }),
    columnHelper.accessor('qtyArticle', {
      header: () => <span>Articles</span>,
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
      enableSorting: false,
    }),
    columnHelper.accessor('qtyVideo', {
      header: () => <span>Videos</span>,
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

  const [data, setData] = useState<ProjectModelList[]>([]);
  const [meta, setMeta] = useState<Meta>({
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
  const [filterParams, setFilterParams] = useState<ProjectModelFilterParams>({});

  const paginationInit = {
    page: 1, // dont need set when init
    perPage: 10, // require set
  };

  const handlePageIndex = (pageIndex) => {
    onPaginationChange(null, { pageIndex, pageSize: paginationInit.perPage });
    setFilterParams({ ...filterParams, page: pageIndex });
  };

  const fetchData = async () => {
    try {
      dispatch(setLoading(true));
      const params: any = { ...filterParams, perPage: paginationInit.perPage };
      const resService: ListServiceSuccess | DataServiceSuccess | any = await projectService.list(
        params,
      );
      if (resService.success) {
        setData(resService.data);
        setMeta(resService.meta);
      }
    } catch (error) {
      console.error('Error:', error);
      showToast('error', 'Load data failed.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      dispatch(setLoading(true));
      const resService: DataServiceSuccess | DataServiceError | any = await projectService.delete(
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

  const handleKeyup = debounce(() => {
    const q = getValues('keySearch');
    if (q === '') {
      const { q, ...rest }: any = filterParams;
      setFilterParams({ ...rest });
    } else {
      setFilterParams({ ...filterParams, page: 1, q });
    }
  }, 500);

  useEffect(() => {
    fetchData();
  }, [filterParams]);

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
            <Box width={'50%'}></Box>
          </Box>
          <Box className="search-right">
            <ButtonPrimary
              severity="primary"
              padding={'9px 14px'}
              onClick={() => navigate(`${STATE.CREATE}`)}
            >
              New Project
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
