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
import { ListEmployeeSuccess } from 'models/EmployeeResponse.model';
import PopoverContent from 'pages/common/PopoverContent';
import { ButtonPrimary } from 'pages/common/style/Button';
import { StyledTableCell, StyledTableRow } from 'pages/common/style/TableStyled';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectServices, setLoading } from 'redux/Reducer';
import { formatDate } from 'utils/datetime';
import * as Yup from 'yup';
import { BoxHeaderSearch } from '../Styles/common';
import { currencyFormat, objectToFormData } from 'utils/helper';
import TextAreaElement from 'components/Form/TextAreaElement/TextAreaElement';
import AvatarUpload from 'components/Form/AvatarUpload';
import SelectMultiElement from 'components/Form/SelectMultiElement';
import { kpiServices } from 'services/kpi.service';
import DatePickerElement from 'components/Form/DatepickerElement';
import moment from 'moment';

export default function KpiList() {
  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal } = useModal();
  const services = useSelector(selectServices);
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
      name: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { control: controlSearch, handleSubmit: handleSubmitSearch } = formSearch;

  const schemaUser = Yup.object().shape<any>({
    name: Yup.string().required('Vui lòng nhập tên kpi.'),
    value: Yup.string().required('Vui lòng giá trị kpi.'),
    startDate: Yup.string().required('Vui lòng nhập ngày bắt đầu.'),
    endDate: Yup.string()
      .required('Vui lòng nhập ngày kết thúc.')
      .test(
        'endDate-greater-than-startDate',
        'Ngày kết thúc phải lớn hơn ngày bắt đầu.',
        function (value) {
          const { startDate } = this.parent;
          if (!startDate || !value) return true; // Don't validate if either date is missing

          return new Date(value) > new Date(startDate); // Validate if endDate is greater than startDate
        },
      ),
  });
  const defaultValues = {
    id: '',
    name: '',
    startDate: '',
    endDate: '',
  };
  const formCombo = useForm<any>({
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
  } = formCombo;

  useEffect(() => {
    getKpiList({
      size: paging.size,
      page: paging.page,
      name: formSearch.getValues('name'),
    });
  }, [paging.size, paging.page]);
  const getKpiList = useCallback(({ size, page, name = '' }) => {
    dispatch(setLoading(true));
    kpiServices.list({ pageSize: size, pageIndex: page + 1, name }).then((resultList: any) => {
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
        getKpiList({
          ...paging,
          name: data.name,
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
      formCombo.reset(row);
      openModal();
    },
    [selectedRow],
  );
  const handleDelete = useCallback(
    (row) => {
      dispatch(setLoading(true));
      setAnchorEl(null);
      kpiServices
        .delete(row.id)
        .then((res: any) => {
          showToast('success', res.msg);
          dispatch(setLoading(false));
        })
        .catch((err) => {
          showToast('error', err.message);
          dispatch(setLoading(false));
        })
        .finally(() => {
          const { size, page } = paging;
          getKpiList({ size, page, name: formSearch.getValues('name') });
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
    handleSubmit((data: any) => {
      const id = data.id;
      data.startDate = moment(data.startDate).format('YYYY-MM-DD');
      data.endDate = moment(data.endDate).format('YYYY-MM-DD');
      if (selectedRow) {
        dispatch(setLoading(true));
        kpiServices
          .update(id, data)
          .then((res: any) => {
            showToast('success', res.msg);
            const { size, page } = paging;
            getKpiList({ size, page, name: formSearch.getValues('name') });
            handleClose();
            closeModal();
          })
          .catch((err) => {
            showToast('error', err.message);
            dispatch(setLoading(false));
          });
      } else {
        dispatch(setLoading(true));
        kpiServices
          .create(data)
          .then((res: any) => {
            showToast('success', res.msg);
            const { size, page } = paging;
            getKpiList({ size, page, name: formSearch.getValues('name') });
            handleClose();
            closeModal();
          })
          .catch((err) => {
            showToast('error', err.message);
            dispatch(setLoading(false));
          });
      }
    }),
    [selectedRow, paging],
  );
  const renderDialog = useMemo(() => {
    return (
      <Dialog
        open={isOpen}
        onClose={() => {
          closeModal();
        }}
        width="100%"
        title={selectedRow ? 'Edit' : 'Create'}
        content={
          <FormContainer formContext={formCombo}>
            <Box
              display={'flex'}
              justifyContent={'center'}
              flexDirection={'column'}
              gap={2}
              padding={'0 20px 20px 20px'}
              width={'550px'}
            >
              <TextFieldElement
                name="name"
                control={control}
                placeholder="Nhập tên kpi"
                label={'Tên kpi'}
                //   onKeyUp={handleKeyup}
              />
              <TextFieldElement
                name="value"
                type="number"
                control={control}
                placeholder="Giá trị"
                label={'Nhập giá trị'}
                //   onKeyUp={handleKeyup}
              />
              <DatePickerElement
                name="startDate"
                control={control}
                label={'Ngày bắt đầu'}
                format="dd-MM-yyyy"
                //   onKeyUp={handleKeyup}
              />
              <DatePickerElement
                name="endDate"
                control={control}
                label={'Ngày ngày kết thúc'}
                format="dd-MM-yyyy"
                //   onKeyUp={handleKeyup}
              />
              <Box display={'flex'} justifyContent={'flex-end'}>
                <ButtonPrimary severity="primary" padding={'9px 20px'} onClick={() => handleSave()}>
                  Lưu
                </ButtonPrimary>
              </Box>
            </Box>
          </FormContainer>
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
              name="name"
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
                formCombo.reset(defaultValues);
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
                Tên
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="left">
                Giá trị
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Ngày bắt đầu
              </StyledTableCell>{' '}
              <StyledTableCell style={{ color: 'white' }} align="right">
                Ngày kết thúc
              </StyledTableCell>{' '}
              <StyledTableCell style={{ color: 'white' }} align="right">
                Ngày tạo
              </StyledTableCell>{' '}
              <StyledTableCell style={{ color: 'white' }} align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.value}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {formatDate(row.startDate, 'dd/MM/yyyy')}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {formatDate(row.endDate, 'dd/MM/yyyy')}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {formatDate(row.createdDate, 'dd/MM/yyyy HH:mm')}
                </StyledTableCell>
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
              handleEdit({
                ...selectedRow,
                startDate: new Date(selectedRow.startDate),
                endDate: new Date(selectedRow.endDate),
              });
            }}
          >
            <EditIcon />
            <Typography variant="body2" fontWeight={500}>
              Edit kpi
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
              Delete kpi
            </Typography>
          </Box>
        </PopoverContent>
      </Popover>
      {renderDialog}
    </Box>
  );
}
