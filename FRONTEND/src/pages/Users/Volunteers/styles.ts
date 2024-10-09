import styled from '@emotion/styled';
import { Accordion, Box } from '@mui/material';
import * as colors from 'constants/colors';
import { theme } from 'theme';
export const BoxVolunteerstyled = styled(Box)({
  display: 'flex',
  gap: '0px 20px',
  padding: '0px 52px',
  margin: '24px 0px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    padding: '0px 20px',
  },
  '& .card-left': {
    flex: '70%',
    paddingRight: 110,
    [theme.breakpoints.down('md')]: {
      flex: '100%',
      paddingRight: 0,
    },
    '& .MuiTypography-body2': {
      marginTop: 11,
      marginBottom: 40,
    },
    '& .MuiTypography-h2': {
      marginBottom: 24,
    },
    '& .content': {
      '& .MuiTypography-h4': {
        marginBottom: 24,
        lineHeight: 1.8,
      },
    },
  },
  '& .card-right': {
    flex: '30%',
    borderRadius: 24,
    background: colors.primary1,
    padding: 32,
    display: 'flex',
    flexDirection: 'column',
    gap: '32px 0px',
    '& .content-item': {
      display: 'flex',
      color: colors.white,
      gap: '0px 16px',
      justifyContent: 'flex-start',
    },
  },
});

export const ContainerVacanPosition = styled(Box)({
  width: '70%',
  padding: '0px 52px',
  [theme.breakpoints.down('md')]: {
    padding: '0px 20px',
    width: '100%',
  },
  '& .Mui-expanded': {
    margin: '0px !important',
  },
});

export const AccordionStyled = styled(Accordion)({
  border: 'none',
  boxShadow: 'none',
  borderRadius: 24,
  background: colors.primary5,
  padding: '0px 24px',
  [theme.breakpoints.down('md')]: {
    padding: '0px 0px',
  },
  '&:first-of-type': {
    borderRadius: 24,
  },
  '&:last-of-type': {
    borderRadius: 24,
  },
  '&::before': {
    display: 'none',
  },
  '& .header-accordion': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginRight: 30,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: 24,
    },
  },
  '& .accordion-content_item': {
    marginBottom: 24,
  },
});

export const ContainerFooter = styled(Box)({
  background: colors.primary,
  padding: '80px 56px',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
  '& .content-item_left': {
    flex: '40%',
    textAlign: 'center',
  },
  '& .content-item_right': {
    flex: '60%',
    [theme.breakpoints.down('md')]: {
      '& .MuiTypography-h1': {
        textAlign: 'center',
      },
    },
    '& .email': {
      fontWeight: 700,
      fontSize: 24,
      color: colors.primary1,
    },
    '& .branch': {
      fontWeight: 700,
      fontSize: 24,
    },
  },
});
