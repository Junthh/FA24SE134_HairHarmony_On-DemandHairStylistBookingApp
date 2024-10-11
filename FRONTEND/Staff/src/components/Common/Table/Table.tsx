import MuiTableTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  VisibilityState,
  SortingState,
  Updater,
  useReactTable,
  Row,
} from '@tanstack/react-table';
import SortIcon from './SortIcon';
import TablePagination from './TablePagination';
import {
  SCTableCellContainer,
  TableHeaderColumnWrapper,
  SCTableHeadContainer,
  SCTableWrapper,
  SCTableCellHeaderContainer,
} from './TableStyles';
import NoDataResult from './NoDataResult';
import { Box } from '@mui/material';
import RoundedPagination from './RoundedPagination';

type TableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T>[];
  rowSelection?: RowSelectionState;
  pagination?: PaginationState;
  sorting?: SortingState;
  disablePagination?: boolean;
  pageCount?: number;
  loading?: boolean;
  onRowClick?: (v: Row<T>) => void;
  enableRowSelection?: boolean;
  columnVisibility?: VisibilityState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  onSortingChange?: OnChangeFn<SortingState>;
  setRowSelection?: (updater: Updater<RowSelectionState>) => void;
};

const Table = <T extends object>(props: TableProps<T>) => {
  const {
    columns,
    data,
    rowSelection,
    pagination,
    disablePagination,
    sorting,
    pageCount,
    loading,
    enableRowSelection,
    columnVisibility,
    onPaginationChange,
    setRowSelection,
    onSortingChange,
    onRowClick,
  } = props;

  const table = useReactTable<T>({
    data,
    columns,
    pageCount,
    state: {
      rowSelection,
      pagination,
      sorting,
      columnVisibility,
    },
    enableRowSelection,
    manualPagination: true,
    manualSorting: true,
    enableSortingRemoval: false,
    enableMultiSort: true,
    onPaginationChange,
    onRowSelectionChange: setRowSelection,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <SCTableWrapper>
        <MuiTableTable>
          <SCTableHeadContainer>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const sortDirection = header.column.getIsSorted() || 'asc';
                    return (
                      <SCTableCellHeaderContainer
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <TableHeaderColumnWrapper>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() &&
                            {
                              asc: <SortIcon desc={false} />,
                              desc: <SortIcon desc={true} />,
                            }[sortDirection]}
                        </TableHeaderColumnWrapper>
                      </SCTableCellHeaderContainer>
                    );
                  })}
                </TableRow>
              );
            })}
          </SCTableHeadContainer>

          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  sx={{
                    '&.MuiTableRow-root:hover': {
                      cursor: 'pointer',
                    },
                  }}
                  key={row.id}
                  hover
                  selected={enableRowSelection && row.getIsSelected()}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <SCTableCellContainer key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </SCTableCellContainer>
                    );
                  })}
                </TableRow>
              );
            })}
            {!loading && data.length === 0 && (
              <TableRow
                sx={{
                  height: 200,
                }}
              >
                <Box
                  my={12}
                  component="td"
                  position="relative"
                  sx={{
                    position: 'relative',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <NoDataResult />
                </Box>
              </TableRow>
            )}
          </TableBody>
        </MuiTableTable>

        {/* {pagination && <TablePagination table={table} />} */}
        {!disablePagination && pagination && <RoundedPagination table={table} />}
      </SCTableWrapper>
    </>
  );
};

export default Table;
