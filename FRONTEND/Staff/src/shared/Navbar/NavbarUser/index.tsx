import { Box, Link, Typography, useMediaQuery } from '@mui/material';
import { ICONS } from 'configurations/icons';
import { USER_PATH } from 'configurations/paths/paths';
import * as colors from 'constants/colors';
import { useDimensions } from 'hooks/useDimensions';
import { ButtonPrimary } from 'pages/common/style/Button';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { theme } from 'theme';
import { NavbarStyled } from './styles';

interface NavBarUserProps {
  onSidebarChange?: any;
}

export default function NavBarUser({ onSidebarChange }: NavBarUserProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keySearch, setKeySearch] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down(1457));
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [catesOpts, setCatesOpts] = useState([]);
  // popover
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [typePopover, setTypePopover] = useState<{
    type: string;
    open: boolean;
  }>();
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>, type: string) => {
    setAnchorEl(event.currentTarget);
    setTypePopover({
      type: type,
      open: true,
    });
  };
  const hanldeOpenDrawerBottom = () => {
    setTypePopover({
      type: 'FOLLOW',
      open: !typePopover?.open || false,
    });
    toggleDrawer(true);
  };
  const toggleDrawer = (open: boolean) => {
    setOpenDrawer(open);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setTypePopover((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const SOCIAL_LIST = [
    {
      icon: <ICONS.IconFacebook />,
      label: 'Facebook',
      link: 'https://www.facebook.com/EcoCupid',
    },
    {
      icon: <ICONS.IconInstagram />,
      label: 'Instagram',
      link: 'https://www.instagram.com/ecocupid',
    },
    {
      icon: <ICONS.IconYoutube />,
      label: 'Youtube',
      link: 'https://youtube.com/@ecocupid',
    },
    {
      icon: <ICONS.IconTiktok />,
      label: 'Tiktok',
      link: 'https://www.tiktok.com/@ecocupid',
    },
    {
      icon: <ICONS.IconLinkedIn />,
      label: 'LinkedIn',
      link: 'https://www.linkedin.com/company/86826173',
    },
    // {
    //   icon: <ICONS.IconEnvelope />,
    //   label: "Email"
    // },
    {
      icon: <ICONS.IconTwitter />,
      label: 'Twitter',
      link: 'https://twitter.com/EcoCupidASEAN',
    },
  ];
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigate(`/${USER_PATH.SEARCH}?qs=${keySearch}`);
      hanldeToggleSearch();
    }
  };
  const hanldeSearch = () => {
    navigate(`/${USER_PATH.SEARCH}?qs=${keySearch}`);
    hanldeToggleSearch();
  };
  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: 'circle(30px at 40px 40px)',
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };
  const handleToggle = () => {
    setOpenSidebar(!openSidebar);
    setOpenSearch(false);
  };
  const hanldeToggleSearch = () => {
    setOpenSearch(!openSearch);
    setOpenSidebar(false);
  };

  const handleSocialMediaClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleClickCateOpts = (categoryId: string) => {
    navigate(`/${USER_PATH.SEARCH}?category=${categoryId}`);
  };

  useEffect(() => {
    onSidebarChange(openSidebar);
  }, [openSidebar]);

  return (
    <NavbarStyled typePopover={typePopover}>
      <Box className="nav-left">
        <h1
          className="mea-culpa-regular"
          onClick={() => navigate(`${USER_PATH.HOME}`)}
          style={{ cursor: 'pointer' }}
        >
          Hair Hamorny
        </h1>
      </Box>
      <Box className="nav-right">
        <Link
          onClick={() => navigate(`/${USER_PATH.ABOUTUS}`)}
          underline="none"
          sx={{ cursor: 'pointer' }}
        >
          <Typography variant="body2" fontWeight={700}>
            Trang chủ
          </Typography>
          <hr />
        </Link>
        <Link
          onClick={() => navigate(`/${USER_PATH.ECOFILMS}`)}
          underline="none"
          sx={{ cursor: 'pointer' }}
        >
          <Typography variant="body2" fontWeight={700}>
            Về HairHamony
          </Typography>
        </Link>
        <Link
          onClick={() => navigate(`/${USER_PATH.ECO_STORIES}`)}
          sx={{ cursor: 'pointer' }}
          underline="none"
        >
          <Typography variant="body2" fontWeight={700}>
            Đội Ngũ Chúng Tôi
          </Typography>
        </Link>
        <Link
          onClick={() => navigate(`/${USER_PATH.VOLUNTEERS}`)}
          underline="none"
          sx={{ cursor: 'pointer' }}
        >
          <Typography variant="body2" fontWeight={700}>
            Liên hệ
          </Typography>
        </Link>
        <ButtonPrimary
          severity="primary"
          padding={'4px 12px'}
          borderradius={'8px'}
          fontWeight={400}
          border={`1px solid ${colors.white}`}
          onClick={() => navigate(`/${USER_PATH.PARTNER_WITH_US}`)}
        >
          Đăng nhập
        </ButtonPrimary>
      </Box>
    </NavbarStyled>
  );
}
