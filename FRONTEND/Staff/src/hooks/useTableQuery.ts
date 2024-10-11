import { ColumnSort, PaginationState, SortingState, Updater } from '@tanstack/react-table';
import { ChangeEvent, useCallback } from 'react';
import useSearchParamsFilter from './useSearchParamsFilter';

interface IParams {
  sorting?: SortingState;
  pagination: PaginationState;
  saveState?: boolean;
  paramsName?: {
    pageSize?: string;
    pageNumber?: string;
    sort?: string;
    search?: string;
  };
}

const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};

function useTableQuery(initialParams: IParams) {
  const { paramsName, saveState = true, pagination } = initialParams;
  const { filter: pageSize, handleFilterChange: handleChangePageSize } = useSearchParamsFilter({
    defaultValue: pagination.pageSize || defaultPagination.pageSize,
    paramName: paramsName?.pageSize || 'pageSize',
    saveState,
  });

  const { filter: pageNumber, handleFilterChange: handleChangePageNumber } = useSearchParamsFilter({
    defaultValue: pagination.pageIndex || defaultPagination.pageIndex,
    paramName: paramsName?.pageNumber || 'pageNumber',
    saveState,
  });

  const { filter: sorting, handleFilterChange: handleSortChange } = useSearchParamsFilter({
    defaultValue: serializeSortModel(initialParams?.sorting),
    paramName: paramsName?.sort || 'sort',
    saveState,
  });

  const {
    filter: searchTerm,
    handleFilterChange: handleSearchTextChange,
    debouncedFilter: debouncedSearchTerm,
  } = useSearchParamsFilter<string>({
    defaultValue: '',
    debounced: true,
    paramName: paramsName?.search || 'search',
    saveState,
  });

  const onPaginationChange = useCallback(
    (updater?: Updater<PaginationState>, customUpdater?: PaginationState) => {
      let newPagination;
      if (customUpdater) {
        newPagination = customUpdater;
      } else {
        newPagination =
          typeof updater === 'function'
            ? updater({
              pageIndex: pageNumber,
              pageSize: pageSize,
            })
            : updater;
      }

      handleChangePageSize(newPagination.pageSize);
      handleChangePageNumber(newPagination.pageIndex);
    },
    [handleChangePageNumber, handleChangePageSize, pageNumber, pageSize]
  );

  const onSortingChange = useCallback(
    (updater: Updater<SortingState>) => {
      const sortState = deserializeSortModel(sorting) ?? [];
      const newSorting = typeof updater === 'function' ? updater(sortState) : updater;
      const sort = serializeSortModel(newSorting);

      handleSortChange(sort);
    },
    [handleSortChange, sorting]
  );

  const onSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      handleSearchTextChange(event.target.value);
    },
    [handleSearchTextChange]
  );

  return {
    pagination: {
      pageIndex: pageNumber,
      pageSize,
    },
    sorting: deserializeSortModel(sorting) ?? [],
    searchTerm,
    debouncedSearchTerm,
    onPaginationChange,
    onSortingChange,
    onSearchChange,
  };
}

export default useTableQuery;

// serialize sort model array to string for saving in query parameter
const SORT_DELIMITER = '_';
const serializeSortModel = (sortModel?: SortingState) => {
  if (sortModel) {
    // serialize sort model to: field1+desc,field2+asc (but only support single field sort at this moment)
    const mappedSortValue = sortModel
      .map((item: ColumnSort) => {
        return `${item.id}${SORT_DELIMITER}${item.desc ? 'desc' : 'asc'}`;
      })
      .join(',');

    return mappedSortValue;
  }
  return '';
};

// convert serialized sort string to array
const deserializeSortModel = (sortModelString: string | null) => {
  if (sortModelString) {
    return sortModelString.split(',').map(item => {
      const pair = item.split(SORT_DELIMITER);
      return {
        id: pair[0],
        desc: pair[1] === 'desc',
      };
    });
  }
  return null;
};
