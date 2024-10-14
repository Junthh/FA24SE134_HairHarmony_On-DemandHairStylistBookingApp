import { Box, Typography } from '@mui/material';
import React from 'react';
import * as colors from 'constants/colors';
import { ICONS } from 'configurations/icons';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
const steps = ['Confirmation', 'Pay'];
export default function CustomizedSteppers({ activeStep = 1 }) {
  return (
    <Box width={'100%'}>
      <Box display={'flex'} gap={'0px 10px'}>
        {steps.map((item, index) => {
          return (
            <Box width={'100%'}>
              <Box
                sx={{
                  border: `4px solid ${index + 1 > activeStep ? '#C1C9D2' : colors.primary}`,
                  borderRadius: '100px',
                }}
              ></Box>
              <Box height={'4px'}></Box>
              {index + 1 > activeStep ? (
                <Box
                  sx={{ color: '#C1C9D2', display: 'flex', alignItems: 'baseline', gap: '0px 4px' }}
                >
                  <RadioButtonUncheckedIcon />
                  <Typography fontWeight={600} color={colors.b7} fontSize={16} lineHeight={1.4}>
                    {item}
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    color: colors.primary,
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '0px 4px',
                  }}
                >
                  <RadioButtonCheckedIcon />
                  <Typography
                    fontWeight={600}
                    color={colors.primary}
                    fontSize={16}
                    lineHeight={1.4}
                  >
                    {item}
                  </Typography>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
