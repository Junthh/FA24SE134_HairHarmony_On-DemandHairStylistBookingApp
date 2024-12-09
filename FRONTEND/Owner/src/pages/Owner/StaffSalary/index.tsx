import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import DatePickerElement from 'components/Form/DatepickerElement';
import { FormContainer } from 'components/Form/FormContainer';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import { ICONS } from 'configurations/icons';
import useModal from 'hooks/useModal';
import { ListEmployeeSuccess } from 'models/EmployeeResponse.model';
import moment from 'moment';
import { ButtonPrimary } from 'pages/common/style/Button';
import { StyledTableCell, StyledTableRow } from 'pages/common/style/TableStyled';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoles, setLoading } from 'redux/Reducer';
import { staffSalaryServices } from 'services/staffSalary.service';
import { currencyFormat } from 'utils/helper';
import * as Yup from 'yup';
import { BoxHeaderSearch } from '../Styles/common';
import { showToast } from 'components/Common/Toast';

export default function StaffSalary() {
  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal } = useModal();
  const roles = useSelector(selectRoles);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState([]);
  const [paging, setPaging] = useState({
    size: 10,
    page: 0,
    total: 0,
  });
  //
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
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

  const schemaUser = Yup.object().shape<any>({});
  const defaultValues = {
    totalSalary: '',
    email: '',
    phoneNumber: '',
    fullName: '',
    roleId: '',
  };
  const formUser = useForm<any>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schemaUser),
  });
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
  } = formUser;

  useEffect(() => {
    getSalaryList({
      size: paging.size,
      page: paging.page,
      month: String(Number(moment(formSearch.getValues('monthYear')).month()) + 1),
      year: moment(formSearch.getValues('monthYear')).year().toString(),
      staffName: formSearch.getValues('staffName'),
    });
  }, [paging.size, paging.page]);
  const getSalaryList = useCallback(({ size, page, staffName = '', month = '', year = '' }) => {
    dispatch(setLoading(true));
    staffSalaryServices
      .list({ pageSize: size, pageIndex: page + 1, staffName, month, year })
      .then((resultList: ListEmployeeSuccess) => {
        setPaging((prev) => ({
          ...prev,
          total: resultList.paging.total,
        }));
        setRows(resultList.data);
        dispatch(setLoading(false));
      });
  }, []);

  const handleSearch = useCallback(
    handleSubmitSearch((data: any) => {
      if (data) {
        getSalaryList({
          ...paging,
          staffName: data.staffName,
          month: String(Number(moment(formSearch.getValues('monthYear')).month()) + 1),
          year: moment(formSearch.getValues('monthYear')).year().toString(),
        });
      }
    }),
    [paging],
  );
  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row); // Store the selected row data for popover content
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };
  const handleEdit = useCallback(
    (row) => {
      setAnchorEl(null);
      formUser.reset(row);
      openModal();
    },
    [selectedRow],
  );
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPaging((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleCreateTimekeeping = () => {
    staffSalaryServices
      .createTimekeeping({
        month: String(Number(moment(formSearch.getValues('monthYear')).month()) + 1),
        year: moment(formSearch.getValues('monthYear')).year().toString(),
      })
      .then(() => {
        showToast('success', 'Chấm công thành công');
        getSalaryList({
          ...paging,
          staffName: formSearch.getValues('staffName'),
          month: String(Number(moment(formSearch.getValues('monthYear')).month()) + 1),
          year: moment(formSearch.getValues('monthYear')).year().toString(),
        });
      })
      .catch((error) => {
        showToast('error', error.msg);
        console.log(error);
      });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPaging((prev) => ({ ...prev, size: parseInt(event.target.value, 10), page: 0 }));
  };

  return (
    <Box marginRight={'20px'} marginTop={'40px'}>
      <FormContainer formContext={formSearch}>
        <BoxHeaderSearch>
          <Box className="search-left">
            <TextFieldElement
              name="staffName"
              control={controlSearch}
              placeholder="Tìm theo tên staff"
              InputProps={{
                startAdornment: <ICONS.IconMagnifyingGlass></ICONS.IconMagnifyingGlass>,
              }}
              //   onKeyUp={handleKeyup}
            />
            <DatePickerElement
              name="monthYear"
              control={controlSearch}
              views={['month', 'year']}
              inputFormat="MM/yyyy"
              label={''}
              //   onKeyUp={handleKeyup}
            />
            <ButtonPrimary severity="primary" padding={'7px 14px'} onClick={handleSearch}>
              <ICONS.IconFilter width={24} height={24}></ICONS.IconFilter>
            </ButtonPrimary>
            <Box width={'50%'}></Box>
            <Box className="search-right">
              {rows.length === 0 && (
                <ButtonPrimary
                  severity="primary"
                  padding={'7px 14px'}
                  onClick={handleCreateTimekeeping}
                >
                  Chốt chấm công
                </ButtonPrimary>
              )}
            </Box>
          </Box>
        </BoxHeaderSearch>
      </FormContainer>
      <Box height={40}></Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ background: '#2D3748' }}>
            <TableRow>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Username
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Tên
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Tháng
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Năm
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Tổng lương
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{row.staff.username}</StyledTableCell>
                <StyledTableCell align="center">{row.staff.fullName}</StyledTableCell>
                <StyledTableCell align="center">{row.month}</StyledTableCell>
                <StyledTableCell align="center">{row.year}</StyledTableCell>
                <StyledTableCell align="center">{currencyFormat(row.totalSalary)}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box height={20}></Box>
      <Stack spacing={2} alignItems={'center'}>
        <TablePagination
          component="div"
          count={paging.total}
          page={paging.page}
          rowsPerPage={paging.size}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          showFirstButton
          showLastButton
        />
      </Stack>
    </Box>
  );
}
