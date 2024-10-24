import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CardServices from '../Home/components/CardServices';
import * as colors from 'constants/colors';
import { useParams } from 'react-router-dom';
import { serviceServices } from 'services/services.service';
import { showToast } from 'components/Common/Toast';

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
});
//
export default function Services() {
  const [services, setServices] = useState([]);
  const params = useParams();

  useEffect(() => {
    getListService();
  }, []);

  const getListService = () => {
    serviceServices
      .list({
        categoryId: params.id,
      })
      .then((res) => {
        setServices(res.data);
      })
      .catch((error) => showToast('error', error.msg));
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
    </ServiceStyled>
  );
}
