import { yupResolver } from '@hookform/resolvers/yup';
import { Box, formControlClasses, Grid, Typography } from '@mui/material';
import { showToast } from 'components/Common/Toast';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import { ADMIN_PATH, AUTH_PATH, USER_PATH } from 'configurations/paths/paths';
import * as colors from 'constants/colors';
import { Token } from 'models/CredentialInfo.model';
import { RegisterPayload } from 'models/Request.model';
import { ResponseSuccessApi } from 'models/Response.model';
import { ButtonPrimary } from 'pages/common/style/Button';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading } from 'redux/Reducer';
import { authService } from 'services/auth.service';
import { handleError } from 'utils/helper';
import { AuthConsumer } from '../AuthProvider';
import { FormContainer, FormContent, FormItem, FormTitle } from '../styles';
import {
  AuthKeys,
  authProps,
  registerFormDefaultValues,
  registerSchema,
} from '../Validators/AuthValidators';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authContext = AuthConsumer();
  const formContext = useForm<any>({
    defaultValues: registerFormDefaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(registerSchema()),
  });
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = formContext;

  const handleRegister = handleSubmit(async (data: AuthKeys) => {
    dispatch(setLoading(true));
    try {
      await authService.checkVerificationCode(
        formContext.getValues('phoneNumber'),
        formContext.getValues('code'),
      );

      const payload: RegisterPayload = {
        phoneNumber: data.phoneNumber,
        fullName: data.fullName,
        password: data.password,
      };
      const formData = new FormData();
      formData.append('phoneNumber', payload.phoneNumber);
      formData.append('fullName', payload.fullName);
      formData.append('password', payload.password);
      const res = (await authService.register(formData)) as unknown as ResponseSuccessApi;

      // if (res?.success) {
      //   const { token, refreshToken } = res.data as Token;
      //   authContext.saveToken({ token, refreshToken });
      // }
      showToast('success', 'Tạo tài khoản thành công');
      dispatch(setLoading(false));
      navigate(AUTH_PATH.LOGIN);
    } catch (error) {
      dispatch(setLoading(false));
      showToast('error', handleError(error.msg || error));
    }
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  const handleSwitchToLogin = () => {
    navigate(AUTH_PATH.LOGIN);
  };

  const handleSendVerificationCode = async () => {
    try {
      if (!formContext.getValues('phoneNumber')) {
        formContext.trigger('phoneNumber');
        return;
      }
      await authService.sendVerificationCode(formContext.getValues('phoneNumber'));
      showToast('success', 'Gửi mã xác thực thành công');
    } catch (error) {
      showToast('error', 'Gửi mã xác thực thất bại vui lòng thử lại');
    }
  };

  return (
    <FormContainer>
      <FormContent>
        <FormTitle>
          <h1
            className="mea-culpa-regular"
            onClick={() => navigate(`${USER_PATH.HOME}`)}
            style={{ cursor: 'pointer' }}
          >
            Hair Hamorny
          </h1>
          <Typography
            sx={{
              fontSize: 38,
              fontWeight: 600,
            }}
          >
            Đăng ký
          </Typography>
        </FormTitle>
        <FormItem>
          <TextFieldElement
            name={authProps.fullName.propertyName}
            control={control}
            label="Nhập họ tên"
            placeholder=""
            onKeyDown={handleKeyDown}
          />
        </FormItem>
        <FormItem>
          <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Grid item xs={8}>
              <TextFieldElement
                name={authProps.phoneNumber.propertyName}
                control={control}
                label="Nhập số điện thoại"
                placeholder=""
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </Grid>
            <Grid item xs={4}>
              <ButtonPrimary
                padding={'16px 0'}
                severity="primary"
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  width: '100%',
                }}
                onClick={handleSendVerificationCode}
              >
                Gửi mã
              </ButtonPrimary>
            </Grid>
          </Grid>
        </FormItem>
        <FormItem>
          <TextFieldElement
            name={authProps.code.propertyName}
            control={control}
            label="Nhập mã xác thực"
            placeholder=""
            onKeyDown={handleKeyDown}
          />
        </FormItem>
        <FormItem>
          <TextFieldElement
            name={authProps.password.propertyName}
            control={control}
            label="Nhập mật khẩu"
            type="password"
            placeholder=""
            onKeyDown={handleKeyDown}
          />
        </FormItem>
        <FormItem>
          <TextFieldElement
            name={authProps.confirmPassword.propertyName}
            control={control}
            label="Nhập lại mật khẩu"
            type="password"
            placeholder=""
            onKeyDown={handleKeyDown}
          />
        </FormItem>
        <FormItem>
          <ButtonPrimary
            padding={'16px 0'}
            severity="primary"
            variant="outlined"
            sx={{
              textTransform: 'none',
              width: '100%',
            }}
            onClick={handleRegister}
          >
            Đăng ký
          </ButtonPrimary>
        </FormItem>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            columnGap: '10px',
          }}
        >
          <Box
            sx={{
              width: '45%',
              height: '1px',
              border: `1px solid ${colors.b2}`,
            }}
          ></Box>
          <Typography sx={{ color: colors.b2 }}>hoặc</Typography>
          <Box
            sx={{
              width: '45%',
              height: '1px',
              border: `1px solid ${colors.b2}`,
            }}
          ></Box>
        </Box>

        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '10px',
            }}
          >
            <Typography>Bạn chưa có tài khoản?</Typography>
            <Typography
              sx={{
                color: colors.primary,
                cursor: 'pointer',
              }}
              onClick={handleSwitchToLogin}
            >
              Đăng nhập
            </Typography>
          </Box>
        </Box>
      </FormContent>
    </FormContainer>
  );
}

export default React.memo(Register);
