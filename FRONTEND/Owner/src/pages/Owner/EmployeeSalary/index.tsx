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
import { STATUS_USER } from 'constants/status';
import useModal from 'hooks/useModal';
import { ListEmployeeSuccess } from 'models/EmployeeResponse.model';
import PopoverContent from 'pages/common/PopoverContent';
import { ButtonPrimary } from 'pages/common/style/Button';
import { StyledTableCell, StyledTableRow } from 'pages/common/style/TableStyled';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoles, setLoading } from 'redux/Reducer';
import { formatDate } from 'utils/datetime';
import * as Yup from 'yup';
import { BoxHeaderSearch } from '../Styles/common';
import { stylistSalaryServices } from 'services/stylistSalary.service';
import { currencyFormat, handleError } from 'utils/helper';
import DatePickerElement from 'components/Form/DatepickerElement';
import moment from 'moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { current } from '@reduxjs/toolkit';
export default function EmployeeSalary() {
  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal } = useModal();
  const roles = useSelector(selectRoles);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState([]);
  const [stylistSalaryDetails, setStylistSalaryDetails] = useState([]);
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
      stylistName: formSearch.getValues('stylistName'),
    });
  }, [paging.size, paging.page]);
  const getSalaryList = useCallback(({ size, page, stylistName = '', month = '', year = '' }) => {
    dispatch(setLoading(true));
    stylistSalaryServices
      .list({ pageSize: size, pageIndex: page + 1, stylistName, month, year })
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
          stylistName: data.stylistName,
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
  const handleDelete = useCallback(
    (row) => {
      dispatch(setLoading(true));
      setAnchorEl(null);
      stylistSalaryServices
        .delete(row.id)
        .then((res: ListEmployeeSuccess) => {
          showToast('success', res.msg);
          dispatch(setLoading(false));
          getSalaryList({
            size: paging.size,
            page: paging.page,
            month: String(Number(moment(formSearch.getValues('monthYear')).month()) + 1),
            year: moment(formSearch.getValues('monthYear')).year().toString(),
            stylistName: formSearch.getValues('stylistName'),
          });
        })
        .catch((err) => {
          showToast('error', handleError(err.msg || err));
          dispatch(setLoading(false));
        });
    },
    [selectedRow, paging.size, paging.page],
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
      const res = await stylistSalaryServices.findById({
        stylistSalaryId: row.id,
      });
      setStylistSalaryDetails(res.data);
      openModal();
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSave = useCallback(
    handleSubmit((data: any) => {
      if (selectedRow) {
        dispatch(setLoading(true));
        stylistSalaryServices
          .update(data.id, data)
          .then((res) => {
            showToast('success', res.msg);
            const { size, page } = paging;
            getSalaryList({
              size,
              page,
              stylistName: formSearch.getValues('stylistName'),
              month: String(Number(moment(formSearch.getValues('monthYear')).month()) + 1),
              year: moment(formSearch.getValues('monthYear')).year().toString(),
            });
            handleClose();
            closeModal();
          })
          .catch((err) => {
            showToast('error', handleError(err.msg || err));
            dispatch(setLoading(false));
          });
      } else {
        dispatch(setLoading(true));
        stylistSalaryServices
          .create(data)
          .then((res) => {
            showToast('success', res.msg);
            const { size, page } = paging;
            getSalaryList({
              size,
              page,
              stylistName: formSearch.getValues('stylistName'),
              month: String(Number(moment(formSearch.getValues('monthYear')).month()) + 1),
              year: moment(formSearch.getValues('monthYear')).year().toString(),
            });
            handleClose();
            closeModal();
          })
          .catch((err) => {
            showToast('error', handleError(err.msg || err));
            dispatch(setLoading(false));
          });
      }
    }),
    [selectedRow, paging],
  );
  // const renderDialog = useMemo(() => {
  //   return (
  //     <Dialog
  //       open={isOpen}
  //       onClose={() => {
  //         closeModal();
  //       }}
  //       width="100%"
  //       title={selectedRow ? 'Edit' : 'Create'}
  //       content={
  //         <FormContainer formContext={formUser}>
  //           <Box
  //             display={'flex'}
  //             justifyContent={'center'}
  //             flexDirection={'column'}
  //             gap={2}
  //             padding={'0 20px 20px 20px'}
  //             width={'550px'}
  //           >
  //             <TextFieldElement
  //               name="fullName"
  //               control={control}
  //               placeholder="Nhập Họ và tên"
  //               label={'Họ và tên'}
  //               //   onKeyUp={handleKeyup}
  //             />
  //             <TextFieldElement
  //               name="email"
  //               control={control}
  //               type="email"
  //               placeholder="Nhập Email"
  //               label={'Email'}
  //               //   onKeyUp={handleKeyup}
  //             />
  //             <TextFieldElement
  //               name="phoneNumber"
  //               control={control}
  //               type="number"
  //               placeholder="Nhập số điện thoại"
  //               label={'Số điện thoại'}
  //               //   onKeyUp={handleKeyup}
  //             />
  //             <SelectElement
  //               control={control}
  //               name="roleId"
  //               options={
  //                 roles &&
  //                 Object.keys(roles).map((id) => ({
  //                   value: id,
  //                   label: roles[id].name,
  //                 }))
  //               }
  //               placeholder="Chọn role"
  //               label={'Roles'}
  //             ></SelectElement>
  //             <TextFieldElement
  //               name="totalSalary"
  //               control={control}
  //               placeholder="Nhập totalSalary"
  //               label={'Tổng lương'}
  //               disabled={!!selectedRow?.totalSalary}
  //               //   onKeyUp={handleKeyup}
  //             />
  //             <SelectElement
  //               control={control}
  //               name="status"
  //               options={STATUS_USER}
  //               placeholder="Chọn trạng thái"
  //               label={'Trạng thái'}
  //             ></SelectElement>
  //             <Box display={'flex'} justifyContent={'flex-end'}>
  //               <ButtonPrimary severity="primary" padding={'9px 20px'} onClick={() => handleSave()}>
  //                 Lưu
  //               </ButtonPrimary>
  //             </Box>
  //           </Box>
  //         </FormContainer>
  //       }
  //     ></Dialog>
  //   );
  // }, [isOpen]);

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
                  {stylistSalaryDetails.map((row, index) => (
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
            <TextFieldElement
              name="stylistName"
              control={controlSearch}
              placeholder="Tìm theo tên stylist"
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
                Tổng lượt booking
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                KPI
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Tổng hoa hồng
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Lương cơ bản
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Tổng lương
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center"></StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{row.stylist.username}</StyledTableCell>
                <StyledTableCell align="center">{row.stylist.fullName}</StyledTableCell>
                <StyledTableCell align="center">{row.month}</StyledTableCell>
                <StyledTableCell align="center">{row.year}</StyledTableCell>
                <StyledTableCell align="center">{row.totalBooking}</StyledTableCell>
                <StyledTableCell align="center">{row.kpi}</StyledTableCell>
                <StyledTableCell align="center">
                  {currencyFormat(row?.totalCommission)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {currencyFormat(row?.stylist?.salary)}
                </StyledTableCell>
                <StyledTableCell align="center">{currencyFormat(row?.totalSalary)}</StyledTableCell>
                <StyledTableCell
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
                </StyledTableCell>
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
      <Popover
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
              handleEdit(selectedRow);
            }}
          >
            <EditIcon />
            <Typography variant="body2" fontWeight={500}>
              Edit user
            </Typography>
          </Box>
          <Box
            className="content"
            onClick={() => {
              handleDelete(selectedRow);
            }}
          >
            <DeleteIcon />
            <Typography variant="body2" fontWeight={500}>
              Delete user
            </Typography>
          </Box>
        </PopoverContent>
      </Popover>
      {renderDialog}
    </Box>
  );
}
