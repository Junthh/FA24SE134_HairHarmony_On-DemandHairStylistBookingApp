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
import React, { useCallback, useEffect, useState } from 'react';
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
import { ListEmployeeSuccess } from 'models/EmployeeResponse.model';
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
// const rows = [
//   createData(
//     'Ánh Nguyên Nghị',
//     '19/06/2024',
//     '0392748419',
//     'Jhon Alex',
//     '14:00',
//     '-',
//     'Cắt Nhộm',
//     '600,000 VND',
//   ),
//   createData(
//     'Ánh Nguyên Nghị',
//     '19/06/2024',
//     '0392748419',
//     'Jhon Alex',
//     '14:00',
//     '-',
//     'Cắt Nhộm',
//     '600,000 VND',
//   ),
//   createData(
//     'Ánh Nguyên Nghị',
//     '19/06/2024',
//     '0392748419',
//     'Jhon Alex',
//     '14:00',
//     '-',
//     'Cắt Nhộm',
//     '600,000 VND',
//   ),
//   createData(
//     'Ánh Nguyên Nghị',
//     '19/06/2024',
//     '0392748419',
//     'Jhon Alex',
//     '14:00',
//     '-',
//     'Cắt Nhộm',
//     '600,000 VND',
//   ),
// ];
// function createData(
//   name: string,
//   date: string,
//   phone: string,
//   nameStylist: string,
//   time: string,
//   service: string,
//   combo: string,
//   price: string,
// ) {
//   return { name, date, phone, nameStylist, time, service, combo, price };
// }
export default function EmployeeList() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState([]);
  const [paging, setPaging] = useState({
    size: 10,
    page: 1,
    total: 0,
  });
  //
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const schema = Yup.object().shape<any>({});
  const formSearch = useForm<any>({
    defaultValues: {},
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = formSearch;

  useEffect(() => {
    getEmployeeList(paging);
  }, []);
  const getEmployeeList = useCallback(({ size, page }) => {
    employeeServices.list({ size, page }).then((resultList: ListEmployeeSuccess) => {
      console.log(resultList);
      setPaging(resultList.paging);
      setRows(resultList.data);
    });
  }, []);
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
      console.log(row);
    },
    [selectedRow],
  );
  const handleDelete = useCallback(
    (row) => {
      setAnchorEl(null);
      console.log(row);
    },
    [selectedRow],
  );
  return (
    <Box marginRight={'20px'} marginTop={'40px'}>
      <FormContainer formContext={formSearch}>
        <BoxHeaderSearch>
          <Box className="search-left">
            <TextFieldElement
              name="keySearch"
              control={control}
              placeholder="Search"
              InputProps={{
                startAdornment: <ICONS.IconMagnifyingGlass></ICONS.IconMagnifyingGlass>,
              }}
              //   onKeyUp={handleKeyup}
            />
            <ButtonPrimary
              severity="primary"
              padding={'7px 14px'}
              //   onClick={() => navigate(`${STATE.CREATE}`)}
            >
              <ICONS.IconFilter width={24} height={24}></ICONS.IconFilter>
            </ButtonPrimary>
            <Box width={'50%'}></Box>
          </Box>
          <Box className="search-right">
            <ButtonPrimary
              severity="primary"
              padding={'9px 14px'}
              //   onClick={() => navigate(`${STATE.CREATE}`)}
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
                Họ và tên
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Số điện thoại
              </StyledTableCell>{' '}
              <StyledTableCell style={{ color: 'white' }} align="right">
                Ngày sinh
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Giới tính
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Mô tả
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Năm kinh nghiệm
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Level
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Image
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.date}</StyledTableCell>
                <StyledTableCell align="right">{row.phone}</StyledTableCell>
                <StyledTableCell align="right">{row.nameStylist}</StyledTableCell>
                <StyledTableCell align="right">{row.time}</StyledTableCell>
                <StyledTableCell align="right">{row.service}</StyledTableCell>
                <StyledTableCell align="right">{row.combo}</StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
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
          count={paging.total / paging.size}
          page={paging.page}
          rowsPerPage={paging.size}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
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
    </Box>
  );
}
