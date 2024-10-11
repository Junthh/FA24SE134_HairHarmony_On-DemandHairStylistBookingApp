import styled from '@emotion/styled';
import { Box, IconButton, Typography } from '@mui/material';
import { ICONS } from 'configurations/icons';
import React from 'react';
import * as colors from 'constants/colors';
import { useNavigate } from 'react-router';
const CustomButtonBack = styled(Box)({
  '& button': {
    width: 32,
    height: 32,
    border: `1px solid ${colors.b6}`,
    borderRadius: 8,
    padding: 6,
  },
});
type ButtonBackProps = {
  onClick?: () => void;
};
export default function ButtonBack({ onClick }: ButtonBackProps) {
  const navigate = useNavigate();
  return (
    <CustomButtonBack>
      <IconButton onClick={() => navigate(-1)}>
        <ICONS.IconCaretLeft />
      </IconButton>
    </CustomButtonBack>
  );
}
