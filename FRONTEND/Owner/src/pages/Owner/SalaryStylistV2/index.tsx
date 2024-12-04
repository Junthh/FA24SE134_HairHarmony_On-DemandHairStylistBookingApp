import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridColumnGroupingModel,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import { Button } from '@mui/material';
import { formatDate } from 'utils/datetime';

const fetchData = (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          date: '2024-01-01',
          stylist: [
            {
              fullName: 'Dương Thanh Sang',
              timeSlots: [
                { time: '09:00-12:00', isRegister: true },
                { time: '12:00-15:00', isRegister: false },
                { time: '15:00-18:00', isRegister: false },
                { time: '18:00-21:00', isRegister: false },
              ],
            },
            {
              fullName: 'Lê Hữu Hiếu',
              timeSlots: [
                { time: '09:00-12:00', isRegister: false },
                { time: '12:00-15:00', isRegister: true },
                { time: '15:00-18:00', isRegister: false },
                { time: '18:00-21:00', isRegister: false },
              ],
            },
          ],
        },
        {
          date: '2024-01-02',
          stylist: [
            {
              fullName: 'Dương Thanh Sang',
              timeSlots: [
                { time: '09:00-12:00', isRegister: true },
                { time: '12:00-15:00', isRegister: false },
                { time: '15:00-18:00', isRegister: false },
                { time: '18:00-21:00', isRegister: false },
              ],
            },
            {
              fullName: 'Lê Hữu Hiếu',
              timeSlots: [
                { time: '09:00-12:00', isRegister: false },
                { time: '12:00-15:00', isRegister: true },
                { time: '15:00-18:00', isRegister: false },
                { time: '18:00-21:00', isRegister: false },
              ],
            },
          ],
        },
        {
          date: '2024-01-03',
          stylist: [
            {
              fullName: 'Dương Thanh Sang',
              timeSlots: [
                { time: '09:00-12:00', isRegister: true },
                { time: '12:00-15:00', isRegister: false },
                { time: '15:00-18:00', isRegister: false },
                { time: '18:00-21:00', isRegister: false },
              ],
            },
            {
              fullName: 'Lê Hữu Hiếu',
              timeSlots: [
                { time: '09:00-12:00', isRegister: false },
                { time: '12:00-15:00', isRegister: true },
                { time: '15:00-18:00', isRegister: false },
                { time: '18:00-21:00', isRegister: false },
              ],
            },
          ],
        },
      ]);
    }, 2000);
  });
};

const generateDynamicColumnsAndGrouping = (data) => {
  const uniqueDates = Array.from(new Set(data.map((entry) => entry.date)));

  const columns: GridColDef[] = [{ field: 'fullName', headerName: 'Stylist Name', width: 200 }];

  uniqueDates.forEach((date) => {
    const timeSlots = data.find((entry) => entry.date === date).stylist[0].timeSlots;

    timeSlots.forEach((slot) => {
      columns.push({
        field: `${date}-${slot.time}`,
        headerName: `${slot.time}`,
        headerAlign: 'center',
        align: 'center',
        width: 150,
        renderCell: (params: GridRenderCellParams) => {
          if (params.value === 'Yes') {
            return 'Yes';
          } else {
            return '/'; // handle register
            // (
            //   <Button variant="contained" color="primary" onClick={() => handleRegister(params)}>
            //     Register
            //   </Button>
            // );
          }
        },
      });
    });
  });

  const columnGroupingModel: any = uniqueDates.map((date: string | Date) => ({
    groupId: date,
    headerName: `${formatDate(date, 'dd/MM/yyyy')}`,
    headerAlign: 'center',
    description: date,
    children: data
      .find((entry) => entry.date === date)
      .stylist[0].timeSlots.map((slot) => ({
        field: `${date}-${slot.time}`,
      })),
  }));

  return { columns, columnGroupingModel };
};

export default function ScheduleTableGroup() {
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [columnGroupingModel, setColumnGroupingModel] = useState<GridColumnGroupingModel>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    fetchData().then((data) => {
      const { columns, columnGroupingModel } = generateDynamicColumnsAndGrouping(data);

      const rows: any[] = [];
      data.forEach((entry) => {
        entry.stylist.forEach((stylist) => {
          let existingRow = rows.find((row) => row.fullName === stylist.fullName);

          if (!existingRow) {
            const newRow: any = {
              id: stylist.fullName,
              fullName: stylist.fullName,
            };

            entry.date &&
              stylist.timeSlots.forEach((slot) => {
                newRow[`${entry.date}-${slot.time}`] = slot.isRegister ? 'Yes' : '/';
              });

            rows.push(newRow);
          } else {
            entry.date &&
              stylist.timeSlots.forEach((slot) => {
                existingRow[`${entry.date}-${slot.time}`] = slot.isRegister ? 'Yes' : '/';
              });
          }
        });
      });

      setRows(rows);
      setColumns(columns);
      setColumnGroupingModel(columnGroupingModel);
      dispatch(setLoading(false));
    });
  }, [dispatch]);

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        columnGroupingModel={columnGroupingModel}
        disableRowSelectionOnClick
      />
    </div>
  );
}
