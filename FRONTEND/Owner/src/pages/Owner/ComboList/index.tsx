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
import { selectCategorys, selectServices, setLoading } from 'redux/Reducer';
import { formatDate } from 'utils/datetime';
import * as Yup from 'yup';
import { BoxHeaderSearch } from '../Styles/common';
import { comboServices } from 'services/combo.service';
import { currencyFormat, objectToFormData } from 'utils/helper';
import TextAreaElement from 'components/Form/TextAreaElement/TextAreaElement';
import AvatarUpload from 'components/Form/AvatarUpload';
import SelectMultiElement from 'components/Form/SelectMultiElement';
export default function ComboList() {
  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal } = useModal();
  const services = useSelector(selectServices);
  const categorys = useSelector(selectCategorys);

  const [image, setImage] = useState('');
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
    name: Yup.string().required(`Vui lòng nhập tên combo.`),
    discount: Yup.string().required(`Vui lòng nhập mã giảm giá.`),
    totalPrice: Yup.string().required(`Vui lòng nhập số tiền.`),
    duration: Yup.string().required(`Vui lòng nhập khoảng thời gian.`),
    description: Yup.string().required(`Vui lòng nhập mô tả.`),
    categoryId: Yup.string().required(`Vui lòng chọn loại.`),
    comboService: Yup.array().required(`Vui lòng chọn dịch vụ.`),
  });
  const defaultValues = {
    id: '',
    name: '',
    discount: 0,
    totalPrice: 0,
    duration: 0,
    image: '',
    description: '',
    comboService: null,
    categoryId: null,
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
    getCombosList({
      size: paging.size,
      page: paging.page,
      name: formSearch.getValues('name'),
    });
  }, [paging.size, paging.page]);
  const getCombosList = useCallback(({ size, page, name = '' }) => {
    dispatch(setLoading(true));
    comboServices
      .list({ pageSize: size, pageIndex: page + 1, name })
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
        getCombosList({
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
    setImage('');
  };
  const handleEdit = useCallback(
    (row) => {
      setAnchorEl(null);
      console.log(row);
      const comboServices = row.comboServices.map((comboService) => comboService.service.id);
      row = {
        ...row,
        comboService: comboServices,
      };
      formCombo.reset(row);
      setImage(row.image);
      openModal();
    },
    [selectedRow],
  );
  const handleDelete = useCallback(
    (row) => {
      dispatch(setLoading(true));
      setAnchorEl(null);
      comboServices
        .delete(row.id)
        .then((res: ListEmployeeSuccess) => {
          getCombosList({
            size: paging.size,
            page: paging.page,
            name: formSearch.getValues('name'),
          });
          showToast('success', res.msg);
          dispatch(setLoading(false));
        })
        .catch((err) => {
          showToast('error', err.message);
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

  const handleSave = useCallback(
    handleSubmit((data: any) => {
      const id = data.id;
      data = {
        ...data,
        services: data.comboService,
      };
      delete data.comboServices;
      delete data.comboService;
      data = objectToFormData(data);
      if (selectedRow) {
        dispatch(setLoading(true));
        comboServices
          .update(id, data)
          .then((res) => {
            showToast('success', res.msg);
            const { size, page } = paging;
            getCombosList({ size, page, name: formSearch.getValues('name') });
            handleClose();
            closeModal();
          })
          .catch((err) => {
            showToast('error', err.message);
            dispatch(setLoading(false));
          });
      } else {
        dispatch(setLoading(true));
        comboServices
          .create(data)
          .then((res) => {
            showToast('success', res.msg);
            const { size, page } = paging;
            getCombosList({ size, page, name: formSearch.getValues('name') });
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
              <AvatarUpload src={image} name="image" control={control} />
              <TextFieldElement
                name="name"
                control={control}
                placeholder="Nhập tên combo"
                label={'Tên combo'}
                //   onKeyUp={handleKeyup}
              />
              <SelectElement
                name="categoryId"
                label="Loại dịch vụ"
                control={control}
                options={
                  categorys &&
                  Object.keys(categorys).map((id) => ({
                    value: id,
                    label: categorys[id].name,
                  }))
                }
                placeholder="Select items"
              />
              <SelectMultiElement
                name="comboService"
                label="Dịch vụ"
                control={control}
                options={
                  services &&
                  Object.keys(services).map((id) => ({
                    value: id,
                    label: services[id].name,
                  }))
                }
                placeholder="Select items"
              />
              <TextFieldElement
                name="totalPrice"
                control={control}
                type="number"
                placeholder="Nhập giá"
                label={'Giá'}
                //   onKeyUp={handleKeyup}
              />
              <TextFieldElement
                name="duration"
                control={control}
                placeholder="Nhập khoản thời gian"
                label={'Khoảng thời gian'}
                //   onKeyUp={handleKeyup}
              />
              <TextFieldElement
                name="discount"
                control={control}
                placeholder="Nhập giảm giá"
                label={'Giảm giá'}
                //   onKeyUp={handleKeyup}
              />
              <TextAreaElement
                name="description"
                control={control}
                placeholder="Nhập mô tả"
                label={'Mô tả'}

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
                setImage('');
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
              <StyledTableCell style={{ color: 'white' }} align="center">
                Tên combo
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Mô tả
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Combo service
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center">
                Trong khoản thời gian
              </StyledTableCell>{' '}
              <StyledTableCell style={{ color: 'white' }} align="center">
                Đơn giá
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ display: 'flex', flexDirection: 'row' }}
                >
                  <img
                    style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }}
                    src={row.image}
                    alt=""
                  />
                  <Typography sx={{ ml: 1 }} variant="body2">
                    {row.name}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center">{row.description}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.comboServices?.map((item) => item?.service?.name || '').join(', ')}
                </StyledTableCell>
                <StyledTableCell align="center">{row.duration}/phút</StyledTableCell>
                <StyledTableCell align="center">
                  <span style={{ textDecoration: 'line-through' }}>
                    {currencyFormat(row.totalPrice + row.discount)}
                  </span>
                  /{currencyFormat(row.totalPrice)}
                </StyledTableCell>
                <StyledTableCell align="center">
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
              handleEdit(selectedRow);
            }}
          >
            <EditIcon />
            <Typography variant="body2" fontWeight={500}>
              Edit service
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
              Delete service
            </Typography>
          </Box>
        </PopoverContent>
      </Popover>
      {renderDialog}
    </Box>
  );
}
