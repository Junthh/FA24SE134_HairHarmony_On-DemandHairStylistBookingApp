import styled from '@emotion/styled';
import * as colors from 'constants/colors';
import { theme } from 'theme';

export const PriceRangeSliderWrapStyle = styled(`div`)({
  width: 310,
  display: 'flex',
  flexDirection: 'column',
  rowGap: 25,

  '& .silder__container': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    '& .slider': {
      color: colors.primary,
      height: 5,
      width: 290,

      '& .MuiSlider-track': {
        border: 'none',
      },
      '& .MuiSlider-thumb': {
        height: 18,
        width: 18,
        backgroundColor: colors.primary,
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
          boxShadow: 'inherit',
        },
        '&:before': {
          display: 'none',
        },
      },
      '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: colors.primary,
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
          transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
          transform: 'rotate(45deg)',
        },
      },
    },

    '& .silder-label': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '5px',
      color: colors.b7,
      fontWeight: 500,
    },
  },

  '& .slider-value': {
    fontWeight: 500,
    fontSize: 18,
  },

  '& .MuiInputBase-root': {
    borderRadius: 100,
  },
});
