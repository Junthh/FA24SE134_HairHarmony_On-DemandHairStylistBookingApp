import styled from '@emotion/styled';
import {
  Box,
  Divider,
  Grid,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  SvgIcon,
  Stack,
  Avatar,
  Skeleton,
  Rating,
  List,
} from '@mui/material';
import Breadscrumb from 'components/Common/Breadscrumb';
import { ButtonPrimary } from 'pages/common/style/Button';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as colors from 'constants/colors';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { ReactComponent as IconStylist } from 'assets/pics/icons/icon-stylist.svg';
import { ICONS } from 'configurations/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatDate } from 'utils/datetime';
import { isEmpty } from 'lodash';
import { bookingServices } from 'services/booking.service';
import { currencyFormat } from 'utils/helper';
import { showToast } from 'components/Common/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectCredentialInfo, selectLoading, setLoading } from 'redux/Reducer';
import SkeletonTime from './components/SkeletonTime';
import { categoryService } from 'services/category.service';
import CircleIcon from '@mui/icons-material/Circle';
import { FormContainer } from 'components/Form/FormContainer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import CheckSuccess from 'components/Common/CheckSuccess';
const BoxBookingStyled = styled(Box)({
  padding: '40px 80px',
});
//
const BoxCardService = styled(Box)({
  padding: '10px 20px',
  borderRadius: 12,
  border: '1px solid black',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
const BoxCardBill = styled(Box)({
  padding: '30px 20px',
  borderRadius: 12,
  border: '1px solid black',
  marginTop: '60px',
});
//
const BoxStylistCard = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  borderRadius: '12px',
  border: '1px solid black',
  width: '200px',
  height: '240px',
  gap: 2,
  '&:hover': {
    cursor: 'pointer',
  },
  '&.active': {
    background: 'black',
    color: 'white',
  },
});
//

export default function Booking() {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs);
  const [currentStep, setCurrentStep] = useState(0);
  const [times, setTimes] = useState([]);
  const [stylists, setStylists] = useState([]);
  const dispatch = useDispatch();
  const baseSteps = [
    {
      step: 0,
      label: 'Dịch vụ',
      onClick: () => handleChangeStep(0),
    },
    {
      step: 1,
      label: 'Thời gian',
      onClick: () => handleChangeStep(1),
    },
    {
      step: 2,
      label: 'Stylist',
      onClick: () => {
        /* handleChangeStep(2); */
      },
    },
    {
      step: 3,
      label: 'Xác nhận',
      onClick: () => {
        /* handleChangeStep(3); */
      },
    },
  ];
  const optionsWithAdditionalStep = [
    ...baseSteps,
    {
      step: 4,
      label: 'Nhập thông tin',
      onClick: () => {
        /* handleChangeStep(4); */
      },
    },
  ];
  const credentialInfo = useSelector(selectCredentialInfo);
  const isLoading = useSelector(selectLoading);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  // this services will be call api to get data
  const [services, setServices] = useState<any>();
  // const [optionsStep, setOptionsStep] = useState(
  //   isEmpty(credentialInfo) ? [optionsWithAdditionalStep] : [baseSteps],
  // );
  const [optionsStep, setOptionsStep] = useState([optionsWithAdditionalStep]);
  const schemaUser = Yup.object().shape({
    customerFullName: Yup.string().required('Họ và tên không được trống'),
    customerPhoneNummber: Yup.string()
      .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng')
      .required('Số điện thoại không được trống'),
  });
  const defaultValues = {
    customerFullName: '',
    customerPhoneNummber: '',
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
  // Optional: if `credentialInfo` changes and needs dynamic handling
  // useEffect(() => {
  //   setOptionsStep(isEmpty(credentialInfo) ? [optionsWithAdditionalStep] : [baseSteps]);
  // }, [credentialInfo]);

  const getListStylistFreeTime = useCallback(() => {
    if (currentStep === 2) {
      const timeSlotId = times.filter((time) => time.isActive)[0]?.id;
      const bookingDate = formatDate(new Date(date.toString()), 'yyyy-MM-dd');
      dispatch(setLoading(true));
      bookingServices
        .listStylistFreeTime({
          timeSlotId,
          bookingDate,
        })
        .then((res) => {
          const defaultStylist = [
            {
              id: 1,
              fullName: 'Chọn stylist bất kỳ',
              level: 'None',
              isActive: false,
            },
          ];
          const resultStylist = defaultStylist.concat(res.data);

          setStylists(resultStylist);
        })
        .catch((err) => {})
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [date, currentStep, times]);

  useEffect(() => {
    getListStylistFreeTime();
  }, [getListStylistFreeTime]);
  const getListTimeSlot = useCallback(() => {
    const isActiveTime = times.some((time) => time.isActive);
    if (currentStep === 1 && !isActiveTime) {
      dispatch(setLoading(true));
      bookingServices
        .listTimeSlots()
        .then((res) => {
          let timeSlots = res.data
            .map((item) => ({
              ...item,
              startTime: item.startTime.split(':').slice(0, 2).join(':'),
              endTime: item.endTime.split(':').slice(0, 2).join(':'),
              isActive: false,
            }))
            .sort((a, b) => a.startTime.localeCompare(b.startTime));
          setTimes(timeSlots);
        })
        .catch((err) => {})
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [currentStep]);

  useEffect(() => {
    getListTimeSlot();
  }, [getListTimeSlot]);

  const getCategoryList = useCallback(() => {
    if (currentStep === 0 && isEmpty(categories)) {
      dispatch(setLoading(true));
      categoryService
        .listComboAndServices()
        .then((res) => {
          let categroriesResult = res.data.map((item, i) => {
            if (i === 0) {
              return {
                ...item,
                isActive: true,
              };
            } else {
              return {
                ...item,
                isActive: false,
              };
            }
          });
          const servicesResult = res.data
            .flatMap((item) => item.services)
            .reduce((acc, service) => {
              acc[service.id] = { ...service, checked: false };
              return acc;
            }, {});
          setServices(servicesResult);
          setCategories(categroriesResult);
        })
        .catch((err) => {})
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [currentStep]);

  useEffect(() => {
    getCategoryList();
  }, [getCategoryList]);

  const handleChangeStep = async (step?: number) => {
    if (isEmpty(step?.toString())) {
      const isAnyServiceChecked = Object.values(services).some((service: any) => service.checked);
      if (currentStep === 0 && !isAnyServiceChecked) {
        showToast('warning', 'Vui lòng chọn đầy đủ thông tin');
        return;
      }
      const isActiveTime = times.some((time) => time.isActive);
      if (currentStep === 1 && (!isActiveTime || isEmpty(date))) {
        showToast('warning', 'Vui lòng chọn đầy đủ thông tin');
        return;
      }
      const stylistActive = stylists.some((item) => item.isActive);
      if (stylists.length > 0) {
        if (currentStep === 2 && !stylistActive) {
          showToast('warning', 'Vui lòng chọn đầy đủ thông tin');
          return;
        }
      }
    }

    if (step?.toString()) {
      setCurrentStep(step);
    } else if (step === 4 || currentStep === 4) {
      const isValid = await formUser.trigger();

      // If validation fails, return errors
      if (!isValid) {
        const errors = formUser.formState.errors;
        console.error('Validation failed:', errors);
        return;
      } else {
        let payload = normalizePayload();
        // if (!isEmpty(credentialInfo)) {
        //   handleBookingWithUser(step, payload);
        // } else {
        handleBookingUserNotLogin(step, payload);
        // }
      }
    } else {
      setCurrentStep((prev) => (prev === 5 ? 0 : prev + 1));
    }
  };
  const normalizePayload = () => {
    const serviceChecked = Object.entries(services)
      .filter(([, option]: any) => option.checked)
      .map(([id, option]: any) => ({ id, ...option }));
    const timeChecked = times.find((time) => time.isActive);
    const stylist = stylists.find((item) => item.isActive);
    const timeSlotId = times.find((time) => time.isActive)?.id;
    const bookingDate = formatDate(new Date(date.toString()), 'yyyy-MM-dd');
    const combos = serviceChecked
      .filter((item) => item.categoryId === categories[0].id)
      .map((item) => ({
        id: item.id,
        totalPrice: item.price,
        discount: item.discount ?? 0,
      }));
    const servicesResult = serviceChecked
      .filter((item) => item.categoryId !== categories[0].id)
      .map((item) => ({
        id: item.id,
        price: item.price,
      }));
    let payload: any = {
      bookingDate,
      staffId: credentialInfo.Id,
      timeSlotId,
      stylistId: stylist?.id,
      combos,
      services: servicesResult,
      expertFee: stylist?.expertFee || 0,
    };
    if (stylist?.id === 1) {
      payload = {
        ...payload,
        isRandomStylist: true,
      };
      delete payload.stylistId;
    }

    // return !isEmpty(credentialInfo)
    //   ? payload
    //   : {
    //       ...payload,
    //       customerFullName: formUser.getValues('customerFullName'),
    //       customerPhoneNummber: formUser.getValues('customerPhoneNummber'),
    //     };
    return {
      ...payload,
      customerFullName: formUser.getValues('customerFullName'),
      customerPhoneNummber: formUser.getValues('customerPhoneNummber'),
    };
  };

  // const handleBookingWithUser = (step, payload) => {
  //   if (currentStep === 3 && !step) {
  //     if (!stylistActive) {
  //       showToast('warning', 'Vui lòng chọn stylist!');
  //       return;
  //     }
  //     dispatch(setLoading(true));
  //     bookingServices
  //       .bookingInit(payload)
  //       .then((res) => {
  //         showToast('success', 'Đặt lịch thành công');
  //         navigate('/appointment');
  //       })
  //       .catch((err) => {
  //         showToast('error', err.msg);
  //       })
  //       .finally(() => {
  //         dispatch(setLoading(false));
  //       });
  //     return;
  //   }
  //   setCurrentStep((prev) => (prev === 3 ? 0 : prev + 1));
  // };
  const handleBookingUserNotLogin = (step, payload) => {
    if (currentStep === 3 && !step) {
      if (!stylistActive) {
        showToast('warning', 'Vui lòng chọn stylist!');
        return;
      }
    }
    if (currentStep === 4 && !step) {
      dispatch(setLoading(true));
      bookingServices
        .bookingInit(payload)
        .then((res) => {
          showToast('success', 'Đặt lịch thành công');
          // navigate('/appointment');
          setCurrentStep(5);
        })
        .catch((err) => {
          showToast('error', err.msg);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
      return;
    }
    setCurrentStep((prev) => (prev === 5 ? 0 : prev + 1));
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServices((prev) => ({
      ...prev,
      [event.target.name]: {
        ...prev[event.target.name],
        checked: event.target.checked,
      },
    }));
  };
  const activeTime = times.find((item) => item.isActive);
  const stylistActive = stylists.find((item) => item.isActive);

  const renderStepFirst = useMemo(() => {
    const activeCategory = categories.find((item) => item.isActive)?.id;
    const dataFilterFollowCategory =
      services &&
      Object.fromEntries(
        Object.entries(services)?.filter(([, option]: any) => option.categoryId === activeCategory),
      );
    return (
      <FormControl fullWidth>
        <FormGroup>
          <Box display={'flex'} flexDirection={'column'} gap={4}>
            {dataFilterFollowCategory &&
              Object.entries(dataFilterFollowCategory).map(([key, value]: any) => {
                return (
                  <BoxCardService>
                    <Box>
                      <Typography variant="h5" fontWeight={700}>
                        {value.name}
                      </Typography>
                      <Typography variant="subtitle1" color={colors.grey2} fontWeight={400}>
                        {value.duration} /phút <CircleIcon sx={{ paddingTop: '12px', width: 10 }} />{' '}
                        {value.description}
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {currencyFormat(value.price)}
                      </Typography>
                    </Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{
                            color: '#5C4ACE',
                          }}
                          icon={
                            <SvgIcon
                              style={{
                                color: '#D9D9D9',
                              }}
                              component={AddBoxIcon}
                            />
                          }
                          checked={value.checked}
                          onChange={handleChange}
                          name={key}
                        />
                      }
                      label=""
                    />
                  </BoxCardService>
                );
              })}
          </Box>
        </FormGroup>
      </FormControl>
    );
  }, [services, categories]);
  return (
    <BoxBookingStyled>
      {' '}
      <Breadscrumb currentStep={currentStep} options={optionsStep[0]} />
      <Box height={20}></Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {currentStep === 0 ? (
            <Box paddingRight={10}>
              <Typography variant="h2" fontWeight={700}>
                Chọn dịch vụ
              </Typography>
              <Box height={20}></Box>
              <Box display={'flex'} gap={1}>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 'inherit',
                    position: 'relative',
                    overflow: 'auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '10px',
                  }}
                >
                  {categories.map((item) => {
                    return (
                      <ButtonPrimary
                        className={item.isActive ? 'active' : ''}
                        severity="cancel"
                        padding={'9px 14px'}
                        sx={{ minWidth: '180px' }}
                        borderradius={20}
                        onClick={() => {
                          setCategories((prevCate) =>
                            prevCate.map((cate) =>
                              cate.id === item.id
                                ? { ...cate, isActive: true }
                                : { ...cate, isActive: false },
                            ),
                          );
                        }}
                      >
                        {item.name}
                      </ButtonPrimary>
                    );
                  })}
                </List>
              </Box>
              <Box height={20}></Box>

              {renderStepFirst}
            </Box>
          ) : currentStep === 1 ? (
            <Box paddingRight={10}>
              <Typography variant="h2" fontWeight={700}>
                Chọn thời gian
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  sx={{
                    '& .Mui-selected': {
                      background: '#5C4ACE !important',
                      color: `${colors.white}!important`,
                      '&:hover': {
                        background: '#5C4ACE !important', // Change the background color on hover
                        color: '#fff', // Keep the text color white on hover
                      },
                    },
                  }}
                  disableHighlightToday
                  // disablePast
                  showDaysOutsideCurrentMonth
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                />
              </LocalizationProvider>
              {!isLoading ? (
                <Grid container spacing={2}>
                  <Grid item xs={2}></Grid>
                  <Grid container spacing={2} item xs={8}>
                    {times.map((item) => {
                      return (
                        <Grid item xs={4}>
                          <ButtonPrimary
                            fullWidth
                            severity="cancel"
                            padding={'16px 18px'}
                            sx={{ color: 'black !important' }}
                            border={'1px solid black'}
                            className={item.isActive ? 'active' : ''}
                            onClick={() => {
                              setTimes((prevTimes) =>
                                prevTimes.map((time) =>
                                  time.id === item.id
                                    ? { ...time, isActive: true }
                                    : { ...time, isActive: false },
                                ),
                              );
                            }}
                          >
                            {item.startTime}
                          </ButtonPrimary>
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
              ) : (
                <SkeletonTime />
              )}
            </Box>
          ) : currentStep === 2 ? (
            <>
              <Typography variant="h2" fontWeight={700}>
                Chọn stylist
              </Typography>
              <Box height={25}></Box>
              <Grid container spacing={2}>
                {stylists.map((item, index) => {
                  return index === 0 ? (
                    <Grid item xs={4}>
                      <BoxStylistCard
                        className={item.isActive ? 'active' : ''}
                        onClick={() => {
                          setStylists((prevStylist) =>
                            prevStylist.map((sty) =>
                              sty.id === item.id
                                ? { ...sty, isActive: true }
                                : { ...sty, isActive: false },
                            ),
                          );
                        }}
                      >
                        <IconStylist className={item.isActive ? 'active' : ''} />
                        <Typography variant="h4" fontWeight={700}>
                          Chọn stylist bất kỳ
                        </Typography>
                      </BoxStylistCard>
                    </Grid>
                  ) : (
                    <Grid item xs={4}>
                      <BoxStylistCard
                        className={item.isActive ? 'active' : ''}
                        onClick={() => {
                          setStylists((prevStylist) =>
                            prevStylist.map((sty) =>
                              sty.id === item.id
                                ? { ...sty, isActive: true }
                                : { ...sty, isActive: false },
                            ),
                          );
                        }}
                      >
                        <Avatar src={item.avatar} sx={{ width: 70, height: 70 }}></Avatar>
                        <Box height={20}></Box>
                        <Typography variant="h4" fontWeight={700}>
                          {item.fullName}
                        </Typography>
                        <Typography variant="body1" color={colors.grey2}>
                          {item.level}
                        </Typography>
                        <Rating precision={0.5} value={item.rating} />
                        {item.expertFee && (
                          <Box
                            display={'flex'}
                            flexDirection={'column'}
                            justifyContent={'center'}
                            alignItems={'center'}
                          >
                            <Typography variant="small1" color={colors.grey2}>
                              Phí chuyên gia
                            </Typography>
                            <Typography variant="small1" color={colors.grey2}>
                              {item.expertFee}%
                            </Typography>
                          </Box>
                        )}
                      </BoxStylistCard>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          ) : currentStep === 3 ? (
            <Box paddingRight={20}>
              <Typography variant="h2" fontWeight={700}>
                Xem lại và xác nhận
              </Typography>
              <Typography variant="body1" fontWeight={400}>
                Phương thức thanh toán
              </Typography>
              <Box height={20}></Box>
              <ButtonPrimary
                padding={'14px 24px'}
                severity="cancel"
                sx={{ color: 'black !important' }}
                border={'1px solid black'}
                fullWidth
              >
                &nbsp; &nbsp; &nbsp; &nbsp; Thanh toán tại địa điểm
              </ButtonPrimary>
              <Box height={20}></Box>
              <Typography variant="h6" fontWeight={600}>
                Thông tin quan trọng
              </Typography>
              <Box height={20}></Box>
              <Typography variant="body1">
                Trong mọi trường hợp hủy, vui lòng thông báo cho chúng tôi càng sớm càng tốt trước
                thời gian hẹn.Nếu bạn đến muộn <b>20 phút</b>, nhà tạo mẫu có thể không có đủ thời
                gian để đáp ứng đầy đủ thiết kế mà bạn mong muốn. Và xin lưu ý rằng bất kỳ ai hủy
                trong ngày hoặc thay đổi ba lần sẽ tự động bị chặn.Chúng tôi mong nhận được sự thông
                cảm của bạn và rất mong được gặp bạn.
              </Typography>
            </Box>
          ) : currentStep === 4 ? (
            <Box sx={{ width: 400, margin: '0 auto' }}>
              <Typography textAlign={'center'} variant="h2" fontWeight={700}>
                Vui lòng nhập thông tin
              </Typography>
              <Box height={20}></Box>
              <FormContainer formContext={formUser}>
                <TextFieldElement
                  name="customerFullName"
                  control={control}
                  placeholder="Nhập Họ và tên"
                  label={'Họ và tên'}
                  //   onKeyUp={handleKeyup}
                />
                <Box height={10}></Box>
                <TextFieldElement
                  name="customerPhoneNummber"
                  control={control}
                  type="number"
                  placeholder="Nhập số điện thoại"
                  label={'Số điện thoại'}
                  //   onKeyUp={handleKeyup}
                />
              </FormContainer>
            </Box>
          ) : (
            <>
              <Box paddingRight={20}>
                <h1
                  className="mea-culpa-regular"
                  style={{ cursor: 'pointer', textAlign: 'center' }}
                >
                  Chúc mừng bạn đã đặt lịch thành công!!
                </h1>
                <Box height={40}></Box>
                <CheckSuccess></CheckSuccess>
                <Box height={40}></Box>

                <ButtonPrimary
                  sx={{ width: '35%', margin: '0 auto' }}
                  severity="primary"
                  padding={'9px 40px'}
                  borderradius={9}
                  onClick={() => {
                    handleChangeStep(0);
                    setServices((prev) => {
                      const updatedServices = Object.fromEntries(
                        Object.entries(prev).map(([key, value]: any) => [
                          key,
                          {
                            ...value,
                            checked: false,
                          },
                        ]),
                      );
                      return updatedServices;
                    });
                    setDate(dayjs);
                    setTimes((prevTimes) =>
                      prevTimes.map((time) => ({ ...time, isActive: false })),
                    );
                    setStylists([]);
                    formUser.reset(defaultValues);
                  }}
                >
                  Đặt lịch thêm
                </ButtonPrimary>
              </Box>
            </>
          )}
        </Grid>
        <Grid item xs={4}>
          {services &&
          !isEmpty(Object.values(services).filter((option: any) => option.checked === true)) &&
          currentStep !== 5 ? (
            <BoxCardBill>
              {services &&
                Object.keys(services).map((key) => {
                  return services[key].checked ? (
                    <>
                      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                        <Box>
                          <Typography variant="h5" fontWeight={700}>
                            {services[key].name}
                          </Typography>
                          <Typography variant="subtitle1" color={colors.grey2} fontWeight={400}>
                            {services[key].description}
                          </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight={600}>
                          {currencyFormat(services[key].price)}
                        </Typography>
                      </Box>
                      <Box height={20}></Box>
                    </>
                  ) : null;
                })}

              {activeTime && date ? (
                <>
                  <Divider variant="fullWidth"></Divider>
                  <Box height={10}></Box>
                  <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                      <Typography variant="h5" fontWeight={700}>
                        Ngày cắt Giờ cắt
                      </Typography>

                      <Typography variant="subtitle1" color={colors.grey2} fontWeight={400}>
                        {activeTime ? `${activeTime?.startTime} giờ` : ''}, ngày{' '}
                        {date ? formatDate(date.toString(), 'dd/MM/yyyy') : ''}
                      </Typography>
                    </Box>
                  </Box>
                </>
              ) : (
                ''
              )}
              <Box height={20}></Box>
              {stylistActive ? (
                <>
                  {' '}
                  <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                      <Typography variant="h5" fontWeight={700}>
                        Thợ cắt
                      </Typography>
                      <Typography variant="subtitle1" color={colors.grey2} fontWeight={400}>
                        {`${stylistActive?.fullName} - ${stylistActive?.level}`}
                      </Typography>
                    </Box>
                    {<Rating value={stylistActive?.rating} precision={0.5} />}
                  </Box>
                  {stylistActive.expertFee && (
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                      <Typography variant="subtitle1" color={colors.grey2} fontWeight={400}>
                        Phí chuyên gia
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {stylistActive.expertFee}%
                      </Typography>
                    </Box>
                  )}
                  <Divider variant="fullWidth"></Divider>
                </>
              ) : (
                <></>
              )}
              <Box height={20}></Box>
              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant="h5" fontWeight={700}>
                  Tổng tiền
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {services &&
                    currencyFormat(
                      stylistActive?.expertFee
                        ? Number(
                            Object.values(services)
                              .filter((option: any) => option.checked === true)
                              .reduce((total, option: any): any => total + option.price, 0),
                          ) *
                            (stylistActive?.expertFee / 100) +
                            Number(
                              Object.values(services)
                                .filter((option: any) => option.checked === true)
                                .reduce((total, option: any): any => total + option.price, 0),
                            )
                        : Object.values(services)
                            .filter((option: any) => option.checked === true)
                            .reduce((total, option: any) => total + option.price, 0),
                    )}{' '}
                </Typography>
              </Box>
              <Box height={40}></Box>
              <ButtonPrimary
                sx={{ width: '100%' }}
                severity="primary"
                padding={'9px 40px'}
                borderradius={9}
                onClick={() => handleChangeStep()}
              >
                {currentStep === 3 || currentStep === 4 ? 'Xác nhận' : 'Tiếp tục'}
              </ButtonPrimary>
            </BoxCardBill>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </BoxBookingStyled>
  );
}
