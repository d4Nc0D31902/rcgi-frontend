import React from "react";
import { easeInOut, motion } from "framer-motion";
import { useTheme } from "@mui/material";
const Hero = () => {
  const theme = useTheme();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <img
        src="../images/RCGILOGO.gif"
        style={{ objectFit: "fill", height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default Hero;
