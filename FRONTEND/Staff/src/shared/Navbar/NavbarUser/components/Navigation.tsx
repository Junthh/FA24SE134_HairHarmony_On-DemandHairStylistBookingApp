import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { USER_PATH } from "configurations/paths/paths";
import { ButtonPrimary } from "pages/common/style/Button";
import * as colors from "constants/colors"
import { Box, IconButton } from "@mui/material";
import { ICONS } from "configurations/icons";
const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const variantButton = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};
export const Navigation = ({
  toggle,
  navigate,
  catesOpts
}) => {
  const [openNavChildren, setOpenNavChildren] = React.useState(false)
  const navList = [
    {
      route: `/${USER_PATH.ABOUTUS}`,
      name: "About us"
    },
    {
      route: `/${USER_PATH.ECOFILMS}`,
      name: "Eco-Films"
    },
    {
      route: `/${USER_PATH.ECO_STORIES}`,
      name: "Eco-Stories",
      children: catesOpts.map(item => {
        return {
          route: `search?category=${item.value}`,
          name: item.label
      }
      })
    },
    {
      route: `/${USER_PATH.VOLUNTEERS}`,
      name: "Volunteer"
    },
    {
      route: `/${USER_PATH.OUR_READER_STORIES}`,
      name: "Our Readers’ Stories"
    }
  ]
  return <motion.ul variants={variants}>
    {navList.map((i, index: number) => {
      if (!i.children) {
        return <MenuItem i={i} key={index} toggle={toggle} />
      } else {
        return <motion.div
          variants={variantButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Box paddingLeft={4}>
            <Box display={"flex"}
              alignItems={"flex-end"} justifyContent={"center"} >
              <MenuItem i={i} key={index} toggle={toggle} />
              <IconButton
                sx={{
                  width: 35, height: 35,
                  "& svg": {
                    transform: openNavChildren ? "rotate(180deg)" : "rotate(0deg)"
                  }
                }} onClick={() => { setOpenNavChildren(!openNavChildren) }}>
                <ICONS.IconCaretDown />
              </IconButton>
            </Box>
            {
              openNavChildren ? <Box paddingLeft={2}>
                {
                  i?.children?.map(item => <MenuItem i={item} key={index} toggle={toggle} />)
                }
              </Box> : <></>
            }
          </Box>
        </motion.div>

      }
    })}
    <motion.li
      variants={variantButton}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ButtonPrimary
        severity="primary"
        padding={'10px 16px'}
        borderradius={'40px'}
        fontWeight={700}
        border={`3px solid ${colors.primary1}`}
        texttransform={"uppercase"}
        margin="0 auto"
        onClick={() => {
          navigate(`/${USER_PATH.PARTNER_WITH_US}`)
          toggle()
        }
        }
      >
        Partner with EcoCupid
      </ButtonPrimary>
    </motion.li>
  </motion.ul>
};

