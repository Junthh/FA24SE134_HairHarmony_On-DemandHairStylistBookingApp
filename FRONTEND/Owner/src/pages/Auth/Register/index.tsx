import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  AuthKeys,
  authProps,
  registerFormDefaultValues,
  registerSchema,
} from '../Validators/AuthValidators';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormContainer, FormContent, FormItem, FormTitle } from '../styles';
import { Box, Typography } from '@mui/material';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import { ButtonPrimary } from 'pages/common/style/Button';
import * as colors from 'constants/colors';
import { showToast } from 'components/Common/Toast';
import { RegisterPayload } from 'models/Request.model';
import { authService } from 'services/auth.service';
import { AuthConsumer } from '../AuthProvider';
import { setLoading } from 'redux/Reducer';
import { useNavigate } from 'react-router-dom';
import { AUTH_PATH } from 'configurations/paths/paths';
import { ResponseSuccessApi } from 'models/Response.model';
import { Token } from 'models/CredentialInfo.model';
import { LOGO } from 'configurations/logo';
import { handleError } from 'utils/helper';

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
      const payload: RegisterPayload = {
        email: data.email,
        password: data.password,
      };
      const res = (await authService.register(payload)) as unknown as ResponseSuccessApi;

      if (res?.success) {
        const { accessToken, refreshToken } = res.data as Token;
        authContext.saveToken({ accessToken, refreshToken });
      }
      dispatch(setLoading(false));
      // navigate(ADMIN_PATH.ADMIN);
    } catch (error) {
      dispatch(setLoading(false));
      showToast('error', handleError(error.message || error));
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
            Register
          </Typography>
        </FormTitle>
        <FormItem>
          <TextFieldElement
            name={authProps.email.propertyName}
            control={control}
            label={authProps.email.propertyLabel}
            placeholder="Your email"
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </FormItem>
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
        <FormItem>
          <TextFieldElement
            name={authProps.confirmPassword.propertyName}
            control={control}
            label={authProps.confirmPassword.propertyLabel}
            type="password"
            placeholder="Confirm password"
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
            Register
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
            <Typography>You have an account?</Typography>
            <Typography
              sx={{
                color: colors.primary,
                cursor: 'pointer',
              }}
              onClick={handleSwitchToLogin}
            >
              Login
            </Typography>
          </Box>
        </Box>
      </FormContent>
    </FormContainer>
  );
}

export default React.memo(Register);
