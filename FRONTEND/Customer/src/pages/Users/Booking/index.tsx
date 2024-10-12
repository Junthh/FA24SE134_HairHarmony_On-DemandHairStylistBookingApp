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
} from '@mui/material';
import Breadscrumb from 'components/Common/Breadscrumb';
import { ButtonPrimary } from 'pages/common/style/Button';
import React, { useState } from 'react';
import * as colors from 'constants/colors';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { ReactComponent as IconStylist } from 'assets/pics/icons/icon-stylist.svg';
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
  width: '250px',
  height: '275px',
  gap: 50,
});
//
export default function Booking() {
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const handleChangeStep = () => {
    setCurrentStep((prev) => (prev === 3 ? 0 : prev + 1));
  };

  // this services will be call api to get data
  const [services, setServices] = useState({
    option1: {
      checked: false,
      service: 'Gói cắt tóc & Uốn',
      time: '120 phút • chỉ dành cho nam',
      price: 595000,
    },
    option2: {
      checked: false,
      service: 'Gói cắt tóc & Nhộm',
      time: '120 phút • chỉ dành cho nữ',
      price: 595000,
    },
    option3: {
      checked: false,
      service: 'Gói nhộm & duỗi',
      time: '120 phút • chỉ dành cho nữ',
      price: 595000,
    },
    option4: {
      checked: false,
      service: 'Gói Cắt, Nhộm & Tạo Kiểu',
      time: '120 phút • chỉ dành cho nữ',
      price: 595000,
    },
  });
  const { option1, option2, option3, option4 } = services;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServices((prev) => ({
      ...prev,
      [event.target.name]: {
        ...prev[event.target.name],
        checked: event.target.checked,
      },
    }));
  };
  return (
    <BoxBookingStyled>
      {' '}
      <Breadscrumb
        currentStep={currentStep}
        options={[
          {
            step: 0,
            label: 'Dịch vụ',
          },
          {
            step: 1,
            label: 'Stylist',
          },
          {
            step: 2,
            label: 'Thời gian',
          },
          {
            step: 3,
            label: 'Xác nhận',
          },
        ]}
      />
      <Box height={20}></Box>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          {currentStep === 0 ? (
            <Box>
              <Typography variant="h2" fontWeight={700}>
                Chọn dịch vụ
              </Typography>
              <Box height={20}></Box>
              <Box display={'flex'} gap={1}>
                <ButtonPrimary severity="primary" padding={'9px 14px'} borderradius={20}>
                  Combo
                </ButtonPrimary>
                <ButtonPrimary severity="cancel" padding={'9px 14px'} borderradius={20}>
                  Cắt tóc
                </ButtonPrimary>
                <ButtonPrimary severity="cancel" padding={'9px 14px'} borderradius={20}>
                  Nhộm tóc
                </ButtonPrimary>
                <ButtonPrimary severity="cancel" padding={'9px 14px'} borderradius={20}>
                  Uốn tóc
                </ButtonPrimary>
                <ButtonPrimary severity="cancel" padding={'9px 14px'} borderradius={20}>
                  Duỗi tóc
                </ButtonPrimary>
              </Box>
              <Box height={20}></Box>

              <FormControl fullWidth>
                <FormGroup>
                  <Box display={'flex'} flexDirection={'column'} gap={2}>
                    <BoxCardService>
                      <Box>
                        <Typography variant="h5" fontWeight={700}>
                          Gói cắt tóc & Uốn
                        </Typography>
                        <Typography variant="subtitle1" color={colors.grey2} fontWeight={400}>
                          120 phút • chỉ dành cho nam
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          595.000 VND
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
                            checked={option1.checked}
                            onChange={handleChange}
                            name="option1"
                          />
                        }
                        label=""
                      />
                    </BoxCardService>
                    <BoxCardService>
                      <Box>
                        <Typography variant="h5" fontWeight={700}>
                          Gói cắt tóc & Nhộm
                        </Typography>
                        <Typography variant="subtitle1" color={colors.grey2} fontWeight={400}>
                          120 phút • chỉ dành cho nữ
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          595.000 VND
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
                            checked={option2.checked}
                            onChange={handleChange}
                            name="option2"
                          />
                        }
                        label=""
                      />
                    </BoxCardService>
                    <BoxCardService>
                      <Box>
                        <Typography variant="h5" fontWeight={700}>
                          Gói nhộm & duỗi
                        </Typography>
                        <Typography variant="subtitle1" color={colors.grey2} fontWeight={400}>
                          120 phút • chỉ dành cho nữ
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          595.000 VND
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
                            checked={option3.checked}
                            onChange={handleChange}
                            name="option3"
                          />
                        }
                        label=""
                      />
                    </BoxCardService>
                    <BoxCardService>
                      <Box>
                        <Typography variant="h5" fontWeight={700}>
                          Gói Cắt, Nhộm & Tạo Kiểu
                        </Typography>
                        <Typography variant="subtitle1" color={colors.grey2} fontWeight={400}>
                          120 phút • chỉ dành cho nam
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          595.000 VND
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
                            checked={option4.checked}
                            onChange={handleChange}
                            name="option4"
                          />
                        }
                        label=""
                      />
                    </BoxCardService>
                  </Box>
                </FormGroup>
              </FormControl>
            </Box>
          ) : currentStep === 1 ? (
            <Box>
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
                  showDaysOutsideCurrentMonth
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </LocalizationProvider>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <ButtonPrimary
                    severity="cancel"
                    padding={'16px 18px'}
                    sx={{ color: 'black !important' }}
                    border={'1px solid black'}
                    //   onClick={() => navigate(`${STATE.CREATE}`)}
                  >
                    07:00
                  </ButtonPrimary>
                </Grid>
                <Grid item xs={2}>
                  <ButtonPrimary
                    severity="cancel"
                    padding={'16px 18px'}
                    sx={{ color: 'black !important' }}
                    border={'1px solid black'}
                    //   onClick={() => navigate(`${STATE.CREATE}`)}
                  >
                    07:00
                  </ButtonPrimary>
                </Grid>
                <Grid item xs={2}>
                  <ButtonPrimary
                    severity="cancel"
                    padding={'16px 18px'}
                    sx={{ color: 'black !important' }}
                    border={'1px solid black'}
                    //   onClick={() => navigate(`${STATE.CREATE}`)}
                  >
                    07:00
                  </ButtonPrimary>
                </Grid>
                <Grid item xs={2}>
                  <ButtonPrimary
                    severity="cancel"
                    padding={'16px 18px'}
                    sx={{ color: 'black !important' }}
                    border={'1px solid black'}
                    //   onClick={() => navigate(`${STATE.CREATE}`)}
                  >
                    07:00
                  </ButtonPrimary>
                </Grid>
                <Grid item xs={2}>
                  <ButtonPrimary
                    severity="cancel"
                    padding={'16px 18px'}
                    sx={{ color: 'black !important' }}
                    border={'1px solid black'}
                    //   onClick={() => navigate(`${STATE.CREATE}`)}
                  >
                    07:00
                  </ButtonPrimary>
                </Grid>
                <Grid item xs={2}>
                  <ButtonPrimary
                    severity="cancel"
                    padding={'16px 18px'}
                    sx={{ color: 'black !important' }}
                    border={'1px solid black'}
                    //   onClick={() => navigate(`${STATE.CREATE}`)}
                  >
                    07:00
                  </ButtonPrimary>
                </Grid>
                <Grid item xs={2}>
                  <ButtonPrimary
                    severity="cancel"
                    padding={'16px 18px'}
                    sx={{ color: 'black !important' }}
                    border={'1px solid black'}
                    //   onClick={() => navigate(`${STATE.CREATE}`)}
                  >
                    07:00
                  </ButtonPrimary>
                </Grid>
              </Grid>
            </Box>
          ) : currentStep === 2 ? (
            <>
              <Typography variant="h2" fontWeight={700}>
                Chọn thời gian
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <BoxStylistCard>
                    <IconStylist />
                    <Typography variant="h4" fontWeight={700}>
                      Chọn stylist bất kỳ
                    </Typography>
                  </BoxStylistCard>
                </Grid>
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={5}>
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
                      {services[key].price} VND
                    </Typography>
                  </Box>
                  <Box height={20}></Box>
                </>
              ) : null;
            })}
            <Box height={60}></Box>
            <Divider variant="fullWidth"></Divider>
            <Box height={20}></Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography variant="h5" fontWeight={700}>
                Tổng tiền
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {Object.values(services)
                  .filter((option) => option.checked === true) // Filter only checked options
                  .reduce((total, option) => total + option.price, 0)}{' '}
                VND
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
              Tiếp tục
            </ButtonPrimary>
          </BoxCardBill>
        </Grid>
      </Grid>
    </BoxBookingStyled>
  );
}
