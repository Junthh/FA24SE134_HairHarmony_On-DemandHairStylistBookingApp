import styled from '@emotion/styled';
import {
  Avatar,
  Box,
  Divider,
  Grid,
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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as colors from 'constants/colors';
import { ICONS } from 'configurations/icons';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BoxHeaderSearch } from '../Styles/common';
import { ButtonPrimary } from 'pages/common/style/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import useModal from 'hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import { FormContainer } from 'components/Form/FormContainer';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import DatePickerElement from 'components/Form/DatepickerElement';
import SelectElement from 'components/Form/SelectElement/SelectElement';
import { Dialog } from 'components/Common/Dialog';
import { selectCredentialInfo, selectWorkship, setLoading } from 'redux/Reducer';
import { formatDate } from 'utils/datetime';
import { workshipService } from 'services/workship.service';
import { showToast } from 'components/Common/Toast';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PopoverContent from 'pages/common/PopoverContent';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import SelectMultiElement from 'components/Form/SelectMultiElement';
import { handleError } from 'utils/helper';
const RegisterWorkScheduleStyled = styled(Box)({
  padding: '10px 20px',
  '& .card-total': {
    borderRadius: 20,
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    '&_content': {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
    },
  },
  '& .card-analyst': {
    // boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    minHeight: 50,
    width: '100%',
    borderRadius: 20,
  },
});
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
export default function RegisterWorkSchedule() {
  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedRow, setSelectedRow] = useState(null);
  const workships = useSelector(selectWorkship);
  const credentialInfo = useSelector(selectCredentialInfo);

  const [anchorEl, setAnchorEl] = useState(null);
  const [rows, setRows] = useState([]);
  const [paging, setPaging] = useState({
    size: 10,
    page: 0,
    total: 0,
  });
  //
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  //
  const schemaUser = Yup.object().shape<any>({});
  const defaultValues = {
    id: '',
    registerDate: new Date(),
    workshipIds: '',
    stylistId: '',
  };
  const formRegisterWorkship = useForm<any>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schemaUser),
  });
  const schema = Yup.object().shape<any>({});
  const formSearch = useForm<any>({
    defaultValues: {},
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { handleSubmit: handleSubmitSearch, control: controlSearch } = formSearch;
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
  } = formRegisterWorkship;

  const getWorkshipStylistList = useCallback(
    ({ size, page, stylistId, registerDate }: any) => {
      dispatch(setLoading(true));
      workshipService
        .listWorkshipStylist({ pageSize: size, pageIndex: page + 1, stylistId, registerDate })
        .then((resultList: any) => {
          setPaging((prev) => ({
            ...prev,
            total: resultList.paging.total,
          }));
          setRows(resultList.data);
          dispatch(setLoading(false));
        });
    },
    [paging.size, paging.page, credentialInfo.Id],
  );

  useEffect(() => {
    if (credentialInfo.Id) {
      getWorkshipStylistList({
        size: paging.size,
        page: paging.page,
        stylistId: credentialInfo.Id,
        registerDate: formSearch.getValues('registerDate'),
      });
    }
  }, [getWorkshipStylistList]);

  const handleSave = useCallback(
    handleSubmit((data: any) => {
      data = {
        ...data,
        registerDate: formatDate(data.registerDate, 'yyyy-MM-dd'),
        stylistId: credentialInfo.Id,
      };
      if (selectedRow) {
        data.workshipId = data.workshipIds
        dispatch(setLoading(true));
        workshipService
          .updateWorkshipStylist(data.id, data)
          .then((res: any) => {
            showToast('success', res.msg);
            const { size, page } = paging;
            getWorkshipStylistList({ size, page, stylistId: credentialInfo.Id });
            handleClose();
            closeModal();
          })
          .catch((err) => {
            showToast('error', err.msg);
            dispatch(setLoading(false));
          });
      } else {
        dispatch(setLoading(true));
        workshipService
          .createWorkshipStylist(data)
          .then((res: any) => {
            showToast('success', res.msg);
            const { size, page } = paging;
            getWorkshipStylistList({ size, page, stylistId: credentialInfo.Id });
            handleClose();
            closeModal();
          })
          .catch((err) => {
            showToast('error', err.msg);
            dispatch(setLoading(false));
          });
      }
    }),
    [selectedRow, paging],
  );
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };
  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row); // Store the selected row data for popover content
  };
  const handleEdit = useCallback(
    (row) => {
      setAnchorEl(null);
      row = {
        ...row,
        registerDate: new Date(row.registerDate),
      };
      formRegisterWorkship.reset(row);
      openModal();
    },
    [selectedRow],
  );
  const handleDelete = useCallback(
    (row) => {
      dispatch(setLoading(true));
      setAnchorEl(null);
      workshipService
        .deleteWorkshipStylist(row.id)
        .then((res: any) => {
          showToast('success', res.msg);
          dispatch(setLoading(false));
        })
        .catch((err) => {
          showToast('error', handleError(err.msg || err));
          dispatch(setLoading(false));
        })
        .finally(() => {
          const { size, page } = paging;
          getWorkshipStylistList({ size, page, stylistId: credentialInfo.Id });
        });
    },
    [selectedRow, paging],
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
  const handleSearch = useCallback(
    handleSubmitSearch((data: any) => {
      if (data) {
        getWorkshipStylistList({
          ...paging,
          stylistId: credentialInfo.Id,
          registerDate: formatDate(data.registerDate, 'yyyy-MM-dd'),
        });
      }
    }),
    [paging],
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
          <FormContainer formContext={formRegisterWorkship}>
            <Box
              display={'flex'}
              justifyContent={'center'}
              flexDirection={'column'}
              gap={2}
              padding={'0 20px 20px 20px'}
              width={'550px'}
            >
              <DatePickerElement
                name="registerDate"
                control={control}
                label={'Ngày đăng ký'}
                format="dd-MM-yyyy"
                //   onKeyUp={handleKeyup}
              />
              {selectedRow ? (
                <SelectElement
                  name="workshipIds"
                  label="Ca làm việc"
                  control={control}
                  options={
                    workships &&
                    Object.keys(workships).map((id) => ({
                      value: id,
                      label: `${workships[id].startTime} - ${workships[id].endTime}`,
                    }))
                  }
                  placeholder="Chọn ca làm việc"
                />
              ) : (
                <SelectMultiElement
                  name="workshipIds"
                  label="Ca làm việc"
                  control={control}
                  options={
                    (workships &&
                      Object.keys(workships).map((id) => ({
                        value: id,
                        label: `${workships[id].startTime} - ${workships[id].endTime}`,
                      }))) ||
                    []
                  }
                  placeholder="Chọn ca làm việc"
                />
              )}

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
  }, [isOpen, workships, selectedRow]);
  return (
    <RegisterWorkScheduleStyled>
      <BoxHeaderSearch>
        <Box className="search-left">
          <FormContainer formContext={formSearch}>
            <Box width={'100%'} display={'flex'} gap={2}>
              <DatePickerElement
                disableHighlightToday
                name="registerDate"
                label={''}
                control={controlSearch}
              />
              <ButtonPrimary severity="primary" padding={'7px 14px'} onClick={() => handleSearch()}>
                <ICONS.IconFilter width={24} height={24}></ICONS.IconFilter>
              </ButtonPrimary>
            </Box>
          </FormContainer>
        </Box>
        <Box className="search-right">
          {/* <ButtonPrimary
            severity="primary"
            padding={'9px 14px'}
            onClick={() => {
              setSelectedRow(null);
              formRegisterWorkship.reset(defaultValues);
              openModal();
            }}
          >
            <ControlPointIcon />
            &nbsp; Đăng ký lịch làm việc
          </ButtonPrimary> */}
        </Box>
      </BoxHeaderSearch>
      <Box height={20}></Box>
      <Grid container spacing={2}>
        {/* <Grid item xs={4}>
          <Box className="card-analyst">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
            <Typography variant="body1" fontWeight={'700'} fontFamily={'Lato !important'}>
              08:00 &nbsp;&nbsp; <span style={{ fontWeight: 400 }}>Take attendance</span>
            </Typography>
            <Typography variant="body1" fontWeight={'700'} fontFamily={'Lato !important'}>
              08:00 &nbsp;&nbsp; <span style={{ fontWeight: 400 }}>Discuss project with team</span>
            </Typography>
            <Box height={20}></Box>
            <Box display={'flex'} gap={2} justifyContent={'space-between'}>
              <ButtonPrimary severity="primary" padding={'9px 14px'} onClick={() => {}}>
                <DoneAllIcon /> Check in
              </ButtonPrimary>
              <ButtonPrimary severity="cancel" padding={'9px 14px'} onClick={() => {}}>
                Check out <ExitToAppIcon />
              </ButtonPrimary>
            </Box>
          </Box>
        </Grid> */}
        <Grid item xs={12}>
          <Box className="card-analyst">
            {/* <Typography variant="h2" fontWeight={'700'}>
              Ca làm việc đã đăng ký
            </Typography> */}
            {/* <Box height={20}></Box> */}
            <Divider variant="fullWidth"></Divider>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead style={{ background: '#2D3748' }}>
                  <TableRow>
                    <StyledTableCell style={{ color: 'white' }} align="left">
                      Ngày đăng ký
                    </StyledTableCell>
                    <StyledTableCell style={{ color: 'white' }} align="center">
                      Ca làm
                    </StyledTableCell>
                    <StyledTableCell style={{ color: 'white' }} align="center">
                      Ngày tạo
                    </StyledTableCell>
                    <StyledTableCell style={{ color: 'white' }} align="center">
                      Ngày cập nhật
                    </StyledTableCell>
                    {/* <StyledTableCell
                      style={{
                        color: 'white',
                        position: 'sticky',
                        right: 0,
                        backgroundColor: '#2d3748',
                        zIndex: 1,
                      }}
                      align="left"
                    ></StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="left">
                        {formatDate(row.registerDate, 'dd/MM/yyyy')}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {workships[row.workshipId]?.startTime} -{' '}
                        {workships[row.workshipId]?.endTime}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {formatDate(row.createdDate, 'dd/MM/yyyy HH:mm')}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {formatDate(row.updatedDate, 'dd/MM/yyyy HH:mm')}
                      </StyledTableCell>
                      {/* <StyledTableCell
                        style={{
                          color: 'white',
                          position: 'sticky',
                          right: 0,
                          zIndex: 1,
                        }}
                        align="center"
                      >
                        {!row.isTimekeeping ? (
                          <IconButton
                            onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                              handleClick(event, row)
                            }
                          >
                            <ICONS.IconThreeDot />
                          </IconButton>
                        ) : null}
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
                    Chỉnh sửa ca làm
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
                    Xóa ca làm
                  </Typography>
                </Box>
              </PopoverContent>
            </Popover>
          </Box>
        </Grid>
      </Grid>
      {renderDialog}
    </RegisterWorkScheduleStyled>
  );
}
