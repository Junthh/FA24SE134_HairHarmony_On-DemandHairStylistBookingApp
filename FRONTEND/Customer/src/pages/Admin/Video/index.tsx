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
import { debounce } from 'lodash';
import {
  DataServiceError,
  DataServiceSuccess,
  ListServiceSuccess,
} from 'models/ServiceResponse.model';
import PaginationComponent from 'components/Common/Pagination/Pagination';
import { VideoModelFilterParams, VideoModelList } from 'models/Video.model';
import { Meta } from 'models/Response.model';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import { videoService } from 'services/video.service';
import { showToast } from 'components/Common/Toast';
import { VideoOptions } from 'models/FilterOptions.model';

const columnHelper = createColumnHelper<VideoModelList>();

export default function Video() {
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
  //main use
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
      header: () => <span>Fearture</span>,
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

  const [data, setData] = useState<Array<VideoModelList>>([]);
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
  const [filterParams, setFilterParams] = useState<VideoModelFilterParams>({});

  const paginationInit = {
    page: 1, // dont need set when init
    perPage: 10, // require set
  };

  // handle function
  const handlePageIndex = (pageIndex) => {
    onPaginationChange(null, { pageIndex, pageSize: paginationInit.perPage });
    setFilterParams({ ...filterParams, page: pageIndex });
  };

  const fetchData = async () => {
    try {
      dispatch(setLoading(true));
      const params: any = { ...filterParams, perPage: paginationInit.perPage };
      // pick date
      if (dateFilter === '') {
        delete params.date;
      } else {
        params.date = dateFilter;
      }
      const resService: ListServiceSuccess | DataServiceError | any = await videoService.list(
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
      const resService: DataServiceSuccess | DataServiceError | any = await videoService.delete(id);
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

  const handleChangeFeature = () => {
    const choose = getValues('video');
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

  useEffect(() => {
    fetchData();
  }, [filterParams, dateFilter]);

  useEffect(() => {
    handleChangeFeature();
  }, [watch('video')]);
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
              name="video"
              options={VideoOptions}
              placeholder="All videos"
              control={control}
            />
          </Box>
          <Box className="search-right">
            <PrevNextElement hanldeDateChange={handleDateChange} />
            <ButtonPrimary
              severity="primary"
              padding={'9px 14px'}
              onClick={() => navigate(`${STATE.CREATE}`)}
            >
              New Video
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
