import React from "react";
import { easeInOut, motion } from "framer-motion";

const Hero = () => {
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
