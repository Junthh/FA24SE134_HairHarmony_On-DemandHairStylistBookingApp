import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import { FormContainer } from 'components/Form/FormContainer';
import React, { useEffect, useMemo, useState } from 'react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { authService } from 'services/auth.service';
import * as Yup from 'yup';
import AvatarUpload from 'components/Form/AvatarUpload';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import { ButtonPrimary } from 'pages/common/style/Button';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import * as colors from 'constants/colors';
import { STAFF_PATH, USER_PATH } from 'configurations/paths/paths';
import { showToast } from 'components/Common/Toast';
import { objectToFormData } from '../../../utils/helper';
const ProfileStyled = styled(Box)({
  marginTop: '40px',
  margin: '40px auto',
  '& img': {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
});
export default function Profile() {
  const params = useParams();
  const [profile, setProfile] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const schemaUser = Yup.object().shape<any>({});
  const defaultValues = {
    id: '',
    loyaltyPoints: 0,
    username: '',
    fullName: '',
    phoneNumber: '',
    status: '',
    avatar: '',
  };
  const formProfile = useForm<any>({
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
  } = formProfile;
  const getProfileById = useCallback(() => {
    try {
      dispatch(setLoading(true));
      authService
        .findById(params.id)
        .then((res) => {
          formProfile.reset(res.data);
          setProfile(res.data);
        })
        .catch((err) => {})
        .finally(() => {
          dispatch(setLoading(false));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  }, [params.id]);
  useEffect(() => {
    getProfileById();
  }, []);
  const handleSaveProfile = useCallback(
    handleSubmit((data: any) => {
      let payload = objectToFormData({ ...data, salary: data?.salary || 0 });
      try {
        dispatch(setLoading(true));
        authService
          .update(params.id, payload)
          .then((res) => {
            showToast('success', 'Cập nhật hồ sơ thành công!');
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
    [params.id],
  );

  const renderForm = useMemo(() => {
    return (
      <FormContainer formContext={formProfile}>
        <Box
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          gap={2}
          padding={'0 20px 20px 20px'}
          width={'550px'}
          margin={'0 auto'}
        >
          <AvatarUpload src={profile?.avatar} name="avatar" control={control} />
          <TextFieldElement
            name="username"
            control={control}
            placeholder="Nhập username"
            label={'Username'}
            disabled
          />
          <TextFieldElement
            name="fullName"
            control={control}
            placeholder="Nhập họ và tên"
            label={'Họ và tên'}
          />
          <TextFieldElement
            name="phoneNumber"
            control={control}
            type="number"
            placeholder="Nhập số điện thoại"
            label={'Số điện thoại'}
          />
          <TextFieldElement name="status" control={control} label={'Trạng thái'} disabled />
        </Box>
      </FormContainer>
    );
  }, [profile]);

  return (
    <ProfileStyled>
      {renderForm}
      <Box display={'flex'} justifyContent={'flex-end'} gap={2}>
        <ButtonPrimary
          severity="cancel"
          padding={'9px 20px'}
          onClick={() => {
            navigate(`${STAFF_PATH.CHANGE_PASSWORD}/${params.id}`);
          }}
        >
          Đổi mật khẩu
        </ButtonPrimary>
        <ButtonPrimary severity="primary" padding={'9px 20px'} onClick={() => handleSaveProfile()}>
          Cập nhật
        </ButtonPrimary>
      </Box>
    </ProfileStyled>
  );
}
