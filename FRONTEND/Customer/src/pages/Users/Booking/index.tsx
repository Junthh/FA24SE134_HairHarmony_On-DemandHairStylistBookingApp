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
import { active } from '../../../constants/colors';
import { formatDate } from 'utils/datetime';
import { isEmpty } from 'lodash';
import { bookingServices } from 'services/booking.service';
import { currencyFormat } from 'utils/helper';
import { showToast } from 'components/Common/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, setLoading } from 'redux/Reducer';
import SkeletonTime from './components/SkeletonTime';
import { categoryService } from 'services/category.service';
const BoxBookingStyled = styled(Box)({
  padding: '40px 140px',
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
  const isLoading = useSelector(selectLoading);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  // this services will be call api to get data
  const [services, setServices] = useState({
    option1: {
      checked: false,
      service: 'Gói cắt tóc & Uốn',
      time: '120 phút • chỉ dành cho nam',
      price: 595000,
      categoryId: '195416b6-7ee4-4ed5-a429-543726d4193f',
    },
    option2: {
      checked: false,
      service: 'Gói cắt tóc & Nhộm',
      time: '120 phút • chỉ dành cho nữ',
      price: 595000,
      categoryId: '195416b6-7ee4-4ed5-a429-543726d4193f',
    },
    option3: {
      checked: false,
      service: 'Gói nhộm & duỗi',
      time: '120 phút • chỉ dành cho nữ',
      price: 595000,
      categoryId: 'de4e2294-15a2-4481-8de9-8fdf409e17f2',
    },
    option4: {
      checked: false,
      service: 'Gói Cắt, Nhộm & Tạo Kiểu',
      time: '120 phút • chỉ dành cho nữ',
      price: 595000,
      categoryId: '669fad77-d833-4752-9fc5-32353463143d',
    },
  });
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
          const resultStylist = res.data;
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
          let timeSlots = res.data.map((item) => ({
            ...item,
            startTime: item.startTime.split(':').slice(0, 2).join(':'),
            endTime: item.endTime.split(':').slice(0, 2).join(':'),
            isActive: false,
          }));
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
        .list()
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

  const handleChangeStep = (step?: number) => {
    const isAnyServiceChecked = Object.values(services).some((service) => service.checked);
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
    if (step?.toString()) {
      setCurrentStep(step);
    } else {
      if (currentStep === 3 && !step) {
        if (!stylistActive) {
          showToast('warning', 'Vui lòng chọn stylist!');
          return;
        }
        const serviceChecked = Object.entries(services)
          .filter(([, option]) => option.checked)
          .map(([id, option]) => ({ id, ...option }));
        const timeChecked = times.find((time) => time.isActive);
        const stylistChecked = stylists.find((item) => item.isActive);
        const timeSlotId = times.find((time) => time.isActive);
        const bookingDate = formatDate(new Date(date.toString()), 'yyyy-MM-dd');
        console.log('serviceChecked', serviceChecked);
        console.log('timeChecked', timeChecked);
        console.log('stylistChecked', stylistChecked);
        console.log('date time', { timeSlotId, bookingDate });

        navigate('/appointment');
      }
      setCurrentStep((prev) => (prev === 3 ? 0 : prev + 1));
    }
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
    const dataFilterFollowCategory = Object.fromEntries(
      Object.entries(services).filter(([, option]) => option.categoryId === activeCategory),
    );
    return (
      <FormControl fullWidth>
        <FormGroup>
          <Box display={'flex'} flexDirection={'column'} gap={4}>
            {Object.entries(dataFilterFollowCategory).map(([key, value]) => {
              return (
                <BoxCardService>
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      {value.service}
                    </Typography>
                    <Typography variant="subtitle1" color={colors.grey2} fontWeight={400}>
                      {value.time}
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
      <Breadscrumb
        currentStep={currentStep}
        options={[
          {
            step: 0,
            label: 'Dịch vụ',
            onClick: () => {
              handleChangeStep(0);
            },
          },
          {
            step: 1,
            label: 'Thời gian',
            onClick: () => {
              handleChangeStep(1);
            },
          },
          {
            step: 2,
            label: 'Stylist',
            onClick: () => {
              // handleChangeStep(2);
            },
          },
          {
            step: 3,
            label: 'Xác nhận',
            onClick: () => {
              // handleChangeStep(3);
            },
          },
        ]}
      />
      <Box height={20}></Box>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          {currentStep === 0 ? (
            <Box paddingRight={20}>
              <Typography variant="h2" fontWeight={700}>
                Chọn dịch vụ
              </Typography>
              <Box height={20}></Box>
              <Box display={'flex'} gap={1}>
                {categories.map((item) => {
                  return (
                    <ButtonPrimary
                      className={item.isActive ? 'active' : ''}
                      severity="cancel"
                      padding={'9px 14px'}
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
                  {times.map((item) => {
                    return (
                      <Grid item xs={3}>
                        <ButtonPrimary
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
                          {item.startTime} - {item.endTime}
                        </ButtonPrimary>
                      </Grid>
                    );
                  })}
                </Grid>
              ) : (
                <SkeletonTime />
              )}
            </Box>
          ) : currentStep === 2 ? (
            <>
              <Typography variant="h2" fontWeight={700}>
                Chọn thời gian
              </Typography>
              <Box height={25}></Box>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <BoxStylistCard
                    onClick={() => {
                      const randomIndex = Math.floor(Math.random() * stylists.length);
                      const newData = stylists.map((item, index) => ({
                        ...item,
                        isActive: index === randomIndex ? true : item.isActive || false,
                      }));
                      setStylists(newData);
                    }}
                  >
                    <IconStylist />
                    <Typography variant="h4" fontWeight={700}>
                      Chọn stylist bất kỳ
                    </Typography>
                  </BoxStylistCard>
                </Grid>
                {stylists.map((item) => {
                  return (
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
                <ICONS.IconStore /> &nbsp; &nbsp; &nbsp; &nbsp; Thanh toán tại địa điểm
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
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs={4}>
          <BoxCardBill>
            {Object.keys(services).map((key) => {
              return services[key].checked ? (
                <>
                  <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                      <Typography variant="h5" fontWeight={700}>
                        {services[key].service}
                      </Typography>
                      <Typography variant="subtitle1" color={colors.grey2} fontWeight={400}>
                        {services[key].time}
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
            <Divider variant="fullWidth"></Divider>
            <Box height={10}></Box>
            {activeTime && date ? (
              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    Ngày cắt Giờ cắt
                  </Typography>

                  <Typography variant="subtitle1" color={colors.grey2} fontWeight={400}>
                    {activeTime ? `${activeTime?.startTime} - ${activeTime?.endTime}` : ''} Ngày{' '}
                    {date ? formatDate(date.toString()) : ''}
                  </Typography>
                </Box>
              </Box>
            ) : (
              ''
            )}
            <Box height={20}></Box>
            {stylistActive ? (
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
            ) : (
              <></>
            )}
            <Divider variant="fullWidth"></Divider>
            <Box height={20}></Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography variant="h5" fontWeight={700}>
                Tổng tiền
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {currencyFormat(
                  Object.values(services)
                    .filter((option) => option.checked === true)
                    .reduce((total, option) => total + option.price, 0),
                )}{' '}
              </Typography>
            </Box>
            <Box height={120}></Box>
            <ButtonPrimary
              sx={{ width: '100%' }}
              severity="primary"
              padding={'9px 40px'}
              borderradius={9}
              onClick={() => handleChangeStep()}
            >
              {currentStep === 3 ? 'Xác nhận' : 'Tiếp tục'}
            </ButtonPrimary>
          </BoxCardBill>
        </Grid>
      </Grid>
    </BoxBookingStyled>
  );
}
