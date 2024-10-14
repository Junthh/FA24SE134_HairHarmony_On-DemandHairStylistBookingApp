import React from 'react';
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';
import * as colors from 'constants/colors';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
const BreadscrumbStyle = styled.div`
  display: flex;
  align-items: center;
  a:nth-of-type(n) {
    color: ${colors.primary1};
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.8;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  MuiTypography-body1 {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 1.8;
    color: ${colors.b9};
  }
  & img {
    padding: 0 12px;
    height: 12px;
  }
`;
export type BreadScrumbProps = {
  options: { label: string; url: string }[];
};
export default function Breadscrumb({ options }: BreadScrumbProps) {
  return (
    <BreadscrumbStyle>
      {options.map((item, index) => {
        if (options.length - 1 === index) {
          return (
            <Typography variant="body1" fontWeight={700} key={index}>
              {item.label}
            </Typography>
          );
        } else {
          return (
            <Box key={index} display={'flex'} alignItems={'center'}>
              <Link key="1" to={item.url}>
                <Typography variant="body1">{item.label}</Typography>
              </Link>
              <Box width={12}></Box>
              <ArrowForwardIosIcon sx={{ fontSize: 16, color: '#B9B9B9' }} />
              <Box width={12}></Box>
            </Box>
          );
        }
      })}
    </BreadscrumbStyle>
  );
}
