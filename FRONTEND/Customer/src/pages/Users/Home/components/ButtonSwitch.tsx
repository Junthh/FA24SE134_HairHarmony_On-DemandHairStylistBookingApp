import { Button } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import * as colors from 'constants/colors';
const SwitchContainer = styled.div`
  display: flex;
  gap: 0px 8px;
  border: 1px solid #ccc;
  height: 53px;
  border-radius: 16px;
  padding: 4px;
  @media only screen and (max-width: 900px) {
    gap: 0px 0px;
  }
`;

const StyledButton = styled(Button)`
  && {
    display: inline-block;
    padding: 8px 33px;
    height: 45px;
    border-radius: 12px;
    background-color: ${({ isActive }) => (isActive ? colors.darkBlue900 : 'transparent')};
    color: ${({ isActive }) => (isActive ? 'white' : '')};
    box-shadow: unset;
    transition: background-color 0.3s ease;
    white-space: nowrap;
    @media only screen and (max-width: 600px) {
      padding: 8px 24px;
    }
  }
`;

interface ButtonSwitchProps {
  data?: any;
  onSelectedValue?: (value: any) => void;
}

const ButtonSwitch = ({ data, onSelectedValue }: ButtonSwitchProps) => {
  const [activeButton, setActiveButton] = useState(0);

  const handleButtonClick = (id, index) => {
    onSelectedValue(id);
    setActiveButton(index);
  };

  return (
    <SwitchContainer>
      {data &&
        data.map((item, index) => (
          <StyledButton
            key={index}
            variant="contained"
            isActive={activeButton === index}
            onClick={() => handleButtonClick(item.id, index)}
          >
            {item.name}
          </StyledButton>
        ))}
    </SwitchContainer>
  );
};

export default ButtonSwitch;
