import {
  Box,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import {
  CustomDrawer,
  NavListPopoverEcoStyled,
  NavListPopoverSocialStyled,
  NavListStyled,
  NavSearchStyled,
  NavbarMobileStyled,
  NavbarStyled,
} from './styles';
import IMAGE_ECOCUPID_MEDIUM from 'assets/pics/logo/ecocupid-medium.png';
import { ICONS } from 'configurations/icons';
import { BaseTextField } from 'components/Base/BaseTextField';
import { ButtonPrimary } from 'pages/common/style/Button';
import * as colors from 'constants/colors';
import { useNavigate } from 'react-router-dom';
import { USER_PATH } from 'configurations/paths/paths';
import { theme } from 'theme';
import { motion } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { MenuToggle } from './components/MenuToggle';
import { useDimensions } from 'hooks/useDimensions';
import { PopoverContainer } from 'components/Common/Popover/PopoverStyle';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/Reducer';
import { postsService } from 'services/posts.service';
import { ResponseSuccessApi } from 'models/Response.model';
import { CategoryModel } from 'models/Category.model';

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

  // get categories options
  const getCategoriesOpts = async () => {
    dispatch(setLoading(true));
    const response = (await postsService.getCategoriesOptions()) as unknown as ResponseSuccessApi;
    if (response.success) {
      const data = response.data as CategoryModel[];
      const cates = data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setCatesOpts(cates);
    }
    dispatch(setLoading(false));
  };

  const handleClickCateOpts = (categoryId: string) => {
    navigate(`/${USER_PATH.SEARCH}?category=${categoryId}`);
  };

  useEffect(() => {
    getCategoriesOpts();
  }, []);

  useEffect(() => {
    onSidebarChange(openSidebar);
  }, [openSidebar]);

  return (
    <>
      {!isMobile ? (
        <NavbarStyled typePopover={typePopover}>
          <PopoverContainer
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: typePopover?.type === 'ECO' ? 'center' : 'right',
            }}
          >
            {typePopover?.type === 'ECO' ? (
              <NavListPopoverEcoStyled>
                {catesOpts.map((item, index) => (
                  <ListItemButton key={index} onClick={() => handleClickCateOpts(item.value)}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ))}
              </NavListPopoverEcoStyled>
            ) : (
              <NavListPopoverSocialStyled>
                {SOCIAL_LIST.map((item) => {
                  return (
                    <>
                      <ListItemButton onClick={() => handleSocialMediaClick(item.link)}>
                        <ListItemIcon>
                          <Box>{item.icon}</Box>
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </>
                  );
                })}
              </NavListPopoverSocialStyled>
            )}
          </PopoverContainer>
          <Box className="nav-left">
            <img
              onClick={() => navigate(`${USER_PATH.HOME}`)}
              style={{ cursor: 'pointer' }}
              src={IMAGE_ECOCUPID_MEDIUM}
              alt=""
            />
            <Link
              onClick={() => navigate(`/${USER_PATH.ABOUTUS}`)}
              underline="none"
              sx={{ cursor: 'pointer' }}
            >
              <Typography variant="body2" fontWeight={700}>
                About us
              </Typography>
            </Link>
            <Link
              onClick={() => navigate(`/${USER_PATH.ECOFILMS}`)}
              underline="none"
              sx={{ cursor: 'pointer' }}
            >
              <Typography variant="body2" fontWeight={700}>
                Eco-Films
              </Typography>
            </Link>
            <Box className="nav-dropdown">
              <Link
                onClick={() => navigate(`/${USER_PATH.ECO_STORIES}`)}
                sx={{ cursor: 'pointer' }}
                underline="none"
              >
                <Typography variant="body2" fontWeight={700}>
                  Eco-Stories
                </Typography>
              </Link>
              <IconButton
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  handleClick(event, 'ECO');
                }}
              >
                <ICONS.IconCaretDown />
              </IconButton>
            </Box>
            <Link
              onClick={() => navigate(`/${USER_PATH.VOLUNTEERS}`)}
              underline="none"
              sx={{ cursor: 'pointer' }}
            >
              <Typography variant="body2" fontWeight={700}>
                Volunteer
              </Typography>
            </Link>
            <Link
              onClick={() => navigate(`/${USER_PATH.OUR_READER_STORIES}`)}
              sx={{ cursor: 'pointer' }}
              underline="none"
            >
              <Typography variant="body2" fontWeight={700}>
                Our Readers’ Stories
              </Typography>
            </Link>
          </Box>
          <Box className="nav-right">
            <BaseTextField
              onChange={(event) => setKeySearch(event.target.value)}
              onKeyDown={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <IconButton
                    className="icon-dropdown"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => hanldeSearch()}
                  >
                    <ICONS.IconMagnifyingGlass></ICONS.IconMagnifyingGlass>
                  </IconButton>
                ),
              }}
            ></BaseTextField>
            <ButtonPrimary
              severity="primary"
              padding={'10px 16px'}
              borderradius={'40px'}
              fontWeight={700}
              border={`3px solid ${colors.primary1}`}
              texttransform={'uppercase'}
              onClick={() => navigate(`/${USER_PATH.PARTNER_WITH_US}`)}
            >
              Partner with EcoCupid
            </ButtonPrimary>
            <Box className="nav-dropdown_follow">
              <Box
                onClick={(event: React.MouseEvent<HTMLElement>) => handleClick(event, 'FOLLOW')}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Box className="nav-dropdown-waving" color={colors.primary1}>
                  <Typography variant="body2" fontWeight={700}>
                    Follow us
                  </Typography>
                  <ICONS.IconHandWaving />
                </Box>
              </Box>
              <IconButton
                className="icon-dropdown"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  handleClick(event, 'FOLLOW')
                }
              >
                <ICONS.IconCaretDown />
              </IconButton>
            </Box>
          </Box>
        </NavbarStyled>
      ) : (
        <>
          <CustomDrawer
            anchor={'bottom'}
            open={openDrawer}
            onClose={() => {
              toggleDrawer(false);
              handleClose();
            }}
          >
            <NavListPopoverSocialStyled>
              <Box padding={'20px'}>
                {SOCIAL_LIST.map((item) => {
                  return (
                    <>
                      <ListItemButton onClick={() => handleSocialMediaClick(item.link)}>
                        <ListItemIcon>
                          <Box color={colors.darkBlue300}>{item.icon}</Box>
                        </ListItemIcon>
                        <ListItemText
                          sx={{ fontWeight: 400, fontSize: 18 }}
                          color={colors.darkBlue900}
                          primary={item.label}
                        />
                      </ListItemButton>
                    </>
                  );
                })}
              </Box>
            </NavListPopoverSocialStyled>
          </CustomDrawer>
          <NavbarMobileStyled typePopover={typePopover}>
            <img
              className="logo"
              onClick={() => navigate(`${USER_PATH.HOME}`)}
              style={{ cursor: 'pointer' }}
              src={IMAGE_ECOCUPID_MEDIUM}
              alt=""
            />
            <Box className="nav-right">
              <Box className="nav-dropdown_follow">
                <Box
                  onClick={(event: React.MouseEvent<HTMLElement>) => handleClick(event, 'FOLLOW')}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    className="nav-dropdown-waving"
                    color={colors.primary1}
                    onClick={() => {
                      hanldeOpenDrawerBottom();
                    }}
                  >
                    <Typography variant="body2" fontWeight={700}>
                      Follow us
                    </Typography>
                    <ICONS.IconHandWaving />
                  </Box>
                </Box>
                <IconButton
                  className="icon-dropdown"
                  onClick={() => {
                    hanldeOpenDrawerBottom();
                  }}
                >
                  <ICONS.IconCaretDown />
                </IconButton>
              </Box>
              <IconButton onClick={hanldeToggleSearch}>
                <ICONS.IconMagnifyingGlass />
              </IconButton>
              <motion.nav
                initial={false}
                animate={openSidebar ? 'open' : 'closed'}
                custom={height}
                ref={containerRef}
              >
                <MenuToggle toggle={handleToggle} />
              </motion.nav>
            </Box>
          </NavbarMobileStyled>
          <NavSearchStyled openSearch={openSearch.toString()}>
            <Box className="container">
              <Box className="header">
                <Typography variant="body1" fontWeight={700}>
                  Search
                </Typography>
                <IconButton onClick={hanldeToggleSearch}>
                  <ICONS.IconXCircle />
                </IconButton>
              </Box>
              <motion.div
                variants={{
                  open: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      y: { stiffness: 1000, velocity: -100 },
                    },
                  },
                  closed: {
                    y: 50,
                    opacity: 0,
                    transition: {
                      y: { stiffness: 1000 },
                    },
                  },
                }}
                animate={openSearch ? 'open' : 'closed'}
                whileTap={{ scale: 0.95 }}
              >
                <Box className="search-box">
                  <BaseTextField
                    onChange={(event) => setKeySearch(event.target.value)}
                    fullWidth
                    size="medium"
                    onKeyDown={handleKeyPress}
                    InputProps={{
                      startAdornment: (
                        <IconButton
                          className="icon-dropdown"
                          onClick={(event: React.MouseEvent<HTMLButtonElement>) => hanldeSearch()}
                        >
                          <ICONS.IconMagnifyingGlass></ICONS.IconMagnifyingGlass>
                        </IconButton>
                      ),
                    }}
                  ></BaseTextField>
                </Box>
              </motion.div>
            </Box>
          </NavSearchStyled>
          <NavListStyled openSidebar={openSidebar.toString()}>
            <motion.nav
              initial={false}
              animate={openSidebar ? 'open' : 'closed'}
              custom={height}
              ref={containerRef}
              className="nav_list-mobile"
            >
              <motion.div className="background" variants={sidebar} />
              <Navigation toggle={handleToggle} navigate={navigate} catesOpts={catesOpts} />
            </motion.nav>
          </NavListStyled>
        </>
      )}
    </>
  );
}
