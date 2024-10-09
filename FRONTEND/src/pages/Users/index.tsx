import { Box, Divider, useMediaQuery } from '@mui/material';
import Footer from 'layouts/Footer';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBarUser from 'shared/Navbar/NavbarUser';
import * as colors from 'constants/colors';
import { theme } from 'theme';
import styled from '@emotion/styled';

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.8)',
  pointerEvents: 'none',
  zIndex: '998',
});

export default function Users() {
  const [showOverlay, setShowOverlay] = useState(false);
  const handleOnSidebarChange = (open) => {
    // console.log(open);
    setShowOverlay(open);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {showOverlay && <Overlay />}
      <Box
        sx={{
          width: '100vw',
          position: 'fixed',
          zIndex: '999',
          background: colors.white,
        }}
      >
        <NavBarUser onSidebarChange={handleOnSidebarChange} />
        <Divider variant="fullWidth"></Divider>
      </Box>
      <Box height={60}></Box>
      <Box>
        <Outlet />
        <Footer />
      </Box>
    </Box>
  );
}
