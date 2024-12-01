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
import { ButtonPrimary } from 'pages/common/style/Button';
import { StyledTableCell, StyledTableRow } from 'pages/common/style/TableStyled';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectCredentialInfo, setLoading } from 'redux/Reducer';
import { formatDate } from 'utils/datetime';
import * as Yup from 'yup';
import { BoxHeaderSearch } from '../Styles/common';
import { newsServices } from 'services/news.service';
import PopoverContent from 'pages/common/PopoverContent';
import { isEmpty } from 'lodash';
import EditorElement from 'components/Form/EditorElement/EditorElement';
import AvatarUpload from 'components/Form/AvatarUpload';
import { objectToFormData } from 'utils/helper';
export default function News() {
  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal } = useModal();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const credentialInfo = useSelector(selectCredentialInfo);
  const [rows, setRows] = useState([]);
  const [paging, setPaging] = useState({
    size: 10,
    page: 0,
    total: 0,
  });
  const [image, setImage] = useState('');
  //
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const schema = Yup.object().shape<any>({});
  const formSearch = useForm<any>({
    defaultValues: {},
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { control: controlSearch, handleSubmit: handleSubmitSearch } = formSearch;

  const schemaUser = Yup.object().shape<any>({});
  const defaultValues = {
    author: credentialInfo.FullName,
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
    if (!isEmpty(credentialInfo.Id)) {
      getNewsList({
        size: paging.size,
        page: paging.page,
        staffId: credentialInfo.Id,
        title: formSearch.getValues('title'),
      });
    }
  }, [paging.size, paging.page, credentialInfo.Id]);
  const getNewsList = useCallback(({ size, page, staffId = '', title = '' }) => {
    dispatch(setLoading(true));
    newsServices
      .list({ pageSize: size, pageIndex: page + 1, staffId, title })
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
        getNewsList({
          ...paging,
          staffId: credentialInfo.Id,
          title: formSearch.getValues('title'),
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
      openModal();
      setImage(row.thumbnail);
    },
    [selectedRow],
  );
  const handleDelete = useCallback(
    (row) => {
      dispatch(setLoading(true));
      setAnchorEl(null);
      newsServices
        .delete(row.id)
        .then((res: any) => {
          showToast('success', res.msg);
          getNewsList({
            ...paging,
            staffId: credentialInfo.Id,
            title: formSearch.getValues('title'),
          });
          dispatch(setLoading(false));
        })
        .catch((err) => {
          showToast('error', err.message);
          dispatch(setLoading(false));
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

  const handleSave = useCallback(
    handleSubmit((data: any) => {
      const id = data.id;
      console.log(data);
      data = {
        ...data,
        staffId: credentialInfo.Id,
      };
      data = objectToFormData(data);
      if (selectedRow) {
        dispatch(setLoading(true));
        newsServices
          .update(id, data)
          .then((res: any) => {
            showToast('success', res.msg);
            const { size, page } = paging;
            getNewsList({ size, page, staffId: credentialInfo.Id });
            handleClose();
            closeModal();
          })
          .catch((err) => {
            showToast('error', err.message);
            dispatch(setLoading(false));
          });
      } else {
        dispatch(setLoading(true));
        newsServices
          .create(data)
          .then((res: any) => {
            showToast('success', res.msg);
            const { size, page } = paging;
            getNewsList({ size, page, staffId: credentialInfo.Id });
            handleClose();
            closeModal();
          })
          .catch((err) => {
            showToast('error', err.message);
            dispatch(setLoading(false));
          });
      }
    }),
    [selectedRow, paging, credentialInfo.Id],
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
          <FormContainer formContext={formUser}>
            <AvatarUpload src={image} name="thumbnail" control={control} />
            <Box
              display={'flex'}
              justifyContent={'center'}
              flexDirection={'column'}
              gap={2}
              padding={'0 20px 20px 20px'}
              width={'800px'}
            >
              <TextFieldElement
                name="title"
                control={control}
                placeholder="Nhập tiêu đề"
                label={'Tiêu đề'}
                //   onKeyUp={handleKeyup}
              />
              <EditorElement
                placeholder="Description"
                label="Description"
                name="description"
                control={control}
              ></EditorElement>

              <TextFieldElement
                name="author"
                control={control}
                placeholder="Nhập Author"
                label={'Author'}
                disabled
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
              name="title"
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
                setImage('');
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
                Tiêu đề
              </StyledTableCell>
              {/* <StyledTableCell style={{ color: 'white' }} align="right">
                Mô tả
              </StyledTableCell> */}
              <StyledTableCell style={{ color: 'white' }} align="right">
                Tác giả
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Ngày tạo
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right">
                Ngày cập nhật
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={row.index}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                >
                  <img
                    style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }}
                    src={row.thumbnail}
                    alt=""
                  />{' '}
                  {row.title}
                </StyledTableCell>
                {/* <StyledTableCell align="right">{row.description}</StyledTableCell> */}
                <StyledTableCell align="right">{row.author}</StyledTableCell>
                <StyledTableCell align="right">
                  {formatDate(row.createdDate, 'dd/MM/yyyy')}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {formatDate(row.updatedDate, 'dd/MM/yyyy')}
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
              handleEdit(selectedRow);
            }}
          >
            <EditIcon />
            <Typography variant="body2" fontWeight={500}>
              Edit news
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
              Delete news
            </Typography>
          </Box>
        </PopoverContent>
      </Popover>
      {renderDialog}
    </Box>
  );
}
