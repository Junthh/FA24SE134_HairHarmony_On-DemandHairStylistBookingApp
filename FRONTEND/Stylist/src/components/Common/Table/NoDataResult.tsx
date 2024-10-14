import React from 'react';
import { ReactComponent as NoFound } from 'assets/pics/nodata.svg';
import { Box, Typography } from '@mui/material';

const NoDataResult = () => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={4}
    >
      <NoFound />
      <Typography>No results found</Typography>
    </Box>
  );
};

export default NoDataResult;
