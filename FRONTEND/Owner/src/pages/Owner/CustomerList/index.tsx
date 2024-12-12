import styled from '@emotion/styled';
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
  TableCell,
  tableCellClasses,
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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoles, setLoading } from 'redux/Reducer';
import { formatDate, formatDateTime } from 'utils/datetime';
import * as Yup from 'yup';
import { BoxHeaderSearch } from '../Styles/common';
import { StyledTableCell, StyledTableRow } from 'pages/common/style/TableStyled';
import { employeeStaffServices } from 'services/employee-staff.services';
import AvatarUpload from 'components/Form/AvatarUpload';
import { currencyFormat, objectToFormData } from 'utils/helper';
import { customerServices } from 'services/customer.services';

export default function CustomerList() {
  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal } = useModal();
  const roles = useSelector(selectRoles);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [image, setImage] = useState('');
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
      fullName: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { control: controlSearch, handleSubmit: handleSubmitSearch } = formSearch;

  const schemaUser = Yup.object().shape<any>({
    phoneNumber: Yup.string()
      .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng')
      .required(`Vui lòng nhập số điện thoại.`),
    fullName: Yup.string().required(`Vui lòng nhập họ tên.`),
    username: Yup.string().required(`Vui lòng nhập username`),
  });
  const defaultValues = {
    username: '',
    phoneNumber: '',
    fullName: '',
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
    getEmployeeList({
      size: paging.size,
      page: paging.page,
      fullName: formSearch.getValues('fullName'),
    });
  }, [paging.size, paging.page]);
  const getEmployeeList = useCallback(({ size, page, fullName = '' }) => {
    dispatch(setLoading(true));
    customerServices
      .list({
        pageSize: size,
        pageIndex: page + 1,
        fullName,
        sortKey: 'CreatedDate',
        sortOrder: 'DESC',
      })
      .then((resultList: ListEmployeeSuccess) => {
        setPaging((prev) => ({
          ...prev,
          total: resultList.paging.total,
        }));
        setRows(resultList.data);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, []);

  const handleSearch = useCallback(
    handleSubmitSearch((data: any) => {
      if (data) {
        getEmployeeList({
          ...paging,
          fullName: data.fullName,
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
    setImage('');
  };
  const handleEdit = useCallback(
    (row) => {
      setAnchorEl(null);
      formUser.reset(row);
      setImage(row.avatar);
      openModal();
    },
    [selectedRow],
  );
  const handleDelete = useCallback(
    (row) => {
      dispatch(setLoading(true));
      setAnchorEl(null);
      employeeStaffServices
        .delete(row.id)
        .then((res: ListEmployeeSuccess) => {
          showToast('success', res.msg);
        })
        .catch((err) => {
          showToast('error', err.msg || err.message);
        })
        .finally(() => {
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

  const handleUpdate = useCallback(
    (row) => {
      dispatch(setLoading(true));
      setAnchorEl(null);
      customerServices
        .update(row.id, row)
        .then((res: ListEmployeeSuccess) => {
          getEmployeeList({ ...paging });
          showToast('success', 'Cập nhật thành công');
        })
        .catch((err) => {
          showToast('error', err.msg || err.message);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [selectedRow],
  );

  return (
    <Box marginRight={'20px'} marginTop={'40px'}>
      <FormContainer formContext={formSearch}>
        <BoxHeaderSearch>
          <Box className="search-left" sx={{ minWidth: 200, maxWidth: 400 }}>
            <TextFieldElement
              name="fullName"
              control={controlSearch}
              placeholder="Tìm theo họ và tên"
              InputProps={{
                startAdornment: <ICONS.IconMagnifyingGlass></ICONS.IconMagnifyingGlass>,
              }}
              //   onKeyUp={handleKeyup}
            />
            <ButtonPrimary severity="primary" padding={'7px 14px'} onClick={handleSearch}>
              <ICONS.IconFilter width={24} height={24}></ICONS.IconFilter>
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
                Họ và tên
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Số điện thoại
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Điểm thưởng
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Trạng thái
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Ngày tạo
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: 'white',
                  position: 'sticky',
                  right: 0,
                  backgroundColor: '#2d3748',
                  zIndex: 1,
                }}
                align="right"
              ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                  {row.avatar && (
                    <img
                      style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }}
                      src={row.avatar}
                      alt=""
                    />
                  )}
                  <Typography sx={{ ml: 1 }} variant="body2">
                    {row.fullName}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center">{row.phoneNumber}</StyledTableCell>
                <StyledTableCell align="center">{row.loyaltyPoints}</StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
                <StyledTableCell align="center">{formatDateTime(row.createdDate)}</StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonPrimary
                    severity={row.status === 'Active' ? 'primary' : 'cancel'}
                    padding={'7px 14px'}
                    onClick={() => {
                      row.status = row.status === 'Active' ? 'Inactive' : 'Active';
                      handleUpdate(row);
                    }}
                  >
                    {row.status === 'Active' ? 'Khoá tài khoản' : 'Mở khoá tài khoản'}
                  </ButtonPrimary>
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
    </Box>
  );
}
