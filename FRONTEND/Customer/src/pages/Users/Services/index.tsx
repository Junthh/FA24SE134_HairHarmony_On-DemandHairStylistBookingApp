import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CardServices from '../Home/components/CardServices';
import * as colors from 'constants/colors';
import { useParams } from 'react-router-dom';
import { serviceServices } from 'services/services.service';
import { showToast } from 'components/Common/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, setLoading } from 'redux/Reducer';

const ServiceStyled = styled(Box)({
  '& .services-content': {
    padding: '40px 40px',
    '& .header': {
      textTransform: 'uppercase',
      paddingLeft: '20px',
      fontWeight: 700,
      borderLeft: `9px solid ${colors.dark}`,
      marginBottom: '59px',
    },
  },
  '& .contact': {
    width: '100%',
    padding: '100px 25px',
    '& .header': {
      textAlign: 'center',
      fontFamily: 'GFS Didot !important',
      fontSize: 50,
    },
    '& .body': {
      textAlign: 'center',
      fontFamily: 'GFS Didot  !important',
      fontSize: 25,
    },
  },
});

//
export default function Services() {
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const params = useParams();

  useEffect(() => {
    getListService();
  }, []);

  const getListService = async () => {
    try {
      dispatch(setLoading(true)); // Start loading
      const res = await serviceServices.list({
        categoryId: params.id,
      });
      setServices(res.data); // Set services after receiving the data
    } catch (error) {
      showToast('error', error.msg); // Show toast on error
    } finally {
      dispatch(setLoading(false)); // Stop loading when done (whether success or error)
    }
  };

  return (
    <ServiceStyled>
      <Box className="services-content">
        <Typography variant="h2" className="header">
          Dịch vụ
        </Typography>
        <Box className="list-card-container">
          <CardServices type="services" services={services} />
        </Box>
      </Box>
      <Box className="contact">
        <Typography variant="h1" className="header">
          LIÊN HỆ
        </Typography>
        <Typography variant="body2" className="body">
          Luôn chào đón khách không hẹn trước!
        </Typography>
        <Typography variant="body2" className="body">
          Hãy gọi điện hoặc ghé qua để đặt lịch hẹn.
        </Typography>
      </Box>
    </ServiceStyled>
  );
}
