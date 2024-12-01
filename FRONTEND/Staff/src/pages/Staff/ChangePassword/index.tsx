import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import { FormContainer } from 'components/Form/FormContainer';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import * as colors from 'constants/colors';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import { ButtonPrimary } from 'pages/common/style/Button';
import styled from '@emotion/styled';
import { STAFF_PATH, USER_PATH } from 'configurations/paths/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { authService } from 'services/auth.service';
import { showToast } from 'components/Common/Toast';
import { useDispatch } from 'react-redux';
import { objectToFormData } from 'utils/helper';
import { setLoading } from 'redux/Reducer';
const ChangePasswordStyled = styled(Box)({
  marginTop: '40px',
  margin: '40px auto',
  '& img': {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
});
export default function ChangePassword() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const schemaChangePassword = Yup.object().shape<any>({
    oldPassword: Yup.string().required(`Vui lòng nhập mật khẩu cũ`),
    newPassword: Yup.string().required(`Vui lòng nhập mật khẩu mới`),
  });
  const formChangePassword = useForm<any>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schemaChangePassword),
  });
  const { control: controlChangePassword, handleSubmit: handleSubmitChangePassword } =
    formChangePassword;
  const handleSaveChangePassword = useCallback(
    handleSubmitChangePassword((data) => {
      console.log(data);
      let payload = objectToFormData(data);
      try {
        dispatch(setLoading(true));
        authService
          .changePassword(params.id, payload)
          .then((res) => {
            showToast('success', 'Cập nhật mật khẩu thành công!');
          })
          .catch((err) => {
            showToast('error', err.msg);
          })
          .finally(() => {
            dispatch(setLoading(false));
          });
      } catch (error) {
        dispatch(setLoading(false));
      }
    }),
    [],
  );
  return (
    <ChangePasswordStyled>
      <FormContainer formContext={formChangePassword}>
        <Box
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          gap={2}
          padding={'0 20px 20px 20px'}
          width={'550px'}
          margin={'0 auto'}
        >
          <Box height={50}></Box>
          <Typography
            variant="body1"
            fontWeight={700}
            color={colors.dark} // Optionally change color for active
            textAlign={'center'}
          >
            Cập nhật mật khẩu
          </Typography>
          <TextFieldElement
            name="oldPassword"
            control={controlChangePassword}
            type="password"
            placeholder="Nhập mật khẩu cũ"
            label={'Mật khẩu cũ'}
          />
          <TextFieldElement
            name="newPassword"
            control={controlChangePassword}
            type="password"
            placeholder="Nhập mật khẩu mới"
            label={'Mật khẩu mới'}
          />
        </Box>
      </FormContainer>
      <Box display={'flex'} justifyContent={'flex-end'} gap={2}>
        <ButtonPrimary
          severity="cancel"
          padding={'9px 20px'}
          onClick={() => {
            navigate(`${STAFF_PATH.PROFILE}/${params.id}`);
          }}
        >
          Cập nhật hồ sơ
        </ButtonPrimary>
        <ButtonPrimary
          severity="primary"
          padding={'9px 20px'}
          onClick={() => handleSaveChangePassword()}
        >
          Cập nhật
        </ButtonPrimary>
      </Box>
    </ChangePasswordStyled>
  );
}
