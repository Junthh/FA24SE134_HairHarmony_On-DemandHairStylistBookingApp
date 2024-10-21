import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  IconButton,
  Pagination,
  Paper,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { FormContainer } from 'components/Form/FormContainer';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { BoxHeaderSearch } from '../Styles/common';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import { ICONS } from 'configurations/icons';
import { ButtonPrimary } from 'pages/common/style/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import PopoverContent from 'pages/common/PopoverContent';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { employeeServices } from 'services/employee.services';
import { DataEmployeeError, ListEmployeeSuccess } from 'models/EmployeeResponse.model';
import { showToast } from 'components/Common/Toast';
import { appSelector, selectRoles, setLoading } from 'redux/Reducer';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from 'utils/datetime';
import useModal from 'hooks/useModal';
import { Dialog } from 'components/Common/Dialog';
import SelectElement from 'components/Form/SelectElement/SelectElement';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   '&:nth-of-type(odd)': {
  //     backgroundColor: theme.palette.action.hover,
  //   },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
export default function EmployeeList() {
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
      username: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { control: controlSearch, handleSubmit: handleSubmitSearch } = formSearch;

  const schemaUser = Yup.object().shape<any>({});
  const defaultValues = {
    username: '',
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
    getEmployeeList(paging);
  }, []);
  const getEmployeeList = useCallback(({ size, page, username = '' }) => {
    dispatch(setLoading(true));
    employeeServices.list({ size, page, username }).then((resultList: ListEmployeeSuccess) => {
      console.log(resultList);
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
        getEmployeeList({
          ...paging,
          username: data.username,
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
      employeeServices
        .delete(row.id)
        .then((res: ListEmployeeSuccess) => {
          showToast('success', res.msg);
          dispatch(setLoading(false));
        })
        .catch((err) => {
          showToast('error', err.message);
          dispatch(setLoading(false));
        });
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

  const handleSave = useCallback(
    handleSubmit((data) => {
      console.log(data);
    }),
    [],
  );
  const renderDialog = useMemo(() => {
    return (
      <Dialog
        open={isOpen}
        onClose={() => {
          closeModal();
        }}
        width="100%"
        title="Create"
        content={
          <FormContainer formContext={formUser}>
            <Box
              display={'flex'}
              justifyContent={'center'}
              flexDirection={'column'}
              gap={2}
              padding={'0 20px 20px 20px'}
              width={'550px'}
            >
              <TextFieldElement
                name="username"
                control={control}
                placeholder="Nhập username"
                label={'Username'}
                disabled={!!selectedRow?.username}
                //   onKeyUp={handleKeyup}
              />
              <TextFieldElement
                name="fullName"
                control={control}
                placeholder="Nhập Họ và tên"
                label={'Họ và tên'}
                //   onKeyUp={handleKeyup}
              />
              <TextFieldElement
                name="email"
                control={control}
                type="email"
                placeholder="Nhập Email"
                label={'Email'}
                //   onKeyUp={handleKeyup}
              />
              <TextFieldElement
                name="phoneNumber"
                control={control}
                type="number"
                placeholder="Nhập số điện thoại"
                label={'Số điện thoại'}
                //   onKeyUp={handleKeyup}
              />
              <SelectElement
                control={control}
                name="roleId"
                options={
                  roles &&
                  Object.keys(roles).map((id) => ({
                    value: id,
                    label: roles[id].name,
                  }))
                }
                placeholder="Chọn role"
                label={'Roles'}
              ></SelectElement>
              <SelectElement
                control={control}
                name="status"
                options={[]}
                placeholder="Chọn trạng thái"
                label={'Trạng thái'}
              ></SelectElement>
              <Box display={'flex'} justifyContent={'flex-end'}>
                <ButtonPrimary severity="primary" padding={'9px 14px'} onClick={() => handleSave()}>
                  &nbsp; Lưu
                </ButtonPrimary>
              </Box>
            </Box>
          </FormContainer>
        }
      ></Dialog>
    );
  }, [isOpen, selectedRow]);
  return (
    <Box marginRight={'20px'} marginTop={'40px'}>
      <FormContainer formContext={formSearch}>
        <BoxHeaderSearch>
          <Box className="search-left">
            <TextFieldElement
              name="username"
              control={controlSearch}
              placeholder="Search"
              InputProps={{
                startAdornment: <ICONS.IconMagnifyingGlass></ICONS.IconMagnifyingGlass>,
              }}
              //   onKeyUp={handleKeyup}
            />
            <ButtonPrimary severity="primary" padding={'7px 14px'} onClick={handleSearch}>
              <ICONS.IconFilter width={24} height={24}></ICONS.IconFilter>
            </ButtonPrimary>
            <Box width={'50%'}></Box>
          </Box>
          <Box className="search-right">
            <ButtonPrimary
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
            </ButtonPrimary>
          </Box>
        </BoxHeaderSearch>
      </FormContainer>
      <Box height={40}></Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ background: '#2D3748' }}>
            <TableRow>
              <StyledTableCell style={{ color: 'white' }} align="left">
                Username
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="left">
                Họ và tên
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Email
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Số điện thoại
              </StyledTableCell>{' '}
              <StyledTableCell style={{ color: 'white' }} align="right">
                Role
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Trạng thái
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Ngày tạo
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.username}>
                <StyledTableCell component="th" scope="row">
                  {row.username}
                </StyledTableCell>
                <StyledTableCell align="right">{row.fullName}</StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.phoneNumber}</StyledTableCell>
                <StyledTableCell align="right">{roles[row?.roleId]?.name}</StyledTableCell>
                <StyledTableCell align="right">{row.status}</StyledTableCell>
                <StyledTableCell align="right">{formatDate(row.createdDate)}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                      handleClick(event, row)
                    }
                  >
                    <ICONS.IconThreeDot />
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
