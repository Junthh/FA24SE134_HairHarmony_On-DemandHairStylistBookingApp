import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  AuthKeys,
  authProps,
  loginFormDefaultValues,
  loginSchema,
} from '../Validators/AuthValidators';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormContainer, FormContent, FormItem, FormTitle } from '../styles';
import { Box, Typography } from '@mui/material';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import { ButtonPrimary } from 'pages/common/style/Button';
import * as colors from 'constants/colors';
import { showToast } from 'components/Common/Toast';
import { LoginPayLoad } from 'models/Request.model';
import { authService } from 'services/auth.service';
import { AuthConsumer } from '../AuthProvider';
import { setCredentialInfo, setLoading } from 'redux/Reducer';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_PATH, AUTH_PATH, USER_PATH } from 'configurations/paths/paths';
import { ResponseSuccessApi } from 'models/Response.model';
import { CredentialInfo, Token } from 'models/CredentialInfo.model';
import CheckboxElement from 'components/Form/CheckboxElement/CheckboxElement';
import { LOGO } from 'configurations/logo';
import { handleError } from 'utils/helper';
import { usePreviousPath } from 'hooks/usePreviousPath';
import jwtDecode from 'jwt-decode';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authContext = AuthConsumer();
  const location = useLocation();
  const previousPath = usePreviousPath();

  const formContext = useForm<any>({
    defaultValues: loginFormDefaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(loginSchema()),
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

  const handleLogin = handleSubmit(async (data: AuthKeys) => {
    dispatch(setLoading(true));
    try {
      const payload: LoginPayLoad = {
        phoneNumber: data.phoneNumber,
        password: data.password,
      };
      const res = (await authService.login(payload)) as unknown as ResponseSuccessApi;

      if (res?.success) {
        const { token } = res.data as Token;
        authContext.saveToken({ token, refreshToken: '1' });
        const info: CredentialInfo = {
          accessToken: token,
          refreshToken: '1',
          ...jwtDecode(res.data.token),
        };
        dispatch(setCredentialInfo<CredentialInfo>(info));
        console.log(previousPath);
        if (previousPath === '/auth/register') {
          navigate('/home');
        } else {
          navigate(previousPath);
        }
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      showToast('error', handleError(error.msg || error));
    }
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleSwitchToRegister = () => {
    navigate(AUTH_PATH.REGISTER);
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
            Đăng nhập
          </Typography>
        </FormTitle>

        <FormItem>
          <TextFieldElement
            name={authProps.phoneNumber.propertyName}
            control={control}
            label={'Nhập số điện thoại'}
            placeholder=""
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </FormItem>

        <Box height={1}></Box>

        <FormItem>
          <TextFieldElement
            name={authProps.password.propertyName}
            control={control}
            label={'Nhập mật khẩu'}
            type="password"
            placeholder=""
            onKeyDown={handleKeyDown}
          />
        </FormItem>

        <Box>
          <Typography sx={{ color: colors.primary1, fontWeight: '700' }}>Quên mật khẩu</Typography>
        </Box>

        <Box height={2}></Box>

        <Box height={5}></Box>

        <FormItem>
          <ButtonPrimary
            padding={'9px 0'}
            severity="primary"
            variant="outlined"
            sx={{
              textTransform: 'none',
              width: '25%',
            }}
            onClick={handleLogin}
          >
            Đăng nhập
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
          <Typography sx={{ color: colors.b2 }}>Hoặc</Typography>
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
              onClick={handleSwitchToRegister}
            >
              Đăng ký
            </Typography>
          </Box>
        </Box>
        <FormItem>
          <ButtonPrimary
            padding={'9px'}
            severity="cancel"
            variant="outlined"
            sx={{
              textTransform: 'none',
              // width: '25%',
            }}
            onClick={() => navigate(-1)}
          >
            Quay về trang chủ
          </ButtonPrimary>
        </FormItem>
      </FormContent>
    </FormContainer>
  );
}

export default React.memo(Login);
