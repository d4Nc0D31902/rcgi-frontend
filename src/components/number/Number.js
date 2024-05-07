import React from "react";
import "./number.css";
import { motion } from "framer-motion";
const Number = () => {
  return (
    <div className="container">
      <motion.div className="olive-box">
        <img
          className="olive"
          src="./images/olive.png"
        />
      </motion.div>
    </div>
  );
};

export default Number;
