import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SidebarMenu from './SidebarMenu';
import { SidebarStyled } from './styles';
import { ICONS } from 'configurations/icons';
import { ADMIN_PATH } from 'configurations/paths/paths';
import { LOGO } from 'configurations/logo';

const routes = [
  {
    path: ADMIN_PATH.ARTICLE,
    name: 'Article',
    icon: <ICONS.IconNotePencil />,
  },
  {
    path: ADMIN_PATH.OUR_READER_STORIES,
    name: 'Our Reader Stories',
    icon: <ICONS.IconFilmReel />,
  },
  {
    path: ADMIN_PATH.CATEGORY,
    name: 'Category',
    icon: <ICONS.IconSparkle />,
  },
  {
    path: ADMIN_PATH.VIDEO,
    name: 'Video',
    icon: <ICONS.IconFilmSlate />,
  },
  {
    path: ADMIN_PATH.PROJECT,
    name: 'Project',
    icon: <ICONS.IconStar />,
  },
  {
    path: ADMIN_PATH.WRITER,
    name: 'Writer',
    icon: <ICONS.IconUsers />,
  },
  {
    path: ADMIN_PATH.EMAIL,
    name: 'Email',
    icon: <ICONS.IconEnvelope />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
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
                  <img src={LOGO.Images.EcocupidMedium} alt="" />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="bars">
              <FaBars size={30} onClick={toggle} />
            </div>
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
