import { ReactComponent as BackIcon } from 'assets/pics/icons/icon-arrow-back-ios.svg';
import { ReactComponent as NextIcon } from 'assets/pics/icons/icon-arrow-forward-ios.svg';
import styled from '@emotion/styled';
import { FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { Table } from '@tanstack/react-table';

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 15,
});

const SelectPage = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 10, // TODO: refer to theme spacing
});

const DisplayPageItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 20, // TODO: refer to theme spacing
});

const NextPrevWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 20, // TODO: refer to theme spacing
  cursor: 'pointer',
});

const IconWrapper = styled('div')<{ disabled?: boolean }>(({ disabled }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: disabled ? 0.5 : 1,
  width: 32,
  height: 32,
  borderRadius: 8,
}));

type TablePaginationProps<T extends object> = {
  table: Table<T>;
};

const SHOW_NUMBER_ITEMS = [10, 20, 30];
const TablePagination = <T extends object>(props: TablePaginationProps<T>) => {
  const { table } = props;

  const handleChangePageSize = (e: SelectChangeEvent<number>) => {
    table.setPageSize(Number(e.target.value));
  };

  return (
    <Container>
      <SelectPage>
        <Typography>Show</Typography>
        <FormControl sx={{ minWidth: 80 }} size="small">
          <Select
            id="select-page"
            value={table.getState().pagination.pageSize}
            onChange={handleChangePageSize}
          >
            {SHOW_NUMBER_ITEMS.map((item) => (
              <MenuItem key={item} value={item}>
                <Typography>{item}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography>Items</Typography>
      </SelectPage>
      <DisplayPageItem>
        <Typography>
          From {table.getState().pagination.pageIndex + 1} - {table.getPageCount()} of{' '}
          {table.getPageCount()} items
        </Typography>
        <NextPrevWrapper>
          <IconWrapper
            onClick={() => {
              table.getCanPreviousPage() && table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <BackIcon />
          </IconWrapper>
          <IconWrapper
            onClick={() => {
              table.getCanNextPage() && table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            <NextIcon />
          </IconWrapper>
        </NextPrevWrapper>
      </DisplayPageItem>
    </Container>
  );
};

export default TablePagination;
