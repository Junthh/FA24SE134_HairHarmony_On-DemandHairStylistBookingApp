import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React from 'react';
import { AccordionStyled } from './styles';
interface IBaseSection {
  title: any;
  openDefault?: boolean;
  children: React.ReactNode;
  isExpand?: boolean;
}

const BaseSection = ({ openDefault = true, title, children, isExpand }: IBaseSection) => {
  return (
    <AccordionStyled defaultExpanded={openDefault} expanded={isExpand}>
      <AccordionSummary
        expandIcon={<KeyboardArrowDownRoundedIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{ background: '#f2f2f2', minHeight: '47px' }}
        className="AccordionHead"
      >
        <Typography variant="h5">
          <b>{title}</b>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </AccordionStyled>
  );
};

export default BaseSection;
