import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SidebarMenu from './SidebarMenu';
import { SidebarStyled } from './styles';
import { ICONS } from 'configurations/icons';
import { ADMIN_PATH, STAFF_PATH } from 'configurations/paths/paths';
import { LOGO } from 'configurations/logo';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
const routes = [
  {
    path: STAFF_PATH.BOOKING,
    name: 'Đặt lịch',
    icon: <ICONS.IconList />,
  },
  {
    path: STAFF_PATH.SCHEDULE_LIST,
    name: 'Danh sách đặt lịch',
    icon: <ICONS.IconList />,
  },
  {
    path: STAFF_PATH.HISTORY,
    name: 'Lịch sử đặt lịch',
    icon: <ICONS.IconHistory />,
  },
  {
    path: STAFF_PATH.STYLIST_STATUS,
    name: 'Tình trạng stylist',
    icon: <ICONS.IconStylistUser />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: 'auto',
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <SidebarStyled className="main-container" isopen={isOpen ? 1 : 0}>
        <motion.div
          animate={{
            width: isOpen ? '240px' : '50px',
            transition: {
              duration: 0.5,
              type: 'spring',
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.div initial="hidden" animate="show" exit="hidden" className="logo">
                  {/* <img src={LOGO.Images.EcocupidMedium} alt="" /> */}
                  <h1 className="mea-culpa-regular" style={{ cursor: 'pointer' }}>
                    Hair Hamorny
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
            {/* <div className="bars">
              <FaBars size={30} onClick={toggle} />
            </div> */}
          </div>
          <section className="routes">
            {routes.map((route: any, index: number) => {
              if (route?.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    key={index}
                  />
                );
              }
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className={({ isActive, isPending }) =>
                    isPending ? 'link pending' : isActive ? 'link active' : 'link'
                  }
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </SidebarStyled>
    </>
  );
};

export default SideBar;
