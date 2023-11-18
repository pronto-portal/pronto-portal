import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import { Wrapper } from "../../types/PropTypes/Wrapper";
const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

export const AnimatedPage: React.FC<Wrapper> = ({ children }) => {
  const AnimatedBox = motion(Box);

  return (
    <AnimatedBox
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      sx={{ width: "100%", height: "100%" }}
    >
      {children}
    </AnimatedBox>
  );
};
