import React, { useCallback, useEffect, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridColumnGroupingModel,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, setLoading } from 'redux/Reducer';
import { Box, Button, TableContainer } from '@mui/material';
import { formatDate } from 'utils/datetime';
import { stylistSalaryServices } from 'services/stylistSalary.service';
import moment from 'moment';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormContainer } from 'components/Form/FormContainer';
import { BoxHeaderSearch } from '../Styles/common';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import DatePickerElement from 'components/Form/DatepickerElement';
import { ButtonPrimary } from 'pages/common/style/Button';
import { ICONS } from 'configurations/icons';
import { timekeepingServices } from 'services/timekeeping.service';
import { showToast } from 'components/Common/Toast';

const generateDynamicColumnsAndGrouping = (data) => {
  const uniqueDates = Array.from(new Set(data.map((entry) => entry.date)));

  const columns: GridColDef[] = [{ field: 'fullName', headerName: 'Họ và tên', width: 200 }];

  uniqueDates.forEach((date) => {
    const workships = data.find((entry) => entry.date === date).stylists[0].workships;

    workships.forEach((slot) => {
      columns.push({
        field: `${date}-${slot.time}`,
        headerName: `${slot.time}`,
        headerAlign: 'center',
        align: 'center',
        width: 150,
        renderCell: (params: GridRenderCellParams) => {
          if (params.value === 'Yes') {
            return '/';
          } else {
            return ''; // handle register
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
      .stylists[0].workships.map((slot) => ({
        field: `${date}-${slot.time}`,
      })),
  }));

  return { columns, columnGroupingModel };
};

export default function ScheduleTableGroup() {
  const [rows, setRows] = useState<any[]>([]);
  const [timekeeping, setTimekeeping] = useState<any>();
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [columnGroupingModel, setColumnGroupingModel] = useState<GridColumnGroupingModel>([]);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const schema = Yup.object().shape<any>({});
  const formSearch = useForm<any>({
    defaultValues: {
      totalSalary: '',
      monthYear: new Date(),
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { control: controlSearch, handleSubmit: handleSubmitSearch } = formSearch;
  useEffect(() => {
    handleGetListStylistWorkship({
      month: String(Number(moment().get('M').toString()) + 1),
      year: moment().get('years').toString(),
    });
    handleGetTimekeeping({
      month: String(Number(moment().get('M').toString()) + 1),
      year: moment().get('years').toString(),
    });
  }, [dispatch]);

  const handleGetTimekeeping = async ({
    month = String(Number(moment().get('M').toString()) + 1),
    year = moment().get('years').toString(),
  }) => {
    const res: any = await timekeepingServices.list({ month, year });

    setTimekeeping(res.data[0]);
  };

  const handleGetListStylistWorkship = async ({
    month = String(Number(moment().get('M').toString()) + 1),
    year = moment().get('years').toString(),
  }) => {
    dispatch(setLoading(true));
    const res: any = await stylistSalaryServices.listStylistWorkship({ month, year });
    const { columns, columnGroupingModel } = generateDynamicColumnsAndGrouping(res.data);

    const rows: any[] = [];
    res.data.forEach((entry) => {
      entry.stylists.forEach((stylist) => {
        let existingRow = rows.find((row) => row.id === stylist.id);

        if (!existingRow) {
          const newRow: any = {
            id: stylist.id,
            fullName: stylist.fullName,
          };

          entry.date &&
            stylist.workships.forEach((slot) => {
              newRow[`${entry.date}-${slot.time}`] = slot.isRegister ? 'Yes' : '/';
            });

          rows.push(newRow);
        } else {
          entry.date &&
            stylist.workships.forEach((slot) => {
              existingRow[`${entry.date}-${slot.time}`] = slot.isRegister ? 'Yes' : '/';
            });
        }
      });
    });

    setRows(rows);
    setColumns(columns);
    setColumnGroupingModel(columnGroupingModel);
    dispatch(setLoading(false));
  };

  const handleSearch = useCallback(
    handleSubmitSearch((data: any) => {
      if (data) {
        handleGetListStylistWorkship({
          month: String(Number(moment(formSearch.getValues('monthYear')).month()) + 1),
          year: moment(formSearch.getValues('monthYear')).year().toString(),
        });

        handleGetTimekeeping({
          month: String(Number(moment(formSearch.getValues('monthYear')).month()) + 1),
          year: moment(formSearch.getValues('monthYear')).year().toString(),
        });
      }
    }),
    [],
  );

  const handleClickTimekeeping = () => {
    if (timekeeping) {
      const updateTimekeeping = timekeeping;
      updateTimekeeping.isTimekeepping = true;
      timekeepingServices
        .update(updateTimekeeping.id, updateTimekeeping)
        .then(() => {
          showToast('success', 'Chấm công thành công');
          dispatch(setLoading(false));
        })
        .catch((err) => {
          showToast('error', err.message);
          dispatch(setLoading(false));
        });
    } else {
      showToast('error', 'Không có ngày công để chấm công');
    }
  };

  return (
    <Box marginRight={'20px'} marginTop={'40px'}>
      <FormContainer formContext={formSearch}>
        <BoxHeaderSearch>
          <Box className="search-left">
            <DatePickerElement
              name="monthYear"
              control={controlSearch}
              views={['month', 'year']}
              inputFormat="MM/yyyy"
              label={''}
            />
            <ButtonPrimary severity="primary" padding={'7px 14px'} onClick={handleSearch}>
              <ICONS.IconFilter width={24} height={24}></ICONS.IconFilter>
            </ButtonPrimary>
            <Box width={'50%'}></Box>
          </Box>
          <Box className="search-right">
            {!timekeeping?.isTimekeepping && (
              <ButtonPrimary
                severity="primary"
                padding={'7px 14px'}
                onClick={handleClickTimekeeping}
              >
                Chốt chấm công
              </ButtonPrimary>
            )}
          </Box>
        </BoxHeaderSearch>
      </FormContainer>
      <Box height={40}></Box>
      <TableContainer>
        <DataGrid
          rows={rows}
          columns={columns}
          columnGroupingModel={columnGroupingModel}
          disableRowSelectionOnClick
          virtualizeColumnsWithAutoRowHeight
          loading={loading}
        />
      </TableContainer>
    </Box>
  );
}
