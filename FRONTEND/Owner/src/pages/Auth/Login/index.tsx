import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import { showToast } from 'components/Common/Toast';
import CheckboxElement from 'components/Form/CheckboxElement/CheckboxElement';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import { LOGO } from 'configurations/logo';
import { AUTH_PATH, OWNER_PATH } from 'configurations/paths/paths';
import * as colors from 'constants/colors';
import { Token } from 'models/CredentialInfo.model';
import { LoginPayLoad } from 'models/Request.model';
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
  loginFormDefaultValues,
  loginSchema,
} from '../Validators/AuthValidators';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authContext = AuthConsumer();
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
        username: data.username,
        password: data.password,
      };
      const res = (await authService.login(payload)) as unknown as ResponseSuccessApi;

      if (res?.success) {
        const { token, refreshToken } = res.data as Token;
        authContext.saveToken({ token, refreshToken });
      }
      dispatch(setLoading(false));
      navigate(OWNER_PATH.DASHBOARD);
    } catch (error) {
      dispatch(setLoading(false));
      showToast('error', handleError(error.message || error));
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
          <LOGO.Vector.EcocupidLarge />
          <Typography
            sx={{
              fontSize: 38,
              fontWeight: 600,
            }}
          >
            Sign in
          </Typography>
        </FormTitle>

        <FormItem>
          <TextFieldElement
            name={authProps.username.propertyName}
            control={control}
            label={authProps.username.propertyLabel}
            placeholder="Your username"
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </FormItem>

        <Box height={1}></Box>

        <FormItem>
          <TextFieldElement
            name={authProps.password.propertyName}
            control={control}
            label={authProps.password.propertyLabel}
            type="password"
            placeholder="Password"
            onKeyDown={handleKeyDown}
          />
        </FormItem>

        <Box>
          <Typography sx={{ color: colors.primary1, fontWeight: '700' }}>
            Forgot password
          </Typography>
        </Box>

        <Box height={2}></Box>

        <Box>
          <CheckboxElement name="rememberMe" control={control} label="Remember me" />
        </Box>

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
            Login
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
          <Typography sx={{ color: colors.b2 }}>or</Typography>
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
            <Typography>Don’t have an account?</Typography>
            <Typography
              sx={{
                color: colors.primary,
                cursor: 'pointer',
              }}
              onClick={handleSwitchToRegister}
            >
              Register
            </Typography>
          </Box>
        </Box>
      </FormContent>
    </FormContainer>
  );
}

export default React.memo(Login);
