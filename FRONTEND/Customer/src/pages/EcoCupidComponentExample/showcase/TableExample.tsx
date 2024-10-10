import { createColumnHelper } from '@tanstack/table-core';
import { ListView } from 'components/Common/ListView';
import Table from 'components/Common/Table/Table';
import useSearchParamsFilter from 'hooks/useSearchParamsFilter';
import useTableQuery from 'hooks/useTableQuery';
import React, { useEffect } from 'react';
type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};
const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor('firstName', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('visits', {
    header: () => <span>Visits</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
    footer: (info) => info.column.id,
  }),
];
export type StatusTypes = 'history';
export default function TableExample() {
  const { sorting, pagination, onSortingChange, onPaginationChange } = useTableQuery({
    pagination: {
      pageIndex: 0,
      pageSize: 5,
    },
    sorting: [{ id: 'firstName', desc: true }],
  });
  const { filter: tableSelectedStatus, handleFilterChange: handleStatusChange } =
    useSearchParamsFilter<StatusTypes>({
      paramName: 'status',
      defaultValue: 'history',
    });
  useEffect(() => {
    //call api
    // console.log(pagination);
  }, [pagination]);
  return (
    <>
      <ListView
        items={[
          { value: 'history', text: 'All (192)' },
          { value: 'inprogess', text: 'In progress (81)' },
          { value: 'pending', text: 'Pending (22)' },
          { value: 'upcoming', text: 'Upcoming (2)' },
          { value: 'completed', text: 'Completed (2)' },
        ]}
        selectedItem={tableSelectedStatus}
        onChange={(item) => handleStatusChange(item.value as StatusTypes)}
      />
      <Table
        columns={columns}
        data={defaultData}
        sorting={sorting}
        onPaginationChange={onPaginationChange}
        onSortingChange={onSortingChange}
        pagination={pagination}
      ></Table>
    </>
  );
}
TableExample.code = `
export default function TableExample() {
  const { sorting, pagination, onSortingChange, onPaginationChange } = useTableQuery({
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
    sorting: [{ id: 'lastName', desc: true }],
  });
  const { filter: tableSelectedStatus, handleFilterChange: handleStatusChange } =
    useSearchParamsFilter<StatusTypes>({
      paramName: 'status',
      defaultValue: 'history',
    });

  return (
    <>
      <ListView
        items={[
          { value: 'history', text: 'All (192)' },
          { value: 'inprogess', text: 'In progress (81)' },
          { value: 'pending', text: 'Pending (22)' },
          { value: 'upcoming', text: 'Upcoming (2)' },
          { value: 'completed', text: 'Completed (2)' },
        ]}
        selectedItem={tableSelectedStatus}
        onChange={(item) => handleStatusChange(item.value as StatusTypes)}
      />
      <Table
        columns={columns}
        data={defaultData}
        sorting={sorting}
        onPaginationChange={onPaginationChange}
        onSortingChange={onSortingChange}
        pagination={pagination}
      ></Table>
    </>
  );
}
`;
