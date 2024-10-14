import styled from '@emotion/styled';
import { Pagination } from '@mui/material';
import { Table } from '@tanstack/react-table';
import React from 'react';
import * as colors from 'constants/colors';
const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: 15,
  '& ul > li > .Mui-selected': {
    color: colors.white,
    borderRadius: 8,
  },
  '& ul > li > button': {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 24,
    borderRadius: 8,
  },

  '& ul > li:first-of-type': {
    border: `1px solid ${colors.boderline}`,
    borderRadius: 8,
    marginRight: 24,
    '& button': {
      margin: 0,
    },
  },
  '& ul > li:last-child': {
    border: `1px solid ${colors.boderline}`,
    borderRadius: 8,
    marginLeft: 24,
    '& button': {
      margin: 0,
    },
  },
});

type TablePaginationProps<T extends object> = {
  table: Table<T>;
};
const RoundedPagination = <T extends object>(props: TablePaginationProps<T>) => {
  const { table } = props;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    table.setPageIndex(value);
  };
  return (
    <Container>
      <Pagination
        count={table.getPageCount()}
        color="primary"
        shape="rounded"
        onChange={handleChange}
      />
    </Container>
  );
};
export default RoundedPagination;
