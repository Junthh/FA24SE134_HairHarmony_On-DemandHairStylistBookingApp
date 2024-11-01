import styled from '@emotion/styled';
import { Avatar, Box, Divider, Grid, Typography } from '@mui/material';
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
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    height: 500,
    width: '100%',
    padding: '20px 40px',
    borderRadius: 20,
  },
});
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
  const schemaUser = Yup.object().shape<any>({});
  const defaultValues = {};
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

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };
  const handleSave = useCallback(
    handleSubmit((data: any) => {
      if (selectedRow) {
        dispatch(setLoading(true));
        // workshipService
        //   .update(data.id, data)
        //   .then((res) => {
        //     showToast('success', res.msg);
        //     const { size, page } = paging;
        //     getCombosList({ size, page, name: formSearch.getValues('name') });
        //     handleClose();
        //     closeModal();
        //   })
        //   .catch((err) => {
        //     showToast('error', err.message);
        //     dispatch(setLoading(false));
        //   });
      } else {
        dispatch(setLoading(true));
        data = {
          ...data,
          registerDate: formatDate(data.registerDate, 'yyyy-MM-dd'),
          stylistId: credentialInfo.Id,
        };
        workshipService
          .createWorkshipStylist(data)
          .then((res: any) => {
            showToast('success', res.msg);
            const { size, page } = paging;
            getWorkshipStylistList({ size, page });
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
  console.log(credentialInfo);

  useEffect(() => {
    getWorkshipStylistList({
      size: paging.size,
      page: paging.page,
    });
  }, [paging.size, paging.page]);
  const getWorkshipStylistList = useCallback(({ size, page, name = '' }) => {
    dispatch(setLoading(true));
    workshipService
      .listWorkshipStylist({ pageSize: size, pageIndex: page + 1 })
      .then((resultList: any) => {
        setPaging((prev) => ({
          ...prev,
          total: resultList.paging.total,
        }));
        setRows(resultList.data);
        dispatch(setLoading(false));
      });
  }, []);

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
              <DatePickerElement
                name="registerDate"
                control={control}
                label={'Ngày đăng ký'}
                //   onKeyUp={handleKeyup}
              />
              <SelectElement
                name="workshipId"
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
    <RegisterWorkScheduleStyled>
      {/* <Box className="card-total">
        <Box className="card-total_content">
          <Avatar sx={{ background: '#285d9a48', width: 80, height: 80 }}>
            <ICONS.IconStylistUser />
          </Avatar>
          <Box>
            <Typography variant="h1" fontWeight={700} fontFamily={'Lato !important'}>
              1,234
            </Typography>
            <Typography variant="label1" fontWeight={600} color={colors.grey2}>
              Total Booking
            </Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem></Divider>
        <Box className="card-total_content">
          <Avatar sx={{ width: 80, height: 80 }}>
            <ICONS.IconCombo />
          </Avatar>
          <Box>
            <Typography variant="h1" fontWeight={700} fontFamily={'Lato !important'}>
              300
            </Typography>
            <Typography variant="label1" fontWeight={600} color={colors.grey2}>
              Số lượt dùng combo
            </Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem></Divider>
        <Box className="card-total_content">
          <Avatar sx={{ width: 80, height: 80 }}>
            <ICONS.IconCalendar />
          </Avatar>
          <Box>
            <Typography variant="h1" fontWeight={700} fontFamily={'Lato !important'}>
              45
            </Typography>
            <Typography variant="label1" fontWeight={600} color={colors.grey2}>
              Số lượt dùng service
            </Typography>
          </Box>
        </Box>
      </Box> */}
      <BoxHeaderSearch>
        <Box className="search-left">
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
            &nbsp; Đăng ký lịch làm việc
          </ButtonPrimary>
        </Box>
      </BoxHeaderSearch>
      <Box height={20}></Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
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
        </Grid>
        <Grid item xs={8}>
          <Box className="card-analyst">
            <Typography variant="h2" fontWeight={'700'}>
              Ca làm việc đã đăng ký
            </Typography>
            <Divider variant="fullWidth"></Divider>
          </Box>
        </Grid>
      </Grid>
      {renderDialog}
    </RegisterWorkScheduleStyled>
  );
}
