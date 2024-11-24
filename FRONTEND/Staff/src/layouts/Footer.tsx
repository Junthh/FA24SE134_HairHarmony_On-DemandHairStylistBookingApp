import styled from '@emotion/styled';
import { Box, Grid, Link, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import { theme } from 'theme';
import * as colors from 'constants/colors';
import { LOGO } from 'configurations/logo';
import ImageComponent from 'components/Common/Image/ImageComponent';
import TextFieldElement from 'components/Form/TextFieldElement/TextFieldElement';
import { useForm } from 'react-hook-form';
import { showToast } from 'components/Common/Toast';
import { handleError } from 'utils/helper';
import { useNavigate } from 'react-router';
import { USER_PATH } from 'configurations/paths/paths';
import useModal from 'hooks/useModal';
import { Dialog } from 'components/Common/Dialog';

const FooterWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '60px 0px 80px 165px',
  background: `${colors.dark}`,
  height: 'auto',
  '& .nocopy-right_footer': {
    display: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '60px 20px !important',
    '& .nocopy-right_footer': {
      display: 'block',
    },
    '& .nocopy-right': {
      display: 'none',
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: '60px 20px !important',
    '& .nocopy-right_footer': {
      display: 'block',
    },
    '& .nocopy-right': {
      display: 'none',
    },
  },
}));

const CustomItemTextHeader = styled(Link)({
  color: `${colors.white}`,
  fontStyle: 'normal',
  fontWeight: '700 !important',
  fontSize: '18px !important',
  lineHeight: '21px !important',
  textDecoration: 'none',
});

const CustomListItemTextLink = styled(Link)({
  color: `${colors.white}`,
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '19px',
  textDecoration: 'none',
  paddingTop: '8px',
});

const CustomListItemText = styled(`div`)({
  color: `${colors.white}`,
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '19px',
  textDecoration: 'none',
  paddingTop: '8px',
});

const EmailContainer = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const EmailInput = styled(TextFieldElement)({
  borderTopLeftRadius: '2px',
  borderBottomLeftRadius: '2px',
  background: colors.white,

  '& .MuiInputBase-root': {
    borderRadius: '0',
    height: 48,
  },
});

const ButtonSubscribe = styled(`div`)({
  padding: '0.75em 1em',
  background: colors.a2,
  color: colors.white,
  fontWeight: 700,
  fontSize: 18,
  borderTopRightRadius: '2px',
  borderBottomRightRadius: '2px',
  cursor: 'pointer',
});

const DialogContentWrap = styled(Box)({
  padding: '0px 20px 20px 20px',
});
export default function Footer() {
  // FORM
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const formContext = useForm<any>({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
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


  return (
    <FooterWrapper>
      <Grid container spacing={2}>
        <Grid item sm={12} md={3}>
          <List>
            <ListItem>
              <CustomListItemTextLink href={`${USER_PATH.ABOUTUS}`}>Liên hệ</CustomListItemTextLink>
            </ListItem>
            <ListItem>
              <CustomListItemTextLink href={`${USER_PATH.PARTNER_WITH_US}`}>
                038-999-111{' '}
              </CustomListItemTextLink>
            </ListItem>
            <ListItem>
              <CustomListItemTextLink href={`${USER_PATH.VOLUNTEERS}`}>
                hairhamony@gmail.com
              </CustomListItemTextLink>
            </ListItem>
          </List>
        </Grid>
        <Grid item sm={12} md={3}>
          <List>
            <ListItem>
              <CustomItemTextHeader>Địa chỉ</CustomItemTextHeader>
            </ListItem>
            <ListItem>
              <CustomListItemTextLink href={`${USER_PATH.VOLUNTEERS}`}>
                77 Lê Văn Việt
              </CustomListItemTextLink>
            </ListItem>
            <ListItem>
              <CustomListItemTextLink href={`${USER_PATH.VOLUNTEERS}`}>
                Hiệp Phú, Quận 9, Hồ Chí Minh
              </CustomListItemTextLink>
            </ListItem>
            {/* <ListItem>
              <CustomListItemTextLink href="#">Privacy Policy</CustomListItemTextLink>
            </ListItem>{' '}
            <ListItem>
              <CustomListItemTextLink href="#">Cookies Policy</CustomListItemTextLink>
            </ListItem> */}
          </List>
        </Grid>
        <Grid item sm={12} md={4}>
          <h1
            className="mea-culpa-regular"
            style={{
              color: 'white',
              textAlign: 'center',
              paddingTop: '40px',
              fontSize: '45px',
            }}
            color="white"
          >
            Hair Hamorny
          </h1>
        </Grid>
      </Grid>
    </FooterWrapper>
  );
}
