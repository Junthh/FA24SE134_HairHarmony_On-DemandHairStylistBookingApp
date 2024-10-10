import { Grid, Typography } from '@mui/material';
import Breadscrumb from 'components/Common/Breadscrumb';
import Button from 'components/Common/Button';
import { Dialog } from 'components/Common/Dialog';
import useModal from 'hooks/useModal';
import ButtonBack from 'pages/common/ButtonBack/ButtonBack';
import React from 'react';

export default function DialogExample() {
  const modalHook = useModal();
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            sx={{ color: 'white', marginLeft: 2 }}
            onClick={() => {
              // console.log('Yup-------------------------');
              modalHook.openModal();
            }}
          >
            Open Dialog
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={modalHook.isOpen}
        onClose={() => {
          modalHook.closeModal();
        }}
        title="Dialog"
        content={<Typography>hihi</Typography>}
      />
      <Breadscrumb
        options={[
          {
            url: '/',
            label: 'Dashboard',
          },
          {
            url: '/',
            label: 'Quản lý',
          },
          {
            url: '/',
            label: 'Chi tiết',
          },
        ]}
      />
      <ButtonBack />
    </div>
  );
}
DialogExample.code = `
export default function DialogExample() {
  const modalHook = useModal();
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            sx={{ color: 'white', marginLeft: 2 }}
            onClick={() => {
              console.log('Yup-------------------------');
              modalHook.openModal();
            }}
          >
            Open Dialog
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={modalHook.isOpen}
        onClose={() => {
          modalHook.closeModal();
        }}
        title="Dialog"
        content={<Typography>hihi</Typography>}
      />
      <Breadscrumb
        options={[
          {
            url: '/',
            label: 'Dashboard',
          },
          {
            url: '/',
            label: 'Quản lý',
          },
          {
            url: '/',
            label: 'Chi tiết',
          },
        ]}
      />
    </div>
  );
}
`;
