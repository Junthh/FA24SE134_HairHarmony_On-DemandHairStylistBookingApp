import { yupResolver } from '@hookform/resolvers/yup';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  IconButton,
  Paper,
  Popover,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { Dialog } from 'components/Common/Dialog';
import { showToast } from 'components/Common/Toast';
import { FormContainer } from 'components/Form/FormContainer';
import SelectElement from 'components/Form/SelectElement/SelectElement';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import { ICONS } from 'configurations/icons';
import useModal from 'hooks/useModal';
import PopoverContent from 'pages/common/PopoverContent';
import { ButtonPrimary } from 'pages/common/style/Button';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectCredentialInfo, setLoading } from 'redux/Reducer';
import { formatDate } from 'utils/datetime';
import * as Yup from 'yup';
import { BoxHeaderSearch } from '../Styles/common';
import { currencyFormat } from 'utils/helper';
import DatePickerElement from 'components/Form/DatepickerElement';
import moment from 'moment';
import { current } from '@reduxjs/toolkit';
import { StyledTableCell, StyledTableRow } from 'pages/common/style/TableStyled';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { staffSalaryServices } from 'services/staffSalary.service';
export default function Salary() {
  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal } = useModal();
  const [anchorEl, setAnchorEl] = useState(null);
  const credentialInfo = useSelector(selectCredentialInfo);
  const [staffSalaryDetails, setStaffSalaryDetails] = useState([]);
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

  useEffect(() => {
    if (credentialInfo.Id) {
      getSalaryList({
        size: paging.size,
        page: paging.page,
        month: String(Number(moment(formSearch.getValues('monthYear')).month()) + 1),
        year: moment(formSearch.getValues('monthYear')).year().toString(),
        staffId: credentialInfo.Id,
      });
    }
  }, [paging.size, paging.page, credentialInfo.Id]);
  const getSalaryList = useCallback(({ size, page, staffId = '', month = '', year = '' }) => {
    dispatch(setLoading(true));
    staffSalaryServices
      .list({
        pageSize: size,
        pageIndex: page + 1,
        staffId,
        month,
        year,
        sortKey: 'CreatedDate',
        sortOrder: 'DESC',
      })
      .then((resultList: any) => {
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
          staffId: credentialInfo.Id,
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

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPaging((prev) => ({ ...prev, size: parseInt(event.target.value, 10), page: 0 }));
  };

  const handleViewDetails = async ($event, row) => {
    try {
      dispatch(setLoading(true));
      const res = await staffSalaryServices.findById({
        staffSalaryId: row.id,
      });
      setStaffSalaryDetails(res.data);
      openModal();
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };
  const renderDialog = useMemo(() => {
    return (
      <Dialog
        open={isOpen}
        onClose={() => {
          closeModal();
        }}
        width="100%"
        title={'Chi tiết lương'}
        content={
          <Box padding={2}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead style={{ background: '#2D3748' }}>
                  <TableRow>
                    <StyledTableCell style={{ color: 'white' }} align="center">
                      Hoa hồng
                    </StyledTableCell>
                    <StyledTableCell style={{ color: 'white' }} align="center">
                      Ngày nhận hoa hồng
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staffSalaryDetails.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        {currencyFormat(row.commission)}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {formatDate(row.createdDate, 'dd/MM/yyyy HH:mm')}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        }
      ></Dialog>
    );
  }, [isOpen]);
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
              //   onKeyUp={handleKeyup}
            />
            <ButtonPrimary severity="primary" padding={'7px 14px'} onClick={handleSearch}>
              <ICONS.IconFilter width={24} height={24}></ICONS.IconFilter>
            </ButtonPrimary>
            <Box width={'50%'}></Box>
          </Box>
          <Box className="search-right">
            {/* <ButtonPrimary
              severity="primary"
              padding={'9px 14px'}
              onClick={() => {
                setSelectedRow(null);
                formUser.reset(defaultValues);
                openModal();
              }}
            >
              <ControlPointIcon />
              &nbsp; Thêm mới
            </ButtonPrimary> */}
          </Box>
        </BoxHeaderSearch>
      </FormContainer>
      <Box height={40}></Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ background: '#2D3748' }}>
            <TableRow>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Username nhân viên
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Tên nhân viên
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Tháng
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Năm
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Lương cơ bản
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Tổng lương
              </StyledTableCell>
              {/* <StyledTableCell style={{ color: 'white' }} align="center"></StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{row.staff.username}</StyledTableCell>
                <StyledTableCell align="center">{row.staff.fullName}</StyledTableCell>
                <StyledTableCell align="center">{row.month}</StyledTableCell>
                <StyledTableCell align="center">{row.year}</StyledTableCell>
                <StyledTableCell align="center">{currencyFormat(row.staff.salary)}</StyledTableCell>
                <StyledTableCell align="center">{currencyFormat(row.totalSalary)}</StyledTableCell>
                {/* <StyledTableCell
                  style={{
                    color: 'white',
                    position: 'sticky',
                    right: 0,
                    zIndex: 1,
                  }}
                  align="right"
                >
                  <IconButton
                    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                      handleViewDetails(event, row)
                    }
                  >
                    <VisibilityIcon />
                  </IconButton>
                </StyledTableCell> */}
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
      {/* <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <PopoverContent>
          <Box
            className="content"
            onClick={() => {
              handleViewDetails(selectedRow);
            }}
          >
            <EditIcon />
            <Typography variant="body2" fontWeight={500}>
              Chi tiết
            </Typography>
          </Box>
        </PopoverContent>
      </Popover> */}
      {renderDialog}
    </Box>
  );
}
