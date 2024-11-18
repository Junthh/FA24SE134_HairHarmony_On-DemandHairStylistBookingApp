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
  .MuiTypography-body1 {
    font-style: normal;
    font-size: 18px;
    line-height: 1.8;
    &:hover {
      cursor: pointer;
    }
  }
  & img {
    padding: 0 12px;
    height: 12px;
  }
`;
export type BreadScrumbProps = {
  currentStep: number;
  options: { label: string; step: number; onClick?: () => void }[];
};
export default function Breadscrumb({ options, currentStep }: BreadScrumbProps) {
  return (
    <BreadscrumbStyle>
      {options.map((item, index) => {
        const isLastItem = index === options.length - 1; // Check if it's the last item
        const isActive = item.step === currentStep; // Check if the item is active

        return (
          <Box key={index} display="flex" alignItems="center">
            <Typography
              variant="body1"
              fontWeight={isActive ? 700 : 400}
              color={isActive ? colors.dark : 'inherit'} // Optionally change color for active
              onClick={() => {
                item.onClick();
              }}
            >
              {item.label}
            </Typography>
            {/* Only show the arrow if it's not the last item */}
            {!isLastItem && (
              <>
                <Box width={12} />
                <ArrowForwardIosIcon
                  sx={{ fontSize: 16, color: isActive ? colors.dark : 'inherit' }}
                />
                <Box width={12} />
              </>
            )}
          </Box>
        );
      })}
    </BreadscrumbStyle>
  );
}
