import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDebouncedSearch from './useDebouncedSearch';

type SearchFilterOption<T> = {
  paramName?: string;
  debounced?: boolean;
  defaultValue: T;
  saveState?: boolean;
};

export const useSearchParamsFilter = <T extends Array<unknown> | boolean | string | number = string>(
  options: SearchFilterOption<T>
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { paramName, defaultValue, saveState = true, debounced = false } = options;
  const defaultSearchFilter = useMemo(() => {
    if (saveState && paramName && defaultValue) {
      return getDefaultSearchFilterValue(searchParams.get(paramName), defaultValue);
    }
    return defaultValue;
  }, [defaultValue, paramName, saveState, searchParams]);

  const [searchFilter, setSearchFilter] = useState(defaultSearchFilter);
  const [debouncedFilter, setDebouncedFilter] = useState(defaultSearchFilter);

  const persistSearchFilter = useCallback(
    (value: T, persist: boolean, cascadeSearchParams?: URLSearchParams) => {
      // sanitize user input
      if (debounced && typeof value == 'string') value = sanitizeUserSearchText(value) as unknown as T;

      if (debounced) setDebouncedFilter(value);

      if (!saveState || !paramName) return;

      // remember/remove search filter in the url
      // let searchParam = new URLSearchParams(window.location.search);
      if (!cascadeSearchParams) cascadeSearchParams = searchParams;
      if (value === defaultValue || (!value && !defaultValue)) {
        cascadeSearchParams.delete(paramName);
      } else {
        cascadeSearchParams.set(paramName, String(value));
      }
      if (persist) {
        setSearchParams(cascadeSearchParams);
      }
    },
    [debounced, defaultValue, paramName, saveState, searchParams, setSearchParams]
  );

  const debouncedSearch = useDebouncedSearch(persistSearchFilter, debounced ? undefined : 500);

  const handleFilterChange = useCallback(
    (
      value: T,
      /** whether call `setSearchParams` to update the url search params*/
      persist: boolean = true,
      /** use together with `persist=false` to share the same params across all the params */
      cascadeSearchParams?: URLSearchParams
    ) => {
      setSearchFilter(value);
      debouncedSearch(value, persist, cascadeSearchParams);
    },
    [debouncedSearch]
  );

  return { filter: searchFilter, debouncedFilter, handleFilterChange, searchParams };
};

const getDefaultSearchFilterValue = <T extends Array<unknown> | boolean | string | number>(
  queryParamValue: string | null,
  defaultValue: T
): T => {
  if (queryParamValue === null) return defaultValue;
  if (typeof defaultValue === 'boolean') {
    return Boolean(queryParamValue) as T;
  }
  if (typeof defaultValue === 'number') {
    return Number(queryParamValue) as T;
  }
  if (Array.isArray(defaultValue)) {
    return Array.from(queryParamValue) as T;
  } else {
    return String(queryParamValue) as T;
  }
};

const sanitizeUserSearchText = (search: string) => {
  const value = search.trim();

  // 1. single quote: if only one and it's at the last place, Imperva consider it's sql injection
  if (value.split("'").length === 2 && value.substring(value.length - 1) === "'") {
    return search.replace("'", '');
  }
  return search;
};

export default useSearchParamsFilter;
