import * as React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { USER_PATH } from "configurations/paths/paths";
import { Link, Typography } from "@mui/material";
import * as colors from "constants/colors"
const variants = {
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



export const MenuItem = ({ i, toggle }) => {
  const navigate = useNavigate()
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        onClick={() => {
          navigate(i.route)
          toggle()
        }}
        underline="none"
        sx={{ cursor: 'pointer', textAlign: "center", color: colors.primary1 }}
      >
        <Typography variant="body2" fontWeight={700}>
          {i.name}
        </Typography>
      </Link>
    </motion.li>
  );
};
